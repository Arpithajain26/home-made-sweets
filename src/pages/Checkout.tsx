import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';
import CheckoutForm from '../features/checkout/components/CheckoutForm';
import { useCartStore } from '../features/cart/store/useCartStore';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const { items, getTotalPrice } = useCartStore();
  const { isAuthenticated, openAuthModal } = useAuth();
  const total = getTotalPrice();

  if (!isAuthenticated) {
    return (
      <div className="py-20 px-4 bg-amber-50 min-h-[70vh] flex flex-col items-center justify-center text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
          <Lock size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-amber-950">Authentication Required</h1>
        <p className="text-amber-800 max-w-md">Please sign in or create an account to view items and complete your order.</p>
        <button
          onClick={() => openAuthModal('signin')}
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md"
        >
          Sign In to Continue
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 bg-amber-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-amber-950 mb-8 text-center">{t('checkout.title')}</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-amber-700 text-lg font-medium">{t('checkout.emptyBag')}</p>
            <Link to="/shop" className="inline-block bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              {t('checkout.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Delivery details */}
            <section>
              <h2 className="text-xl font-bold text-amber-900 mb-4">{t('checkout.deliveryDetails')}</h2>
              <CheckoutForm />
            </section>

            {/* Order summary */}
            <section>
              <h2 className="text-xl font-bold text-amber-900 mb-4">{t('checkout.orderSummary')}</h2>
              <div className="bg-white rounded-xl border border-amber-100 p-5 space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-amber-900">{item.name} × {item.quantity}</span>
                    <span className="font-semibold text-amber-800">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-amber-100 pt-3 flex justify-between font-bold text-amber-950">
                  <span>{t('checkout.total')}</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;