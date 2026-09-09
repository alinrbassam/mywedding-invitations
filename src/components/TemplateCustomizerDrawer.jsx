import React, { useState, useRef } from 'react';
import { 
  X, Heart, Calendar, MapPin, Camera, Clock, 
  Sparkles, RotateCcw, Check, ShoppingBag, Upload, 
  Trash2, Plus, Info, ChevronRight, RefreshCw,
  ChevronDown, ChevronUp, Eye, Maximize2, Minimize2,
  Languages, ExternalLink, Palette, Loader2 
} from 'lucide-react';

const BLOSSOM_OUD_PALETTES = [
  { name: '🌿 Desert Olive & Burgundy (Default)', colors: ['#60603b', '#360c1a', '#40312c', '#efdfcd'] },
  { name: '🌸 Blush & Terracotta', colors: ['#8c4f56', '#c47d6a', '#d9a58b', '#fae8df'] },
  { name: '👑 Royal Emerald & Gold', colors: ['#1b4332', '#2d6a4f', '#b89758', '#f8f5ee'] },
  { name: '🌊 Aegean Midnight', colors: ['#081c3b', '#1a365d', '#8b9bb4', '#f0f4f8'] },
  { name: '🌾 Warm Almond & Champagne', colors: ['#7a5c43', '#a48467', '#c9b097', '#fdfbf7'] }
];

const DOLCE_VITA_PALETTES = [
  { name: '🍋 Amalfi Pastel Coastal (Default)', colors: ['#faf1db', '#f5d9b1', '#f2cac9', '#afcff1', '#7ebbfa'] },
  { name: '☀️ Positano Sunset', colors: ['#ffedd5', '#fed7aa', '#fca5a5', '#f43f5e', '#881337'] },
  { name: '🌊 Capri Azure & Lemon', colors: ['#fef08a', '#e0f2fe', '#7dd3fc', '#0284c7', '#0369a1'] },
  { name: '🌿 Ravello Olive & Terracotta', colors: ['#fef3c7', '#fde68a', '#d97706', '#65a30d', '#365314'] },
  { name: '🍷 Tuscan Garden & Chianti', colors: ['#fae8ff', '#f0abfc', '#c084fc', '#7c3aed', '#581c87'] },
  { name: '👑 Royal Italian Gold & Navy', colors: ['#fef9c3', '#fde047', '#93c5fd', '#1d4ed8', '#1e1b4b'] }
];

const PALETTE_PRESETS = BLOSSOM_OUD_PALETTES;

const PHOTO_PRESETS = [
  {
    name: 'Romantic Coastal',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Italian Villa',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Classic Black Tie',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Garden Romance',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80'
  }
];

const DOLCE_VITA_DEFAULT_GALLERY = [
  'https://static.tildacdn.net/tild3636-6361-4930-b032-303334643635/fe849b681b9cfddb0d3b.png',
  'https://static.tildacdn.net/tild6534-6461-4737-a535-383131303433/929df5d91510928224dc.png',
  'https://static.tildacdn.net/tild6336-3439-4466-b332-383265633833/0b221d34a7bea5af08ac.jpg',
  'https://static.tildacdn.net/tild3164-3730-4539-b833-356663306534/fe9b100e056d201daaa0.jpg',
  'https://static.tildacdn.net/tild3765-6165-4631-a432-383936306336/1be83ec7c312b2e66a71.jpg',
  'https://static.tildacdn.net/tild3739-3133-4436-b536-313739653132/cbd7efbf41ddb54271af.jpg',
  'https://static.tildacdn.net/tild6562-3130-4965-b235-376232326561/61a01dd884f0c3b00bd5.jpg',
  'https://static.tildacdn.net/tild3336-6363-4363-b462-306330343939/fd70c331309855caacec.jpg',
  'https://static.tildacdn.net/tild3238-3063-4861-a134-626434323464/3f985b99d3bfbb52bbf7.jpg',
  'https://static.tildacdn.net/tild3436-3931-4635-a665-333365626134/feb970b653de72df570f.jpg'
];

