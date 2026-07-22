import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../cart/store/useCartStore';
import { formatCurrency } from '../../../utils/formatters';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  allergen?: string;
  imageUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, description, allergen, imageUrl }) => {
  const { t } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      id={`product-card-${id}`}
      className="group bg-white rounded-xl shadow-sm border border-amber-100 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {imageUrl && (
        <div className="overflow-hidden rounded-lg mb-3">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-amber-950 mb-1">{name}</h3>
        {allergen && (
          <p className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-2">{allergen}</p>
        )}
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-amber-50">
        <span className="text-xl font-bold text-amber-700">{formatCurrency(price)}</span>
        <button
          id={`add-to-cart-${id}`}
          onClick={() => addItem({ id, name, price })}
          className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {t('shop.addToBag')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
