import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';

export function Footer({ onScrollToSection, onOpenLegal }) {
  return (
    <footer className="bg-[#ededed] text-slate-700 py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#08004b] flex items-center justify-center text-white font-serif text-lg font-bold">
                W
              </div>
              <span className="font-serif text-2xl font-bold text-[#08004b]">
                Webgency Invitations
              </span>
            </div>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Luxury digital wedding & celebration invitations with smart RSVP tracking, interactive maps, music, and unlimited revisions. Designed with love for couples worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/webgency_invitations/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#006989] hover:border-[#006989] transition-all"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/37253240402"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#25D366] hover:border-[#25D366] transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
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
                href="https://wa.me/37253240402"
                target="_blank"
                rel="noreferrer"
                className="block text-[#006989] hover:underline"
              >
                WhatsApp: +372 5324 0402
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
            © 2026 Webgency. All rights reserved.
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
          </div>
        </div>

      </div>
    </footer>
  );
}
