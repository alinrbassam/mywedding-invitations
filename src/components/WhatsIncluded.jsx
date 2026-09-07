import React from 'react';
import { Check, HeartHandshake, Infinity, QrCode, Sparkles, MessageCircle, FileSpreadsheet, Globe2 } from 'lucide-react';

export function WhatsIncluded({ onOpenOrder }) {
  const inclusions = [
    {
      title: 'Personalised Design & Colors',
      desc: 'Crafted with your event details, exact theme color palette, and 3 photos of your choice.',
      icon: Sparkles
    },
    {
      title: 'Smart RSVP Tracking',
      desc: 'Instant real-time responses organized neatly in your private Google Spreadsheet.',
      icon: FileSpreadsheet
    },
    {
      title: '5 Custom Sections of Your Choice',
      desc: 'Schedule, Map, Menu, Dress Code, Gift Wishlist, Story, or anything you envision.',
      icon: Check
    },
    {
      title: 'Cinematic Opening Animation',
      desc: 'Wax seal crack, envelope opening, or custom foil animation setting a magical first impression.',
      icon: HeartHandshake
    },
    {
      title: 'Unlimited Free Updates',
      desc: 'Need to update timings or directions even the morning of the wedding? We update it free.',
      icon: Infinity
    },
    {
      title: 'Your Personal Designer',
      desc: 'A real, experienced designer directly handling your edits and requests by your side.',
      icon: MessageCircle
    },
    {
      title: 'Available in Any Language',
      desc: 'Invitations crafted flawlessly in 80+ world languages with right-to-left script support.',
      icon: Globe2
    },
    {
      title: 'Print-Ready QR Code Included',
      desc: 'High-resolution QR code included to print on cards, signs, welcome boards, or favors.',
      icon: QrCode
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#fbfbfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#006989] mb-3 inline-block">
            EVERYTHING YOU NEED
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
            What's Included In Every Invitation
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            No unexpected fees or hidden add-ons. Every package is packed with premium features.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {inclusions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-[#006989]/40 hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e6f3f7] text-[#006989] flex items-center justify-center mb-4 font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Unlimited Guests Guarantee Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#08004b] via-[#005570] to-[#006989] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-4">
                <Infinity className="w-4 h-4 text-[#cebb78]" />
                Zero Per-Guest Pricing
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-3">
                Send to 10 guests or 10,000. Same flat price.
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                One link, any number of guests. No extra printing costs, no postage fees, no guest count limits. One-time payment only.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-xs sm:text-sm font-semibold text-white/90">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  ✓ Unlimited Guests
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  ✓ One Universal Link
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  ✓ One-Time Payment
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onOpenOrder('template')}
                className="px-8 py-4 bg-white text-[#08004b] font-bold text-sm uppercase tracking-wider rounded-full hover:bg-[#cebb78] hover:text-black transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Build My Invitation
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
