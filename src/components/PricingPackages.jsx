import React from 'react';
import { PACKAGES } from '../data/pricing';
import { Check, Sparkles, Zap, Star } from 'lucide-react';

export function PricingPackages({ onOpenOrder }) {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#fbfbfb] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006989]/10 text-[#006989] text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            5.0 on Google · 1,000+ invitations created · 35+ countries
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
            Choose Your Design Style
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Transparent one-time pricing. No subscriptions, no guest limits, no stress.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PACKAGES.map((pkg) => {
            const isFeatured = pkg.popular;
            const isCustom = pkg.id === 'custom';

            return (
              <div
                key={pkg.id}
                onClick={() => onOpenOrder(pkg.id)}
                className={`group relative rounded-3xl p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#f2f9fd] via-[#f7fcfe] to-white border-2 border-[#006989] shadow-hover lg:-translate-y-2'
                    : isCustom
                    ? 'bg-gradient-to-b from-white via-[#fdfcf8] to-white border border-[#ece4c4] hover:border-[#c8be90] shadow-card hover:shadow-hover hover:-translate-y-1'
                    : 'bg-white border border-[#d8eaf4] hover:border-[#006989] shadow-card hover:shadow-hover hover:-translate-y-1'
                }`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                      isFeatured
                        ? 'bg-[#006989] text-white'
                        : isCustom
                        ? 'bg-[#faf8f0] text-[#9a8848] border border-[#e0d8a8]'
                        : 'bg-[#e6f3f7] text-[#006989] border border-[#b8dde8]'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#08004b] mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 min-h-[40px]">
                    {pkg.tagline}
                  </p>

                  {/* Luxury Service Row */}
                  <div className="mb-6">
                    <span className={`font-serif text-3xl sm:text-4xl font-bold block ${
                      isCustom ? 'text-[#9a8848]' : 'text-[#08004b]'
                    }`}>
                      {pkg.priceTier || 'Custom Quote'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                      {pkg.priceNote}
                    </span>
                  </div>

                  {/* Delivery Times */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 mb-6 text-xs text-slate-700">
                    <div className="font-semibold">{pkg.deliveryTime}</div>
                    <div className="text-[#006989] font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      {pkg.expressTime}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      {pkg.featuresTitle}
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-white font-bold ${
                          isCustom ? 'bg-[#c8b878]' : 'bg-[#006989]'
                        }`}>
                          ✓
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Button */}
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/96170710406?text=${encodeURIComponent(`Hello! I would like to inquire about the ${pkg.name} package.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full py-3.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm group-hover:shadow-md flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-[#006989] hover:bg-[#005570] text-white'
                        : isCustom
                        ? 'bg-gradient-to-r from-[#cebb78] to-[#9a8848] hover:from-[#dece88] hover:to-[#c0a858] text-white'
                        : 'bg-[#4aa8c8] hover:bg-[#3892b2] text-white'
                    }`}
                  >
                    <span>Inquire on WhatsApp</span>
                  </a>
                  <p className="text-[11px] text-center text-slate-400 font-medium">
                    {pkg.subText}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
