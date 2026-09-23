import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

export function Navbar({ onOpenOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Choose Your Design', href: '#templates' },
    { name: "Let's Get Started", href: '#pricing', highlight: true },
    { name: 'Reviews', href: '#reviews' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Q&A', href: '#faq' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#ededed]/95 shadow-sm backdrop-blur-md py-3' : 'bg-[#ededed] py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand / Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/laylitna-logo.png"
              alt="Laylitna"
              className="w-10 h-10 rounded-full object-cover shadow-xs border border-[#be9667]/30 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-bold tracking-wide text-[#08004b] leading-tight">
                  Laylitna
                </span>
                <span className="text-xs font-serif text-[#006989] font-medium" dir="rtl">
                  ليلتنا
                </span>
              </div>
              <span className="text-[9px] tracking-[0.16em] uppercase font-semibold text-[#006989]">
                Digital Invitations
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  link.highlight
                    ? 'text-[#006989] hover:bg-[#006989]/10'
                    : 'text-[#4a4a4a] hover:text-[#006989] hover:bg-black/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Socials */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/96170710406?text=Hello!%20I%20have%20a%20question%20about%20your%20digital%20invitations"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[#4a4a4a] hover:text-[#25D366] transition-colors rounded-full hover:bg-black/5"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/96170710406?text=Hello!%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20invitation"
              target="_blank"
              rel="noreferrer"
              className="ml-1 px-4 py-2 bg-[#006989] text-white text-xs uppercase tracking-wider font-bold rounded-full hover:bg-[#005570] transition-all shadow-sm hover:shadow-md"
            >
              Inquire Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/96170710406?text=Hello!%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20invitation"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#006989] text-white text-xs font-bold rounded-full"
            >
              Inquire
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#08004b] hover:bg-black/5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#ededed] border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-[#4a4a4a] hover:text-[#006989] hover:bg-white/60"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#006989]">
              <a
                href="https://wa.me/96170710406"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-[#25D366] hover:bg-black/5 rounded-full flex items-center gap-1.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-[#4a4a4a] text-xs">+961 70 710 406</span>
              </a>
            </div>
            <a
              href="https://wa.me/96170710406?text=Hello!%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20invitation"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 bg-[#006989] text-white text-sm font-bold rounded-xl text-center"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
