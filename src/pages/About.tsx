import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Star, Store, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-[#FDFBF7] text-[#351608] min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-[#8D4E20]/10 text-[#8D4E20] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#8D4E20]/20">
            <Sparkles size={14} className="text-[#8D4E20]" /> Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heritage tracking-tight text-[#351608]">
            Welcome to Desi Snack House
          </h1>
          <p className="text-[#6B3615] text-lg max-w-2xl mx-auto font-medium leading-relaxed italic">
            A Flavourful Journey from South Indian Kitchens to Your Doorstep
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-10 text-[15px] leading-loose text-[#4D230D]">
          
          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAD7C0] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6EDE2] rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <h2 className="flex items-center gap-2 text-2xl font-bold font-heritage text-[#8D4E20] mb-4">
              <MapPin size={22} /> Our Roots
            </h2>
            <p>
              At Desi Snack House, we believe that the heart of India beats in its diverse and delicious traditional snacks. Our journey began with a simple desire: to preserve the authentic, heritage recipes of Karnataka and South India—from the nutty sweetness of Shenga Undi & Shenga Holige to the crunchy perfection of Chakkuli. Inspired by the culinary traditions of our grandmothers, we embarked on a mission to bring these unadulterated flavours to sweet and savoury enthusiasts everywhere.
            </p>
          </section>

          <section className="bg-[#4D230D] text-[#FDFBF7] p-8 md:p-10 rounded-3xl shadow-lg border border-[#351608] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8D4E20] rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none opacity-50" />
            <h2 className="flex items-center gap-2 text-2xl font-bold font-heritage text-[#E8D2AC] mb-4">
              <Heart size={22} /> Our Passion
            </h2>
            <p className="text-[#D8B48F]">
              Our story is woven with a deep love for Indian heritage and a relentless commitment to quality. We understand that the taste of home is an irreplaceable treasure. Every sweet and snack we offer is handcrafted daily in small batches, prepared using 100% pure cow ghee, organic jaggery, and ethically sourced spices, packing the same care you'd find in a traditional Indian kitchen.
            </p>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAD7C0] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F6EDE2] rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
            <h2 className="flex items-center gap-2 text-2xl font-bold font-heritage text-[#8D4E20] mb-4">
              <Star size={22} /> The Authentic Experience
            </h2>
            <p>
              What sets us apart is our dedication to uncompromised authenticity. Each delicacy you find at Desi Snack House is a reflection of regional mastery. Whether it's the crumbly Shenga Undi (Peanut Ladoo), melt-in-mouth Rave & Kobbari Undi, golden Shankarapali, or crispy Chakkuli, we bring you the real deal—no artificial preservatives, just bold and real flavours.
            </p>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAD7C0]">
            <h2 className="flex items-center gap-2 text-2xl font-bold font-heritage text-[#8D4E20] mb-4">
              <Store size={22} /> Our Commitment to You
            </h2>
            <p>
              We are more than just a sweet shop; we're a bridge to your cherished festive memories and the nostalgic taste of home. We take pride in sourcing our ingredients responsibly and partnering with local artisans who share our passion for premium quality. When you choose Desi Snack House, you're not just enjoying a snack; you're supporting a rich culinary community.
            </p>
          </section>

          <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAD7C0]">
            <h2 className="text-2xl font-bold font-heritage text-[#8D4E20] mb-4">
              Your Journey with Us
            </h2>
            <p>
              We invite you to join us on this delightful journey through the authentic tastes of India. Whether you're celebrating a festival, gifting a loved one, or simply craving a taste of tradition, we're here to take you on a culinary adventure. Explore our collection, savour the richness, and make your own golden memories with Desi Snack House.
            </p>
          </section>

          {/* Footer of About Page */}
          <section className="text-center pt-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-heritage text-[#351608] mb-2">Connect with Us</h3>
              <p className="max-w-xl mx-auto">
                We are more than a brand; we are a family. Feel free to reach out to us with your feedback, or just to say hello. We'd love to hear your stories and share our love for traditional sweets. Together, let's celebrate the magic of Desi snacks.
              </p>
            </div>
            
            <div className="bg-[#F6EDE2] p-6 rounded-2xl border border-[#EAD7C0] inline-block mt-4">
              <p className="font-semibold text-[#8D4E20] mb-2">Thank you for choosing Desi Snack House.</p>
              <p className="font-bold text-lg font-heritage text-[#351608]">Taste the Heritage, Share the Joy!</p>
            </div>
            
            <div className="pt-6">
              <Link
                to="/shop"
                className="bg-[#8D4E20] hover:bg-[#6B3615] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all inline-block"
              >
                Explore Our Collection
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default About;
