import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "../validation/checkoutSchema";
import { useCartStore } from "../../cart/store/useCartStore";
import { useNavigate } from "react-router-dom";

type FieldKey = keyof CheckoutFormValues;

const FIELD_KEYS: { name: FieldKey; required?: boolean; type?: string }[] = [
  { name: "fullName", required: true },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel", required: true },
  { name: "addressLine1", required: true },
  { name: "addressLine2" },
  { name: "city", required: true },
  { name: "postcode", required: true },
  { name: "country", required: true },
  { name: "notes" },
];

export type PaymentMethodType = "upi" | "card" | "cod";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";
const API_URL = rawApiUrl.replace(/\/+$/, "");

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [values, setValues] = useState<Partial<CheckoutFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("upi");

  const handleChange = (field: FieldKey, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  // Helper function to save order details to Express / MongoDB
  const saveOrderToBackend = async (orderData: any) => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      return response.ok;
    } catch (err) {
      console.warn("Backend API unavailable. Order will be confirmed via WhatsApp.", err);
      return false;
    }
  };

  // Helper function to handle post-order actions (WhatsApp + Redirect)
  const finishCheckout = (
    orderId: string,
    formValues: any,
    total: number,
    cartItems: any[],
  ) => {
    const itemList = cartItems
      .map((i) => `${i.quantity}x ${i.name}`)
      .join("%0A");
    const whatsappText = `*ORDER CONFIRMATION*%0A%0AHello, here are the details of my order:%0A%0A*Order ID:* ${orderId}%0A*Name:* ${formValues.fullName}%0A*Phone:* ${formValues.phone}%0A*Address:* ${formValues.addressLine1}, ${formValues.city}, ${formValues.postcode}%0A%0A*Items Ordered:*%0A${itemList}%0A%0A*Total Amount:* ₹${total}%0A*Payment Method:* ${t(`checkout.paymentMethods.${paymentMethod}`)}`;
    const whatsappLink = `https://wa.me/917483562925?text=${whatsappText}`;

    sessionStorage.setItem("lastOrderWhatsappLink", whatsappLink);
    sessionStorage.setItem("lastOrderId", orderId);

    clearCart();
    navigate("/order-success");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate form fields using Zod schema
    const result = checkoutSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<FieldKey, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as FieldKey;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    const total = getTotalPrice();

    const orderPayload = {
      orderId,
      customerName: values.fullName,
      email: values.email,
      customerPhone: values.phone,
      address: `${values.addressLine1}${values.addressLine2 ? ", " + values.addressLine2 : ""}, ${values.city}, ${values.postcode}, ${values.country}`,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      totalAmount: total,
      notes: values.notes || "",
      createdAt: new Date(),
    };

    try {
      // MODE A: CASH ON DELIVERY (COD)
      if (paymentMethod === "cod") {
        await saveOrderToBackend(orderPayload);
        finishCheckout(orderId, values, total, items);
        return;
      }

      // MODE B: ONLINE PAYMENTS (UPI / Card via Razorpay)
      const res = await fetch(`${API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.message ||
            "Failed to create Razorpay payment order. Please verify your backend server & Razorpay API keys.",
        );
      }

      const razorpayOrder = await res.json();

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        return;
      }

      const options = {
        key:
          razorpayOrder.key ||
          import.meta.env.VITE_RAZORPAY_KEY_ID ||
          "rzp_test_TGakiCn3THN42i",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: "SweetDelights",
        description: `Order #${orderId}`,
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              await saveOrderToBackend(orderPayload);
              finishCheckout(orderId, values, total, items);
            } else {
              alert("Payment verification failed. Please try again.");
            }
          } catch (vErr) {
            console.error("Payment verification error:", vErr);
            await saveOrderToBackend(orderPayload);
            finishCheckout(orderId, values, total, items);
          }
        },
        prefill: {
          name: values.fullName,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: "#78350f",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("❌ Checkout Error:", error);
      const errorMessage =
        error?.message === "Failed to fetch"
          ? "Could not connect to backend server on port 5000. Please ensure 'node server.js' is running!"
          : error?.message ||
            "Error processing online payment. Make sure your backend server is active and Razorpay keys are configured.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto"
    >
      <div className="space-y-4">
        {FIELD_KEYS.map(({ name, type = "text", required }) => (
          <div key={name}>
            <label
              htmlFor={`field-${name}`}
              className="block text-sm font-medium text-amber-900 mb-1"
            >
              {t(`checkout.fields.${name}`)}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
              id={`field-${name}`}
              name={name}
              type={type}
              value={(values[name] as string) ?? ""}
              onChange={(e) => handleChange(name, e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                errors[name]
                  ? "border-red-400 bg-red-50"
                  : "border-amber-200 bg-white"
              }`}
            />
            {errors[name] && (
              <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Payment Methods Section */}
      <div className="border-t border-amber-200 pt-6">
        <h3 className="text-lg font-bold text-amber-900 mb-3">
          {t("checkout.paymentMethod")}
        </h3>
        <div className="space-y-3">
          {(["upi", "card", "cod"] as const).map((method) => (
            <label
              key={method}
              className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                paymentMethod === method
                  ? "border-amber-500 bg-amber-50"
                  : "border-amber-200 bg-white hover:bg-amber-50/50"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="w-4 h-4 text-amber-600 border-amber-300 focus:ring-amber-500"
              />
              <span className="ml-3 text-sm font-medium text-amber-950">
                {t(`checkout.paymentMethods.${method}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        id="submit-checkout-btn"
        type="submit"
        disabled={submitting}
        className="w-full bg-amber-800 hover:bg-amber-900 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors mt-2 text-lg shadow-sm cursor-pointer"
      >
        {submitting ? t("checkout.placingOrder") : t("checkout.placeOrder")}
      </button>
    </form>
  );
};

export default CheckoutForm;
