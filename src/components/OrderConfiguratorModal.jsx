import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, ArrowLeft, ArrowRight, Check, Plus, Trash2, 
  Sparkles, Zap, MessageCircle, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { TEMPLATES, SAVE_THE_DATES } from '../data/templates';
import { OPTIONAL_SECTIONS, FREE_INCLUDED_SECTIONS, EXTRAS, BUNDLES } from '../data/pricing';
import { LANGUAGES } from '../data/languages';

export function OrderConfiguratorModal({ 
  isOpen, 
  onClose, 
  initialPackage = 'template', 
  initialDesign = null, 
  initialCustomData = null,
  onOpenFullTemplate 
}) {
  const [pkgType, setPkgType] = useState(initialPackage); // 'std', 'template', 'custom'
  const [selectedDesign, setSelectedDesign] = useState(initialDesign);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [customSpecs, setCustomSpecs] = useState(initialCustomData);

  // Save the Date State
  const [stdDetails, setStdDetails] = useState({
    p1: initialCustomData?.partner1 || '',
    p2: initialCustomData?.partner2 || '',
    date: initialCustomData?.dateText || '',
    venue: initialCustomData?.venueName || '',
    colour: '',
    addons: [],
    otherText: '',
    lang1: 'English',
    extraLangs: [],
    name: '',
    email: ''
  });

  // Template / Custom State
  const [tplDetails, setTplDetails] = useState({
    sections: ['timeline', 'map'], // default 2 free
    customSections: [],
    lang1: 'English',
    extraLangs: [],
    extras: [],
    bundles: [],
    linksCount: 0,
    versionsCount: 0,
    eventDate: initialCustomData?.dateText || '',
    notes: initialCustomData?.partner1 ? `Personalized Couple: ${initialCustomData.partner1} & ${initialCustomData.partner2}${initialCustomData.venueName ? ` | Venue: ${initialCustomData.venueName}` : ''}${initialCustomData.photoUrl ? ' | (Photo Uploaded)' : ''}` : '',
    name: '',
    email: ''
  });

  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Sync initial props
  useEffect(() => {
    if (isOpen) {
      setPkgType(initialPackage);
      setSelectedDesign(initialDesign);
      setCustomSpecs(initialCustomData);
      if (initialCustomData) {
        if (initialCustomData.partner1) {
          setStdDetails((prev) => ({
            ...prev,
            p1: initialCustomData.partner1 || prev.p1,
            p2: initialCustomData.partner2 || prev.p2,
            date: initialCustomData.dateText || prev.date,
            venue: initialCustomData.venueName || prev.venue
          }));
          setTplDetails((prev) => ({
            ...prev,
            eventDate: initialCustomData.dateText || prev.eventDate,
            notes: `Personalized Couple: ${initialCustomData.partner1} & ${initialCustomData.partner2}${initialCustomData.venueName ? ` | Venue: ${initialCustomData.venueName}` : ''}${initialCustomData.photoUrl ? ' | (Photo Uploaded)' : ''}`
          }));
        }
      }
      setCurrentStepIndex(0);
      setOrderSubmitted(false);
      setValidationError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialPackage, initialDesign, initialCustomData]);

  // Steps Definition
  const steps = useMemo(() => {
    if (pkgType === 'std') {
      return ['design', 'details', 'addons', 'languages', 'contact'];
    }
    if (pkgType === 'custom') {
      return ['sections', 'languages', 'extras', 'links', 'contact'];
    }
    return ['design', 'sections', 'languages', 'extras', 'links', 'contact'];
  }, [pkgType]);

  const currentStep = steps[currentStepIndex] || 'design';

  // Real-time Pricing Calculation
  const calculation = useMemo(() => {
    let total = 0;
    const breakdown = [];

    if (pkgType === 'std') {
      total = 35;
      breakdown.push({ label: 'Save the Date Package', price: 35 });

      stdDetails.addons.forEach((aid) => {
        const pr = aid === 'express' ? 30 : 15;
        const name = aid === 'express' ? 'Express 24h Delivery' : aid;
        total += pr;
        breakdown.push({ label: name, price: pr });
      });

      if (stdDetails.otherText.trim()) {
        total += 15;
        breakdown.push({ label: 'Custom Section', price: 15 });
      }

      if (stdDetails.extraLangs.length > 0) {
        const langTotal = stdDetails.extraLangs.length * 15;
        total += langTotal;
        breakdown.push({ label: `${stdDetails.extraLangs.length}× Additional Language`, price: langTotal });
      }
    } else {
      // Template or Custom
      const basePrice = pkgType === 'custom' ? 135 : 75;
      total = basePrice;
      breakdown.push({
        label: pkgType === 'custom' ? 'Custom Bespoke Invitation' : 'Template Invitation',
        price: basePrice
      });

      // Sections (first 2 free, +15 each after)
      const paidSectionsCount = Math.max(0, tplDetails.sections.length - 2);
      if (paidSectionsCount > 0) {
        const secTotal = paidSectionsCount * 15;
        total += secTotal;
        breakdown.push({ label: `${paidSectionsCount}× Extra Section`, price: secTotal });
      }

      // Custom sections (+15 each)
      const validCustomSecs = tplDetails.customSections.filter((s) => s.trim()).length;
      if (validCustomSecs > 0) {
        const cTotal = validCustomSecs * 15;
        total += cTotal;
        breakdown.push({ label: `${validCustomSecs}× Custom Section`, price: cTotal });
      }

      // Extra Languages (+15 each)
      if (tplDetails.extraLangs.length > 0) {
        const elTotal = tplDetails.extraLangs.length * 15;
        total += elTotal;
        breakdown.push({ label: `${tplDetails.extraLangs.length}× Additional Language`, price: elTotal });
      }

      // Bundles
      if (tplDetails.bundles.includes('sig')) {
        total += 30;
        breakdown.push({ label: 'Signature Bundle (Wax + Envelope)', price: 30 });
      }
      if (tplDetails.bundles.includes('story')) {
        total += 50;
        breakdown.push({ label: 'Story Bundle (Illustration + AI Video)', price: 50 });
      }

      // Individual Extras (excluding those in active bundles)
      const bundledItemIds = [
        ...(tplDetails.bundles.includes('sig') ? ['wax', 'envelope'] : []),
        ...(tplDetails.bundles.includes('story') ? ['illus', 'video'] : [])
      ];

      tplDetails.extras.forEach((eid) => {
        if (bundledItemIds.includes(eid)) return;
        const ext = EXTRAS.find((x) => x.id === eid);
        if (ext) {
          total += ext.price;
          breakdown.push({ label: ext.name, price: ext.price });
        }
      });

      // Guest links (+3 each)
      if (tplDetails.linksCount > 0) {
        const lTotal = tplDetails.linksCount * 3;
        total += lTotal;
        breakdown.push({ label: `${tplDetails.linksCount}× Personalised Guest Links`, price: lTotal });
      }

      // Extra versions (+15 each)
      if (tplDetails.versionsCount > 0) {
        const vTotal = tplDetails.versionsCount * 15;
        total += vTotal;
        breakdown.push({ label: `${tplDetails.versionsCount}× Extra Version`, price: vTotal });
      }
    }

    return { total, breakdown };
  }, [pkgType, stdDetails, tplDetails]);

  // Validation & Navigation
  const handleNextStep = () => {
    setValidationError('');

    if (currentStep === 'design' && !selectedDesign) {
      setValidationError('Please select a design style to continue');
      return;
    }

    if (currentStep === 'details' && pkgType === 'std') {
      if (!stdDetails.p1.trim() || !stdDetails.p2.trim() || !stdDetails.date.trim()) {
        setValidationError('Please fill in both names and the wedding date');
        return;
      }
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrevStep = () => {
    setValidationError('');
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      onClose();
    }
  };

  const handleFinalSubmit = () => {
    const name = pkgType === 'std' ? stdDetails.name : tplDetails.name;
    const email = pkgType === 'std' ? stdDetails.email : tplDetails.email;

    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setValidationError('Please enter your full name and a valid email address');
      return;
    }

    // Fire Confetti Animation
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#006989', '#cebb78', '#08004b', '#25D366']
      });
    } catch (e) {
      // ignore if canvas not supported
    }

    setOrderSubmitted(true);
  };

  // WhatsApp Order Link Builder
  const getWhatsAppOrderUrl = () => {
    const designName = selectedDesign || (pkgType === 'custom' ? '100% Bespoke' : 'Not Selected');
    const coupleText = (customSpecs?.partner1 && customSpecs?.partner2)
      ? `${customSpecs.partner1} & ${customSpecs.partner2}`
      : (stdDetails.p1 ? `${stdDetails.p1} & ${stdDetails.p2}` : '');

    const lines = [
      `*New Luxury Invitation Order* 💍`,
      `---------------------------------`,
      `*Package:* ${pkgType === 'std' ? 'Save the Date' : pkgType === 'custom' ? 'Custom Invitation' : 'Template Invitation'}`,
      `*Design Style:* ${designName}`,
      ...(coupleText ? [`*Couple Names:* ${coupleText}`] : []),
      ...(customSpecs?.venueName ? [`*Venue:* ${customSpecs.venueName}`] : []),
      `*Customer:* ${pkgType === 'std' ? stdDetails.name : tplDetails.name}`,
      `*Email:* ${pkgType === 'std' ? stdDetails.email : tplDetails.email}`,
      `*Event Date:* ${pkgType === 'std' ? stdDetails.date : tplDetails.eventDate || 'TBD'}`,
      `*Total Price:* €${calculation.total}`,
      `---------------------------------`,
      `*Breakdown:*`,
      ...calculation.breakdown.map((b) => `• ${b.label}: €${b.price}`),
      `---------------------------------`,
      `Please confirm my order and send the next steps!`
    ];
    return `https://wa.me/96170710406?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  if (!isOpen) return null;

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header & Progress Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevStep}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="font-serif text-lg font-bold text-[#08004b] flex items-center gap-2">
                <span>
                  {pkgType === 'std'
                    ? 'Build Your Save the Date'
                    : pkgType === 'custom'
                    ? 'Build Your Custom Invitation'
                    : 'Build Your Template Invitation'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#006989]/10 text-[#006989] font-sans font-bold">
                  €{calculation.total}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Step {currentStepIndex + 1} of {steps.length} {currentStepIndex >= steps.length - 2 ? '— almost there!' : ''}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-[#006989] h-1.5 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {orderSubmitted ? (
            /* Order Success View */
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-[#08004b]">
                  Your Invitation is Booked!
                </h3>
                <p className="text-slate-600 text-sm mt-2">
                  Thank you! Your custom configuration has been created.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex justify-between">
                  <span>Configuration Summary</span>
                  <span className="text-[#006989]">€{calculation.total}</span>
                </div>
                {calculation.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span>{item.label}</span>
                    <span className="font-medium">+€{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Order to Designer via WhatsApp</span>
                </a>

                <p className="text-[11px] text-slate-400">
                  Or email us directly at support@ourweddinginvitations.com
                </p>
              </div>
            </div>
          ) : (
            /* Multi-step form views */
            <div>
              {validationError && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 flex items-center gap-2">
                  <span>⚠️ {validationError}</span>
                </div>
              )}

              {/* STEP: Design Selection */}
              {currentStep === 'design' && (
                <div>
                  <div className="mb-6">
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      1. Choose your style
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Every design is fully personalised to you — your colors, your photos, and your text.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(pkgType === 'std' ? SAVE_THE_DATES : TEMPLATES).map((item) => {
                      const isSelected = selectedDesign === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedDesign(item.id)}
                          className={`group rounded-2xl overflow-hidden border-2 cursor-pointer transition-all p-3 flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#006989] bg-[#f2f9fd] shadow-md'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="rounded-xl overflow-hidden aspect-[16/11] bg-slate-100 mb-3 relative">
                              <img src={item.gif} alt={item.name} className="w-full h-full object-cover" />
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#006989] text-white flex items-center justify-center text-xs font-bold shadow-md">
                                  ✓
                                </div>
                              )}
                            </div>
                            <h5 className="font-serif text-lg font-bold text-[#08004b] leading-snug">
                              {item.name}
                            </h5>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                              {item.desc}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenFullTemplate) onOpenFullTemplate(item.id);
                            }}
                            className="text-[11px] font-bold text-[#006989] mt-3 inline-flex items-center gap-1 hover:underline text-left"
                          >
                            <span>Live example</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP: Save the Date Details */}
              {currentStep === 'details' && pkgType === 'std' && (
                <div className="space-y-4 max-w-lg mx-auto">
                  <div className="mb-6">
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      2. Your celebration details
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      We'll populate your interactive save the date with these details.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">First Partner *</label>
                      <input
                        type="text"
                        placeholder="e.g. Sophie"
                        value={stdDetails.p1}
                        onChange={(e) => setStdDetails({ ...stdDetails, p1: e.target.value })}
                        className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Second Partner *</label>
                      <input
                        type="text"
                        placeholder="e.g. James"
                        value={stdDetails.p2}
                        onChange={(e) => setStdDetails({ ...stdDetails, p2: e.target.value })}
                        className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Wedding Date *</label>
                    <input
                      type="text"
                      placeholder="e.g. 14 September 2025"
                      value={stdDetails.date}
                      onChange={(e) => setStdDetails({ ...stdDetails, date: e.target.value })}
                      className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Venue (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Château de Versailles, France"
                      value={stdDetails.venue}
                      onChange={(e) => setStdDetails({ ...stdDetails, venue: e.target.value })}
                      className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Colour Palette (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. blush and gold, sage and ivory..."
                      value={stdDetails.colour}
                      onChange={(e) => setStdDetails({ ...stdDetails, colour: e.target.value })}
                      className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP: Save the Date Add-ons */}
              {currentStep === 'addons' && pkgType === 'std' && (
                <div>
                  <div className="mb-6">
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      3. Enhance your Save the Date
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Optional extras crafted specifically for you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'express', name: 'Express Delivery (24h)', price: 30, badge: 'Fast ★' },
                      { id: 'rsvp', name: 'RSVP Form', price: 15, badge: 'Popular' },
                      { id: 'countdown', name: 'Countdown Timer', price: 15, badge: 'Popular' },
                      { id: 'music', name: 'Background Music', price: 15, badge: 'Romantic' },
                      { id: 'map', name: 'Google Map Directions', price: 15 },
                      { id: 'gallery', name: 'Photo Gallery', price: 15 },
                      { id: 'lovestory', name: 'Love Story Timeline', price: 15 },
                      { id: 'childhood', name: 'Childhood Photos', price: 15, badge: 'New' },
                    ].map((addon) => {
                      const isChecked = stdDetails.addons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => {
                            const newArr = isChecked
                              ? stdDetails.addons.filter((x) => x !== addon.id)
                              : [...stdDetails.addons, addon.id];
                            setStdDetails({ ...stdDetails, addons: newArr });
                          }}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            isChecked
                              ? 'border-[#006989] bg-[#f2f9fd]'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                              isChecked ? 'bg-[#006989] text-white' : 'border border-slate-300 bg-slate-50'
                            }`}>
                              {isChecked && '✓'}
                            </div>
                            <div>
                              <span className="text-xs sm:text-sm font-bold text-slate-800">{addon.name}</span>
                              {addon.badge && (
                                <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#006989]/10 text-[#006989]">
                                  {addon.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-500">+€{addon.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP: Template Sections Builder */}
              {currentStep === 'sections' && (
                <div>
                  <div className="mb-6">
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      Choose your invitation sections
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Date & Location, Welcome Message, and RSVP Tracking are always included free. Choose any 2 additional sections for free (+€15 each after).
                    </p>
                  </div>

                  {/* Always Included */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {FREE_INCLUDED_SECTIONS.map((sec, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        {sec} (Always Free)
                      </span>
                    ))}
                  </div>

                  {/* Optional Sections Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {OPTIONAL_SECTIONS.map((sec) => {
                      const isSelected = tplDetails.sections.includes(sec.id);
                      const selectedIndex = tplDetails.sections.indexOf(sec.id);
                      const isFree = selectedIndex >= 0 && selectedIndex < 2;

                      return (
                        <div
                          key={sec.id}
                          onClick={() => {
                            const newArr = isSelected
                              ? tplDetails.sections.filter((x) => x !== sec.id)
                              : [...tplDetails.sections, sec.id];
                            setTplDetails({ ...tplDetails, sections: newArr });
                          }}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#006989] bg-[#f2f9fd]'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-xs sm:text-sm text-slate-800">{sec.name}</span>
                            {isSelected && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isFree ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {isFree ? 'Free' : '+€15'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight">
                            {sec.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Sections Input */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-bold text-sm text-slate-800">Need a custom section?</h5>
                        <p className="text-xs text-slate-500">+€15 each</p>
                      </div>
                      <button
                        onClick={() => setTplDetails({ ...tplDetails, customSections: [...tplDetails.customSections, ''] })}
                        className="px-3 py-1.5 rounded-lg border border-[#006989] text-[#006989] text-xs font-bold hover:bg-[#e6f3f7] flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Custom Section
                      </button>
                    </div>

                    {tplDetails.customSections.map((secVal, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="e.g. Boat Cruise Details, Day-After Recovery Brunch..."
                          value={secVal}
                          onChange={(e) => {
                            const newCustom = [...tplDetails.customSections];
                            newCustom[idx] = e.target.value;
                            setTplDetails({ ...tplDetails, customSections: newCustom });
                          }}
                          className="flex-1 p-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-[#006989]"
                        />
                        <button
                          onClick={() => {
                            const newCustom = tplDetails.customSections.filter((_, i) => i !== idx);
                            setTplDetails({ ...tplDetails, customSections: newCustom });
                          }}
                          className="p-2 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP: Languages */}
              {currentStep === 'languages' && (
                <div className="max-w-lg mx-auto space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      Select your language(s)
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Primary language is free. Add extra language versions for bilingual or international celebrations.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Language (Free)
                    </label>
                    <select
                      value={pkgType === 'std' ? stdDetails.lang1 : tplDetails.lang1}
                      onChange={(e) => {
                        if (pkgType === 'std') setStdDetails({ ...stdDetails, lang1: e.target.value });
                        else setTplDetails({ ...tplDetails, lang1: e.target.value });
                      }}
                      className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none bg-white"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Additional Languages (+€15 each)
                    </label>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        if (pkgType === 'std') {
                          if (!stdDetails.extraLangs.includes(val)) {
                            setStdDetails({ ...stdDetails, extraLangs: [...stdDetails.extraLangs, val] });
                          }
                        } else {
                          if (!tplDetails.extraLangs.includes(val)) {
                            setTplDetails({ ...tplDetails, extraLangs: [...tplDetails.extraLangs, val] });
                          }
                        }
                        e.target.value = '';
                      }}
                      className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none bg-white"
                    >
                      <option value="">Select to add a language...</option>
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>

                    {/* Added tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(pkgType === 'std' ? stdDetails.extraLangs : tplDetails.extraLangs).map((lang) => (
                        <span key={lang} className="px-3 py-1 rounded-full bg-[#006989]/10 text-[#006989] text-xs font-bold flex items-center gap-1.5">
                          {lang} (+€15)
                          <button
                            onClick={() => {
                              if (pkgType === 'std') {
                                setStdDetails({ ...stdDetails, extraLangs: stdDetails.extraLangs.filter((l) => l !== lang) });
                              } else {
                                setTplDetails({ ...tplDetails, extraLangs: tplDetails.extraLangs.filter((l) => l !== lang) });
                              }
                            }}
                            className="hover:text-red-500 font-bold ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <strong>Don't see your language?</strong> We support <strong>ALL</strong> written languages in the world. Just select English and mention your required language in the notes.
                  </div>
                </div>
              )}

              {/* STEP: Extras & Bundles */}
              {currentStep === 'extras' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      Special Touches & Curated Bundles
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Most couples add 2 extras to make their digital invitation uniquely memorable.
                    </p>
                  </div>

                  {/* Bundles */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-2">
                      ⭐ Curated Bundles (Best Value)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {BUNDLES.map((b) => {
                        const isSelected = tplDetails.bundles.includes(b.id);
                        return (
                          <div
                            key={b.id}
                            onClick={() => {
                              const newB = isSelected
                                ? tplDetails.bundles.filter((x) => x !== b.id)
                                : [...tplDetails.bundles, b.id];
                              setTplDetails({ ...tplDetails, bundles: newB });
                            }}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#cebb78] bg-[#faf8f0] shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-sm text-[#08004b]">{b.name}</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-bold text-sm text-[#cebb78]">€{b.price}</span>
                                <span className="text-xs text-slate-400 line-through">€{b.originalPrice}</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600">{b.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual Extras */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Individual Extras
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {EXTRAS.map((extra) => {
                        const isSelected = tplDetails.extras.includes(extra.id);
                        return (
                          <div
                            key={extra.id}
                            onClick={() => {
                              const newE = isSelected
                                ? tplDetails.extras.filter((x) => x !== extra.id)
                                : [...tplDetails.extras, extra.id];
                              setTplDetails({ ...tplDetails, extras: newE });
                            }}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#006989] bg-[#f2f9fd]'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs sm:text-sm text-slate-800">{extra.name}</span>
                              <span className="text-xs font-bold text-slate-600">+€{extra.price}</span>
                            </div>
                            <p className="text-[11px] text-slate-500">{extra.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP: Guest Links & Versions */}
              {currentStep === 'links' && (
                <div className="max-w-lg mx-auto space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      Personalised Links & Extra Versions
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Make each guest feel honored by having their name appear directly on the opening screen.
                    </p>
                  </div>

                  {/* Links Counter */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-slate-800 block">Personalised Guest Links</span>
                        <span className="text-xs text-slate-500">€3 per guest link</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setTplDetails({ ...tplDetails, linksCount: Math.max(0, tplDetails.linksCount - 5) })}
                          className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold hover:bg-slate-100"
                        >
                          −
                        </button>
                        <span className="font-bold text-base w-8 text-center">{tplDetails.linksCount}</span>
                        <button
                          onClick={() => setTplDetails({ ...tplDetails, linksCount: tplDetails.linksCount + 5 })}
                          className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Versions Selector */}
                  <div>
                    <span className="font-bold text-sm text-slate-800 block mb-1">Different Event Versions</span>
                    <span className="text-xs text-slate-500 block mb-3">
                      e.g. Ceremony + Dinner guests vs Evening Party guests (+€15 per extra version)
                    </span>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3].map((v) => (
                        <button
                          key={v}
                          onClick={() => setTplDetails({ ...tplDetails, versionsCount: v })}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            tplDetails.versionsCount === v
                              ? 'bg-[#006989] text-white border-[#006989]'
                              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {v === 0 ? 'Just 1' : `+${v} (€${v * 15})`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP: Contact & Checkout */}
              {currentStep === 'contact' && (
                <div className="max-w-lg mx-auto space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#08004b]">
                      Contact Details & Final Review
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                      Our designer will reach out with your private questionnaire and live draft link.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Charlotte Miller"
                        value={pkgType === 'std' ? stdDetails.name : tplDetails.name}
                        onChange={(e) => {
                          if (pkgType === 'std') setStdDetails({ ...stdDetails, name: e.target.value });
                          else setTplDetails({ ...tplDetails, name: e.target.value });
                        }}
                        className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={pkgType === 'std' ? stdDetails.email : tplDetails.email}
                        onChange={(e) => {
                          if (pkgType === 'std') setStdDetails({ ...stdDetails, email: e.target.value });
                          else setTplDetails({ ...tplDetails, email: e.target.value });
                        }}
                        className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                      />
                    </div>
                  </div>

                  {pkgType !== 'std' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Event Date (optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 14 September 2025"
                          value={tplDetails.eventDate}
                          onChange={(e) => setTplDetails({ ...tplDetails, eventDate: e.target.value })}
                          className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Notes for Your Designer (optional)</label>
                        <textarea
                          placeholder="Preferred colors, special requests, timeline questions..."
                          value={tplDetails.notes}
                          onChange={(e) => setTplDetails({ ...tplDetails, notes: e.target.value })}
                          rows={2}
                          className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-[#006989] focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Itemized Calculation Summary */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="font-bold text-slate-800 border-b border-slate-200 pb-2">
                      Summary of Your Selection
                    </div>
                    {calculation.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-slate-600">
                        <span>{item.label}</span>
                        <span className="font-medium">+€{item.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-serif text-base font-bold text-[#08004b]">
                      <span>Total</span>
                      <span>€{calculation.total}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Action Bar */}
        {!orderSubmitted && (
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold text-slate-400">Total Price</span>
              <span className="font-serif text-2xl font-bold text-[#08004b]">
                €{calculation.total}
              </span>
            </div>

            <button
              onClick={handleNextStep}
              className="px-8 py-3.5 rounded-full bg-[#006989] hover:bg-[#005570] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>{currentStepIndex === steps.length - 1 ? "Let's Bring It To Life →" : "Continue"}</span>
              {currentStepIndex < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
