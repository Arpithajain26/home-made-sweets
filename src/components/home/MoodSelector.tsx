import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MOODS = [
  {
    id: 'teatime',
    label: '☕ Tea Time Munchies',
    desc: 'Crispy Kai Murukku, Thattai & Ribbon Pakoda that pair perfectly with hot Filter Coffee or Chai.',
    popular: ['Kai Murukku', 'Salem Thattai', 'Kharada Puri'],
  },
  {
    id: 'party',
    label: '🎉 Party & Gathering Snacks',
    desc: 'Crunchy banana chips and sweet diamond bites for family get-togethers and celebrations.',
    popular: ['Nagercoil Banana Chips', 'Shankarapali', 'Special Mixture'],
  },
  {
    id: 'midnight',
    label: '🌙 Late Night Cravings',
    desc: 'Bite-sized sweet ladoos & Obbattu holige to satisfy late-night sweet tooth moments.',
    popular: ['Shenga Undi', 'Paalkova', 'Shenga Holige'],
  },
  {
    id: 'gifting',
    label: '🎁 Festive Gifting',
    desc: 'Handcrafted luxury sweet boxes packaged in traditional brass & velvet themed tins.',
    popular: ['Royal Mysurpa Box', 'Dry Fruit Delights', 'Assorted Sweets'],
  },
];

const MoodSelector: React.FC = () => {
  const [activeMood, setActiveMood] = useState('teatime');
  const activeObj = MOODS.find((m) => m.id === activeMood) || MOODS[0];

  return (
    <section className="bg-[#F6EDE2] py-16 px-6 border-y border-[#EAD7C0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8D4E20]">
            CURATED SELECTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#351608] font-heritage mt-1">
            Shop By Mood
          </h2>
          <p className="text-xs sm:text-sm text-[#8D4E20] mt-2">
            Whatever your snack craving, we have the handcrafted traditional match for you!
          </p>
        </div>

        {/* Mood Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 shadow-sm ${
                activeMood === mood.id
                  ? 'bg-[#351608] text-[#FDFBF7] scale-105 shadow-md border-2 border-[#8D4E20]'
                  : 'bg-white text-[#351608] hover:bg-[#FAF6F0] border border-[#EAD7C0]'
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>

        {/* Selected Mood Card */}
        <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#EAD7C0] shadow-lg max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center sm:text-left">
            <h3 className="text-2xl font-bold font-heritage text-[#351608]">
              {activeObj.label}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B3615] leading-relaxed max-w-md">
              {activeObj.desc}
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-2">
              <span className="text-[11px] font-bold text-[#8D4E20]">Popular Items:</span>
              {activeObj.popular.map((item) => (
                <span
                  key={item}
                  className="bg-[#F6EDE2] text-[#351608] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#D8B48F]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/shop?mood=${activeObj.id}`}
            className="shrink-0 bg-[#8D4E20] hover:bg-[#6B3615] text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all"
          >
            Explore {activeObj.label.split(' ')[1]} Snacks <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoodSelector;
