import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CtaBanner({ onOpenOrder, onScrollToSection }) {
  return (
    <section className="py-20 bg-gradient-to-b from-[#fbfbfb] to-[#ededed]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="bg-[#08004b] rounded-[40px] p-8 sm:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Decorative radial glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#006989]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#cebb78]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#cebb78] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Your Love Story Deserves This
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Ready to create something unforgettable?
            </h2>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Your guests' first impression of your celebration starts with your invitation. Let’s make it one they will remember forever.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenOrder('template')}
                className="w-full sm:w-auto px-8 py-4 bg-[#cebb78] hover:bg-[#dece88] text-black font-bold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Begin Your Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onScrollToSection('templates')}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all border border-white/20"
              >
                See Real Examples
              </button>
            </div>

            <div className="pt-6 flex items-center justify-center gap-6 text-xs text-white/60">
              <span>✓ 24h Delivery Available</span>
              <span>✓ Unlimited Revisions</span>
              <span>✓ Any Language</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
