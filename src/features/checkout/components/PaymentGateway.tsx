import React from 'react';
import { Lock } from 'lucide-react';

/** 
 * Placeholder payment gateway component.
 * Replace with Stripe Elements, Razorpay, or your preferred provider's SDK.
 */
const PaymentGateway: React.FC = () => {
  return (
    <div id="payment-gateway" className="border border-amber-200 rounded-xl p-6 bg-amber-50 text-center space-y-3">
      <div className="flex items-center justify-center gap-2 text-amber-800">
        <Lock size={18} />
        <span className="font-semibold text-sm">Secure Payment</span>
      </div>
      <p className="text-xs text-amber-600">
        Payment gateway integration goes here (e.g. Stripe, Razorpay).
      </p>
    </div>
  );
};

export default PaymentGateway;
