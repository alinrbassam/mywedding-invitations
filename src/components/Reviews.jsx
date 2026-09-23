import React, { useState } from 'react';
import { GOOGLE_REVIEWS, WHATSAPP_TESTIMONIALS } from '../data/reviews';
import { Star, MessageCircle, Heart, CheckCircle } from 'lucide-react';

export function Reviews() {
  const [activeTab, setActiveTab] = useState('google'); // 'google', 'whatsapp'

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#fbfbfb] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#006989] mb-3 inline-block">
            CUSTOMER FEEDBACK
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
            Loved Worldwide
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Real couples, real guests, unforgettable first impressions.
          </p>

          {/* Google 5.0 Score Card */}
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <img
              src="https://thb.tildacdn.net/tild3438-6461-4030-b239-616662326235/-/resize/20x/Google__G__logosvg.png"
              alt="Google"
              className="w-7 h-7 object-contain"
            />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 leading-none">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">Google Reviews · Verified Clients</span>
            </div>
          </div>

          {/* Social Proof Tabs */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('google')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeTab === 'google'
                  ? 'bg-[#006989] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Google Reviews
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === 'whatsapp'
                  ? 'bg-[#25D366] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Praises
            </button>
          </div>
        </div>

        {/* Tab Content: Google Reviews */}
        {activeTab === 'google' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOOGLE_REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      <span>{review.name}</span>
                      <CheckCircle className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                    </div>
                    <div className="text-[11px] text-slate-400">{review.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: WhatsApp Testimonials */}
        {activeTab === 'whatsapp' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WHATSAPP_TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#e7f5ed] rounded-2xl p-5 border border-emerald-200/60 shadow-xs relative"
              >
                <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                  <span className="font-bold text-emerald-900">{item.from}</span>
                  <span>{item.time} · {item.date}</span>
                </div>
                <p className="text-slate-800 text-sm leading-relaxed bg-white p-3.5 rounded-xl shadow-xs border border-emerald-100">
                  {item.text}
                </p>
                <div className="text-right mt-2 text-[10px] text-emerald-700 font-bold">
                  ✓✓ Delivered via WhatsApp
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
