import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, Copy, Check, Sparkles } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('CRUNCH10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative overflow-hidden min-h-[540px] flex items-center shadow-lg">
      
      {/* ── SLIDE 1: BOLD & REAL FLAVOURS ONLY! (Screenshot 1 Theme) ── */}
      {currentSlide === 0 && (
        <div className="w-full bg-[#1c110a] text-[#FDFBF7] py-14 px-6 sm:px-12 transition-all duration-700 animate-fade-in relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#AB682F]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#E07A5F]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-[#8D4E20]/40 border border-[#D8B48F]/40 text-[#E8D2AC] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm">
                <Sparkles size={14} className="text-[#E8D2AC]" /> Authentic Regional Taste
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heritage leading-[1.1] text-[#F3A738] tracking-tight uppercase drop-shadow-md">
                BOLD & REAL<br />
                <span className="text-[#FDFBF7]">FLAVOURS ONLY!</span>
              </h1>

              {/* Script Subtitle matching image 1 */}
              <p className="font-script text-3xl sm:text-4xl text-[#E8D2AC] tracking-wide -mt-2">
                Crunch cleaner
              </p>

              {/* Promo Coupon Pill matching image 1 */}
              <div className="inline-flex items-center gap-3 coupon-badge px-5 py-3 rounded-2xl shadow-md border-2 border-[#8D4E20]">
                <span className="font-heritage text-lg font-black text-[#351608]">
                  10% OFF | CRUNCH10
                </span>
                <button
                  onClick={handleCopy}
                  className="bg-[#351608] hover:bg-[#4D230D] text-white p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  title="Copy Code"
                >
                  {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="bg-[#AB682F] hover:bg-[#8D4E20] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <ShoppingBag size={18} /> Shop Savory Snacks
                </Link>
              </div>
            </div>

            {/* Right Image & Packaging Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1500} className="w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#8D4E20]/40 group">
                  <img
                    src="/images/traditional_snacks_hero.jpg"
                    alt="Banana Chips Kai Murukku Spicy Thattai"
                    className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating product badges matching screenshot 1 */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1c110a]/90 backdrop-blur-md border border-[#D8B48F]/30 p-3 rounded-2xl flex justify-around text-center text-xs text-[#E8D2AC]">
                    <div>
                      <p className="font-extrabold text-white text-xs">NAGERCOIL</p>
                      <p className="text-[10px] text-[#D8B48F]">Banana Chips</p>
                    </div>
                    <div className="border-x border-[#D8B48F]/20 px-3">
                      <p className="font-extrabold text-white text-xs">KARAIKUDI</p>
                      <p className="text-[10px] text-[#D8B48F]">Kai Murukku</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-white text-xs">SALEM</p>
                      <p className="text-[10px] text-[#D8B48F]">Spicy Thattai</p>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>

          </div>
        </div>
      )}

      {/* ── SLIDE 2: PAALKOVA (Screenshot 2 Theme) ── */}
      {currentSlide === 1 && (
        <div className="w-full bg-[#F7F1E5] text-[#351608] py-14 px-6 sm:px-12 transition-all duration-700 animate-fade-in relative">
          
          {/* Temple Gopuram background watermark illustration */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#351608_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Image: Paalkova Sweet Box & Clay Bowl */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1500} className="w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#EAD7C0] group">
                  <img
                    src="/images/paalkova_hero.jpg"
                    alt="Fresh Srivilliputhur Paalkova"
                    className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-[#8D4E20] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
                    Srivilliputhur Special 🍬
                  </span>
                </div>
              </Tilt>
            </div>

            {/* Right Content matching Screenshot 2 */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-1 lg:order-2">
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-heritage tracking-tight text-[#351608] leading-none">
                Paalkova
              </h1>

              {/* Pill feature boxes stacked vertically like Screenshot 2 */}
              <div className="space-y-3.5 max-w-md mx-auto lg:mx-0 pt-2">
                <div className="heritage-pill p-3.5 rounded-2xl flex items-center gap-3 transition-transform hover:translate-x-1">
                  <div className="w-9 h-9 rounded-xl bg-[#D8B48F] text-[#351608] flex items-center justify-center font-bold text-lg shrink-0">
                    🥛
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                    MADE WITH FRESH WESTERN GHATS MILK
                  </span>
                </div>

                <div className="heritage-pill p-3.5 rounded-2xl flex items-center gap-3 transition-transform hover:translate-x-1">
                  <div className="w-9 h-9 rounded-xl bg-[#D8B48F] text-[#351608] flex items-center justify-center font-bold text-lg shrink-0">
                    ✨
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                    MELT-IN-THE-MOUTH
                  </span>
                </div>

                <div className="heritage-pill p-3.5 rounded-2xl flex items-center gap-3 transition-transform hover:translate-x-1">
                  <div className="w-9 h-9 rounded-xl bg-[#D8B48F] text-[#351608] flex items-center justify-center font-bold text-lg shrink-0">
                    🌿
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                    NO PRESERVATIVES
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="bg-[#6B3615] hover:bg-[#4D230D] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <ShoppingBag size={18} /> Order Fresh Paalkova
                </Link>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ── SLIDE 3: GHEE MYSURPA & HERITAGE SWEETS ── */}
      {currentSlide === 2 && (
        <div className="w-full bg-[#4D230D] text-[#FDFBF7] py-14 px-6 sm:px-12 transition-all duration-700 animate-fade-in relative">
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-[#AB682F]/40 border border-[#D8B48F]/40 text-[#E8D2AC] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
                👑 Royal Festive Heritage
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heritage text-[#E8D2AC] leading-tight uppercase">
                Royal Cow Ghee<br />
                <span className="text-white">Mysurpa & Sweets</span>
              </h1>

              <p className="text-[#D8B48F] text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                Handcrafted daily in pure cow ghee, cardamom, and saffron. Sealed fresh for maximum rich aroma.
              </p>

              <div className="inline-flex items-center gap-2 bg-[#6B3615] px-4 py-2 rounded-xl text-xs font-bold text-[#E8D2AC] border border-[#D8B48F]/30">
                🎁 Free Heritage Tin Box on Orders &gt; ₹999
              </div>

              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="bg-[#D8B48F] hover:bg-[#C28B57] text-[#351608] px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <ShoppingBag size={18} /> Explore Sweets Collection
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 flex justify-center">
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1500} className="w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D8B48F]/40 group">
                  <img
                    src="/images/ghee_mysurpa_hero.jpg"
                    alt="Royal Ghee Mysurpa"
                    className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Tilt>
            </div>

          </div>
        </div>
      )}

      {/* CAROUSEL NAV ARROWS */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* CAROUSEL DOT INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all ${
              currentSlide === idx ? 'w-8 bg-[#AB682F]' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;
