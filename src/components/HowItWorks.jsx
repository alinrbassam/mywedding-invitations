import React from 'react';
import { ShoppingBag, ClipboardList, Send, ArrowRight } from 'lucide-react';

export function HowItWorks({ onOpenOrder }) {
  const steps = [
    {
      step: '01',
      title: 'Choose & Pay',
      desc: 'Select your preferred design and features, then place your order in just a few clicks with secure payment.',
      icon: ShoppingBag,
      time: 'Takes ~3 minutes'
    },
    {
      step: '02',
      title: 'Share Event Details',
      desc: "We'll send you a short questionnaire where you can add your event details, colors, and photos at your own pace. If anything is unclear, your personal designer gets in touch.",
      icon: ClipboardList,
      time: 'Fill at your convenience'
    },
    {
      step: '03',
      title: 'Get Your Invitation',
      desc: "You'll receive the first draft to review. Need changes? We refine everything quickly until it's 100% perfect. Then you're ready to share and track RSVPs effortlessly 🥳",
      icon: Send,
      time: 'First draft in 1–4 days'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#f4f8fa]/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#006989] mb-3 inline-block">
            SIMPLE PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
            How It Works
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            From idea to stunning live invitation in 3 easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative z-10"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl font-bold text-[#006989]/20">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-bold text-[#006989] bg-[#e6f3f7] px-3 py-1 rounded-full">
                      {item.time}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#006989] text-white flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#08004b] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#006989]">
                  <span>Step {idx + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/96170710406?text=Hello!%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20invitation"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-4 bg-[#006989] text-white font-bold text-sm uppercase tracking-wider rounded-full hover:bg-[#005570] transition-all shadow-md hover:shadow-lg"
          >
            Inquire on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
