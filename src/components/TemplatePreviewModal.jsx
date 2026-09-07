import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, Check, ArrowRight } from 'lucide-react';

export function TemplatePreviewModal({ template, onClose, onSelectOrder, onOpenFullTemplate }) {
  useEffect(() => {
    if (!template) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [template, onClose]);

  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-black flex items-center justify-center shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Interactive / GIF Preview Screen */}
        <div className="md:w-1/2 bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div 
            onClick={() => onOpenFullTemplate(template.id)}
            className="w-full max-w-[280px] bg-black p-2.5 rounded-[40px] shadow-2xl border border-slate-700 cursor-pointer hover:scale-105 transition-transform group"
          >
            <div className="w-20 h-3.5 bg-black rounded-full mx-auto mb-1.5" />
            <div className="rounded-[32px] overflow-hidden aspect-[9/16] bg-slate-800 relative">
              {template.gif ? (
                <img
                  src={template.gif}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                  Interactive Preview
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-md">
                  Click to Open
                </span>
              </div>
            </div>
            <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
          </div>

          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => onOpenFullTemplate(template.id)}
              className="px-5 py-2.5 rounded-full bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] text-xs font-bold tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalize &amp; Preview</span>
            </button>
            <a
              href={template.demo}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right: Template Details & Direct Order Action */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#006989]/10 text-[#006989]">
                {template.badge || 'Bespoke Design'}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                €75 · One-Time Payment
              </span>
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#08004b] mb-2">
              {template.name}
            </h3>

            <p className="text-slate-600 text-base mb-6 leading-relaxed">
              {template.desc}
            </p>

            {/* Customization Guarantees */}
            <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#cebb78]" />
                What we customize for you:
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Colors adapted to your exact wedding or event palette</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your photos, personal message, and schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Any song of your choice playing softly</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated Google Sheets RSVP tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Available in any language in the world</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                onOpenFullTemplate(template.id);
              }}
              className="w-full py-3 px-6 rounded-full bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try with Your Names &amp; Details</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectOrder(template.id, 'template');
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#006989] text-white font-bold text-sm tracking-wide hover:bg-[#005570] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Build Invitation with this Style</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-500">
              Unlimited revisions included · Ready in 4–7 days (or 24h express)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
