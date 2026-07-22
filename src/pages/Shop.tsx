import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../features/products/components/ProductGrid';

const Shop: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-8 bg-amber-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-amber-950 tracking-tight">{t('shop.title')}</h1>
        <p className="text-amber-800 mt-2">{t('shop.subtitle')}</p>
      </div>
      <ProductGrid />
    </div>
  );
};

export default Shop;