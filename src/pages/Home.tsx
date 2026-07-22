import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Truck, Shield, Clock, ChevronRight, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../features/cart/store/useCartStore';
import Tilt from 'react-parallax-tilt';

/* ── Product Interface matching Backend Schema ── */
interface Product {
  _id: string;
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
}

const TESTIMONIALS = [
  { name: 'Priya S.', text: 'The Kaju Katli is absolutely divine — tastes exactly like home!', stars: 5 },
  { name: 'James R.', text: "Best brownies I've ever had. My kids devoured the whole box in minutes.", stars: 5 },
  { name: 'Anita M.', text: 'Love that everything is organic. Will definitely re-order every week.', stars: 5 },
];

/* ── Component ─────────────────────────────────────────────── */
const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const addItem = useCartStore((s) => s.addItem);

  // 👈 Dynamic state for products loaded from MongoDB
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch live products from backend
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Pick top 3 items to show on the Home page
        setFeaturedProducts(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch sweets from backend:', err);
        setLoading(false);
      });
  }, []);

  const PERKS = [
    { icon: <Truck size={28} />, title: t('home.perks.freeDelivery'), body: t('home.perks.freeDeliveryBody') },
    { icon: <Shield size={28} />, title: t('home.perks.organic'), body: t('home.perks.organicBody') },
    { icon: <Clock size={28} />, title: t('home.perks.madeToOrder'), body: t('home.perks.madeToOrderBody') },
    { icon: <Heart size={28} />, title: t('home.perks.madeWithLove'), body: t('home.perks.madeWithLoveBody') },
  ];

  return (
    <div className="bg-amber-50">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-600/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-amber-500/30 text-amber-200 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {t('home.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              {t('home.heroHeading1')}<br />
              <span className="text-amber-300">{t('home.heroHeading2')}</span>
            </h1>
            <p className="text-amber-200 text-lg mb-8 max-w-md mx-auto lg:mx-0">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                id="hero-shop-btn"
                to="/shop"
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <ShoppingBag size={18} /> {t('home.shopNow')}
              </Link>

              {!isAuthenticated ? (
                <button
                  id="hero-signup-btn"
                  onClick={() => openAuthModal('signup')}
                  className="flex items-center justify-center gap-2 border-2 border-amber-300 hover:border-amber-200 hover:bg-amber-800/50 text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
                >
                  {t('home.joinFree')} <ChevronRight size={16} />
                </button>
              ) : (
                <div className="flex items-center gap-2 border-2 border-amber-300/50 text-amber-200 px-5 py-3 rounded-xl text-sm">
                  👋 {t('home.welcomeBack')} <span className="font-bold">{user!.name}</span>!
                </div>
              )}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['A','B','C','D'].map((l) => (
                  <div key={l} className="w-8 h-8 rounded-full bg-amber-400 border-2 border-amber-800 flex items-center justify-center text-amber-900 font-bold text-xs">
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-amber-300 font-bold">2,400+</span>
                <span className="text-amber-200"> {t('home.happyCustomers')}</span>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" className="text-amber-400" />)}
                </div>
              </div>
            </div>
          </div>

          {/* Hero visual — emoji grid */}
          <Tilt className="flex-shrink-0 grid grid-cols-3 gap-4 preserve-3d perspective-1000" tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={1500}>
            {['🍫','🍪','🪙','🍮','🧁','🍭'].map((em, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 0.15}s` }}
                className="w-20 h-20 rounded-2xl bg-amber-800/60 backdrop-blur flex items-center justify-center text-4xl shadow-xl transition-all translate-z-30 cursor-default select-none"
              >
                {em}
              </div>
            ))}
          </Tilt>
        </div>
      </section>

      {/* ── PERKS STRIP ──────────────────────────────────────── */}
      <section className="bg-white border-y border-amber-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map(({ icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                {icon}
              </div>
              <h3 className="font-bold text-amber-950 text-sm">{title}</h3>
              <p className="text-xs text-amber-700 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS FROM BACKEND ─────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">{t('home.handpicked')}</p>
            <h2 className="text-3xl font-extrabold text-amber-950">{t('home.featuredSweets')}</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors">
            {t('home.viewAll')} <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10 font-bold text-amber-900">Loading delicious sweets...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredProducts.map((sweet) => {
              const isKn = i18n.language.startsWith('kn');
              const displayDesc = isKn ? (sweet.descKn || 'ತಾಜಾ ಹಾಗೂ ರುಚಿಕರವಾದ ತಿಂಡಿ.') : (sweet.desc || 'Fresh and delicious traditional treat.');
              const displayAllergen = isKn ? `ಶೇಂಗಾ, ಡೈರಿ ಇತ್ಯಾದಿ ಹೊಂದಿದೆ` : `Contains: Nuts / Dairy`;

              return (
                <Tilt
                  key={sweet._id || sweet.id}
                  className="preserve-3d"
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={1500}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                >
                  <div
                    id={`featured-card-${sweet.id}`}
                    className="group bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden h-full preserve-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Card header */}
                    <div className={`h-40 relative translate-z-20 shadow-lg ${!sweet.imageUrl ? 'bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-7xl' : ''}`}>
                      {sweet.imageUrl ? (
                        <img src={sweet.imageUrl} alt={sweet.nameEn} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        sweet.emoji || '🍬'
                      )}
                      {sweet.badge && (
                        <span className="absolute top-3 left-3 bg-amber-800 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10">
                          {sweet.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 translate-z-30">
                      <h3 className="font-bold text-amber-950 mb-1 drop-shadow-sm">{isKn ? sweet.nameKn : sweet.nameEn}</h3>
                      <p className="text-xs text-amber-600 font-medium mb-2">{isKn ? sweet.nameEn : sweet.nameKn}</p>
                      <p className="text-[10px] text-red-500 font-semibold uppercase tracking-wider mb-2">
                        ⚠ {displayAllergen}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{displayDesc}</p>
                      <div className="flex items-center justify-between translate-z-20">
                        <span className="text-xl font-extrabold text-amber-700">₹{sweet.price}</span>
                        <button
                          id={`home-add-to-cart-${sweet.id}`}
                          onClick={() => addItem({ id: sweet.id, name: isKn ? sweet.nameKn : sweet.nameEn, price: sweet.price })}
                          className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:translate-y-0.5 shadow-md active:shadow-sm"
                        >
                          <ShoppingBag size={14} /> {t('home.addToBag')}
                        </button>
                      </div>
                    </div>
                  </div>
                </Tilt>
              );
            })}
          </div>
        )}
      </section>

      {/* ── AUTH CTA BANNER ──────────────────────────────────── */}
      {!isAuthenticated && (
        <section className="max-w-6xl mx-auto px-6 pb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-800 to-amber-600 text-white px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 text-[120px] leading-none select-none pointer-events-none flex items-center justify-end pr-4">
              🍬
            </div>
            <div>
              <h2 className="text-2xl font-extrabold mb-1">{t('home.memberOffer')}</h2>
              <p className="text-amber-200 text-sm">{t('home.memberOfferSub')}</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                id="cta-signup-btn"
                onClick={() => openAuthModal('signup')}
                className="bg-amber-300 hover:bg-amber-200 text-amber-900 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                {t('home.signUpFree')}
              </button>
              <button
                id="cta-signin-btn"
                onClick={() => openAuthModal('signin')}
                className="border-2 border-amber-300 hover:bg-amber-700/50 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                {t('navbar.signIn')}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-amber-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-amber-100">{t('home.customersSay')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, text, stars }) => (
              <div key={name} className="bg-amber-800/60 rounded-2xl p-6 border border-amber-700/50">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-amber-100 text-sm leading-relaxed mb-4">"{text}"</p>
                <p className="font-bold text-amber-300 text-sm">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;