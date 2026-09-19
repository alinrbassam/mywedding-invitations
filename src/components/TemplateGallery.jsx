import React, { useState } from 'react';
import { TEMPLATES, SAVE_THE_DATES } from '../data/templates';
import { Eye, Sparkles, ExternalLink, ArrowRight, MessageCircle } from 'lucide-react';

export function TemplateGallery({ onSelectTemplate, onPreviewTemplate, onOpenFullTemplate }) {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Designs' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'new', label: 'New Releases' },
    { id: 'std', label: 'Save the Date' }
  ];

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (filter === 'popular') return t.badgeType === 'popular' || t.badgeType === 'favorite';
    if (filter === 'new') return t.badgeType === 'new';
    return true;
  });

  return (
    <section id="templates" className="py-20 sm:py-28 bg-[#f4f8fa]/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#006989] mb-3 inline-block">
            EXCLUSIVE DESIGNS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
            Choose Your Style
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Each template is fully personalized — we’ll adjust texts, photos, fonts, and colors to match your exact celebration theme.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                  filter === cat.id
                    ? 'bg-[#006989] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid (Standard & Custom Invitations) */}
        {filter !== 'std' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Visual Preview Container */}
                <div className="relative aspect-[16/11] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onPreviewTemplate(template)}>
                  {template.gif ? (
                    <img
                      src={template.gif}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                      <span>Preview Coming Soon</span>
                    </div>
                  )}

                  {/* Badge */}
                  {template.badge && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        template.badgeType === 'popular'
                          ? 'bg-[#006989] text-white'
                          : template.badgeType === 'new'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : template.badgeType === 'favorite'
                          ? 'bg-white text-rose-800 border border-rose-200'
                          : 'bg-white/90 backdrop-blur-md text-slate-800'
                      }`}>
                        {template.badge}
                      </span>
                    </div>
                  )}

                  {/* Quick Preview Hover Overlay */}
                  <div className="absolute inset-0 bg-[#08004b]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenFullTemplate(template.id);
                      }}
                      className="px-3.5 py-2 rounded-full bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Personalize
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreviewTemplate(template);
                      }}
                      className="px-3.5 py-2 rounded-full bg-white text-slate-800 font-bold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-serif text-2xl font-bold text-[#08004b] group-hover:text-[#006989] transition-colors">
                        {template.name}
                      </h3>
                      <span className="text-xs font-bold text-[#006989] bg-[#006989]/10 px-2.5 py-0.5 rounded-full">
                        Bespoke Suite
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {template.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {template.tags.map((tag, idx) => (
                        <span key={idx} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => onOpenFullTemplate(template.id)}
                      className="py-2.5 px-2.5 rounded-xl border border-amber-300/80 bg-amber-50/50 text-[#08004b] hover:bg-amber-100/60 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#b38f38]" />
                      <span>Live Demo</span>
                    </button>

                    <a
                      href={`https://wa.me/96170710406?text=${encodeURIComponent(`Hello! I would like to inquire about the ${template.name} wedding invitation.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-2.5 rounded-xl bg-[#006989] hover:bg-[#005570] text-white font-bold text-xs tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Save the Dates Showcase (Shown under 'all' or 'std') */}
        {(filter === 'all' || filter === 'std') && (
          <div className="mt-20 pt-16 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#cebb78] bg-[#faf8f0] px-3 py-1 rounded-full border border-amber-200/60 inline-block mb-3">
                Interactive Save The Dates
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#08004b]">
                Scratch, Brush & Shake to Reveal Your Date
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Custom interactive animations crafted for your love story. Ready in 24–48 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SAVE_THE_DATES.map((std) => (
                <div
                  key={std.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 p-5 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 mb-4 relative">
                      <img src={std.gif} alt={std.name} className="w-full h-full object-cover" loading="lazy" />
                      <span className="absolute top-2 left-2 bg-[#08004b] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {std.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-[#08004b] mb-1">
                      {std.name}
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      {std.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onOpenFullTemplate(std.id)}
                      className="flex-1 py-2 text-center text-xs font-bold border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1"
                    >
                      <span>Demo</span>
                      <Eye className="w-3 h-3" />
                    </button>
                    <a
                      href={`https://wa.me/96170710406?text=${encodeURIComponent(`Hello! I would like to inquire about creating an invitation with the "${std.name}" Save the Date design.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 text-center text-xs font-bold bg-[#006989] hover:bg-[#005570] text-white rounded-lg flex items-center justify-center gap-1 transition-all shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-[#006989]" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
