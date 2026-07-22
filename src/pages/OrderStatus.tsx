import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface OrderStatusProps {
  orderId?: string;
  userPhone?: string;
  items?: Array<{ name: string; nameKn?: string; quantity: number }>;
  totalAmount?: number;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  orderId = "ORD-40983",
  userPhone = "",
  items = [],
  totalAmount = 0,
}) => {
  const { t, i18n } = useTranslation();
  const isKannada = i18n.language.startsWith("kn");

  // 1. Calculate Delivery Date (3 to 5 days from today)
  const today = new Date();
  const minDeliveryDate = new Date(today);
  minDeliveryDate.setDate(today.getDate() + 3);

  const maxDeliveryDate = new Date(today);
  maxDeliveryDate.setDate(today.getDate() + 5);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  const formattedMinDate = minDeliveryDate.toLocaleDateString(
    isKannada ? "kn-IN" : "en-US",
    options,
  );
  const formattedMaxDate = maxDeliveryDate.toLocaleDateString(
    isKannada ? "kn-IN" : "en-US",
    options,
  );

  const deliveryRange = `${formattedMinDate} - ${formattedMaxDate}`;

  // 2. Build the WhatsApp Pre-filled Confirmation Message
  const shopWhatsAppNumber = "8792008746"; // 👈 Put your shop's actual WhatsApp phone number here (with country code, no + or spaces)

  const whatsappMessage = encodeURIComponent(
    isKannada
      ? `ನಮಸ್ಕಾರ! ನನ್ನ ಆರ್ಡರ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ ✅\n\n🆔 ಆರ್ಡರ್ ಐಡಿ: #${orderId}\n📅 ಅಂದಾಜು ತಲುಪುವ ದಿನಾಂಕ: ${deliveryRange}\n💰 ಒಟ್ಟು ಮೊತ್ತ: ₹${totalAmount}\n\nದಯವಿಟ್ಟು ನನ್ನ ಆರ್ಡರ್ ಅನ್ನು ಸಂಸ್ಕರಿಸಿ!`
      : `Hello! My order is confirmed ✅\n\n🆔 Order ID: #${orderId}\n📅 Estimated Delivery Date: ${deliveryRange}\n💰 Total Amount: ₹${totalAmount}\n\nPlease process my homemade treats!`,
  );

  const whatsappLink = `https://wa.me/${shopWhatsAppNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-amber-50">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center border border-amber-100">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={40} />
        </div>

        {/* Confirmed Header */}
        <h1 className="text-3xl font-extrabold text-amber-950 mb-2">
          {isKannada ? "ಆರ್ಡರ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ! 🎉" : "Order Confirmed! 🎉"}
        </h1>

        {/* Order ID Badge */}
        <div className="inline-block bg-amber-100 text-amber-900 font-bold px-4 py-1 rounded-full text-sm mb-4">
          {isKannada ? `ಆರ್ಡರ್ ಸಂಖ್ಯೆ: ${orderId}` : `Order: ${orderId}`}
        </div>

        {/* Delivery Date Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 my-4">
          <p className="text-xs uppercase font-bold tracking-wider text-emerald-800">
            {isKannada ? "ಅಂದಾಜು ತಲುಪುವ ದಿನಾಂಕ" : "Estimated Delivery Date"}
          </p>
          <p className="text-xl font-extrabold text-emerald-900 mt-1">
            {deliveryRange}
          </p>
        </div>

        {/* Info Text */}
        <p className="text-gray-600 text-sm mb-6">
          {isKannada
            ? "ನಿಮ್ಮ ಆರ್ಡರ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ. ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಅಪ್‌ಡೇಟ್ ಪಡೆಯಲು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ."
            : "Your order has been confirmed. Click below to connect with us on WhatsApp for live tracking updates."}
        </p>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-1.011z" />
          </svg>
          {isKannada
            ? "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಅಪ್‌ಡೇಟ್ ಪಡೆಯಿರಿ"
            : "Get Updates on WhatsApp"}
        </a>
      </div>
    </div>
  );
};

export default OrderStatus;
