import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Heart, ExternalLink, Copy, Check, Trash2, 
  Sparkles, Calendar, MapPin, KeyRound, Share2, 
  MessageCircle, Users, Eye, ArrowRight, ShieldCheck
} from 'lucide-react';
import { getAllClientWeddings, saveClientWedding, deleteClientWedding, getClientRsvpStats } from '../data/clientInvites';
import { TEMPLATES } from '../data/templates';

export function AdminWeddingManagerModal({ 
  isOpen, 
  onClose, 
  onOpenStudioForWedding, 
  onOpenDashboardForWedding 
}) {
  const [weddings, setWeddings] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  
  // Form State for New Wedding
  const [formData, setFormData] = useState({
    partner1: '',
    partner2: '',
    slug: '',
    templateId: 'dolce-vita',
    dateText: '',
    venueName: '',
    secretPin: ''
  });
  const [formError, setFormError] = useState('');

  // Load weddings
  const reloadWeddings = () => {
    const list = getAllClientWeddings();
    setWeddings(list);
  };

  useEffect(() => {
    if (isOpen) {
      reloadWeddings();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => reloadWeddings();
    window.addEventListener('laylitna_weddings_updated', handleUpdate);
    return () => window.removeEventListener('laylitna_weddings_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  // Auto-generate slug and PIN when partner names change
  const handlePartnerChange = (field, val) => {
    const next = { ...formData, [field]: val };
    if (!formData.slug || formData.slug === generateAutoSlug(formData.partner1, formData.partner2)) {
      next.slug = generateAutoSlug(next.partner1, next.partner2);
    }
    if (!next.secretPin) {
      next.secretPin = String(Math.floor(1000 + Math.random() * 9000));
    }
    setFormData(next);
  };

  function generateAutoSlug(p1, p2) {
    const clean1 = (p1 || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const clean2 = (p2 || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean1 && clean2) return `${clean1}-${clean2}`;
    if (clean1) return `${clean1}-invite`;
    return '';
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const p1 = formData.partner1.trim();
    const p2 = formData.partner2.trim();
    const slug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const pin = (formData.secretPin.trim() || String(Math.floor(1000 + Math.random() * 9000))).slice(0, 8);

    if (!p1 || !p2) {
      setFormError('Please enter both partner names.');
      return;
    }
    if (!slug) {
      setFormError('Please enter a valid link slug (e.g. ali-nour).');
      return;
    }

    // Check if slug already exists
    const existing = weddings.find(w => w.slug.toLowerCase() === slug);
    if (existing) {
      setFormError(`Link slug "/${slug}" is already in use. Please choose another.`);
      return;
    }

    const newRecord = saveClientWedding({
      slug,
      clientName: `${p1} & ${p2}`,
      templateId: formData.templateId,
      secretPin: pin,
      partner1: p1,
      partner2: p2,
      dateText: formData.dateText.trim() || 'Date To Be Announced',
      venueName: formData.venueName.trim() || 'Venue To Be Announced'
    });

    if (newRecord) {
      reloadWeddings();
      setIsCreating(false);
      setFormData({
        partner1: '',
        partner2: '',
        slug: '',
        templateId: 'dolce-vita',
        dateText: '',
        venueName: '',
        secretPin: ''
      });
      setCopiedKey(`created_${slug}`);
      setTimeout(() => setCopiedKey(''), 4000);
    }
  };

  const handleDelete = (slug, name) => {
    if (slug === 'hadi') {
      alert('The default demo wedding cannot be deleted.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the wedding for "${name}" (${slug})?`)) {
      deleteClientWedding(slug);
      reloadWeddings();
    }
  };

  const handleCopy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2500);
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://laylitna.vercel.app';

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#08004b] text-white rounded-3xl border border-[#cebb78]/40 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-white/5">
          <div className="flex items-center gap-3">
            <img 
              src="/laylitna-logo.png" 
              alt="Laylitna" 
              className="w-12 h-12 rounded-full border border-[#cebb78] object-cover shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#cebb78]/20 text-[#cebb78] border border-[#cebb78]/30">
                  Laylitna Studio
                </span>
                <span className="text-xs text-slate-300">
                  {weddings.length} {weddings.length === 1 ? 'Wedding' : 'Weddings'} Active
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
                Wedding Projects Manager
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isCreating && (
              <button
                onClick={() => {
                  setIsCreating(true);
                  setFormData({
                    partner1: '',
                    partner2: '',
                    slug: '',
                    templateId: 'dolce-vita',
                    dateText: '',
                    venueName: '',
                    secretPin: String(Math.floor(1000 + Math.random() * 9000))
                  });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>New Wedding</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* New Wedding Form */}
          {isCreating && (
            <div className="bg-white/10 border border-[#cebb78]/40 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#cebb78]" />
                  <h3 className="font-serif text-lg font-bold text-[#cebb78]">
                    Create New Client Wedding
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium">
                  {formError}
                </div>
              )}

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Partner 1 (e.g. Groom or Bride) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali"
                      value={formData.partner1}
                      onChange={(e) => handlePartnerChange('partner1', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-slate-600 focus:border-[#cebb78] text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Partner 2 (e.g. Bride or Groom) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nour"
                      value={formData.partner2}
                      onChange={(e) => handlePartnerChange('partner2', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-slate-600 focus:border-[#cebb78] text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Custom URL Slug *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">
                        /
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="ali-invite"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                        className="w-full pl-6 pr-3.5 py-2.5 rounded-xl bg-white/10 border border-slate-600 focus:border-[#cebb78] text-white text-sm font-mono focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Guest link: <span className="text-[#cebb78] font-mono">{origin}/{formData.slug || 'ali-invite'}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Couple 4-Digit Secret PIN *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={8}
                        placeholder="9482"
                        value={formData.secretPin}
                        onChange={(e) => setFormData({ ...formData, secretPin: e.target.value.replace(/[^0-9]/g, '') })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/10 border border-slate-600 focus:border-[#cebb78] text-white text-sm font-mono tracking-wider focus:outline-none"
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Protects the bride's RSVP dashboard from unauthorized visitors.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Design Template *
                    </label>
                    <select
                      value={formData.templateId}
                      onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-slate-600 focus:border-[#cebb78] text-white text-sm focus:outline-none"
                    >
                      {TEMPLATES.map((t) => (
                        <option key={t.id} value={t.id} className="bg-[#08004b] text-white">
                          {t.name} ({t.tags.join(', ')})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Wedding Date (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. October 18, 2026"
                      value={formData.dateText}
                      onChange={(e) => setFormData({ ...formData, dateText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-slate-600 focus:border-[#cebb78] text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                  >
                    Create & Generate Links
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Weddings List */}
          <div className="space-y-4">
            {weddings.map((w) => {
              const stats = getClientRsvpStats(w.slug);
              const templateObj = TEMPLATES.find(t => t.id === w.templateId) || TEMPLATES[0];
              const guestUrl = `${origin}/${w.slug}`;
              const dashUrl = `${origin}/invite/${w.slug}/guests?key=${w.secretPin || '1234'}`;
              const coupleName = w.clientName || `${w.customData?.partner1 || 'Partner'} & ${w.customData?.partner2 || 'Partner'}`;

              // WhatsApp message prepared for the bride
              const waText = `Hello ${coupleName}! 💍\nHere are your official Laylitna luxury wedding invitation links:\n\n💌 Guest Invitation Card (send to guests):\n${guestUrl}\n\n📊 Private RSVP Dashboard (to view headcount & attending guests):\n${dashUrl}\n(Your Secret PIN: ${w.secretPin || '1234'})\n\nWith love,\nLaylitna Studio`;
              const waShareUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;

              return (
                <div 
                  key={w.slug}
                  className="bg-white/5 border border-white/10 hover:border-[#cebb78]/50 rounded-2xl p-5 transition-all space-y-4"
                >
                  {/* Card Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-1.5">
                          <span>{coupleName}</span>
                          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                          /{w.slug}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: templateObj.color || '#cebb78' }} />
                          {templateObj.name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <KeyRound className="w-3 h-3 text-[#cebb78]" />
                          PIN: <strong className="text-white font-mono">{w.secretPin || '1234'}</strong>
                        </span>
                        {w.customData?.dateText && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {w.customData.dateText}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats Pill */}
                    <div className="flex items-center gap-3 self-start sm:self-auto bg-black/30 px-3.5 py-1.5 rounded-xl border border-white/5">
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Attending</span>
                        <span className="text-sm font-bold text-emerald-400 font-mono">
                          {stats.totalGuests} guests
                        </span>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">RSVPs</span>
                        <span className="text-sm font-bold text-white font-mono">
                          {stats.totalResponses}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Links Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {/* Guest Link */}
                    <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">1. Guest Invite Link</span>
                        <span className="text-slate-200 font-mono text-[11px] truncate block">{guestUrl}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleCopy(guestUrl, `guest_${w.slug}`)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-medium flex items-center gap-1 transition-all"
                          title="Copy guest link"
                        >
                          {copiedKey === `guest_${w.slug}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `guest_${w.slug}` ? 'Copied' : 'Copy'}</span>
                        </button>
                        <a
                          href={guestUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-slate-400 hover:text-white"
                          title="Open invitation in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Bride Dashboard Link */}
                    <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-[10px] font-bold uppercase text-[#cebb78] block">2. Bride RSVP Dashboard (Option C Protected)</span>
                        <span className="text-slate-200 font-mono text-[11px] truncate block">{dashUrl}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleCopy(dashUrl, `dash_${w.slug}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#cebb78]/20 hover:bg-[#cebb78]/30 text-[#cebb78] text-[11px] font-medium flex items-center gap-1 transition-all border border-[#cebb78]/30"
                          title="Copy protected bride dashboard link"
                        >
                          {copiedKey === `dash_${w.slug}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `dash_${w.slug}` ? 'Copied' : 'Copy'}</span>
                        </button>
                        <button
                          onClick={() => onOpenDashboardForWedding ? onOpenDashboardForWedding(w.slug) : window.open(dashUrl, '_blank')}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Open dashboard"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={waShareUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                        title="Send ready-to-share message to the bride via WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send to Bride via WhatsApp</span>
                      </a>

                      <button
                        onClick={() => onOpenDashboardForWedding ? onOpenDashboardForWedding(w.slug) : window.open(dashUrl, '_blank')}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>View RSVPs ({stats.totalResponses})</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenStudioForWedding(w)}
                        className="px-4 py-1.5 rounded-lg bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Customize in Studio →</span>
                      </button>

                      {w.slug !== 'hadi' && (
                        <button
                          onClick={() => handleDelete(w.slug, coupleName)}
                          className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete wedding project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Option C Protection Active: Unlocked with secret key or 4-digit PIN.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
