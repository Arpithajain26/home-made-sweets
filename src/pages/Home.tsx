import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Truck, ShieldCheck, Clock, Lock, ChevronRight, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../features/cart/store/useCartStore';
import HeroSlider from '../components/home/HeroSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import MoodSelector from '../components/home/MoodSelector';
import { SWEETS_CATALOG } from '../data/catalog';

interface Product {
  _id?: string;
  id: string;
  nameEn: string;
  nameKn: string;
  price: number;
  category: string;
  imageUrl?: string;
  emoji?: string;
  badge?: string;
  desc?: string;
  descKn?: string;
  allergen?: string;
  rating?: number;
}

const TESTIMONIALS = [
  {
    name: 'Meenakshi Sundaram',
    location: 'Bengaluru',
    text: 'The Shenga Undi (Peanut Ladoo) was mindblowing! Soft, aromatic with cardamom & jaggery, tasting just like homemade.',
    stars: 5,
    verified: 'Verified Buyer',
  },
  {
    name: 'Anand K. Rao',
    location: 'Bengaluru',
    text: 'The Chakkuli and Shankarapali were so crisp and delicious! My family finished the entire box in one evening.',
    stars: 5,
    verified: 'Verified Buyer',
  },
  {
    name: 'Deepa S.',
    location: 'Mysuru',
    text: 'Ordered Shenga Holige and Rave Undi for Diwali. Fresh aroma, pure ghee taste, and perfect packaging.',
    stars: 5,
    verified: 'Verified Buyer',
  },
];

const Home: React.FC = () => {
  const { i18n } = useTranslation();
  const { isAuthenticated, openAuthModal } = useAuth();
  const addItem = useCartStore((s) => s.addItem);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch live products from backend with catalog fallback
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(SWEETS_CATALOG as Product[]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log('Using local catalog fallback for sweets:', err);
        setProducts(SWEETS_CATALOG as Product[]);
        setLoading(false);
      });
  }, []);

  const PERKS = [
    {
      icon: <Truck size={24} />,
      title: 'Free Express Shipping',
      body: 'On all orders above ₹499. Fresh batch dispatched within 24h.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: '100% Pure Cow Ghee',
      body: 'Made with fresh Western Ghats milk & natural organic jaggery.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Made Fresh to Order',
      body: 'Small batch preparation — never mass factory produced.',
    },
    {
      icon: <Award size={24} />,
      title: 'Air-Sealed Freshness',
      body: 'Vacuum aroma lock pouches retain crispiness for 60+ days.',
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#2C1609]">

      {/* ── HERO SLIDER (Screenshots 1 & 2 Template) ───────────────── */}
      <HeroSlider />

      {/* ── PERKS STRIP ("Why 1,00,000+ Families Choose Us") ─────────── */}
      <section className="bg-[#F6EDE2] border-b border-[#EAD7C0] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#EAD7C0] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8D4E20] text-white flex items-center justify-center shrink-0 shadow-md">
                {icon}
              </div>
              <div>
                <h3 className="font-extrabold text-[#351608] text-sm font-heritage">{title}</h3>
                <p className="text-xs text-[#6B3615] leading-relaxed mt-0.5">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP BY CATEGORY GRID ───────────────────────────────────── */}
      <CategoryGrid />

      {/* ── SHOP BY MOOD SELECTOR ───────────────────────────────────── */}
      <MoodSelector />

      {/* ── FEATURED HANDPICKED SWEETS & SNACKS ────────────────────── */}
      <section className="bg-[#4D230D] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4 border-b border-[#6B3615] pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8D2AC]">
                FRESH FROM OUR KITCHEN
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heritage mt-1">
                Handpicked Bestsellers
              </h2>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-1.5 text-sm font-bold text-[#E8D2AC] hover:text-white transition-colors"
            >
              View All ({products.length}) <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 font-bold text-[#E8D2AC]">
              Loading fresh homemade treats...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((sweet) => {
                const isKn = i18n.language.startsWith('kn');
                const displayTitle = isKn ? sweet.nameKn : sweet.nameEn;
                const displayDesc = isKn
                  ? sweet.descKn || 'ತಾಜಾ ಹಾಗೂ ರುಚಿಕರವಾದ ಮನೆಮಾಡಿದ ತಿಂಡಿ.'
                  : sweet.desc || 'Handcrafted traditional recipe prepared fresh daily.';

                return (
                  <div
                    key={sweet._id || sweet.id}
                    id={`featured-card-${sweet.id}`}
                    className="bg-[#351608] rounded-3xl border border-[#6B3615] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
                  >
                    {/* Card Header Image */}
                      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#4D230D] to-[#351608] flex items-center justify-center">
                        {sweet.imageUrl ? (
                          <img
                            src={sweet.imageUrl}
                            alt={sweet.nameEn}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-7xl select-none">{sweet.emoji || '🍬'}</span>
                        )}

                        {sweet.badge && (
                          <span className="absolute top-3 left-3 bg-[#E07A5F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                            {sweet.badge}
                          </span>
                        )}

                        <div className="absolute top-3 right-3 bg-[#4D230D]/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-[#6B3615]">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span>{sweet.rating || 4.8}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-extrabold text-white text-lg font-heritage">
                              {displayTitle}
                            </h3>
                          </div>

                          <p className="text-xs text-[#D8B48F] font-semibold mb-2">
                            {isKn ? sweet.nameEn : sweet.nameKn}
                          </p>

                          <p className="text-[11px] text-[#AB682F] font-bold tracking-wide uppercase mb-3 flex items-center gap-1">
                            ⚠ Allergen: {sweet.allergen || 'Contains Nuts / Dairy'}
                          </p>

                          <p className="text-xs text-[#E8D2AC] leading-relaxed mb-6 line-clamp-2">
                            {displayDesc}
                          </p>
                        </div>

                        {/* Card Footer Price & Add */}
                        <div className="pt-4 border-t border-[#4D230D] flex items-center justify-between">
                          <div>
                            <span className="text-xs text-[#D8B48F] block font-medium">Price</span>
                            <span className="text-2xl font-black text-white">₹{sweet.price}</span>
                          </div>

                          {isAuthenticated ? (
                            <button
                              id={`home-add-to-cart-${sweet.id}`}
                              onClick={() =>
                                addItem({
                                  id: sweet.id,
                                  name: displayTitle,
                                  price: sweet.price,
                                })
                              }
                              className="bg-[#8D4E20] hover:bg-[#AB682F] text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                            >
                              <ShoppingBag size={14} /> Add to Bag
                            </button>
                          ) : (
                            <button
                              id={`home-auth-to-add-${sweet.id}`}
                              onClick={() => openAuthModal('signin')}
                              className="bg-[#4D230D] hover:bg-[#6B3615] text-[#E8D2AC] text-xs font-bold px-4 py-2.5 rounded-xl border border-[#8D4E20] flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <Lock size={14} /> Sign In to Buy
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS & SOCIAL PROOF ─────────────────────────── */}
      <section className="bg-[#4D230D] text-[#FDFBF7] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8D2AC]">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heritage mt-1">
              Loved By 1,00,000+ Families
            </h2>
            <p className="text-xs text-[#D8B48F] mt-2">
              Here is what our customers say about our authentic regional taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="bg-[#351608] rounded-3xl p-6 border border-[#6B3615] shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#FDFBF7] leading-relaxed italic mb-6">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#4D230D] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#E8D2AC]">{item.name}</h4>
                    <p className="text-[10px] text-[#D8B48F]">{item.location}</p>
                  </div>
                  <span className="bg-[#6B3615] text-[#E8D2AC] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D8B48F]/20">
                    ✓ {item.verified}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;