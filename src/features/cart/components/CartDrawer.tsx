import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/useCartStore';
import CartItem from './CartItem';
import { formatCurrency } from '../../../utils/formatters';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          id="cart-drawer-backdrop"
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        id="cart-drawer"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-100">
          <h2 className="text-lg font-bold text-amber-950 flex items-center gap-2">
            <ShoppingBag size={20} />
            {t('cart.yourBag')}
          </h2>
          <button
            id="close-cart-drawer"
            aria-label="Close cart"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-amber-100 transition-colors text-amber-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-amber-400 gap-3">
              <ShoppingBag size={48} />
              <p className="font-medium">{t('cart.emptyBag')}</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-amber-100 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-amber-950">
              <span>{t('cart.total')}</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link
              id="checkout-link"
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-amber-800 hover:bg-amber-900 text-white text-center py-2.5 rounded-lg font-semibold transition-colors"
            >
              {t('cart.proceedToCheckout')}
            </Link>
            <button
              id="clear-cart-btn"
              onClick={clearCart}
              className="w-full text-sm text-red-400 hover:text-red-600 transition-colors"
            >
              {t('cart.clearBag')}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
