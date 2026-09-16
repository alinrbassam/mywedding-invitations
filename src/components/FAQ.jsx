import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';
import { ChevronDown, MessageCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#fbfbfb] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#006989] mb-3 inline-block">
            EVERYTHING EXPLAINED
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
            Common Questions
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Everything you need to know about creating, customizing, and sharing your digital invitation.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#08004b]">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#006989] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Help Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#e6f3f7] border border-[#b8dde8] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#08004b]">
              Have a question that's not answered here?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our support team and designers are happy to help anytime on WhatsApp.
            </p>
          </div>

          <a
            href="https://wa.me/96170710406?text=Hello!%20I%20have%20a%20question%20about%20your%20digital%20invitations"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-[#006989] hover:bg-[#005570] text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
