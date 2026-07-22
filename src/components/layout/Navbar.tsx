import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LogIn, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../features/cart/store/useCartStore';
import CartDrawer from '../../features/cart/components/CartDrawer';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [cartOpen, setCartOpen] = useState(false);
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  return (
    <>
      <nav className="bg-amber-900 text-amber-50 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-xl font-bold tracking-wide hover:text-amber-200 transition-colors">
            🍬 SweetDelights
          </Link>

          {/* Links + actions */}
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-amber-200 transition-colors font-medium text-sm hidden sm:block">
              {t('navbar.home')}
            </Link>
            <Link to="/shop" className="hover:text-amber-200 transition-colors font-medium text-sm hidden sm:block">
              {t('navbar.shop')}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-amber-800 px-3 py-1.5 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-300 flex items-center justify-center text-amber-900 font-bold text-xs uppercase">
                    {user!.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">{user!.name}</span>
                </div>
                <button
                  id="logout-btn"
                  aria-label="Sign out"
                  onClick={logout}
                  title={t('navbar.logout')}
                  className="p-2 rounded-lg hover:bg-amber-800 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="signin-btn"
                  onClick={() => openAuthModal('signin')}
                  className="flex items-center gap-1.5 text-sm font-semibold hover:text-amber-200 transition-colors"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:block">{t('navbar.signIn')}</span>
                </button>
                <button
                  id="signup-btn"
                  onClick={() => openAuthModal('signup')}
                  className="flex items-center gap-1.5 bg-amber-200 hover:bg-amber-100 text-amber-900 text-sm font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <User size={14} />
                  <span className="hidden sm:block">{t('navbar.signUp')}</span>
                </button>
              </div>
            )}

            {/* Cart */}
            <button
              id="open-cart-btn"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded-lg transition-colors"
            >
              <ShoppingBag size={18} />
              <span className="font-semibold text-sm">{t('navbar.bag')}</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;