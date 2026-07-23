import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'sweet',
    name: 'Authentic Traditional Sweets',
    subtitle: 'Srivilliputhur Paalkova, Pure Ghee Mysurpa, Undi & Ladoos',
    emoji: '🍬',
    badge: '100% Ghee',
    bg: 'bg-gradient-to-br from-[#FAF3E0] to-[#F3E5AB]',
    border: 'border-[#EAD7C0]',
    btnColor: 'bg-[#6B3615] text-white',
  },
  {
    id: 'savory',
    name: 'Kai Murukku & Savories',
    subtitle: 'Hand-shaped Murukku, Thattai, Chakkuli & Kara Boondi',
    emoji: '🌀',
    badge: 'Super Crisp',
    bg: 'bg-gradient-to-br from-[#FAF0E6] to-[#F5D0A9]',
    border: 'border-[#D8B48F]',
    btnColor: 'bg-[#8D4E20] text-white',
  },
  {
    id: 'chips',
    name: 'Nagercoil Banana Chips',
    subtitle: 'Crisped in pure cold-pressed coconut oil with rock salt',
    emoji: '🍌',
    badge: 'Bestseller',
    bg: 'bg-gradient-to-br from-[#FFFBEA] to-[#FCE38A]',
    border: 'border-[#F0C968]',
    btnColor: 'bg-[#351608] text-white',
  },
  {
    id: 'gifting',
    name: 'Luxury Gift Boxes',
    subtitle: 'Custom festival & wedding boxes with velvet finish',
    emoji: '🎁',
    badge: 'Custom Branding',
    bg: 'bg-gradient-to-br from-[#FDF0ED] to-[#F7C5B8]',
    border: 'border-[#E07A5F]',
    btnColor: 'bg-[#4D230D] text-white',
  },
];

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4 border-b border-[#EAD7C0] pb-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8D4E20]">
            EXPLORE OUR RANGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#351608] font-heritage mt-1">
            Shop By Category
          </h2>
        </div>
        <Link
          to="/shop"
          className="flex items-center gap-1.5 text-sm font-bold text-[#8D4E20] hover:text-[#351608] transition-colors"
        >
          View Full Menu <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.id}`}
            className={`group rounded-3xl p-6 border ${cat.border} ${cat.bg} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl select-none group-hover:scale-110 transition-transform duration-300">
                {cat.emoji}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/80 backdrop-blur-sm text-[#351608] px-3 py-1 rounded-full border border-[#351608]/10 shadow-sm">
                {cat.badge}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black font-heritage text-[#351608] mb-2 leading-snug">
                {cat.name}
              </h3>
              <p className="text-xs text-[#6B3615] leading-relaxed mb-6 font-medium">
                {cat.subtitle}
              </p>
            </div>

            <div className={`mt-auto inline-flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs ${cat.btnColor} shadow-sm transition-all group-hover:px-5`}>
              <span>Explore Category</span>
              <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
