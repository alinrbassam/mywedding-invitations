import React from 'react';
import { UserCheck, RefreshCw, Zap, Users, ShieldCheck, Palette } from 'lucide-react';

export function OurDifference() {
  const differentiators = [
    {
      num: '01',
      badge: 'Not a chatbot. A real designer.',
      title: 'Your designer, by your side',
      desc: 'From the first message to the morning of your event, your personal designer is available for updates, tweaks, and last-minute changes. Real people, real care. Always there.',
      icon: UserCheck,
      color: 'from-sky-500/10 to-transparent'
    },
    {
      num: '02',
      badge: 'No limits. Ever.',
      title: 'Unlimited revisions, always',
      desc: 'Not happy with something? We change it. And again. And again. There is no limit. Your invitation is done when you say it is done, not when our revision count runs out.',
      icon: RefreshCw,
      color: 'from-teal-500/10 to-transparent'
    },
    {
      num: '03',
      badge: 'Express: 24h delivery available',
      title: 'Delivered in as little as 24 hours',
      desc: 'Standard delivery is 4–7 days. But if your event is coming up fast, our express option means your invitation is ready in less than 24–48 hours. Because life doesn’t always give you months to plan.',
      icon: Zap,
      color: 'from-amber-500/10 to-transparent'
    },
    {
      num: '04',
      badge: '50 guests or 50,000, same price',
      title: 'One link. Unlimited guests.',
      desc: 'Send it to 50 guests or 50,000. There’s no per-guest cost, no hidden fees, no limits. Share by WhatsApp, email, text message, or QR code — instantly, for free.',
      icon: Users,
      color: 'from-emerald-500/10 to-transparent'
    },
    {
      num: '05',
      badge: 'Free updates until your event day',
      title: 'Updated until the very last minute',
      desc: 'Venue changed? Timeline shifted? Added a new song? Just message us, even the evening before your celebration, and we will update your live link immediately. No extra charge.',
      icon: ShieldCheck,
      color: 'from-indigo-500/10 to-transparent'
    },
    {
      num: '06',
      badge: 'No idea too wild',
      title: 'If you can imagine it, we can create it',
      desc: 'Custom illustrations, proposal videos, your favourite song, animated falling petals, or a photo of your pets. No idea is too wild. Your invitation should be as one-of-a-kind as your love story.',
      icon: Palette,
      color: 'from-rose-500/10 to-transparent'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#fbfbfb] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#006989] mb-3 inline-block">
            OUR DIFFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
            What You Won't Find Anywhere Else
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            We don’t just give you a generic template. We pair you with a human designer who crafts an unforgettable digital experience.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Number & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-slate-200 group-hover:text-[#006989] transition-colors">
                      {item.num}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#e6f3f7] text-[#006989] tracking-wide">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#f2f9fd] text-[#006989] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#006989] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#08004b] mb-3 group-hover:text-[#006989] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#006989]">
                  <span>Included in every package</span>
                  <span className="ml-1">✓</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
