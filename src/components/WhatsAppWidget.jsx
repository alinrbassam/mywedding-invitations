import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-semibold text-slate-800 animate-in fade-in slide-in-from-right-4 duration-300">
          <span>Need help? Chat with a designer!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Floating Circle */}
      <a
        href="https://wa.me/37253240402?text=Hello!%20I%20have%20a%20question%20about%20your%20digital%20invitations"
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
