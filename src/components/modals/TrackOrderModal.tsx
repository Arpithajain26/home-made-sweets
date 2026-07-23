import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2 } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#FDFBF7] border border-[#EAD7C0] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8D4E20] hover:text-[#351608] p-1.5 rounded-full hover:bg-[#F6EDE2] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#8D4E20] text-white flex items-center justify-center shadow-md">
            <Truck size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#351608] font-heritage">Track Your Order</h2>
            <p className="text-xs text-[#8D4E20]">Enter your Order ID (e.g. DSH-98214) to see live dispatch status</p>
          </div>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Order ID / Mobile Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 bg-white border border-[#D8B48F] rounded-xl px-4 py-2.5 text-sm text-[#351608] focus:outline-none focus:ring-2 focus:ring-[#8D4E20]"
            required
          />
          <button
            type="submit"
            className="bg-[#8D4E20] hover:bg-[#6B3615] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Search size={16} /> Track
          </button>
        </form>

        {searched && (
          <div className="bg-[#F6EDE2] rounded-xl p-4 border border-[#EAD7C0] animate-slide-up">
            <div className="flex items-center justify-between border-b border-[#D8B48F]/50 pb-3 mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#8D4E20] font-bold">Order ID</span>
                <p className="text-sm font-extrabold text-[#351608]">{orderNumber.toUpperCase()}</p>
              </div>
              <span className="bg-[#8D4E20] text-white text-xs px-2.5 py-1 rounded-full font-medium">
                In Transit 🚚
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#351608]">Order Placed & Freshly Prepared</p>
                  <p className="text-[10px] text-[#8D4E20]">Fresh batch prepared with 100% Ghee</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#351608]">Vacuum Sealed & Handled with Care</p>
                  <p className="text-[10px] text-[#8D4E20]">Air-tight aroma retention pouch</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Truck size={18} className="text-[#8D4E20] shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-[#8D4E20]">Handed over to Express Courier</p>
                  <p className="text-[10px] text-[#351608]/70">Estimated delivery: Tomorrow by 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderModal;
