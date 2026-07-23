import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Truck
} from 'lucide-react';
import { useCartStore } from '../../features/cart/store/useCartStore';
import CartDrawer from '../../features/cart/components/CartDrawer';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from '../common/LanguageSwitcher';
import TrackOrderModal from '../modals/TrackOrderModal';
import DistributorModal from '../modals/DistributorModal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackOrderOpen, setTrackOrderOpen] = useState(false);
  const [distributorModalOpen, setDistributorModalOpen] = useState(false);
  const [distributorTitle, setDistributorTitle] = useState('Distributors Enquiry');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown states
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [moodDropdown, setMoodDropdown] = useState(false);

  const openDistributor = (titleText: string) => {
    setDistributorTitle(titleText);
    setDistributorModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-[#FAF6F0] border-b border-[#EAD7C0] sticky top-0 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* BRAND LOGO — Desi Snack House / SweetDelights */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8D4E20] to-[#4D230D] p-1 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center border-2 border-[#D8B48F]">
              <span className="text-2xl select-none">🪔</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#351608] font-heritage leading-none uppercase">
                DESI SNACK HOUSE
              </span>
              <span className="text-[10px] font-bold text-[#8D4E20] tracking-widest uppercase mt-0.5">
                Authentic Homemade Sweets & Snacks
              </span>
            </div>
          </Link>

          {/* DESKTOP MAIN NAVIGATION MENU */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-semibold text-[#351608]">
            
            {/* Home */}
            <Link to="/" className="hover:text-[#8D4E20] transition-colors py-2">
              Home
            </Link>

            {/* Shop By Category Dropdown */}
            <div
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => setCategoryDropdown(true)}
              onMouseLeave={() => setCategoryDropdown(false)}
            >
              <div className="flex items-center gap-1 hover:text-[#8D4E20] transition-colors">
                <span>Shop By Category</span>
                <ChevronDown size={14} className={`transition-transform ${categoryDropdown ? 'rotate-180' : ''}`} />
              </div>

              {categoryDropdown && (
                <div className="absolute top-full left-0 w-60 bg-[#FDFBF7] border border-[#EAD7C0] rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                  <Link
                    to="/shop?category=sweet"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F6EDE2] text-[#351608] text-xs font-semibold"
                  >
                    <span>🍬</span> Traditional Sweets (Paalkova, Mysurpa)
                  </Link>
                  <Link
                    to="/shop?category=savory"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F6EDE2] text-[#351608] text-xs font-semibold"
                  >
                    <span>🌀</span> Kai Murukku & Savories
                  </Link>
                  <Link
                    to="/shop?category=chips"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F6EDE2] text-[#351608] text-xs font-semibold"
                  >
                    <span>🍌</span> Nagercoil Banana Chips
                  </Link>
                  <Link
                    to="/shop?category=gifting"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F6EDE2] text-[#351608] text-xs font-semibold"
                  >
                    <span>🎁</span> Luxury Festive Gift Boxes
                  </Link>
                </div>
              )}
            </div>

            {/* Shop by Mood Dropdown */}
            <div
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => setMoodDropdown(true)}
              onMouseLeave={() => setMoodDropdown(false)}
            >
              <div className="flex items-center gap-1 hover:text-[#8D4E20] transition-colors">
                <span>Shop by Mood</span>
                <ChevronDown size={14} className={`transition-transform ${moodDropdown ? 'rotate-180' : ''}`} />
              </div>

              {moodDropdown && (
                <div className="absolute top-full left-0 w-56 bg-[#FDFBF7] border border-[#EAD7C0] rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                  <Link
                    to="/shop?mood=teatime"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F6EDE2] text-[#351608] text-xs font-semibold"
                  >
                    <span>☕</span> Tea Time Munchies
                  </Link>
                  <Link
                    to="/shop?mood=party"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F6EDE2] text-[#351608] text-xs font-semibold"
                  >
                    <span>🎉</span> Party Snacks
                  </Link>
                  <Link
                    to="/shop?mood=midnight"
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F6EDE2] text-[#351608] text-xs font-semibold"
                  >
                    <span>🌙</span> Midnight Cravings
                  </Link>
                </div>
              )}
            </div>

            {/* Bulk Orders */}
            <button
              onClick={() => openDistributor('Bulk & Corporate Gifting Orders')}
              className="hover:text-[#8D4E20] transition-colors py-2 text-left"
            >
              Bulk Orders
            </button>

            {/* Track Order */}
            <button
              onClick={() => setTrackOrderOpen(true)}
              className="hover:text-[#8D4E20] transition-colors py-2 flex items-center gap-1 text-left"
            >
              <Truck size={14} /> Track Order
            </button>

            {/* Contact Us */}
            <a href="#contact-footer" className="hover:text-[#8D4E20] transition-colors py-2">
              Contact Us
            </a>

            {/* Distributors Enquiry */}
            <button
              onClick={() => openDistributor('Distributors & Wholesale Enquiry')}
              className="hover:text-[#8D4E20] transition-colors py-2 text-left"
            >
              Distributors Enquiry
            </button>

            {/* Start Your Business With ISH */}
            <button
              onClick={() => openDistributor('Start Your Business With ISH')}
              className="bg-[#8D4E20] hover:bg-[#6B3615] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm hover:scale-105"
            >
              Start Business
            </button>
          </div>

          {/* RIGHT UTILITY ICONS (Search, Profile, Cart) */}
          <div className="flex items-center gap-3">
            
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#351608] hover:text-[#8D4E20] hover:bg-[#F6EDE2] rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User Profile / Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-[#F6EDE2] border border-[#EAD7C0] px-3 py-1.5 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-[#8D4E20] text-white flex items-center justify-center font-bold text-xs">
                    {user!.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-[#351608] hidden sm:block truncate max-w-[90px]">
                    {user!.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-[#8D4E20] hover:bg-[#F6EDE2] rounded-xl transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="p-2 text-[#351608] hover:text-[#8D4E20] hover:bg-[#F6EDE2] rounded-full transition-colors flex items-center gap-1"
                aria-label="User Account"
              >
                <User size={20} />
              </button>
            )}

            {/* Cart / Shopping Bag Button */}
            <button
              id="open-cart-btn"
              onClick={() => setCartOpen(true)}
              className="relative bg-[#351608] hover:bg-[#4D230D] text-[#FDFBF7] p-2.5 rounded-xl transition-all flex items-center gap-2 shadow-md hover:scale-105"
            >
              <ShoppingBag size={20} />
              <span className="hidden sm:inline font-bold text-xs">Bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E07A5F] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#351608] hover:bg-[#F6EDE2] rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* EXPANDABLE SEARCH OVERLAY */}
        {searchOpen && (
          <div className="border-t border-[#EAD7C0] bg-[#FDFBF7] py-3 px-6 animate-fade-in">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-2">
              <input
                type="text"
                autoFocus
                placeholder="Search Paalkova, Banana Chips, Murukku, Holige..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white border border-[#D8B48F] rounded-xl px-4 py-2 text-sm text-[#351608] focus:outline-none focus:ring-2 focus:ring-[#8D4E20]"
              />
              <button
                type="submit"
                className="bg-[#8D4E20] hover:bg-[#6B3615] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* MOBILE MENU NAV */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAD7C0] bg-[#FDFBF7] px-4 py-4 space-y-3 font-semibold text-sm text-[#351608]">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Home
            </Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2">
              Shop By Category
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDistributor('Bulk & Corporate Gifting');
              }}
              className="block w-full text-left py-2"
            >
              Bulk Orders
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setTrackOrderOpen(true);
              }}
              className="block w-full text-left py-2 flex items-center gap-2 text-[#8D4E20]"
            >
              <Truck size={16} /> Track Order
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDistributor('Distributors Enquiry');
              }}
              className="block w-full text-left py-2"
            >
              Distributors Enquiry
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDistributor('Start Your Business With ISH');
              }}
              className="block w-full text-left py-2 font-bold text-[#8D4E20]"
            >
              Start Your Business With ISH
            </button>
          </div>
        )}
      </nav>

      {/* MODALS */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <TrackOrderModal isOpen={trackOrderOpen} onClose={() => setTrackOrderOpen(false)} />
      <DistributorModal
        isOpen={distributorModalOpen}
        onClose={() => setDistributorModalOpen(false)}
        title={distributorTitle}
      />
    </>
  );
};

export default Navbar;