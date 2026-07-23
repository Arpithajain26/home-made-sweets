import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';
import { useCartStore } from '../../cart/store/useCartStore';
import { useAuth } from '../../../context/AuthContext';
import { formatCurrency } from '../../../utils/formatters';
import Tilt from 'react-parallax-tilt';

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
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <Tilt
      className="preserve-3d"
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
    >
      <div
        id={`product-card-${id}`}
        className="group bg-white rounded-xl shadow-md border border-amber-100 p-5 flex flex-col justify-between h-full preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {imageUrl && (
          <div className="overflow-hidden rounded-lg mb-3 translate-z-20 shadow-lg">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        <div className="translate-z-30">
          <h3 className="text-lg font-bold text-amber-950 mb-1 drop-shadow-sm">{name}</h3>
          {allergen && (
            <p className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-2">{allergen}</p>
          )}
          {description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-amber-50 translate-z-20">
          <span className="text-xl font-bold text-amber-700">{formatCurrency(price)}</span>
          {isAuthenticated ? (
            <button
              id={`add-to-cart-${id}`}
              onClick={() => addItem({ id, name, price })}
              className="bg-amber-800 hover:bg-amber-900 hover:translate-y-0.5 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:shadow-sm"
            >
              {t('shop.addToBag')}
            </button>
          ) : (
            <button
              id={`auth-to-add-${id}`}
              onClick={() => openAuthModal('signin')}
              className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-amber-300"
            >
              <Lock size={14} /> Login to Add
            </button>
          )}
        </div>
      </div>
    </Tilt>
  );
};

export default ProductCard;
