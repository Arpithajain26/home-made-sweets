import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Heart } from 'lucide-react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact-footer" className="bg-[#220C04] text-[#FDFBF7] border-t-4 border-[#8D4E20] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4D230D]">
        
        {/* Column 1: Brand & Bio (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8D4E20] text-white flex items-center justify-center font-bold text-xl">
              🪔
            </div>
            <div>
              <span className="text-xl font-black font-heritage tracking-wide uppercase text-[#E8D2AC]">
                DESI SNACK HOUSE
              </span>
              <p className="text-[10px] text-[#D8B48F] uppercase tracking-widest">
                Traditional Sweets & Snacks
              </p>
            </div>
          </div>

          <p className="text-xs text-[#D8B48F] leading-relaxed max-w-sm">
            Handcrafted with 100% pure cow ghee, organic jaggery, and ethically sourced spices. Bringing authentic regional recipes straight from South Indian kitchens to your home.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-9 h-9 rounded-full bg-[#4D230D] hover:bg-[#8D4E20] text-[#D8B48F] hover:text-white flex items-center justify-center transition-colors">
              <span className="font-bold text-[10px]">FB</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#4D230D] hover:bg-[#8D4E20] text-[#D8B48F] hover:text-white flex items-center justify-center transition-colors">
              <span className="font-bold text-[10px]">IG</span>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#E8D2AC] font-heritage">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-[#D8B48F]">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home Page</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">Shop All Sweets & Savories</Link>
            </li>
            <li>
              <Link to="/shop?category=sweet" className="hover:text-white transition-colors">Srivilliputhur Paalkova</Link>
            </li>
            <li>
              <Link to="/shop?category=chips" className="hover:text-white transition-colors">Nagercoil Banana Chips</Link>
            </li>
            <li>
              <Link to="/shop?category=savory" className="hover:text-white transition-colors">Karaikudi Kai Murukku</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Support (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#E8D2AC] font-heritage">
            Help & Contact
          </h4>
          <ul className="space-y-2.5 text-xs text-[#D8B48F]">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-[#AB682F]" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-[#AB682F]" /> support@desisnackhouse.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-[#AB682F] shrink-0 mt-0.5" />
              <span>Bengaluru & Madurai Kitchens, India</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Sign-up (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#E8D2AC] font-heritage">
            Get 15% Off First Order
          </h4>
          <p className="text-xs text-[#D8B48F]">
            Subscribe for festive discount codes & fresh batch drop alerts.
          </p>

          {subscribed ? (
            <div className="bg-[#4D230D] border border-[#8D4E20] p-3 rounded-xl text-xs text-emerald-400 font-bold">
              🎉 Thank you for subscribing! Check your inbox for 15% OFF code.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#351608] border border-[#6B3615] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#D8B48F]/50 focus:outline-none focus:ring-1 focus:ring-[#8D4E20]"
              />
              <button
                type="submit"
                className="w-full bg-[#8D4E20] hover:bg-[#AB682F] text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send size={12} /> Subscribe Now
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8B48F]">
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} Desi Snack House (ISH). Crafting authentic sweets with <Heart size={12} className="text-red-500 fill-current inline" />
        </p>
        <div className="flex items-center gap-3">
          <span className="bg-[#351608] px-2.5 py-1 rounded text-[10px] font-bold border border-[#4D230D]">UPI / QR</span>
          <span className="bg-[#351608] px-2.5 py-1 rounded text-[10px] font-bold border border-[#4D230D]">Visa / Mastercard</span>
          <span className="bg-[#351608] px-2.5 py-1 rounded text-[10px] font-bold border border-[#4D230D]">COD Available</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;