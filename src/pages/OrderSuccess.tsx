import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const { t } = useTranslation();
  const [whatsappLink, setWhatsappLink] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Read the stored whatsapp link and order ID
    const link = sessionStorage.getItem('lastOrderWhatsappLink');
    const id = sessionStorage.getItem('lastOrderId');
    if (link) setWhatsappLink(link);
    if (id) setOrderId(id);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-20 px-4 bg-amber-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-amber-100 text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <CheckCircle2 size={64} />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-amber-950 mb-2">
            {t('orderSuccess.title')}
          </h1>
          {orderId && (
            <p className="text-sm font-semibold text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-full mb-4">
              {t('orderSuccess.orderNumber')}: {orderId}
            </p>
          )}
          <p className="text-gray-600 leading-relaxed">
            {t('orderSuccess.subtitle')}
          </p>
        </div>

        {whatsappLink && (
          <div className="pt-4 pb-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 px-6 rounded-xl transition-transform hover:scale-105 shadow-md"
            >
              <MessageCircle size={24} />
              {t('orderSuccess.whatsappBtn')}
            </a>
            <p className="text-xs text-gray-500 mt-4">
              {t('orderSuccess.details')}
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-amber-100">
          <Link
            to="/shop"
            className="text-amber-800 hover:text-amber-950 font-semibold text-sm transition-colors"
          >
            ← {t('checkout.continueShopping')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
