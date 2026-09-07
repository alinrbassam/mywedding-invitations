import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, CheckCircle, Globe, Clock, Sparkles } from 'lucide-react';

export function Hero({ onOpenOrder, onScrollToSection }) {
  const words = ['impress', 'amaze', 'captivate', 'inspire', 'delight'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  const eventPills = [
    'Weddings',
    'Birthdays',
    'Baby Showers',
    'Corporate Events',
    'Quinceañeras',
    'Engagement Parties',
    'Anniversaries',
    'Graduation Parties'
  ];

  return (
    <section className="pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#ededed]/60 via-[#fbfbfb] to-[#fbfbfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700">
            <span className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </span>
            <span className="font-bold text-slate-900">4.9 / 5</span>
            <span className="text-slate-400">·</span>
            <span className="text-emerald-700 font-semibold">1,000+ happy couples</span>
            <a 
              href="#reviews" 
              onClick={(e) => { e.preventDefault(); onScrollToSection('reviews'); }}
              className="text-[#006989] font-bold hover:underline ml-1 inline-flex items-center gap-0.5"
            >
              See reviews →
            </a>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#08004b] leading-[1.12]">
            Digital Invitations <br className="hidden sm:inline" />
            designed to{' '}
            <span className="relative inline-block text-[#006989] min-w-[200px] sm:min-w-[280px] text-left">
              {displayText}
              <span className="animate-pulse text-[#cebb78]">|</span>
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            With smart RSVP, interactive maps, music, and more. Unlimited revisions.
            In any language, anywhere in the world.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenOrder('template')}
              className="w-full sm:w-auto px-8 py-4 bg-[#006989] text-white font-bold text-base tracking-wide rounded-full hover:bg-[#005570] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-[#cebb78]" />
              <span>Create My Invitation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onScrollToSection('templates')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-semibold text-base rounded-full hover:bg-slate-50 transition-all duration-200 border border-slate-300/80 shadow-sm hover:border-slate-400 flex items-center justify-center gap-2"
            >
              View Examples
            </button>
          </div>

          {/* Key Metric Badges */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">1000+ Created</div>
                <div className="text-xs text-slate-500">Global celebrations</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">35+ Countries</div>
                <div className="text-xs text-slate-500">Every continent</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">24h Express</div>
                <div className="text-xs text-slate-500">Fast-track delivery</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">5.0 on Google</div>
                <div className="text-xs text-slate-500">100% verified love</div>
              </div>
            </div>
          </div>

        </div>

        {/* Animated Marquee of Event Types */}
        <div className="mt-14 overflow-hidden py-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fbfbfb] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fbfbfb] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-ticker flex items-center space-x-3">
            {[...eventPills, ...eventPills, ...eventPills].map((event, index) => (
              <span
                key={index}
                className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase bg-white border border-slate-200 text-slate-700 shadow-xs hover:border-[#006989] hover:text-[#006989] transition-colors whitespace-nowrap cursor-default"
              >
                {event}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
