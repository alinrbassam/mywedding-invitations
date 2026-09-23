import React from 'react';
import { MessageCircle, Heart, Lock } from 'lucide-react';

export function Footer({ onScrollToSection, onOpenLegal, onOpenAdminLogin }) {
  return (
    <footer className="bg-[#ededed] text-slate-700 py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/laylitna-logo.png"
                alt="Laylitna"
                className="w-11 h-11 rounded-full object-cover shadow-xs border border-[#be9667]/40"
              />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold text-[#08004b]">
                    Laylitna
                  </span>
                  <span className="text-sm font-serif text-[#006989] font-medium" dir="rtl">
                    ليلتنا
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-[#006989]">
                  Digital Invitations · Weddings in Lebanon
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Luxury bespoke digital wedding & celebration invitations with smart RSVP tracking, interactive maps, music, and unlimited revisions. Designed with love for weddings in Lebanon and couples worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/96170710406"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-xs border border-slate-300 text-slate-700 hover:text-[#25D366] hover:border-[#25D366] transition-all text-xs font-semibold"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>+961 70 710 406</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#08004b] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onScrollToSection('templates')}
                  className="hover:text-[#006989] transition-colors"
                >
                  Choose Your Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('pricing')}
                  className="hover:text-[#006989] transition-colors"
                >
                  Let's Get Started
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('reviews')}
                  className="hover:text-[#006989] transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('how-it-works')}
                  className="hover:text-[#006989] transition-colors"
                >
                  Work Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-[#006989] transition-colors"
                >
                  Q&A
                </button>
              </li>
            </ul>
          </div>

          {/* Contact / Help */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#08004b] mb-4">
              Contact Us
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Have questions or need a custom quote? We reply within minutes.
            </p>
            <div className="space-y-2 text-xs font-semibold">
              <a
                href="https://wa.me/96170710406"
                target="_blank"
                rel="noreferrer"
                className="block text-[#006989] hover:underline"
              >
                WhatsApp: +961 70 710 406
              </a>
              <span className="block text-slate-500">
                Available 7 days a week
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Laylitna. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#006989] transition-colors"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#006989] transition-colors"
            >
              Terms & Conditions
            </button>
            <span>|</span>
            <button
              onClick={onOpenAdminLogin}
              className="hover:text-[#006989] transition-colors flex items-center gap-1 text-slate-400 hover:text-slate-600"
              title="Admin Studio Sign In"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
