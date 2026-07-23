import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../cart/store/useCartStore';
import { useAuth } from '../../../context/AuthContext';
import { SWEETS_CATALOG } from '../../../data/catalog';
import { Star, Search, Lock } from 'lucide-react';

const CATEGORY_LABEL_EN: Record<string, string> = {
  all: 'All Products',
  sweet: '🍬 Sweets — ಲಡ್ಡು ಮತ್ತು ಸಿಹಿ ತಿಂಡಿಗಳು',
  savory: '🌶️ Savory — ಖಾರ ಮತ್ತು ಸವಿಯಾದ ತಿಂಡಿಗಳು',
};
const CATEGORY_LABEL_KN: Record<string, string> = {
  all: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು',
  sweet: '🍬 ಲಡ್ಡು ಮತ್ತು ಸಿಹಿ ತಿಂಡಿಗಳು',
  savory: '🌶️ ಖಾರ ಮತ್ತು ಸವಿಯಾದ ತಿಂಡಿಗಳು',
};

const ProductGrid: React.FC = () => {
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated, openAuthModal } = useAuth();
  const isKn = i18n.language.startsWith('kn');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sweet' | 'savory'>('all');

  const categories = ['sweet', 'savory'] as const;

  const filteredCatalog = SWEETS_CATALOG.filter((sweet) => {
    // Filter by category
    if (selectedCategory !== 'all' && sweet.category !== selectedCategory) return false;
    
    // Filter by search query
    if (searchQuery.trim() === '') return true;
    const query = searchQuery.toLowerCase();
    return (
      sweet.nameEn.toLowerCase().includes(query) ||
      sweet.nameKn.toLowerCase().includes(query) ||
      sweet.labelEn.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10 space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#FDFBF7] p-5 rounded-3xl shadow-sm border border-[#EAD7C0]">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder={t('shop.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#D8B48F] rounded-xl bg-white text-sm text-[#351608] focus:outline-none focus:ring-2 focus:ring-[#8D4E20]"
          />
          <Search className="absolute left-3 top-3 text-[#8D4E20]" size={18} />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {(['all', 'sweet', 'savory'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8D4E20] text-white shadow-md'
                  : 'bg-[#F6EDE2] text-[#351608] hover:bg-[#EAD7C0] border border-[#D8B48F]/50'
              }`}
            >
              {t(`shop.categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {categories.map((cat) => {
        // Only render the category section if it's selected or 'all' is selected
        if (selectedCategory !== 'all' && selectedCategory !== cat) return null;

        const items = filteredCatalog.filter((s) => s.category === cat);
        if (items.length === 0) return null; // Don't show empty categories

        const catLabel = isKn ? CATEGORY_LABEL_KN[cat] : CATEGORY_LABEL_EN[cat];

        return (
          <div key={cat} className="space-y-6">
            {/* Category heading */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-amber-950 tracking-tight">{catLabel}</h2>
              <div className="flex-1 h-px bg-amber-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((sweet) => {
                const displayDesc = isKn ? sweet.descKn : sweet.desc;
                const displayAllergen = isKn ? sweet.allergenKn : `Contains: ${sweet.allergen}`;

                return (
                  <div
                    key={sweet.id}
                    id={`product-card-${sweet.id}`}
                    className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Card visual */}
                    <div className={`h-36 relative ${!sweet.imageUrl ? 'flex items-center justify-center text-7xl' : ''} ${
                      cat === 'sweet'
                        ? 'bg-gradient-to-br from-amber-100 to-amber-200'
                        : 'bg-gradient-to-br from-red-50 to-orange-100'
                    }`}>
                      {sweet.imageUrl ? (
                        <img src={sweet.imageUrl} alt={sweet.nameEn} className="w-full h-full object-cover" />
                      ) : (
                        sweet.emoji
                      )}
                      {sweet.badge && (
                        <span className="absolute top-3 left-3 bg-amber-800 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10">
                          {sweet.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {/* Name & Rating Header */}
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-amber-950 text-sm leading-snug">
                            {isKn ? sweet.nameKn : sweet.labelEn}
                          </h3>
                          <p className="text-xs text-amber-600 font-medium">
                            {isKn ? sweet.nameEn : sweet.nameKn}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-bold text-amber-900 border border-amber-100">
                            <Star size={12} className="text-amber-500 fill-amber-500" />
                            {sweet.rating}
                          </div>
                          <span className="text-[10px] text-gray-400 mt-0.5">({sweet.reviewsCount} {t('shop.reviews')})</span>
                        </div>
                      </div>

                      {/* Allergen */}
                      <p className="text-[10px] text-red-500 font-semibold uppercase tracking-wider mt-2 mb-2">
                        ⚠ {displayAllergen}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-gray-600 leading-relaxed flex-1 mb-4">
                        {displayDesc}
                      </p>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-amber-50">
                        <span className="text-lg font-extrabold text-amber-700">₹{sweet.price}</span>
                        {isAuthenticated ? (
                          <button
                            id={`add-to-cart-${sweet.id}`}
                            onClick={() => addItem({ id: sweet.id, name: isKn ? sweet.nameKn : sweet.labelEn, price: sweet.price })}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-white shadow-sm ${
                              cat === 'sweet'
                                ? 'bg-amber-800 hover:bg-amber-900'
                                : 'bg-red-700 hover:bg-red-800'
                            }`}
                          >
                            {t('shop.addToBag')}
                          </button>
                        ) : (
                          <button
                            id={`auth-to-add-${sweet.id}`}
                            onClick={() => openAuthModal('signin')}
                            className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-amber-300 shadow-sm"
                          >
                            <Lock size={14} /> Login to Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      
      {filteredCatalog.length === 0 && (
        <div className="text-center py-12 text-amber-700">
           <p className="text-lg font-semibold mb-2">No products found.</p>
           <p className="text-sm">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;