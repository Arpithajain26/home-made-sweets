import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2 } from 'lucide-react';

interface DistributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const DistributorModal: React.FC<DistributorModalProps> = ({
  isOpen,
  onClose,
  title = 'Start Your Business With ISH / Distributors Enquiry',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    businessType: 'Retail Store Owner',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#FDFBF7] border border-[#EAD7C0] rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8D4E20] hover:text-[#351608] p-1.5 rounded-full hover:bg-[#F6EDE2] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#6B3615] text-[#FDFBF7] flex items-center justify-center shadow-md shrink-0">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#351608] font-heritage">{title}</h2>
            <p className="text-xs text-[#8D4E20]">Partner with India's most loved authentic traditional sweet & snack brand</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 bg-[#F6EDE2] rounded-2xl border border-[#EAD7C0] p-6">
            <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#351608]">Enquiry Submitted Successfully!</h3>
            <p className="text-xs text-[#8D4E20] mt-1 max-w-md mx-auto leading-relaxed">
              Thank you for your interest! Our B2B & Partnership manager will call you within 24 hours to discuss distributor margins & sample kits.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-5 bg-[#8D4E20] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#6B3615] transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#351608] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#D8B48F] rounded-xl px-3.5 py-2 text-sm text-[#351608] focus:ring-2 focus:ring-[#8D4E20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#351608] mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-[#D8B48F] rounded-xl px-3.5 py-2 text-sm text-[#351608] focus:ring-2 focus:ring-[#8D4E20] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#351608] mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-[#D8B48F] rounded-xl px-3.5 py-2 text-sm text-[#351608] focus:ring-2 focus:ring-[#8D4E20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#351608] mb-1">City / Region *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru / Chennai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white border border-[#D8B48F] rounded-xl px-3.5 py-2 text-sm text-[#351608] focus:ring-2 focus:ring-[#8D4E20] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#351608] mb-1">Business Type</label>
              <select
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full bg-white border border-[#D8B48F] rounded-xl px-3.5 py-2 text-sm text-[#351608] focus:ring-2 focus:ring-[#8D4E20] focus:outline-none"
              >
                <option value="Retail Store Owner">Retail Store Owner / Supermarket</option>
                <option value="Distributor / Wholesale Dealer">Distributor / Wholesale Dealer</option>
                <option value="Corporate Gifting Client">Corporate Gifting Client</option>
                <option value="Exporter / NRI Supplier">Exporter / NRI Supplier</option>
                <option value="Individual Entrepreneur">Individual Entrepreneur / Start Business</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#351608] mb-1">Message / Requirements</label>
              <textarea
                rows={3}
                placeholder="Tell us about your distribution interest, estimated order volume, or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-[#D8B48F] rounded-xl px-3.5 py-2 text-sm text-[#351608] focus:ring-2 focus:ring-[#8D4E20] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6B3615] hover:bg-[#4D230D] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send size={16} /> Submit Partnership Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DistributorModal;