const GALLERY_PRESETS = [
  {
    name: '🍋 Italian Riviera (Default)',
    desc: 'Original 10 summer chic coastal outfits',
    photos: DOLCE_VITA_DEFAULT_GALLERY
  },
  {
    name: '🌊 Mediterranean Coastal Pastels',
    desc: 'Soft pastels & seaside linens',
    photos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    name: '🎩 Formal Black Tie & Evening',
    desc: 'Midnight tuxedos & elegant gowns',
    photos: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const DOLCE_VITA_DEFAULT_BOTTOM_PHOTO = 'https://static.tildacdn.net/tild3965-6266-4165-b837-303236623330/elegant-couple-love-.jpg';

const BOTTOM_PHOTO_PRESETS = [
  {
    name: 'Romantic Coast (Default)',
    url: DOLCE_VITA_DEFAULT_BOTTOM_PHOTO
  },
  {
    name: 'Beach Sunset Embrace',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Classic Black Tie',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Italian Villa Garden',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  }
];

export function TemplateCustomizerDrawer({ 
  isOpen, 
  onClose, 
  templateInfo, 
  customData, 
  onChangeCustomData, 
  onResetCustomData,
  onUpdateView,
  isUpdating = false,
  mobileSheetMode = 'half',
  onMobileSheetModeChange,
  isInlineDesktop = false,
  isDockedSidebar = false,
  onSaveAndOrder,
  activeTab: externalActiveTab,
  onTabChange 
}) {
  const [internalTab, setInternalTab] = useState('names');
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalTab;
  const setActiveTab = onTabChange || setInternalTab;
  const [localSheetMode, setLocalSheetMode] = useState('half');
  const sheetMode = onMobileSheetModeChange ? mobileSheetMode : localSheetMode;
  const setSheetMode = onMobileSheetModeChange || setLocalSheetMode;
  const fileInputRef = useRef(null);
  const galleryAddInputRef = useRef(null);
  const galleryReplaceInputRef = useRef(null);
  const bottomPhotoInputRef = useRef(null);
  const [replacingGalleryIdx, setReplacingGalleryIdx] = useState(null);
  const [isResolvingMap, setIsResolvingMap] = useState(false);
  const [mapResolvedMsg, setMapResolvedMsg] = useState('');

  const handleMapUrlChange = async (url) => {
    const trimmed = url.trim();
    const updated = { ...customData, mapUrl: trimmed };

    if (trimmed.includes('maps.app.goo.gl') || trimmed.includes('goo.gl/maps')) {
      setIsResolvingMap(true);
      setMapResolvedMsg('Resolving location pin...');
      onChangeCustomData(updated);
      try {
        const res = await fetch(`/api/resolve-maps-url?url=${encodeURIComponent(trimmed)}`);
        const json = await res.json();
        if (json.success && json.embedUrl) {
          onChangeCustomData({
            ...updated,
            mapEmbedUrl: json.embedUrl,
            venueCoords: json.lat && json.lng ? `${json.lat}, ${json.lng}` : undefined
          });
          setMapResolvedMsg(json.lat && json.lng ? `✓ Pinned to ${json.lat}, ${json.lng}` : '✓ Map pin updated');
        } else {
          setMapResolvedMsg('');
        }
      } catch (err) {
        setMapResolvedMsg('');
      } finally {
        setIsResolvingMap(false);
        setTimeout(() => setMapResolvedMsg(''), 5000);
      }
    } else {
      const coordMatch = trimmed.match(/search\/(-?\d+\.\d+),\+?(-?\d+\.\d+)/) ||
                         trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) ||
                         trimmed.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        updated.mapEmbedUrl = `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
        setMapResolvedMsg(`✓ Pinned to ${coordMatch[1]}, ${coordMatch[2]}`);
        setTimeout(() => setMapResolvedMsg(''), 5000);
      } else {
        updated.mapEmbedUrl = '';
      }
      onChangeCustomData(updated);
    }
  };

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        onChangeCustomData({ ...customData, photoUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleGalleryAdd = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        const currentList = customData.galleryPhotos ? [...customData.galleryPhotos] : [...DOLCE_VITA_DEFAULT_GALLERY];
        currentList.push(dataUrl);
        onChangeCustomData({ ...customData, galleryPhotos: currentList });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const triggerGalleryReplace = (idx) => {
    setReplacingGalleryIdx(idx);
    if (galleryReplaceInputRef.current) {
      galleryReplaceInputRef.current.value = '';
      galleryReplaceInputRef.current.click();
    }
  };

  const handleGalleryReplace = (e) => {
    const file = e.target.files?.[0];
    if (!file || replacingGalleryIdx === null) return;
    const targetIdx = replacingGalleryIdx;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        const currentList = customData.galleryPhotos ? [...customData.galleryPhotos] : [...DOLCE_VITA_DEFAULT_GALLERY];
        currentList[targetIdx] = dataUrl;
        onChangeCustomData({ ...customData, galleryPhotos: currentList });
      }
      setReplacingGalleryIdx(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveGalleryPhoto = (idx) => {
    const currentList = customData.galleryPhotos ? [...customData.galleryPhotos] : [...DOLCE_VITA_DEFAULT_GALLERY];
    currentList.splice(idx, 1);
    onChangeCustomData({ ...customData, galleryPhotos: currentList });
  };

  const handleBottomPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        onChangeCustomData({ ...customData, bottomPhotoUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const tabs = [
    { id: 'names', label: 'Names', icon: Heart },
    { id: 'date', label: 'Date & Time', icon: Calendar },
    { id: 'venue', label: 'Location', icon: MapPin },
    { id: 'wording', label: 'Wording', icon: Languages },
    { id: 'photo', label: 'Photos', icon: Camera },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'details', label: 'Details', icon: Sparkles },
  ];

  const containerClasses = isInlineDesktop
    ? 'w-full h-full bg-white flex flex-col overflow-hidden text-slate-800'
    : isDockedSidebar
    ? 'fixed z-50 top-14 bottom-0 right-0 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-all duration-300'
    : `fixed z-50 bg-white shadow-2xl border-slate-200 flex flex-col transition-all duration-300 ease-out md:hidden ${
        sheetMode === 'half'
          ? 'bottom-0 inset-x-0 h-[50vh] max-h-[50vh] rounded-t-3xl border-t shadow-[0_-12px_30px_rgba(0,0,0,0.35)]'
          : sheetMode === 'peek'
          ? 'bottom-0 inset-x-0 h-[56px] max-h-[56px] rounded-t-2xl border-t shadow-[0_-8px_20px_rgba(0,0,0,0.25)] overflow-hidden'
          : 'bottom-0 inset-x-0 h-[88vh] max-h-[88vh] rounded-t-3xl border-t shadow-[0_-12px_30px_rgba(0,0,0,0.35)]'
      }`;

  return (
    <aside className={containerClasses}>
      
      {/* Mobile Collapsed Peek Bar (Allows 100% full view of the card on phone) */}
      {!isInlineDesktop && !isDockedSidebar && sheetMode === 'peek' ? (
        <div 
          onClick={() => setSheetMode('half')}
          className="h-[56px] px-4 bg-[#08004b] text-white flex items-center justify-between cursor-pointer md:hidden hover:bg-[#0c006b] transition-all shrink-0"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-xs font-serif font-bold text-[#cebb78] truncate">
              {customData.partner1 || 'Partner 1'} &amp; {customData.partner2 || 'Partner 2'}
            </span>
            <span className="text-[10px] text-slate-300 hidden xs:inline">• Tap to edit</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-white/15 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>Edit Card</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Top Actions Bar (Visible only on mobile phones) */}
          {!isInlineDesktop && !isDockedSidebar && (
            <div className="md:hidden flex items-center justify-between px-3.5 py-1.5 bg-[#08004b] text-white border-b border-slate-800 shrink-0">
              <button
                onClick={() => setSheetMode('peek')}
                className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full transition-all"
                title="Minimize editor to see full card"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Card</span>
              </button>

              {/* Drag Handle indicator */}
              <div 
                onClick={() => setSheetMode(sheetMode === 'half' ? 'full' : 'half')}
                className="w-12 h-1.5 bg-white/40 hover:bg-white/70 rounded-full cursor-pointer transition-all"
                title="Click to toggle size"
              />

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSheetMode(sheetMode === 'full' ? 'half' : 'full')}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-all"
                  title={sheetMode === 'full' ? "Split View (Half Screen)" : "Expand Editor"}
                >
                  {sheetMode === 'full' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-all"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Main Header */}
          <div className="p-3 sm:p-4 bg-[#08004b] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#cebb78]/20 flex items-center justify-center text-[#cebb78] shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-xs sm:text-base font-bold tracking-wide truncate">
                  Personalize Invitation
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">
                  Live instant preview on {templateInfo?.name || 'Template'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onUpdateView && (
                <button
                  onClick={onUpdateView}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#cebb78]/20 hover:bg-[#cebb78]/30 text-[#cebb78] border border-[#cebb78]/40 text-xs font-bold transition-all shadow-xs"
                  title="Force update view preview"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
                  <span className="hidden xs:inline">Update View</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="flex w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white items-center justify-center transition-all"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-time live status notification banner */}
          <div className="bg-emerald-50/90 border-b border-emerald-200/80 px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between text-[11px] text-emerald-800 shrink-0">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              Changes update on the spot as you type
            </span>
            {onUpdateView && (
              <button
                onClick={onUpdateView}
                className="font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 shrink-0 ml-2"
              >
                <RefreshCw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 border-b border-slate-200 overflow-x-auto shrink-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-white text-[#006989] shadow-xs border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 sm:space-y-5 text-slate-800 text-xs font-sans">
        
        {/* TAB 1: NAMES & COUPLE */}
        {activeTab === 'names' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <span>
                Type your names below — they update immediately in the invitation headline, envelope seal, and sign-off.
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Partner 1 First Name *</label>
              <input
                type="text"
                placeholder="e.g. Charlotte"
                value={customData.partner1}
                onChange={(e) => onChangeCustomData({ ...customData, partner1: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] focus:ring-1 focus:ring-[#006989] outline-none text-sm font-serif"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Name Connector</label>
                <select
                  value={customData.connector}
                  onChange={(e) => onChangeCustomData({ ...customData, connector: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#006989] outline-none text-xs"
                >
                  <option value="&">&amp; (Ampersand)</option>
                  <option value="and">and (Classic)</option>
                  <option value="+">+ (Modern)</option>
                  <option value="•">• (Dot)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Wax Seal Initials</label>
                <input
                  type="text"
                  maxLength={3}
                  placeholder="e.g. CW"
                  value={customData.initials || ''}
                  onChange={(e) => onChangeCustomData({ ...customData, initials: e.target.value.toUpperCase() })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs uppercase font-bold tracking-widest text-center"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Partner 2 First Name *</label>
              <input
                type="text"
                placeholder="e.g. William"
                value={customData.partner2}
                onChange={(e) => onChangeCustomData({ ...customData, partner2: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] focus:ring-1 focus:ring-[#006989] outline-none text-sm font-serif"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Preview Representation
              </span>
              <p className="font-serif text-lg font-bold text-[#08004b]">
                {customData.partner1 || 'Partner 1'} {customData.connector} {customData.partner2 || 'Partner 2'}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: DATE & TIME & COUNTDOWN */}
        {activeTab === 'date' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/80 text-[11px] text-blue-900 flex items-start gap-2">
              <Calendar className="w-4 h-4 shrink-0 text-blue-700 mt-0.5" />
              <span>
                Pick your date and time — the live countdown timer on the invitation recalculates in real-time!
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Date *</label>
                <input
                  type="date"
                  value={customData.dateInput || ''}
                  onChange={(e) => {
                    const dateVal = e.target.value;
                    if (!dateVal) return;
                    const [y, m, d] = dateVal.split('-');
                    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d), 17, 0, 0);
                    const formatted = dateObj.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    });
                    onChangeCustomData({ 
                      ...customData, 
                      dateInput: dateVal,
                      dateText: formatted,
                      targetDate: dateObj.toISOString()
                    });
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#006989] outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Time</label>
                <input
                  type="time"
                  value={customData.timeInput || '17:00'}
                  onChange={(e) => onChangeCustomData({ ...customData, timeInput: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#006989] outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Displayed Wedding Date Text</label>
              <input
                type="text"
                value={customData.dateText}
                onChange={(e) => onChangeCustomData({ ...customData, dateText: e.target.value })}
                placeholder="e.g. October 10, 2026"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs font-serif"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                You can customize this to include day of week (e.g. Saturday, October 10, 2026).
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: VENUE & LOCATION */}
        {activeTab === 'venue' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Venue / Ceremony Location *</label>
              <input
                type="text"
                placeholder="e.g. Villa Balbianello"
                value={customData.venueName}
                onChange={(e) => onChangeCustomData({ ...customData, venueName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs font-serif font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Physical Address *</label>
              <textarea
                rows={2}
                placeholder="e.g. Via Guido Monzino, 1, 22016 Tremezzina CO, Lake Como, Italy"
                value={customData.venueAddress}
                onChange={(e) => onChangeCustomData({ ...customData, venueAddress: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-700">Google Maps URL</label>
                {customData.mapUrl && (
                  <a 
                    href={customData.mapUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[11px] text-[#006989] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://maps.app.goo.gl/... or https://maps.google.com/..."
                  value={customData.mapUrl || ''}
                  onChange={(e) => handleMapUrlChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs pr-8"
                />
                {isResolvingMap && (
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#006989]" />
                  </div>
                )}
              </div>
              {mapResolvedMsg && (
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <span>{mapResolvedMsg}</span>
                </p>
              )}
              <p className="text-[10px] text-slate-400 mt-1">
                Paste any Google Maps link (e.g. <code>maps.app.goo.gl</code> or full link) — the template map and directions button update automatically!
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: WORDING & TEXTS & LANGUAGE */}
        {activeTab === 'wording' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Click-to-edit banner */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span>
                <strong>Visual Click-to-Edit:</strong> You can edit fields below OR tap directly on any text inside the invitation card to edit it in place!
              </span>
            </div>

            {/* Language Quick-Switch Buttons */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 text-xs">
                Language Preset (1-Click Switch)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onChangeCustomData({
                      ...customData,
                      language: 'en',
                      envelopeText: 'Tap to Open',
                      countdownTitle: 'The Celebration Begins',
                      timelineTitle: 'Event Timeline',
                      locationTitle: 'Location',
                      mapTitle: 'Google Maps Directions',
                      rsvpTitle: 'Confirm Your Attendance',
                      rsvpButtonText: 'SUBMIT RSVP',
                      rsvpNameLabel: 'Full Name',
                      rsvpCountLabel: 'Number of Guests',
                      rsvpAttendLabel: 'Will you be attending?',
                      rsvpYesLabel: 'Joyfully Accept',
                      rsvpNoLabel: 'Regretfully Decline',
                      closingText: 'Looking forward to celebrating with you',
                      invitationText: `Together with their families\n\n${customData.partner1 || 'Amira'} & ${customData.partner2 || 'Yusuf'}\n\nrequest the honour of your presence\nat their wedding celebration\n\n${customData.dateText || 'Saturday, May 20, 2027'}\nat ${customData.timeInput || '4:00 PM'}\n\nat`
                    });
                  }}
                  className="px-2.5 py-2 rounded-xl border border-slate-300 hover:border-[#006989] hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeCustomData({
                      ...customData,
                      language: 'fr',
                      envelopeText: 'Appuyez pour ouvrir',
                      countdownTitle: 'La Célébration Commence',
                      timelineTitle: "Chronologie de l'événement",
                      locationTitle: 'Lieu',
                      mapTitle: 'Itinéraire Google Maps',
                      rsvpTitle: 'Confirmez Votre Présence',
                      rsvpButtonText: 'SOUMETTRE',
                      rsvpNameLabel: 'Nom',
                      rsvpCountLabel: 'Nombre de personnes',
                      rsvpAttendLabel: 'Serez-vous présent?',
                      rsvpYesLabel: 'Oui, je serai présent(e)',
                      rsvpNoLabel: 'Désolé(e), je ne pourrai pas être présent(e)',
                      closingText: 'Au plaisir de vous accueillir',
                      invitationText: `Ensemble avec leurs familles\n\n${customData.partner1 || 'Amira'} & ${customData.partner2 || 'Yusuf'}\n\nont l'honneur de vous convier\nà la célébration de leur mariage\n\n${customData.dateText || 'Le Samedi 20 Mai 2027'}\nà ${customData.timeInput || '16h00'}\n\nau`
                    });
                  }}
                  className="px-2.5 py-2 rounded-xl border border-slate-300 hover:border-[#006989] hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>🇫🇷</span>
                  <span>Français</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeCustomData({
                      ...customData,
                      language: 'ar',
                      envelopeText: 'اضغط للفتح',
                      countdownTitle: 'العد التنازلي للحفل',
                      timelineTitle: 'برنامج الحفل',
                      locationTitle: 'المكان',
                      mapTitle: 'موقع الحفل على خرائط جوجل',
                      rsvpTitle: 'تأكيد الحضور',
                      rsvpButtonText: 'إرسال التأكيد',
                      rsvpNameLabel: 'الاسم الكريم',
                      rsvpCountLabel: 'عدد الحضور',
                      rsvpAttendLabel: 'هل ستشرفوننا بالحضور؟',
                      rsvpYesLabel: 'نعم، يشرفني الحضور',
                      rsvpNoLabel: 'للأسف، لا أستطيع الحضور',
                      closingText: 'يسعدنا ويشرفنا حضوركم',
                      invitationText: `الآنسة ${customData.partner1 || 'أميرة'} والسيد ${customData.partner2 || 'يوسف'}\n\nيسعدهما ويشرفهما أن يدعوا حضرتكم الكريمة\nلمشاركتهما فرحة حفل زفافهما\n\nوذلك بمشيئة الله تعالى\n${customData.dateText || 'يوم السبت 20 ماي 2027'}\nعلى الساعة ${customData.timeInput || 'الرابعة مساءً'}\n\nبقاعة`
                    });
                  }}
                  className="px-2.5 py-2 rounded-xl border border-slate-300 hover:border-[#006989] hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>🇲🇦</span>
                  <span>العربية</span>
                </button>
              </div>
            </div>

            {/* Formal Invitation Announcement */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-700 text-xs">
                  Formal Invitation Announcement / نص الدعوة
                </label>
                <span className="text-[10px] text-slate-400">Card Inside</span>
              </div>
              <textarea
                rows={5}
                dir={customData.language === 'ar' || /[\u0600-\u06FF]/.test(customData.invitationText || '') ? 'rtl' : 'ltr'}
                value={customData.invitationText || ''}
                onChange={(e) => onChangeCustomData({ ...customData, invitationText: e.target.value })}
                placeholder="Write your custom invitation wording here..."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs leading-relaxed font-serif"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Customize the exact invitation paragraph in any language.
              </p>
            </div>

            {/* Section Headings Customization */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                Section Titles & Form
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Envelope Button</label>
                  <input
                    type="text"
                    value={customData.envelopeText || ''}
                    onChange={(e) => onChangeCustomData({ ...customData, envelopeText: e.target.value })}
                    placeholder="e.g. Tap to Open"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Countdown Title</label>
                  <input
                    type="text"
                    value={customData.countdownTitle || ''}
                    onChange={(e) => onChangeCustomData({ ...customData, countdownTitle: e.target.value })}
                    placeholder="e.g. The Celebration Begins"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Timeline Title</label>
                  <input
                    type="text"
                    value={customData.timelineTitle || ''}
                    onChange={(e) => onChangeCustomData({ ...customData, timelineTitle: e.target.value })}
                    placeholder="e.g. Event Timeline"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">RSVP Title</label>
                  <input
                    type="text"
                    value={customData.rsvpTitle || ''}
                    onChange={(e) => onChangeCustomData({ ...customData, rsvpTitle: e.target.value })}
                    placeholder="e.g. Confirm Attendance"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">RSVP Submit Button</label>
                  <input
                    type="text"
                    value={customData.rsvpButtonText || ''}
                    onChange={(e) => onChangeCustomData({ ...customData, rsvpButtonText: e.target.value })}
                    placeholder="e.g. SUBMIT RSVP"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Map Directions Header</label>
                  <input
                    type="text"
                    value={customData.mapTitle || ''}
                    onChange={(e) => onChangeCustomData({ ...customData, mapTitle: e.target.value })}
                    placeholder="e.g. Directions"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PHOTOS & GALLERY */}
        {activeTab === 'photo' && (() => {
          const isDolceVita = templateInfo?.id === 'dolce-vita' || templateInfo?.id === 'dolcevita' || (customData.colorPalette && customData.colorPalette.length === 5);
          const hasGallery = isDolceVita || (customData.galleryPhotos && customData.galleryPhotos.length > 0);
          const activeGallery = customData.galleryPhotos || (isDolceVita ? DOLCE_VITA_DEFAULT_GALLERY : []);

          return (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Hidden file inputs for gallery actions */}
              <input
                ref={galleryAddInputRef}
                type="file"
                accept="image/*"
                onChange={handleGalleryAdd}
                className="hidden"
              />
              <input
                ref={galleryReplaceInputRef}
                type="file"
                accept="image/*"
                onChange={handleGalleryReplace}
                className="hidden"
              />

              {/* NON-DOLCE VITA: SINGLE COUPLE PORTRAIT SECTION */}
              {!isDolceVita && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-2">
                    <Camera className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
                    <span>
                      Upload your favourite photo to preview how you will look inside the invitation frame!
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-700 font-bold block">
                        Main Couple Portrait
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Featured in the invitation
                      </span>
                    </div>
                    {customData.photoUrl && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Active
                      </span>
                    )}
                  </div>

                  {/* Upload or Active Couple Photo Card */}
                  {customData.photoUrl ? (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={customData.photoUrl}
                          alt="Couple Portrait"
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
                        />
                        <div className="overflow-hidden">
                          <span className="font-bold text-slate-800 text-xs block truncate">
                            Couple Portrait Active
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            Click replace to choose another
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          title="Replace couple photo"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#006989]" />
                          <span>Replace</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onChangeCustomData({ ...customData, photoUrl: '' })}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove couple photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#006989] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center gap-2 group"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-[#006989] transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs">
                          Click to Upload Couple Portrait
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          PNG, JPG or WEBP (High resolution recommended)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sample Couple Presets */}
                  <div className="pt-1">
                    <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                      Or Sample Portrait Looks:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {PHOTO_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => onChangeCustomData({ ...customData, photoUrl: preset.url })}
                          className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all text-left ${
                            customData.photoUrl === preset.url
                              ? 'border-[#006989] bg-[#006989]/5 ring-1 ring-[#006989]'
                              : 'border-slate-200 hover:border-[#006989] bg-white'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-8 h-8 rounded-lg object-cover shrink-0"
                          />
                          <span className="text-[11px] font-medium text-slate-700 truncate">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DRESS CODE & GALLERY CAROUSEL SECTION */}
              {hasGallery && (
                <div className="space-y-4">
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200/80 text-[11px] text-sky-950 flex items-start gap-2">
                    <Camera className="w-4 h-4 shrink-0 text-sky-700 mt-0.5" />
                    <span>
                      Guests can scroll left and right to view your photos! You can add new photos, replace any photo, or remove ones you don't need.
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider text-slate-800 font-bold">
                          Photo Gallery
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {activeGallery.length} {activeGallery.length === 1 ? 'photo' : 'photos'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Scroll left and right in the invitation to view
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => galleryAddInputRef.current?.click()}
                      className="px-3 py-1.5 bg-[#006989] hover:bg-[#005570] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {activeGallery.map((url, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs flex flex-col"
                      >
                        <div className="relative aspect-4/3 w-full bg-slate-200 overflow-hidden">
                          <img
                            src={url}
                            alt={`Gallery item ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Card Actions: Replace & Remove */}
                        <div className="flex items-center border-t border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() => triggerGalleryReplace(idx)}
                            className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-700 hover:text-[#006989] hover:bg-slate-50 flex items-center justify-center gap-1 transition-colors border-r border-slate-100"
                            title={`Replace photo #${idx + 1}`}
                          >
                            <RefreshCw className="w-3 h-3 text-[#006989]" />
                            <span>Replace</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryPhoto(idx)}
                            className="p-1.5 px-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 flex items-center justify-center transition-colors"
                            title={`Remove photo #${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add Photo Tile */}
                    <button
                      type="button"
                      onClick={() => galleryAddInputRef.current?.click()}
                      className="aspect-4/3 border-2 border-dashed border-slate-300 hover:border-[#006989] rounded-xl flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-[#006989] bg-slate-50/70 hover:bg-slate-50 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#006989] group-hover:border-[#006989] transition-colors">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold">Add Photo</span>
                    </button>
                  </div>

                  {/* Quick 1-Click Gallery Themes */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                      Or 1-Click Curated Gallery Themes:
                    </span>
                    <div className="space-y-1.5">
                      {GALLERY_PRESETS.map((theme, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => onChangeCustomData({ ...customData, galleryPhotos: [...theme.photos] })}
                          className="w-full p-2 rounded-xl border border-slate-200 hover:border-[#006989] bg-white hover:bg-slate-50/50 flex items-center justify-between text-left transition-all"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {theme.name}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {theme.desc} ({theme.photos.length} photos)
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#006989] hover:underline">
                            Apply
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: BOTTOM PHOTO (Dolce Vita) */}
              {isDolceVita && (
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <input
                    ref={bottomPhotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBottomPhotoUpload}
                    className="hidden"
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider text-slate-800 font-bold">
                          Bottom Photo
                        </span>
                        {customData.bottomPhotoUrl && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" /> Active
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Romantic photo placed at the bottom of the invitation
                      </span>
                    </div>

                    {customData.bottomPhotoUrl ? (
                      <button
                        type="button"
                        onClick={() => bottomPhotoInputRef.current?.click()}
                        className="px-2.5 py-1.5 bg-[#006989] hover:bg-[#005570] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Replace</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => bottomPhotoInputRef.current?.click()}
                        className="px-2.5 py-1.5 bg-[#006989] hover:bg-[#005570] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Photo</span>
                      </button>
                    )}
                  </div>

                  {/* Upload or Active Bottom Photo Card */}
                  {customData.bottomPhotoUrl ? (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={customData.bottomPhotoUrl}
                          alt="Bottom Couple Photo"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
                        />
                        <div className="overflow-hidden">
                          <span className="font-bold text-slate-800 text-xs block truncate">
                            Bottom Photo Active
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            Displayed under &ldquo;Hope to see you there!&rdquo;
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => bottomPhotoInputRef.current?.click()}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          title="Replace bottom photo"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#006989]" />
                          <span>Replace</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onChangeCustomData({ ...customData, bottomPhotoUrl: '' })}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove bottom photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => bottomPhotoInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#006989] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center gap-2 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-[#006989] transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs">
                          Click to Upload Bottom Photo
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          PNG, JPG or WEBP (Displays with luxury gradient fade)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sample Bottom Photo Presets */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-600 block">
                        Or Sample Couple Looks:
                      </span>
                      {customData.bottomPhotoUrl !== DOLCE_VITA_DEFAULT_BOTTOM_PHOTO && (
                        <button
                          type="button"
                          onClick={() => onChangeCustomData({ ...customData, bottomPhotoUrl: DOLCE_VITA_DEFAULT_BOTTOM_PHOTO })}
                          className="text-[10px] text-[#006989] hover:underline font-semibold"
                        >
                          Restore Original
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {BOTTOM_PHOTO_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => onChangeCustomData({ ...customData, bottomPhotoUrl: preset.url })}
                          className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all text-left ${
                            customData.bottomPhotoUrl === preset.url
                              ? 'border-[#006989] bg-[#006989]/5 ring-1 ring-[#006989]'
                              : 'border-slate-200 hover:border-[#006989] bg-white'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-8 h-8 rounded-lg object-cover shrink-0"
                          />
                          <span className="text-[11px] font-medium text-slate-700 truncate">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* TAB 5: SCHEDULE OF EVENTS */}
        {activeTab === 'schedule' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 text-xs">
                Timeline Events ({customData.schedule?.length || 0})
              </span>
              <button
                onClick={() => {
                  const newSchedule = [...(customData.schedule || []), { time: '8:00 PM', title: 'Celebration & Dance', note: 'Dancing under the stars', icon: '✨' }];
                  onChangeCustomData({ ...customData, schedule: newSchedule });
                }}
                className="text-[11px] font-bold text-[#006989] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {(customData.schedule || []).map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative group">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="5:00 PM"
                      value={item.time}
                      onChange={(e) => {
                        const updated = [...customData.schedule];
                        updated[idx].time = e.target.value;
                        onChangeCustomData({ ...customData, schedule: updated });
                      }}
                      className="w-24 p-1.5 bg-white rounded-lg border border-slate-300 text-xs font-bold font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Event Title"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...customData.schedule];
                        updated[idx].title = e.target.value;
                        onChangeCustomData({ ...customData, schedule: updated });
                      }}
                      className="flex-1 p-1.5 bg-white rounded-lg border border-slate-300 text-xs font-bold"
                    />
                    <button
                      onClick={() => {
                        const updated = customData.schedule.filter((_, i) => i !== idx);
                        onChangeCustomData({ ...customData, schedule: updated });
                      }}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Short description / note"
                    value={item.note}
                    onChange={(e) => {
                      const updated = [...customData.schedule];
                      updated[idx].note = e.target.value;
                      onChangeCustomData({ ...customData, schedule: updated });
                    }}
                    className="w-full p-1.5 bg-white rounded-lg border border-slate-300 text-[11px] text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DETAILS & MESSAGES */}
        {activeTab === 'details' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Welcome Greeting / Love Story</label>
              <textarea
                rows={3}
                placeholder="Dear Friends and Family, join us for an evening of celebration..."
                value={customData.welcomeMessage}
                onChange={(e) => onChangeCustomData({ ...customData, welcomeMessage: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Dress Code</label>
                <input
                  type="text"
                  placeholder="e.g. Black Tie Optional"
                  value={customData.dressCode}
                  onChange={(e) => onChangeCustomData({ ...customData, dressCode: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">RSVP Deadline</label>
                <input
                  type="text"
                  placeholder="e.g. August 15, 2026"
                  value={customData.rsvpDeadline}
                  onChange={(e) => onChangeCustomData({ ...customData, rsvpDeadline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Gift Preference Note</label>
              <input
                type="text"
                placeholder="e.g. Kindly, no boxed gifts please"
                value={customData.giftPreference}
                onChange={(e) => onChangeCustomData({ ...customData, giftPreference: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs"
              />
            </div>

            {/* DRESS CODE COLOR PALETTE */}
            {(() => {
              const isDolceVita = templateInfo?.id === 'dolce-vita' || templateInfo?.id === 'dolcevita' || (customData.colorPalette && customData.colorPalette.length === 5);
              const palettePresets = isDolceVita ? DOLCE_VITA_PALETTES : BLOSSOM_OUD_PALETTES;
              const defaultPal = isDolceVita 
                ? ['#faf1db', '#f5d9b1', '#f2cac9', '#afcff1', '#7ebbfa']
                : ['#60603b', '#360c1a', '#40312c', '#efdfcd'];
              const currentPalette = (customData.colorPalette && customData.colorPalette.length > 0)
                ? customData.colorPalette
                : defaultPal;

              return (
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700 text-xs flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-[#006989]" />
                      <span>Dress Code Color Palette ({currentPalette.length} Colors)</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Click to Pick Hue/RGB</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2.5">
                    Click any swatch below (or directly on the invitation card) to choose a color via Hue, RGB sliders, or eyedropper:
                  </p>

                  {/* Dynamic Swatches with native color picker & Hex input */}
                  <div 
                    className="grid gap-1.5 sm:gap-2 mb-3"
                    style={{ gridTemplateColumns: `repeat(${currentPalette.length}, minmax(0, 1fr))` }}
                  >
                    {currentPalette.map((color, idx) => (
                      <div key={idx} className="flex flex-col items-center bg-slate-50 p-1.5 sm:p-2 rounded-xl border border-slate-200 hover:border-[#006989] transition-all">
                        <label className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate w-full text-center">
                          {currentPalette.length > 4 ? `C${idx + 1}` : `Color ${idx + 1}`}
                        </label>
                        <div 
                          className="relative group cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-xs border-2 border-white ring-1 ring-slate-300 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform shrink-0" 
                          style={{ backgroundColor: color }}
                        >
                          <input
                            type="color"
                            value={color && color.startsWith('#') && (color.length === 7 || color.length === 4) ? (color.length === 4 ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` : color) : (defaultPal[idx] || '#60603b')}
                            onChange={(e) => {
                              const newPal = [...currentPalette];
                              newPal[idx] = e.target.value;
                              onChangeCustomData({ ...customData, colorPalette: newPal });
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            title={`Click to pick Color ${idx + 1} (Hue, RGB, Hex)`}
                          />
                        </div>
                        <input
                          type="text"
                          value={color}
                          maxLength={7}
                          onChange={(e) => {
                            const newPal = [...currentPalette];
                            newPal[idx] = e.target.value;
                            onChangeCustomData({ ...customData, colorPalette: newPal });
                          }}
                          className="mt-1.5 w-full text-[8px] sm:text-[10px] text-center font-mono font-bold text-slate-700 bg-white rounded border border-slate-200 py-0.5 uppercase outline-none focus:border-[#006989]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Curated Preset Palettes */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
                      1-Click Luxury Palette Presets
                    </span>
                    <div className="space-y-1.5">
                      {palettePresets.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => onChangeCustomData({ ...customData, colorPalette: [...preset.colors] })}
                          className="w-full flex items-center justify-between p-2 rounded-xl border border-slate-200 hover:border-[#006989] hover:bg-slate-50 transition-all text-left group"
                        >
                          <span className="text-[11px] font-medium text-slate-700 group-hover:text-[#006989] truncate pr-2">
                            {preset.name}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            {preset.colors.map((c, cIdx) => (
                              <span
                                key={cIdx}
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white shadow-xs"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>

      {/* Drawer Action Footer */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2 sm:space-y-2.5">
        {onUpdateView && (
          <button
            onClick={onUpdateView}
            className="w-full py-2 sm:py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-300/80 hover:border-slate-400 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>⚡ Update View Preview</span>
          </button>
        )}

        <button
          onClick={() => onSaveAndOrder(customData)}
          className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-full bg-[#006989] hover:bg-[#005570] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Save &amp; Continue to Order ({templateInfo?.price || '€75'})</span>
        </button>

        <div className="flex items-center justify-between text-[11px] px-1">
          <button
            onClick={onResetCustomData}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Original</span>
          </button>

          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Live Synchronized
          </span>
        </div>
      </div>
      </>
      )}

    </aside>
  );
}
