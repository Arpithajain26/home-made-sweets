import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type CartItem as CartItemType, useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../../../utils/formatters';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-3 py-3 border-b border-amber-100 last:border-0">
      {/* Placeholder icon when no image */}
      <div className="w-14 h-14 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <ShoppingBag size={24} className="text-amber-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-amber-950 text-sm truncate">{item.name}</p>
        <p className="text-amber-700 text-sm">{formatCurrency(item.price)}</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-1">
          <button
            id={`decrease-qty-${item.id}`}
            aria-label="Decrease quantity"
            onClick={() =>
              item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, item.quantity - 1)
            }
            className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm flex items-center justify-center transition-colors"
          >
            −
          </button>
          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
          <button
            id={`increase-qty-${item.id}`}
            aria-label="Increase quantity"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Line total + remove */}
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-amber-800 text-sm">{formatCurrency(item.price * item.quantity)}</p>
        <button
          id={`remove-item-${item.id}`}
          aria-label="Remove item"
          onClick={() => removeItem(item.id)}
          className="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors"
        >
          {t('cart.remove')}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
