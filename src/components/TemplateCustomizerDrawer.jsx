import React, { useState, useRef } from 'react';
import { 
  X, Heart, Calendar, MapPin, Camera, Clock, 
  Sparkles, RotateCcw, Check, ShoppingBag, Upload, 
  Trash2, Plus, Minus, Info, ChevronRight, RefreshCw,
  ChevronDown, ChevronUp, Eye, Maximize2, Minimize2,
  Languages, ExternalLink, Palette, Loader2,
  Type, Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  Sliders, Paintbrush, Move, Layers, Image as ImageIcon
} from 'lucide-react';

const WEDDING_FONT_FAMILIES = [
  {
    category: 'Romantic Calligraphy & Script',
    fonts: [
      { name: 'Alex Brush (Bridal Script)', value: "'Alex Brush', cursive", sample: 'Alex & Brush' },
      { name: 'Great Vibes (Classic Script)', value: "'Great Vibes', cursive", sample: 'Great Vibes' },
      { name: 'Pinyon Script (Parisian Chic)', value: "'Pinyon Script', cursive", sample: 'Pinyon Script' },
      { name: 'Playfair Display (Romantic Editorial)', value: "'Playfair Display', serif", sample: 'Playfair Display' },
      { name: 'MonteCarlo (Renaissance Elegance)', value: "'MonteCarlo', cursive", sample: 'MonteCarlo' },
    ]
  },
  {
    category: 'Regal Serif & Classical Luxury',
    fonts: [
      { name: 'Cinzel (Roman Imperial)', value: "'Cinzel', serif", sample: 'CINZEL' },
      { name: 'Cormorant Garamond (Literary Grace)', value: "'Cormorant Garamond', serif", sample: 'Cormorant' },
      { name: 'Bodoni Moda (Vogue Fashion)', value: "'Bodoni Moda', serif", sample: 'Bodoni Moda' },
      { name: 'Rufina (Bespoke Editorial)', value: "'Rufina', serif", sample: 'Rufina' },
      { name: 'Georgia (Classic Traditional)', value: "Georgia, serif", sample: 'Georgia' },
    ]
  },
  {
    category: 'Modern Minimalist & Clean Sans',
    fonts: [
      { name: 'Montserrat (Geometric Modern)', value: "'Montserrat', sans-serif", sample: 'MONTSERRAT' },
      { name: 'Outfit (Contemporary Clean)', value: "'Outfit', sans-serif", sample: 'Outfit' },
      { name: 'Inter (Sleek Architectural)', value: "'Inter', sans-serif", sample: 'Inter' },
    ]
  }
];

const LUXURY_WEDDING_COLORS = [
  { name: 'Signature Gold', hex: '#cebb78', border: '#b89758' },
  { name: 'Antique Royal Gold', hex: '#d4af37', border: '#bfa02e' },
  { name: 'Blush Rose Gold', hex: '#b76e79', border: '#9e5a64' },
  { name: 'Warm Terracotta', hex: '#c47d6a', border: '#a86554' },
  { name: 'Desert Burgundy', hex: '#8c4f56', border: '#6e383e' },
  { name: 'Royal Emerald', hex: '#1b4332', border: '#123023' },
  { name: 'Amalfi Azure', hex: '#006989', border: '#004f66' },
  { name: 'Midnight Navy', hex: '#08004b', border: '#050033' },
  { name: 'Almond Champagne', hex: '#a48467', border: '#8b6c52' },
  { name: 'Deep Charcoal', hex: '#1e293b', border: '#0f172a' },
  { name: 'Classic Black Tie', hex: '#000000', border: '#333333' },
  { name: 'Bridal Ivory', hex: '#fdfbf7', border: '#e2d8ce' },
  { name: 'Pure White', hex: '#ffffff', border: '#cbd5e1' },
];

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

const TIMELESS_GRACE_PALETTES = [
  { name: '🌸 Regal Pastel Elegance (Default)', colors: ['#d8c7e2', '#fcd2b7', '#fae6b1', '#f7d3d3', '#d1e2ec', '#d9d4d0'] },
  { name: '🌹 Royal Rose & Champagne', colors: ['#e8d1d8', '#f5c6cb', '#fadbd8', '#fdebd0', '#f9e79f', '#e5e7e9'] },
  { name: '🌿 Jasmine & Mint Pastels', colors: ['#d5f5e3', '#a3e4d7', '#d1f2eb', '#fef9e7', '#fdebd0', '#e8f8f5'] },
  { name: '🌅 Warm Sunset & Marigold', colors: ['#fdebd0', '#f8c471', '#f5b7b1', '#fad7a0', '#edbb99', '#f9ebea'] },
  { name: '🌊 Arabian Gulf Azure', colors: ['#d4e6f1', '#a9cce3', '#7fb3d5', '#d1f2eb', '#fef9e7', '#eaecee'] },
  { name: '👑 Velvet & Antique Gold', colors: ['#d4af37', '#e5c158', '#f3e5ab', '#c5a059', '#e0d2b4', '#f5f0e6'] }
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

export const SCROLL_ARROW_DESIGNS = [
  {
    id: 'scroll-classic',
    name: 'Classic Serif Arrow',
    label: 'scroll —→',
    desc: 'Dolce Vita signature look (Bodoni/Playfair italic with horizontal line arrow)',
    sample: (color = '#cebb78') => (
      <div className="flex items-center justify-center gap-2 font-serif italic text-sm">
        <span style={{ color }}>scroll</span>
        <span className="inline-flex items-center w-8 h-[1px] relative" style={{ backgroundColor: color }}>
          <span className="absolute right-0 top-[-3px] w-0 h-0 border-t-[3.5px] border-t-transparent border-b-[3.5px] border-b-transparent border-l-[6px]" style={{ borderLeftColor: color }} />
        </span>
      </div>
    )
  },
  {
    id: 'swipe-double',
    name: 'Symmetric Swipe',
    label: '← swipe to view →',
    desc: 'Editorial letterspaced serif with dual arrows',
    sample: (color = '#cebb78') => (
      <div className="flex items-center justify-center gap-2 font-serif text-[11px] tracking-widest uppercase" style={{ color }}>
        <span>←</span>
        <span>swipe to view</span>
        <span>→</span>
      </div>
    )
  },
  {
    id: 'minimal-arrow',
    name: 'Modern Minimal',
    label: 'swipe →',
    desc: 'Clean geometric sans-serif with directional arrow',
    sample: (color = '#cebb78') => (
      <div className="flex items-center justify-center gap-1 font-sans text-[11px] tracking-wider uppercase font-bold" style={{ color }}>
        <span>swipe</span>
        <span className="text-sm leading-none">→</span>
      </div>
    )
  },
  {
    id: 'chevrons',
    name: 'Editorial Chevrons',
    label: '‹ scroll gallery ›',
    desc: 'Refined bracket chevrons flanking italic text',
    sample: (color = '#cebb78') => (
      <div className="flex items-center justify-center gap-2 font-serif text-xs" style={{ color }}>
        <span className="font-bold text-sm">‹</span>
        <span className="italic">scroll gallery</span>
        <span className="font-bold text-sm">›</span>
      </div>
    )
  },
  {
    id: 'drag-hand',
    name: 'Touch Gesture',
    label: '👆 swipe ↔',
    desc: 'Friendly touch indicator for mobile swiping',
    sample: (color = '#cebb78') => (
      <div className="flex items-center justify-center gap-1.5 font-sans text-xs font-semibold" style={{ color }}>
        <span>👆</span>
        <span>swipe left & right</span>
        <span>↔</span>
      </div>
    )
  },
  {
    id: 'navy-pill',
    name: 'Midnight Badge Bar',
    label: '📜 Scroll Gallery • Swipe ↔',
    desc: 'Navy and gold title bar above reel',
    sample: (color = '#cebb78') => (
      <div className="flex items-center justify-between px-2 py-0.5 bg-[#08004b] text-[10px] font-bold rounded-md" style={{ color }}>
        <span>📜 Scroll Gallery</span>
        <span className="text-[9px] text-white/80">Swipe ↔</span>
      </div>
    )
  },
  {
    id: 'clean-none',
    name: 'None (Clean Borderless)',
    label: 'No Header',
    desc: 'Pure edge-to-edge images without any arrow header',
    sample: () => (
      <div className="text-center text-[10px] text-slate-400 font-mono italic">
        (No header / pure images)
      </div>
    )
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
  onTabChange,
  selectedElement = null,
  onUpdateElementStyle = () => {},
  onResetElementStyle = () => {},
  onDeleteElement = () => {},
  onRestoreElement = () => {},
  onResetElementPosition = () => {},
  onRotateElement = () => {},
  onResetElementRotation = () => {},
  onAddText = () => {},
  onAddImage = () => {},
  onAddSlider = () => {},
  onUpdateSlider = () => {},
  onAddSlideToSlider = () => {},
  onRemoveSlideFromSlider = () => {},
  onAddScrollGallery = () => {},
  onUpdateScrollGallery = () => {},
  onAddPhotoToScrollGallery = () => {},
  onReplacePhotoInScrollGallery = () => {},
  onRemovePhotoFromScrollGallery = () => {},
  onAddArrow = () => {},
  onMoveWidgetUp = () => {},
  onMoveWidgetDown = () => {},
  sectionsList = [],
  onOpenAddBlockModal = () => {},
  onClearAllSections = () => {},
  onRestoreAllSections = () => {},
  onMoveSectionUp = () => {},
  onMoveSectionDown = () => {},
  allBlocksList = [],
  onWidgetDragStart = () => {},
  onWidgetDragEnd = () => {},
  onUpdateAddedImage = () => {},
  onTriggerImageUpload = () => {},
  onSelectElement = () => {}
}) {
  const [internalTab, setInternalTab] = useState('style');
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
    { id: 'style', label: 'Typography', icon: Type },
    { id: 'names', label: 'Names & Text', icon: Heart },
    { id: 'photo', label: 'Photos', icon: Camera },
    { id: 'widgets', label: 'Widgets ✦', icon: Sparkles },
    { id: 'sections', label: 'Canvas', icon: Layers },
    { id: 'date', label: 'Date & Map', icon: Calendar },
    { id: 'venue', label: 'Location', icon: MapPin },
    { id: 'wording', label: 'Wording', icon: Languages },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'details', label: 'Details', icon: Info },
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
        
        {/* TAB 0: TYPOGRAPHY & DESIGN INSPECTOR */}
        {activeTab === 'style' && (() => {
          const activeElemId = selectedElement?.elemId;
          const isScrollGallery = selectedElement?.type === 'scroll-gallery' || selectedElement?.isScrollGallery || String(activeElemId).startsWith('wbg_scroll_') || (customData?.addedScrollGalleries || []).some(g => g.id === activeElemId);
          const isSlider = !isScrollGallery && (selectedElement?.type === 'slider' || selectedElement?.isSlider || String(activeElemId).startsWith('wbg_slider_') || (customData?.addedSliders || []).some(s => s.id === activeElemId));
          const isAddedImage = !isScrollGallery && !isSlider && (selectedElement?.isAddedImage || String(activeElemId).startsWith('wbg_img_') || (customData?.addedImages || []).some(img => img.id === activeElemId));
          const isImage = !isScrollGallery && !isSlider && (selectedElement?.type === 'image' || selectedElement?.isImage || isAddedImage || Boolean(selectedElement?.src));
          const isAddedText = !isScrollGallery && !isSlider && !isImage && (selectedElement?.isAddedText || String(activeElemId).startsWith('wbg_txt_') || String(activeElemId).startsWith('added-text-') || (customData?.addedTexts || []).some(t => t.id === activeElemId));
          const isText = !isScrollGallery && !isSlider && !isImage;

          const currentElemStyle = {
            ...(selectedElement?.style || {}),
            ...(activeElemId && customData?.styleOverrides?.[activeElemId] ? customData.styleOverrides[activeElemId] : {})
          };
          const activeFontSize = parseInt(currentElemStyle.fontSize) || 20;
          const activeColor = currentElemStyle.color || '#cebb78';
          const activeFontFamily = currentElemStyle.fontFamily || '';
          const activeLetterSpacing = currentElemStyle.letterSpacing || '0px';
          const activeFontWeight = currentElemStyle.fontWeight || '400';
          const activeFontStyle = currentElemStyle.fontStyle || 'normal';
          const activeTextTransform = currentElemStyle.textTransform || 'none';
          const activeTextAlign = currentElemStyle.textAlign || 'center';
          const activeTextContent = isAddedText
            ? (customData?.addedTexts?.find(t => t.id === activeElemId)?.text ?? selectedElement?.text ?? '')
            : (customData?.textOverrides?.[activeElemId] !== undefined 
                ? customData.textOverrides[activeElemId] 
                : (selectedElement?.text || ''));

          const activePosition = customData?.positionOverrides?.[activeElemId] || selectedElement?.position;
          const hasPositionOverride = Boolean(customData?.positionOverrides?.[activeElemId]);
          const activeRotation = customData?.rotationOverrides?.[activeElemId] ?? selectedElement?.rotation ?? 0;
          const overriddenCount = Object.keys(customData?.styleOverrides || {}).length;
          const deletedCount = (customData?.deletedElements || []).length;
          const addedTextsList = customData?.addedTexts || [];

          return (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Quick Add Custom Elements: Scroll Images, Slide Carousel, Single Photo, Text Blocks */}
              <div className="p-3.5 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-sky-50/70 rounded-2xl border border-indigo-200/90 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Add Widgets to Card</span>
                  </span>
                  <span className="text-[10px] text-indigo-700 bg-indigo-100/90 px-2 py-0.5 rounded-full font-bold">
                    Drag & Drop or Click
                  </span>
                </div>
                
                <p className="text-[10px] text-slate-500 leading-tight">
                  Drag any widget directly onto the card preview, or tap to place it automatically.
                </p>

                {/* Primary Widgets: Scroll Images, Slide Carousel, Single Photo, Text */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Scroll Images (Horizontal Swipe Reel) */}
                  <button
                    type="button"
                    data-widget-type="scroll-gallery"
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'scroll-gallery');
                      e.dataTransfer.effectAllowed = 'copy';
                      onWidgetDragStart && onWidgetDragStart('scroll-gallery');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    onClick={() => onAddScrollGallery && onAddScrollGallery()}
                    className="flex flex-col items-start p-2.5 bg-white hover:bg-purple-50/70 text-slate-700 hover:text-purple-950 border border-purple-200 hover:border-purple-400 rounded-xl cursor-grab active:cursor-grabbing transition-all shadow-xs hover:shadow-sm group select-none relative text-left w-full"
                    title="Drag & drop onto card or click to add a horizontal swipeable photo reel"
                  >
                    <span className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider font-extrabold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                      Reel ↔
                    </span>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base leading-none">📜</span>
                      <span className="text-[11px] font-bold text-slate-800 group-hover:text-purple-900">
                        Scroll Images
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 group-hover:text-purple-700/80 leading-snug">
                      Swipeable photo reel strip
                    </span>
                  </button>

                  {/* Slide Carousel (Interactive Slideshow) */}
                  <button
                    type="button"
                    data-widget-type="slider"
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'slider');
                      e.dataTransfer.effectAllowed = 'copy';
                      onWidgetDragStart && onWidgetDragStart('slider');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    onClick={() => onAddSlider && onAddSlider()}
                    className="flex flex-col items-start p-2.5 bg-white hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-950 border border-indigo-200 hover:border-indigo-400 rounded-xl cursor-grab active:cursor-grabbing transition-all shadow-xs hover:shadow-sm group select-none relative text-left w-full"
                    title="Drag & drop onto card or click to add a slideshow carousel"
                  >
                    <span className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider font-extrabold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                      Slideshow
                    </span>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base leading-none">🎞️</span>
                      <span className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-900">
                        Slide Carousel
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 group-hover:text-indigo-700/80 leading-snug">
                      Autoplay slides & dots
                    </span>
                  </button>

                  {/* Single Photo */}
                  <button
                    type="button"
                    data-widget-type="image"
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'image');
                      e.dataTransfer.effectAllowed = 'copy';
                      onWidgetDragStart && onWidgetDragStart('image');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    onClick={() => onAddImage && onAddImage()}
                    className="flex flex-col items-start p-2.5 bg-white hover:bg-sky-50/70 text-slate-700 hover:text-sky-950 border border-sky-200 hover:border-sky-400 rounded-xl cursor-grab active:cursor-grabbing transition-all shadow-xs hover:shadow-sm group select-none relative text-left w-full"
                    title="Drag & drop onto card or click to add a photo"
                  >
                    <span className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider font-extrabold bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded">
                      Photo
                    </span>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base leading-none">📷</span>
                      <span className="text-[11px] font-bold text-slate-800 group-hover:text-sky-900">
                        Single Photo
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 group-hover:text-sky-700/80 leading-snug">
                      Resizable photo frame
                    </span>
                  </button>

                  {/* Text Blocks Drop Container */}
                  <div className="flex flex-col p-2 bg-white border border-teal-200 rounded-xl shadow-xs space-y-1 justify-center">
                    <span className="text-[9px] font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1">
                      <Type className="w-2.5 h-2.5 text-teal-600" />
                      <span>Text Blocks</span>
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', 'heading');
                          e.dataTransfer.effectAllowed = 'copy';
                          onWidgetDragStart && onWidgetDragStart('heading');
                        }}
                        onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                        onClick={() => onAddText('headline')}
                        className="py-1 px-1 text-[9px] font-bold text-slate-700 hover:text-teal-900 bg-teal-50/60 hover:bg-teal-100 border border-teal-200/80 rounded-lg text-center cursor-grab active:cursor-grabbing transition-all truncate"
                        title="Drag or click to add Headline"
                      >
                        + Head
                      </button>
                      <button
                        type="button"
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', 'subtitle');
                          e.dataTransfer.effectAllowed = 'copy';
                          onWidgetDragStart && onWidgetDragStart('subtitle');
                        }}
                        onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                        onClick={() => onAddText('subtitle')}
                        className="py-1 px-1 text-[9px] font-bold text-slate-700 hover:text-teal-900 bg-teal-50/60 hover:bg-teal-100 border border-teal-200/80 rounded-lg text-center cursor-grab active:cursor-grabbing transition-all truncate"
                        title="Drag or click to add Subtitle"
                      >
                        + Sub
                      </button>
                      <button
                        type="button"
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', 'body');
                          e.dataTransfer.effectAllowed = 'copy';
                          onWidgetDragStart && onWidgetDragStart('body');
                        }}
                        onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                        onClick={() => onAddText('body')}
                        className="py-1 px-1 text-[9px] font-bold text-slate-700 hover:text-teal-900 bg-teal-50/60 hover:bg-teal-100 border border-teal-200/80 rounded-lg text-center cursor-grab active:cursor-grabbing transition-all truncate"
                        title="Drag or click to add Body Text"
                      >
                        + Body
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Element Header / Card */}
              {selectedElement ? (
                <div className="p-3.5 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 rounded-2xl border border-amber-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-lg text-white shadow-xs shrink-0 ${
                        isScrollGallery ? 'bg-purple-600' : isSlider ? 'bg-indigo-600' : isImage ? 'bg-sky-600' : 'bg-[#cebb78]'
                      }`}>
                        {isScrollGallery ? <Layers className="w-3.5 h-3.5" /> : isSlider ? <Layers className="w-3.5 h-3.5" /> : isImage ? <Camera className="w-3.5 h-3.5" /> : <Type className="w-3.5 h-3.5" />}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block leading-tight">
                          {isScrollGallery ? 'Scroll Images Gallery' : isSlider ? 'Slide Carousel' : isAddedImage ? 'Custom Added Photo' : isImage ? 'Editing Photo' : isAddedText ? 'Custom Added Text' : 'Editing Selected Text'}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 truncate max-w-[150px] block">
                          ID: {activeElemId}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isText && (
                        <button
                          type="button"
                          onClick={() => onResetElementStyle(activeElemId)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-amber-800 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 px-2 py-1 rounded-lg transition-all shadow-xs"
                          title="Reset font & color to original template defaults"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span className="hidden sm:inline">Reset</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onDeleteElement(activeElemId)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-white bg-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 px-2 py-1 rounded-lg transition-all shadow-xs"
                        title="Completely delete/hide this element from the card"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Position & Rotation Info Bar */}
                  <div className="space-y-1.5">
                    {/* Drag Position Info & Reset */}
                    <div className="flex items-center justify-between bg-white/90 px-2.5 py-1.5 rounded-xl border border-amber-200/80 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[10px]">
                        <Move className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>
                          {activePosition && (activePosition.left !== undefined || activePosition.top !== undefined)
                            ? `X: ${activePosition.left || 0}px, Y: ${activePosition.top || 0}px`
                            : 'Drag element on card to reposition'}
                        </span>
                      </div>
                      {hasPositionOverride && (
                        <button
                          type="button"
                          onClick={() => onResetElementPosition(activeElemId)}
                          className="flex items-center gap-1 text-[10px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 transition-all"
                          title="Reset position to default template layout"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Reset Pos</span>
                        </button>
                      )}
                    </div>

                    {/* Rotation Angle Slider & Presets */}
                    <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200/80 text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 flex items-center gap-1 text-[11px]">
                          <RotateCcw className="w-3 h-3 text-sky-600" />
                          <span>Rotation Angle</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-sky-700 text-[11px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                            {activeRotation}°
                          </span>
                          {activeRotation !== 0 && (
                            <button
                              type="button"
                              onClick={() => onResetElementRotation(activeElemId)}
                              className="text-[10px] font-semibold text-slate-500 hover:text-sky-700 underline"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          step="1"
                          value={activeRotation}
                          onChange={(e) => onRotateElement(activeElemId, Number(e.target.value))}
                          className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                      {/* Quick Presets */}
                      <div className="flex items-center justify-between gap-1 pt-1">
                        {[-90, -45, 0, 45, 90, 180].map((deg) => (
                          <button
                            key={deg}
                            type="button"
                            onClick={() => onRotateElement(activeElemId, deg)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-all ${
                              activeRotation === deg
                                ? 'bg-sky-600 text-white font-bold'
                                : 'bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-800'
                            }`}
                          >
                            {deg > 0 ? `+${deg}°` : `${deg}°`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* If Text: Direct Content Editor */}
                  {isText && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700">Text Content</label>
                        <span className="text-[10px] text-slate-400">Syncs live with card</span>
                      </div>
                      <textarea
                        rows={2}
                        value={activeTextContent}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (isAddedText) {
                            const updatedAdded = (customData.addedTexts || []).map(t => 
                              t.id === activeElemId ? { ...t, text: val } : t
                            );
                            onChangeCustomData({ ...customData, addedTexts: updatedAdded });
                          } else {
                            const updated = {
                              ...(customData.textOverrides || {}),
                              [activeElemId]: val
                            };
                            onChangeCustomData({ ...customData, textOverrides: updated });
                          }
                        }}
                        placeholder="Type custom text..."
                        className="w-full p-2 rounded-xl border border-slate-300 focus:border-[#006989] focus:ring-1 focus:ring-[#006989] outline-none text-xs bg-white text-slate-800"
                      />
                    </div>
                  )}

                  {/* If Image: Photo Inspector */}
                  {isImage && (
                    <div className="space-y-2.5 pt-1 border-t border-amber-200/70">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-sky-600" />
                          <span>Photo Management</span>
                        </label>
                        <span className="text-[10px] text-slate-400">Click photo or '+' on card</span>
                      </div>

                      <div className="flex items-center gap-3 p-2 bg-white/90 rounded-xl border border-slate-200">
                        <img
                          src={selectedElement.src || customData?.imageOverrides?.[activeElemId] || (customData.addedImages || []).find(img => img.id === activeElemId)?.src || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                          alt="Selected preview"
                          className="w-14 h-14 object-cover rounded-lg border border-slate-300 shadow-2xs shrink-0"
                        />
                        <div className="flex-1 space-y-1">
                          <button
                            type="button"
                            onClick={() => onTriggerImageUpload(activeElemId)}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Replace Photo</span>
                          </button>
                          <span className="text-[9px] text-slate-500 block text-center">
                            Upload from your device
                          </span>
                        </div>
                      </div>

                      {/* If custom added image, allow dimension & corner radius control */}
                      {isAddedImage && (() => {
                        const currentAddedImg = (customData?.addedImages || []).find(img => img.id === activeElemId);
                        const imgWidth = currentAddedImg?.width || 260;
                        const imgHeight = currentAddedImg?.height || 320;
                        const imgRadius = currentAddedImg?.borderRadius !== undefined ? currentAddedImg.borderRadius : 16;
                        return (
                          <div className="space-y-2 pt-1">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] font-bold text-slate-600 block mb-1">Width (px)</label>
                                <input
                                  type="number"
                                  min="60"
                                  max="600"
                                  step="10"
                                  value={imgWidth}
                                  onChange={(e) => onUpdateAddedImage(activeElemId, { width: Number(e.target.value) })}
                                  className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-600 block mb-1">Height (px)</label>
                                <input
                                  type="number"
                                  min="60"
                                  max="800"
                                  step="10"
                                  value={imgHeight}
                                  onChange={(e) => onUpdateAddedImage(activeElemId, { height: Number(e.target.value) })}
                                  className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-[10px] font-bold text-slate-600">Corner Radius</label>
                                <span className="text-[10px] font-mono text-slate-500">{imgRadius}px</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={imgRadius}
                                onChange={(e) => onUpdateAddedImage(activeElemId, { borderRadius: Number(e.target.value) })}
                                className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* If Slide Carousel: Carousel Inspector */}
                  {isSlider && (() => {
                    const currentSlider = (customData?.addedSliders || []).find(s => s.id === activeElemId);
                    const photos = currentSlider?.photos || [];
                    const sliderWidth = currentSlider?.width || 280;
                    const sliderHeight = currentSlider?.height || 340;
                    const isAutoplay = currentSlider?.autoplay !== false;

                    return (
                      <div className="space-y-3 pt-2 border-t border-indigo-200/70">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Carousel Slides ({photos.length})</span>
                          </label>
                          <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">
                            Interactive Slider
                          </span>
                        </div>

                        {/* Slide Thumbnails List */}
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {photos.map((photoUrl, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-1.5 bg-white/90 rounded-xl border border-slate-200"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <img
                                  src={photoUrl}
                                  alt={`Slide ${idx + 1}`}
                                  className="w-10 h-10 object-cover rounded-md border border-slate-300 shrink-0"
                                />
                                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[140px]">
                                  Slide {idx + 1}
                                </span>
                              </div>
                              {photos.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => onRemoveSlideFromSlider(activeElemId, idx)}
                                  className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-500 transition-all ml-2"
                                  title="Remove this slide"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Add New Slide Button */}
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            id={`wbg-add-slide-input-${activeElemId}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files && e.target.files[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (evt) => {
                                if (evt.target.result) {
                                  onAddSlideToSlider(activeElemId, evt.target.result);
                                }
                              };
                              reader.readAsDataURL(file);
                              e.target.value = '';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const inp = document.getElementById(`wbg-add-slide-input-${activeElemId}`);
                              if (inp) inp.click();
                            }}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold transition-all shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Upload & Add Slide Photo</span>
                          </button>
                        </div>

                        {/* Slider Dimension & Autoplay Controls */}
                        <div className="space-y-2 pt-1 border-t border-slate-100">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Width (px)</label>
                              <input
                                type="number"
                                min="100"
                                max="500"
                                step="10"
                                value={sliderWidth}
                                onChange={(e) => onUpdateSlider(activeElemId, { width: Number(e.target.value) })}
                                className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Height (px)</label>
                              <input
                                type="number"
                                min="100"
                                max="600"
                                step="10"
                                value={sliderHeight}
                                onChange={(e) => onUpdateSlider(activeElemId, { height: Number(e.target.value) })}
                                className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2 bg-white/90 rounded-xl border border-slate-200">
                            <span className="text-[11px] font-medium text-slate-700">Autoplay Slideshow</span>
                            <button
                              type="button"
                              onClick={() => onUpdateSlider(activeElemId, { autoplay: !isAutoplay })}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                isAutoplay ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {isAutoplay ? 'Enabled (4s)' : 'Disabled'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* If Scroll Images Gallery: Swipeable Reel Inspector */}
                  {isScrollGallery && (() => {
                    const currentGallery = (customData?.addedScrollGalleries || []).find(g => g.id === activeElemId);
                    const photos = currentGallery?.photos || [];
                    const galleryWidth = currentGallery?.width || 340;
                    const galleryHeight = currentGallery?.height || 230;
                    const photoCardWidth = currentGallery?.photoWidth || 150;
                    const galleryRadius = currentGallery?.borderRadius !== undefined ? currentGallery.borderRadius : 16;

                    return (
                      <div className="space-y-3 pt-2 border-t border-purple-200/70">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-purple-600" />
                            <span>Reel Photos ({photos.length})</span>
                          </label>
                          <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-medium">
                            Swipeable Reel ↔
                          </span>
                        </div>

                        {/* Photo Thumbnails List */}
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {photos.map((photoUrl, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-1.5 bg-white/90 rounded-xl border border-slate-200"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <img
                                  src={photoUrl}
                                  alt={`Photo ${idx + 1}`}
                                  className="w-10 h-10 object-cover rounded-md border border-slate-300 shrink-0"
                                />
                                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[140px]">
                                  Photo {idx + 1}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0 ml-2">
                                <input
                                  type="file"
                                  id={`wbg-replace-scroll-photo-${activeElemId}-${idx}`}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files && e.target.files[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = (evt) => {
                                      if (evt.target.result) {
                                        onReplacePhotoInScrollGallery(activeElemId, idx, evt.target.result);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                    e.target.value = '';
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const inp = document.getElementById(`wbg-replace-scroll-photo-${activeElemId}-${idx}`);
                                    if (inp) inp.click();
                                  }}
                                  className="p-1 rounded-lg text-indigo-600 hover:text-white hover:bg-indigo-600 transition-all"
                                  title="Replace this photo"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                                {photos.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => onRemovePhotoFromScrollGallery(activeElemId, idx)}
                                    className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-500 transition-all"
                                    title="Remove this photo from reel"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Scroll Arrow Designs Selector */}
                        <div className="space-y-2 pt-2 border-t border-purple-200/70">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                              <span className="text-sm">🏹</span>
                              <span>Scroll Arrow Design</span>
                            </label>
                            <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-semibold">
                              Select Style
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">
                            Choose how the scroll indicator arrow looks above your photo reel:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {SCROLL_ARROW_DESIGNS.map((design) => {
                              const isSelected = (currentGallery?.headerStyle || 'scroll-classic') === design.id;
                              return (
                                <button
                                  key={design.id}
                                  type="button"
                                  onClick={() => onUpdateScrollGallery(activeElemId, { headerStyle: design.id })}
                                  className={`p-2 rounded-xl border text-left transition-all ${
                                    isSelected
                                      ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-600/30 shadow-xs'
                                      : 'border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/20'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold text-slate-800 truncate">
                                      {design.name}
                                    </span>
                                    {isSelected && (
                                      <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                                    )}
                                  </div>
                                  <div className="py-1 px-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center min-h-[30px]">
                                    {design.sample(currentGallery?.headerColor || '#cebb78')}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Header Text & Color */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Arrow Label Text</label>
                              <input
                                type="text"
                                value={currentGallery?.headerText !== undefined ? currentGallery.headerText : 'scroll'}
                                onChange={(e) => onUpdateScrollGallery(activeElemId, { headerText: e.target.value })}
                                placeholder="scroll"
                                className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-serif"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Arrow / Header Color</label>
                              <div className="flex items-center gap-1.5 mt-1">
                                {['#cebb78', '#1e293b', '#08004b', '#ffffff', '#b76e79'].map((c) => (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() => onUpdateScrollGallery(activeElemId, { headerColor: c })}
                                    className={`w-6 h-6 rounded-full border transition-all ${
                                      (currentGallery?.headerColor || '#cebb78') === c ? 'ring-2 ring-purple-600 scale-110' : 'border-slate-300'
                                    }`}
                                    style={{ backgroundColor: c }}
                                    title={c}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Add New Photo to Scroll Gallery */}
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            id={`wbg-add-scroll-photo-input-${activeElemId}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files && e.target.files[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (evt) => {
                                if (evt.target.result) {
                                  onAddPhotoToScrollGallery(activeElemId, evt.target.result);
                                }
                              };
                              reader.readAsDataURL(file);
                              e.target.value = '';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const inp = document.getElementById(`wbg-add-scroll-photo-input-${activeElemId}`);
                              if (inp) inp.click();
                            }}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[11px] font-bold transition-all shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Upload & Add Photo to Reel</span>
                          </button>
                        </div>

                        {/* Gallery Dimensions & Photo Card Size */}
                        <div className="space-y-2 pt-1 border-t border-slate-100">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Gallery Width (px)</label>
                              <input
                                type="number"
                                min="150"
                                max="600"
                                step="10"
                                value={galleryWidth}
                                onChange={(e) => onUpdateScrollGallery(activeElemId, { width: Number(e.target.value) })}
                                className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Gallery Height (px)</label>
                              <input
                                type="number"
                                min="120"
                                max="600"
                                step="10"
                                value={galleryHeight}
                                onChange={(e) => onUpdateScrollGallery(activeElemId, { height: Number(e.target.value) })}
                                className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Photo Card Width (px)</label>
                              <input
                                type="number"
                                min="80"
                                max="300"
                                step="10"
                                value={photoCardWidth}
                                onChange={(e) => onUpdateScrollGallery(activeElemId, { photoWidth: Number(e.target.value) })}
                                className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-600 block mb-1">Corner Radius (px)</label>
                              <input
                                type="number"
                                min="0"
                                max="40"
                                step="2"
                                value={galleryRadius}
                                onChange={(e) => onUpdateScrollGallery(activeElemId, { borderRadius: Number(e.target.value) })}
                                className="w-full p-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50/40 border border-amber-200/90 shadow-xs space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#cebb78]/20 text-[#806b43] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-serif">Interactive Typography Inspector</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Tap any text atom directly on the invitation card to customize its font family, size/height, luxury color, and letter spacing live!
                      </p>
                    </div>
                  </div>

                  {/* Quick Select Helper */}
                  <div className="pt-2 border-t border-amber-200/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-2">
                      Or click an area to jump:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Couple Names', tab: 'names' },
                        { label: 'Date & Time', tab: 'date' },
                        { label: 'Location / Venue', tab: 'venue' },
                        { label: 'Wording & Poems', tab: 'wording' },
                        { label: 'Photos & Gallery', tab: 'photo' },
                        { label: 'Details & RSVP', tab: 'details' }
                      ].map((chip) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => setActiveTab(chip.tab)}
                          className="px-2.5 py-1 bg-white hover:bg-amber-100/70 text-slate-700 hover:text-amber-950 border border-slate-200 rounded-lg text-[11px] font-medium transition-all shadow-2xs"
                        >
                          {chip.label} →
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 1. FONT FAMILY SELECTOR (Shown only when text is selected or browsing) */}
              {(!selectedElement || isText) && (
                <>
                  <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-[#006989]" />
                    <span>Font Family</span>
                  </label>
                  {activeFontFamily && (
                    <span className="text-[10px] text-slate-500 font-mono truncate max-w-[150px]">
                      {activeFontFamily.replace(/['",]/g, '')}
                    </span>
                  )}
                </div>

                {/* Dropdown with Optgroups */}
                <select
                  disabled={!activeElemId}
                  value={activeFontFamily || ''}
                  onChange={(e) => {
                    if (activeElemId && e.target.value) {
                      onUpdateElementStyle(activeElemId, { fontFamily: e.target.value });
                    }
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-slate-50 focus:border-[#006989] focus:ring-1 focus:ring-[#006989] outline-none text-xs font-serif text-slate-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>Choose a wedding font...</option>
                  {WEDDING_FONT_FAMILIES.map((group) => (
                    <optgroup key={group.category} label={group.category}>
                      {group.fonts.map((f) => (
                        <option key={f.name} value={f.value}>
                          {f.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                {/* Quick Switch Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: 'Great Vibes', value: "'Great Vibes', cursive", preview: 'Great Vibes' },
                    { label: 'Alex Brush', value: "'Alex Brush', cursive", preview: 'Alex Brush' },
                    { label: 'Cinzel', value: "'Cinzel', serif", preview: 'CINZEL' },
                    { label: 'Playfair', value: "'Playfair Display', serif", preview: 'Playfair' },
                    { label: 'Rufina', value: "'Rufina', serif", preview: 'Rufina' },
                    { label: 'Montserrat', value: "'Montserrat', sans-serif", preview: 'Modern' },
                  ].map((pill) => {
                    const isSelected = activeFontFamily.toLowerCase().includes(pill.label.toLowerCase());
                    return (
                      <button
                        key={pill.label}
                        type="button"
                        disabled={!activeElemId}
                        onClick={() => {
                          if (activeElemId) onUpdateElementStyle(activeElemId, { fontFamily: pill.value });
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] border transition-all ${
                          isSelected
                            ? 'bg-[#006989] text-white border-[#006989] shadow-xs font-semibold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                        style={{ fontFamily: pill.value }}
                      >
                        {pill.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. FONT SIZE & HEIGHT CONTROLS */}
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#006989]" />
                    <span>Font Size / Height</span>
                  </label>
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                    <input
                      type="number"
                      min={10}
                      max={96}
                      value={activeFontSize}
                      disabled={!activeElemId}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 16;
                        if (activeElemId) onUpdateElementStyle(activeElemId, { fontSize: val });
                      }}
                      className="w-10 bg-transparent text-center font-bold text-xs outline-none text-slate-800 disabled:opacity-50"
                    />
                    <span className="text-[10px] text-slate-500">px</span>
                  </div>
                </div>

                {/* Slider + Stepper Controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={!activeElemId || activeFontSize <= 10}
                    onClick={() => {
                      if (activeElemId) onUpdateElementStyle(activeElemId, { fontSize: Math.max(10, activeFontSize - 1) });
                    }}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 font-bold text-sm transition-all border border-slate-200 shrink-0"
                    title="Decrease font size"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="range"
                    min={10}
                    max={96}
                    value={activeFontSize}
                    disabled={!activeElemId}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (activeElemId) onUpdateElementStyle(activeElemId, { fontSize: val });
                    }}
                    className="flex-1 accent-[#006989] cursor-pointer disabled:opacity-40"
                  />

                  <button
                    type="button"
                    disabled={!activeElemId || activeFontSize >= 96}
                    onClick={() => {
                      if (activeElemId) onUpdateElementStyle(activeElemId, { fontSize: Math.min(96, activeFontSize + 1) });
                    }}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 font-bold text-sm transition-all border border-slate-200 shrink-0"
                    title="Increase font size"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1 pt-1 overflow-x-auto scrollbar-none">
                  {[14, 18, 24, 32, 42, 54, 68].map((size) => (
                    <button
                      key={size}
                      type="button"
                      disabled={!activeElemId}
                      onClick={() => {
                        if (activeElemId) onUpdateElementStyle(activeElemId, { fontSize: size });
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                        activeFontSize === size
                          ? 'bg-[#006989] text-white border-[#006989]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      } disabled:opacity-40`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. LUXURY WEDDING COLOR PALETTE */}
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Paintbrush className="w-3.5 h-3.5 text-[#006989]" />
                    <span>Luxury Wedding Colors</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs" 
                      style={{ backgroundColor: activeColor }}
                    />
                    <span className="text-[11px] font-mono font-bold text-slate-700 uppercase">
                      {activeColor}
                    </span>
                  </div>
                </div>

                {/* Swatches Grid */}
                <div className="grid grid-cols-4 xs:grid-cols-5 gap-2">
                  {LUXURY_WEDDING_COLORS.map((swatch) => {
                    const isSelected = activeColor.toLowerCase() === swatch.hex.toLowerCase();
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        disabled={!activeElemId}
                        onClick={() => {
                          if (activeElemId) onUpdateElementStyle(activeElemId, { color: swatch.hex });
                        }}
                        className={`group relative flex flex-col items-center p-1.5 rounded-xl border transition-all ${
                          isSelected 
                            ? 'border-[#006989] ring-2 ring-[#006989]/30 bg-[#006989]/5' 
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                        title={swatch.name}
                      >
                        <div 
                          className="w-7 h-7 rounded-full border shadow-xs flex items-center justify-center transition-transform group-hover:scale-105"
                          style={{ backgroundColor: swatch.hex, borderColor: swatch.border }}
                        >
                          {isSelected && (
                            <Check className={`w-3.5 h-3.5 ${['#ffffff', '#fdfbf7', '#faf1db'].includes(swatch.hex) ? 'text-slate-800' : 'text-white'}`} />
                          )}
                        </div>
                        <span className="text-[9px] text-slate-600 truncate w-full text-center mt-1 block">
                          {swatch.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Native Custom Color Picker + Hex Input */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <div className="relative flex items-center">
                    <input
                      type="color"
                      value={activeColor.startsWith('#') && activeColor.length === 7 ? activeColor : '#cebb78'}
                      disabled={!activeElemId}
                      onChange={(e) => {
                        if (activeElemId) onUpdateElementStyle(activeElemId, { color: e.target.value });
                      }}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white disabled:opacity-40"
                      title="Custom color picker"
                    />
                  </div>

                  <div className="flex-1 flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-400 font-mono">#</span>
                    <input
                      type="text"
                      maxLength={7}
                      value={activeColor.replace('#', '')}
                      disabled={!activeElemId}
                      onChange={(e) => {
                        const val = '#' + e.target.value.replace(/[^0-9a-fA-F]/g, '');
                        if (activeElemId && val.length <= 7) onUpdateElementStyle(activeElemId, { color: val });
                      }}
                      placeholder="cebb78"
                      className="w-full bg-transparent text-xs font-mono font-bold text-slate-800 outline-none uppercase disabled:opacity-40"
                    />
                  </div>
                </div>
              </div>

              {/* 4. LETTER SPACING & TEXT FORMATTING */}
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-xs">Letter Spacing (Kerning)</label>
                  <span className="text-[10px] text-slate-500 font-mono">{activeLetterSpacing}</span>
                </div>

                <div className="grid grid-cols-5 gap-1">
                  {[
                    { label: '0px', val: '0px' },
                    { label: '1px', val: '1px' },
                    { label: '2px', val: '2px' },
                    { label: '4px', val: '4px' },
                    { label: '6px', val: '6px' },
                  ].map((spacing) => {
                    const isSelected = activeLetterSpacing === spacing.val;
                    return (
                      <button
                        key={spacing.val}
                        type="button"
                        disabled={!activeElemId}
                        onClick={() => {
                          if (activeElemId) onUpdateElementStyle(activeElemId, { letterSpacing: spacing.val });
                        }}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold text-center border transition-all ${
                          isSelected
                            ? 'bg-[#006989] text-white border-[#006989] shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        } disabled:opacity-40`}
                      >
                        {spacing.label}
                      </button>
                    );
                  })}
                </div>

                {/* Style Toggles: Bold, Italic, Uppercase, Alignment */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      disabled={!activeElemId}
                      onClick={() => {
                        const isBold = activeFontWeight === '700' || activeFontWeight === 'bold';
                        if (activeElemId) onUpdateElementStyle(activeElemId, { fontWeight: isBold ? '400' : '700' });
                      }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        activeFontWeight === '700' || activeFontWeight === 'bold'
                          ? 'bg-white text-[#006989] shadow-xs border border-slate-200 font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      } disabled:opacity-40`}
                      title="Bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={!activeElemId}
                      onClick={() => {
                        const isItalic = activeFontStyle === 'italic';
                        if (activeElemId) onUpdateElementStyle(activeElemId, { fontStyle: isItalic ? 'normal' : 'italic' });
                      }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        activeFontStyle === 'italic'
                          ? 'bg-white text-[#006989] shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      } disabled:opacity-40`}
                      title="Italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={!activeElemId}
                      onClick={() => {
                        const isUpper = activeTextTransform === 'uppercase';
                        if (activeElemId) onUpdateElementStyle(activeElemId, { textTransform: isUpper ? 'none' : 'uppercase' });
                      }}
                      className={`px-2 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                        activeTextTransform === 'uppercase'
                          ? 'bg-white text-[#006989] shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      } disabled:opacity-40`}
                      title="UPPERCASE"
                    >
                      AA
                    </button>
                  </div>

                  {/* Text Alignment */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      disabled={!activeElemId}
                      onClick={() => {
                        if (activeElemId) onUpdateElementStyle(activeElemId, { textAlign: 'left' });
                      }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        activeTextAlign === 'left'
                          ? 'bg-white text-[#006989] shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      } disabled:opacity-40`}
                      title="Align Left"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={!activeElemId}
                      onClick={() => {
                        if (activeElemId) onUpdateElementStyle(activeElemId, { textAlign: 'center' });
                      }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        activeTextAlign === 'center'
                          ? 'bg-white text-[#006989] shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      } disabled:opacity-40`}
                      title="Align Center"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={!activeElemId}
                      onClick={() => {
                        if (activeElemId) onUpdateElementStyle(activeElemId, { textAlign: 'right' });
                      }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        activeTextAlign === 'right'
                          ? 'bg-white text-[#006989] shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      } disabled:opacity-40`}
                      title="Align Right"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

              {/* ADDED CUSTOM TEXTS LIST */}
              {addedTextsList.length > 0 && (
                <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-900 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-teal-600" />
                      <span>Custom Added Texts ({addedTextsList.length})</span>
                    </span>
                    <span className="text-[10px] text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full font-medium">Freeform items</span>
                  </div>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                    {addedTextsList.map((item) => {
                      const isCurrentlySelected = activeElemId === item.id;
                      const posX = item.left !== undefined ? item.left : (item.x !== undefined ? item.x : '50%');
                      const posY = item.top !== undefined ? item.top : (item.y !== undefined ? item.y : 260);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (onSelectElement) {
                              onSelectElement({
                                elemId: item.id,
                                text: item.text,
                                style: item,
                                position: { left: posX, top: posY },
                                isAddedText: true
                              });
                            }
                          }}
                          className={`flex items-center justify-between p-2 bg-white rounded-xl border transition-all text-[11px] cursor-pointer hover:shadow-xs ${
                            isCurrentlySelected ? 'border-teal-500 ring-2 ring-teal-500/30 bg-teal-50/40' : 'border-teal-100 hover:border-teal-300'
                          }`}
                        >
                          <div className="truncate max-w-[170px]">
                            <span className="font-semibold text-slate-800 block truncate">
                              "{item.text}"
                            </span>
                            <span className="text-[9px] font-mono text-slate-400 block">
                              X: {typeof posX === 'number' ? posX + 'px' : posX}, Y: {typeof posY === 'number' ? posY + 'px' : posY}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteElement(item.id);
                            }}
                            className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-100 transition-all shrink-0 ml-2"
                            title="Delete this custom text block"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADDED CUSTOM PHOTOS LIST */}
              {(customData?.addedImages || []).length > 0 && (
                <div className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sky-900 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-sky-600" />
                      <span>Custom Added Photos ({(customData.addedImages || []).length})</span>
                    </span>
                    <span className="text-[10px] text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-full font-medium">Freeform items</span>
                  </div>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                    {customData.addedImages.map((item) => {
                      const isCurrentlySelected = activeElemId === item.id;
                      const posX = item.left !== undefined ? item.left : (item.x !== undefined ? item.x : 40);
                      const posY = item.top !== undefined ? item.top : (item.y !== undefined ? item.y : 320);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (onSelectElement) {
                              onSelectElement({
                                elemId: item.id,
                                type: 'image',
                                src: item.src,
                                position: { left: posX, top: posY },
                                rotation: customData?.rotationOverrides?.[item.id] ?? item.rotate ?? 0,
                                isAddedImage: true
                              });
                            }
                          }}
                          className={`flex items-center justify-between p-2 bg-white rounded-xl border transition-all text-[11px] cursor-pointer hover:shadow-xs ${
                            isCurrentlySelected ? 'border-sky-500 ring-2 ring-sky-500/30 bg-sky-50/40' : 'border-sky-100 hover:border-sky-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate max-w-[170px]">
                            <img src={item.src} alt="" className="w-7 h-7 rounded object-cover border shrink-0" />
                            <div className="truncate">
                              <span className="font-semibold text-slate-800 block truncate">
                                Added Photo
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 block">
                                X: {typeof posX === 'number' ? posX + 'px' : posX}, Y: {typeof posY === 'number' ? posY + 'px' : posY}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteElement(item.id);
                            }}
                            className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-100 transition-all shrink-0 ml-2"
                            title="Delete this custom photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADDED CUSTOM SLIDE CAROUSELS LIST */}
              {(customData?.addedSliders || []).length > 0 && (
                <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Custom Slide Carousels ({(customData.addedSliders || []).length})</span>
                    </span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full font-medium">Slideshows</span>
                  </div>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                    {customData.addedSliders.map((item) => {
                      const isCurrentlySelected = activeElemId === item.id;
                      const posX = item.left !== undefined ? item.left : (item.x !== undefined ? item.x : 40);
                      const posY = item.top !== undefined ? item.top : (item.y !== undefined ? item.y : 320);
                      const slideCount = (item.photos || []).length;
                      return (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (onSelectElement) {
                              onSelectElement({
                                elemId: item.id,
                                type: 'slider',
                                sliderId: item.id,
                                position: { left: posX, top: posY },
                                rotation: customData?.rotationOverrides?.[item.id] ?? item.rotate ?? 0,
                                isSlider: true
                              });
                            }
                          }}
                          className={`flex items-center justify-between p-2 bg-white rounded-xl border transition-all text-[11px] cursor-pointer hover:shadow-xs ${
                            isCurrentlySelected ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50/40' : 'border-indigo-100 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate max-w-[170px]">
                            <span className="w-7 h-7 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                              {slideCount}
                            </span>
                            <div className="truncate">
                              <span className="font-semibold text-slate-800 block truncate">
                                Carousel ({slideCount} slides)
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 block">
                                X: {typeof posX === 'number' ? posX + 'px' : posX}, Y: {typeof posY === 'number' ? posY + 'px' : posY}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteElement(item.id);
                            }}
                            className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-100 transition-all shrink-0 ml-2"
                            title="Delete this slide carousel"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADDED CUSTOM SCROLL GALLERIES LIST */}
              {(customData?.addedScrollGalleries || []).length > 0 && (
                <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-purple-900 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      <span>Custom Scroll Galleries ({(customData.addedScrollGalleries || []).length})</span>
                    </span>
                    <span className="text-[10px] text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full font-medium">Swipe Reels</span>
                  </div>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                    {customData.addedScrollGalleries.map((item) => {
                      const isCurrentlySelected = activeElemId === item.id;
                      const posX = item.left !== undefined ? item.left : (item.x !== undefined ? item.x : 25);
                      const posY = item.top !== undefined ? item.top : (item.y !== undefined ? item.y : 320);
                      const photoCount = (item.photos || []).length;
                      return (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (onSelectElement) {
                              onSelectElement({
                                elemId: item.id,
                                type: 'scroll-gallery',
                                scrollId: item.id,
                                position: { left: posX, top: posY },
                                rotation: customData?.rotationOverrides?.[item.id] ?? item.rotate ?? 0,
                                isScrollGallery: true
                              });
                            }
                          }}
                          className={`flex items-center justify-between p-2 bg-white rounded-xl border transition-all text-[11px] cursor-pointer hover:shadow-xs ${
                            isCurrentlySelected ? 'border-purple-500 ring-2 ring-purple-500/30 bg-purple-50/40' : 'border-purple-100 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate max-w-[170px]">
                            <span className="w-7 h-7 rounded bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                              {photoCount}
                            </span>
                            <div className="truncate">
                              <span className="font-semibold text-slate-800 block truncate">
                                Scroll Reel ({photoCount} photos)
                              </span>
                              <span className="text-[9px] font-mono text-slate-400 block">
                                X: {typeof posX === 'number' ? posX + 'px' : posX}, Y: {typeof posY === 'number' ? posY + 'px' : posY}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteElement(item.id);
                            }}
                            className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-100 transition-all shrink-0 ml-2"
                            title="Delete this scroll gallery"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DELETED ELEMENTS RECOVERY PANEL */}
              {deletedCount > 0 && (
                <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-rose-900 flex items-center gap-1.5">
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Deleted Elements ({deletedCount})</span>
                    </span>
                    <span className="text-[10px] text-rose-700 font-medium">Click to restore</span>
                  </div>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                    {customData.deletedElements.map((elemId) => (
                      <div 
                        key={elemId}
                        className="flex items-center justify-between p-2 bg-white rounded-xl border border-rose-100 shadow-2xs text-[11px]"
                      >
                        <span className="font-mono text-slate-600 truncate max-w-[160px]">
                          {elemId}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRestoreElement(elemId)}
                          className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-lg transition-all"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Restore</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OVERRIDDEN ELEMENTS SUMMARY & RESET ALL */}
              {overriddenCount > 0 && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">
                      {overriddenCount} element{overriddenCount > 1 ? 's' : ''} customized
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        Object.keys(customData?.styleOverrides || {}).forEach(id => {
                          onResetElementStyle(id);
                        });
                      }}
                      className="text-[10px] font-bold text-rose-600 hover:text-rose-800 underline"
                    >
                      Reset All Styles
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

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

            {/* Timeless Grace Parents & Ceremony Title */}
            {(() => {
              const isTimelessGrace = templateInfo?.id === 'timeless-grace' || templateInfo?.id === 'timelessgrace' || (customData.colorPalette && customData.colorPalette.length === 6);
              if (!isTimelessGrace) return null;

              return (
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                    Ceremony Title &amp; Parents
                  </span>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                      Ceremony / Invitation Header
                    </label>
                    <input
                      type="text"
                      placeholder="YOU ARE INVITED TO THE NIKKAH CEREMONY OF"
                      value={customData.ceremonyTitle || ''}
                      onChange={(e) => onChangeCustomData({ ...customData, ceremonyTitle: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                        Groom's Parents
                      </label>
                      <input
                        type="text"
                        placeholder="MR &amp; MRS CH. Hussaini"
                        value={customData.groomParents || ''}
                        onChange={(e) => onChangeCustomData({ ...customData, groomParents: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        placeholder="SON OF"
                        value={customData.groomParentsSubtitle || ''}
                        onChange={(e) => onChangeCustomData({ ...customData, groomParentsSubtitle: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                        Bride's Parents
                      </label>
                      <input
                        type="text"
                        placeholder="Mr &amp; Mrs CH. Farooqi"
                        value={customData.brideParents || ''}
                        onChange={(e) => onChangeCustomData({ ...customData, brideParents: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        placeholder="DAUGHTER OF"
                        value={customData.brideParentsSubtitle || ''}
                        onChange={(e) => onChangeCustomData({ ...customData, brideParentsSubtitle: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:border-[#006989] outline-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
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

            {/* Inline text overrides counter & reset */}
            {customData.textOverrides && Object.keys(customData.textOverrides).length > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <span className="text-slate-600 font-medium">
                  {Object.keys(customData.textOverrides).length} inline text {Object.keys(customData.textOverrides).length === 1 ? 'edit' : 'edits'} on card
                </span>
                <button
                  type="button"
                  onClick={() => onChangeCustomData({ ...customData, textOverrides: {} })}
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-bold hover:underline"
                >
                  Reset Inline Edits
                </button>
              </div>
            )}

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

            {/* Formal Invitation Announcement or Timeless Grace Specific Texts */}
            {(() => {
              const isTimelessGrace = templateInfo?.id === 'timeless-grace' || templateInfo?.id === 'timelessgrace' || (customData.colorPalette && customData.colorPalette.length === 6);
              if (isTimelessGrace) {
                return (
                  <div className="space-y-3">
                    <div>
                      <label className="block font-bold text-slate-700 text-xs mb-1">
                        Salutation / Greeting
                      </label>
                      <input
                        type="text"
                        value={customData.salutation || ''}
                        onChange={(e) => onChangeCustomData({ ...customData, salutation: e.target.value })}
                        placeholder="e.g. Dear Friends and Family"
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs font-serif"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 text-xs mb-1">
                        Welcome &amp; Celebration Message
                      </label>
                      <textarea
                        rows={3}
                        value={customData.welcomeMessage || ''}
                        onChange={(e) => onChangeCustomData({ ...customData, welcomeMessage: e.target.value })}
                        placeholder="Join us for an evening of love, laughter, duas..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs leading-relaxed font-serif"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block font-bold text-slate-700 text-xs mb-1">
                          Quranic Verse / Quote
                        </label>
                        <input
                          type="text"
                          value={customData.quranVerse || ''}
                          onChange={(e) => onChangeCustomData({ ...customData, quranVerse: e.target.value })}
                          placeholder='"And We created you in pairs."'
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs font-serif"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 text-xs mb-1">
                          Reference
                        </label>
                        <input
                          type="text"
                          value={customData.quranRef || ''}
                          onChange={(e) => onChangeCustomData({ ...customData, quranRef: e.target.value })}
                          placeholder="(Surah An-Naba 78:8)"
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs font-serif"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 text-xs mb-1">
                        Closing Farewell Sign-off
                      </label>
                      <input
                        type="text"
                        value={customData.closingText || ''}
                        onChange={(e) => onChangeCustomData({ ...customData, closingText: e.target.value })}
                        placeholder="e.g. Hope to see you there"
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs font-serif"
                      />
                    </div>
                  </div>
                );
              }

              return (
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
              );
            })()}

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

        {/* TAB WIDGETS: INTERACTIVE DRAG & DROP WIDGETS PALETTE & MANAGER */}
        {activeTab === 'widgets' && (() => {
          const addedScrollGalleries = customData?.addedScrollGalleries || [];
          const addedSliders = customData?.addedSliders || [];
          const addedImages = customData?.addedImages || [];
          const addedTexts = customData?.addedTexts || [];
          const addedArrows = customData?.addedArrows || [];
          const totalAdded = addedScrollGalleries.length + addedSliders.length + addedImages.length + addedTexts.length + addedArrows.length;
          const isDolceVita = templateInfo?.id === 'dolce-vita' || templateInfo?.id === 'dolcevita' || (customData.colorPalette && customData.colorPalette.length === 5);
          const currentFirstScroll = addedScrollGalleries[0];
          const activeArrowStyle = customData?.scrollArrowDesign || currentFirstScroll?.headerStyle || 'scroll-classic';

          return (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Header Hero Banner */}
              <div className="p-3.5 bg-gradient-to-r from-purple-900 via-indigo-900 to-[#08004b] text-white rounded-2xl shadow-md space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-purple-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Widgets &amp; Visual Add-ons</span>
                  </span>
                  <span className="text-[9px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
                    Drag or Click
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-serif">
                  Add Interactive Elements to Your Invitation
                </h4>
                <p className="text-[11px] text-purple-200 leading-snug">
                  Drag any widget directly onto the card preview to place it at that spot, or click the <strong>Add</strong> button to place it instantly!
                </p>
                <div className="pt-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenAddBlockModal}
                    className="flex-1 py-1.5 px-3 bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Quick Add Block Modal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('sections')}
                    className="py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Canvas Order</span>
                  </button>
                </div>
              </div>

              {/* 4 PRIMARY WIDGET CARDS */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Available Widgets:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* 1. Scroll Images (Swipe Reel) */}
                  <div 
                    draggable={true}
                    data-widget-type="scroll-gallery"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'scroll-gallery');
                      e.dataTransfer.effectAllowed = 'copy';
                      if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = 'scroll-gallery';
                      onWidgetDragStart && onWidgetDragStart('scroll-gallery');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    className="p-3 bg-white hover:bg-purple-50/50 border border-purple-200 hover:border-purple-400 rounded-2xl transition-all shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-lg">📜</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                          Reel ↔
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-800 group-hover:text-purple-900">
                        Scroll Images Gallery
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Horizontal swipeable photo strip with custom scroll arrows
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-purple-100/80 flex items-center justify-between gap-1">
                      <span className="text-[9px] text-purple-600 font-semibold flex items-center gap-1">
                        <Move className="w-3 h-3" /> Drag to Card
                      </span>
                      <button
                        type="button"
                        draggable={false}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        data-widget-type="scroll-gallery"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddScrollGallery && onAddScrollGallery();
                        }}
                        className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Reel</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Slide Carousel (Slideshow) */}
                  <div 
                    draggable={true}
                    data-widget-type="slider"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'slider');
                      e.dataTransfer.effectAllowed = 'copy';
                      if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = 'slider';
                      onWidgetDragStart && onWidgetDragStart('slider');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    className="p-3 bg-white hover:bg-indigo-50/50 border border-indigo-200 hover:border-indigo-400 rounded-2xl transition-all shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-lg">🎞️</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                          Slideshow
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-800 group-hover:text-indigo-900">
                        Slide Carousel
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Interactive carousel with autoplay, slide dots &amp; smooth fades
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-indigo-100/80 flex items-center justify-between gap-1">
                      <span className="text-[9px] text-indigo-600 font-semibold flex items-center gap-1">
                        <Move className="w-3 h-3" /> Drag to Card
                      </span>
                      <button
                        type="button"
                        draggable={false}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        data-widget-type="slider"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddSlider && onAddSlider();
                        }}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Slides</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Single Photo */}
                  <div 
                    draggable={true}
                    data-widget-type="image"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'image');
                      e.dataTransfer.effectAllowed = 'copy';
                      if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = 'image';
                      onWidgetDragStart && onWidgetDragStart('image');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    className="p-3 bg-white hover:bg-sky-50/50 border border-sky-200 hover:border-sky-400 rounded-2xl transition-all shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-lg">🖼️</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                          Photo
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-800 group-hover:text-sky-900">
                        Single Photo
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Floating portrait or photo placed freely anywhere on card
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-sky-100/80 flex items-center justify-between gap-1">
                      <span className="text-[9px] text-sky-600 font-semibold flex items-center gap-1">
                        <Move className="w-3 h-3" /> Drag to Card
                      </span>
                      <button
                        type="button"
                        draggable={false}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        data-widget-type="image"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddImage && onAddImage();
                        }}
                        className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* 4. Custom Text */}
                  <div 
                    draggable={true}
                    data-widget-type="heading"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'heading');
                      e.dataTransfer.effectAllowed = 'copy';
                      if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = 'heading';
                      onWidgetDragStart && onWidgetDragStart('heading');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    className="p-3 bg-white hover:bg-amber-50/50 border border-amber-200 hover:border-amber-400 rounded-2xl transition-all shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-lg">✏️</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          Text
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-800 group-hover:text-amber-900">
                        Custom Text / Heading
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Add movable headline, calligraphy quote, or extra note
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-amber-100/80 flex items-center justify-between gap-1">
                      <span className="text-[9px] text-amber-600 font-semibold flex items-center gap-1">
                        <Move className="w-3 h-3" /> Drag to Card
                      </span>
                      <button
                        type="button"
                        draggable={false}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        data-widget-type="heading"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddText && onAddText('heading');
                        }}
                        className="px-2.5 py-1 bg-[#006989] hover:bg-[#005570] text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Text</span>
                      </button>
                    </div>
                  </div>

                  {/* 5. Scroll Design Arrow Indicator */}
                  <div 
                    draggable={true}
                    data-widget-type="scroll-arrow"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', 'scroll-arrow');
                      e.dataTransfer.effectAllowed = 'copy';
                      if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = 'scroll-arrow';
                      onWidgetDragStart && onWidgetDragStart('scroll-arrow');
                    }}
                    onDragEnd={() => onWidgetDragEnd && onWidgetDragEnd()}
                    className="p-3 bg-white hover:bg-rose-50/50 border border-rose-200 hover:border-rose-400 rounded-2xl transition-all shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-lg">🏹</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                          Indicator
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-800 group-hover:text-rose-900">
                        Scroll Design Arrow
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Directional swipe arrow indicator to guide guests through photos
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-rose-100/80 flex items-center justify-between gap-1">
                      <span className="text-[9px] text-rose-600 font-semibold flex items-center gap-1">
                        <Move className="w-3 h-3" /> Drag to Card
                      </span>
                      <button
                        type="button"
                        draggable={false}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        data-widget-type="scroll-arrow"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddArrow && onAddArrow(activeArrowStyle);
                        }}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Arrow</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SCROLL ARROW DESIGNS SELECTOR */}
              <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">🏹</span>
                      <span className="text-xs uppercase tracking-wider text-slate-800 font-bold">
                        Scroll Design Arrow
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Select how the scroll indicator arrow looks for built-in or custom photo reels
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddArrow && onAddArrow(activeArrowStyle)}
                    className="px-3 py-1.5 bg-[#006989] hover:bg-[#005570] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs shrink-0"
                    title="Add this scroll arrow as a standalone indicator anywhere on your card"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add to Card</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SCROLL_ARROW_DESIGNS.map((design) => {
                    const isSelected = activeArrowStyle === design.id;
                    return (
                      <button
                        key={design.id}
                        type="button"
                        onClick={() => {
                          const newDesignId = design.id;
                          onChangeCustomData({
                            ...customData,
                            scrollArrowDesign: newDesignId
                          });
                          if (addedScrollGalleries.length > 0) {
                            addedScrollGalleries.forEach(g => {
                              onUpdateScrollGallery(g.id, { headerStyle: newDesignId });
                            });
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50/90 ring-2 ring-purple-600/30 shadow-xs'
                            : 'border-slate-200 hover:border-purple-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-slate-800">
                            {design.name}
                          </span>
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                          )}
                        </div>
                        <div className="py-1.5 px-2 bg-slate-100/70 rounded-lg border border-slate-200/60 flex items-center justify-center min-h-[32px]">
                          {design.sample(currentFirstScroll?.headerColor || '#cebb78')}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 block leading-tight">
                          {design.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CURRENTLY PLACED CUSTOM WIDGETS */}
              {totalAdded > 0 && (
                <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-slate-800 font-bold">
                          Placed Widgets on Card
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {totalAdded} active
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Tap inspect to edit, resize, or rotate; tap trash to delete
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* Scroll Galleries */}
                    {addedScrollGalleries.map((g, idx) => {
                      const targetSection = sectionsList.find(s => s.id === g.afterRecId);
                      const secName = targetSection ? targetSection.name : 'Document Flow';
                      return (
                        <div
                          key={g.id}
                          className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0">
                              📜
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-xs font-bold text-slate-800 block truncate">
                                Scroll Gallery #{idx + 1}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {g.photos?.length || 0} photos • Style: {g.headerStyle || 'scroll-classic'} • Below: {secName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => onMoveWidgetUp(g.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onMoveWidgetDown(g.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onSelectElement({
                                  elemId: g.id,
                                  type: 'scroll-gallery',
                                  scrollId: g.id,
                                  position: { left: g.left, top: g.top },
                                  isScrollGallery: true
                                });
                                setActiveTab('style');
                              }}
                              className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-[10px] font-bold transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteElement(g.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete this scroll gallery"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Sliders */}
                    {addedSliders.map((s, idx) => {
                      const targetSection = sectionsList.find(s => s.id === s.afterRecId);
                      const secName = targetSection ? targetSection.name : 'Document Flow';
                      return (
                        <div
                          key={s.id}
                          className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                              🎞️
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-xs font-bold text-slate-800 block truncate">
                                Slide Carousel #{idx + 1}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {s.photos?.length || 0} slides • {s.width}×{s.height}px • Below: {secName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => onMoveWidgetUp(s.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onMoveWidgetDown(s.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onSelectElement({
                                  elemId: s.id,
                                  type: 'slider',
                                  sliderId: s.id,
                                  position: { left: s.left, top: s.top },
                                  isSlider: true
                                });
                                setActiveTab('style');
                              }}
                              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-bold transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteElement(s.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete this slider"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Added Images */}
                    {addedImages.map((img, idx) => {
                      const targetSection = sectionsList.find(s => s.id === img.afterRecId);
                      const secName = targetSection ? targetSection.name : 'Document Flow';
                      const imgSrc = img.src || img.url;
                      return (
                        <div
                          key={img.id}
                          className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <img
                              src={imgSrc}
                              alt={`Added #${idx + 1}`}
                              className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div className="overflow-hidden">
                              <span className="text-xs font-bold text-slate-800 block truncate">
                                Custom Photo #{idx + 1}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {img.width}×{img.height}px • Below: {secName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => onMoveWidgetUp(img.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onMoveWidgetDown(img.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onSelectElement({
                                  elemId: img.id,
                                  type: 'image',
                                  src: imgSrc,
                                  position: { left: img.left, top: img.top },
                                  isAddedImage: true
                                });
                                setActiveTab('style');
                              }}
                              className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-[10px] font-bold transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteElement(img.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete this photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Added Texts */}
                    {addedTexts.map((txt, idx) => {
                      const targetSection = sectionsList.find(s => s.id === txt.afterRecId);
                      const secName = targetSection ? targetSection.name : 'Document Flow';
                      return (
                        <div
                          key={txt.id}
                          className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0">
                              ✏️
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-xs font-bold text-slate-800 block truncate font-serif">
                                "{txt.text || 'Custom text'}"
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                Size: {txt.fontSize || 20}px • Below: {secName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => onMoveWidgetUp(txt.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onMoveWidgetDown(txt.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onSelectElement({
                                  elemId: txt.id,
                                  type: 'text',
                                  text: txt.text,
                                  style: txt.style,
                                  position: { left: txt.left, top: txt.top },
                                  isAddedText: true
                                });
                                setActiveTab('style');
                              }}
                              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteElement(txt.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete this text"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Added Standalone Arrows */}
                    {addedArrows.map((arrow, idx) => {
                      const targetSection = sectionsList.find(s => s.id === arrow.afterRecId);
                      const secName = targetSection ? targetSection.name : 'Document Flow';
                      return (
                        <div
                          key={arrow.id}
                          className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm shrink-0">
                              🏹
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-xs font-bold text-slate-800 block truncate">
                                Scroll Arrow #{idx + 1}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                Style: {arrow.style || 'scroll-classic'} • Below: {secName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => onMoveWidgetUp(arrow.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onMoveWidgetDown(arrow.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onSelectElement({
                                  elemId: arrow.id,
                                  type: 'arrow',
                                  arrowId: arrow.id,
                                  style: arrow.style
                                });
                                setActiveTab('widgets');
                              }}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteElement(arrow.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete this arrow"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* BUILT-IN TEMPLATE PHOTO GALLERY CONTROLS (e.g. Dolce Vita) */}
              {isDolceVita && (
                <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                        Template Built-in Photo Gallery
                      </span>
                      <span className="text-[10px] text-amber-800 block mt-0.5">
                        The original 10-photo scroll reel in Dolce Vita
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('photo')}
                      className="flex-1 py-2 px-3 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-700" />
                      <span>Replace Gallery Photos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteElement('rec2442651103')}
                      className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      title="Hide the entire built-in gallery and arrow header"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Gallery</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* TAB: CANVAS / SECTIONS MANAGER (Full Build-from-Scratch & Section Flow Control) */}
        {activeTab === 'sections' && (() => {
          const blocks = allBlocksList || [];
          const visibleCount = blocks.filter(b => !b.isDeleted).length;
          const isAllCleared = visibleCount === 0;

          return (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Header Hero Banner */}
              <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-[#08004b] text-white rounded-2xl shadow-md space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-indigo-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#cebb78]" />
                    <span>Canvas &amp; Section Flow</span>
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                    {visibleCount} Active Blocks
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-serif">
                  Structure &amp; Reorder Invitation Sections
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Build freely from top to bottom. Move sections up or down, add custom blocks anywhere, or wipe sections to start with a blank slate.
                </p>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onOpenAddBlockModal}
                    className="flex-1 min-w-[130px] px-3 py-2 bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Block</span>
                  </button>

                  {!isAllCleared ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Clear all template sections to start with a blank canvas? You can restore them anytime.')) {
                          onClearAllSections();
                        }
                      }}
                      className="px-3 py-2 bg-rose-500/25 hover:bg-rose-500/40 text-rose-200 border border-rose-400/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Hide all built-in sections to build an invitation completely from scratch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Start Blank (Clear All)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onRestoreAllSections}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Template</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider px-1">
                  <span>Sections Sequence (Top to Bottom):</span>
                  {blocks.some(b => b.isDeleted) && (
                    <button
                      type="button"
                      onClick={onRestoreAllSections}
                      className="text-indigo-600 hover:underline capitalize text-[11px] cursor-pointer"
                    >
                      Restore All Hidden
                    </button>
                  )}
                </div>

                {blocks.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="text-xs text-slate-500">No sections found in preview.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {blocks.map((item, index) => {
                      const isDeleted = !!item.isDeleted;
                      const isCustomBlock = item.type !== 'builtin';

                      let icon = '🏛️';
                      if (item.type === 'text') icon = '✏️';
                      if (item.type === 'image') icon = '🖼️';
                      if (item.type === 'scroll-gallery') icon = '📜';
                      if (item.type === 'slider') icon = '🎞️';
                      if (item.type === 'arrow') icon = '🏹';

                      return (
                        <div
                          key={item.id}
                          className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                            isDeleted 
                              ? 'bg-slate-50/80 border-dashed border-slate-200 opacity-60' 
                              : 'bg-white border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 text-[11px] font-mono font-bold text-slate-400 shrink-0 text-center">
                              #{index + 1}
                            </span>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                              isCustomBlock ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {icon}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-xs font-bold truncate ${isDeleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                  {item.title}
                                </span>
                                {isDeleted && (
                                  <span className="text-[9px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded-md uppercase">
                                    Hidden
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {item.badge} • ID: {item.id.slice(0, 16)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* Reorder Buttons */}
                            <button
                              type="button"
                              onClick={() => onMoveSectionUp(item.id)}
                              disabled={index === 0}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                              title="Move Section Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onMoveSectionDown(item.id)}
                              disabled={index === blocks.length - 1}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                              title="Move Section Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>

                            {/* Inspect / Edit Button */}
                            {isCustomBlock && !isDeleted && (
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectElement({
                                    elemId: item.id,
                                    type: item.type,
                                    isAddedText: item.type === 'text',
                                    isAddedImage: item.type === 'image',
                                    isScrollGallery: item.type === 'scroll-gallery',
                                    isSlider: item.type === 'slider',
                                    style: item
                                  });
                                  setActiveTab(item.type === 'arrow' ? 'widgets' : 'style');
                                }}
                                className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                            )}

                            {/* Hide / Delete / Restore Button */}
                            {isDeleted ? (
                              <button
                                type="button"
                                onClick={() => onRestoreElement(item.id)}
                                className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                                title="Restore section"
                              >
                                Restore
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => onDeleteElement(item.id)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete or hide section"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Add Block Button At Bottom */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAddBlockModal}
                  className="w-full py-3 px-4 border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50 rounded-2xl text-xs font-bold text-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Insert New Section Block Here</span>
                </button>
              </div>

            </div>
          );
        })()}

        {/* TAB 4: PHOTOS & GALLERY */}
        {activeTab === 'photo' && (() => {
          const isDolceVita = templateInfo?.id === 'dolce-vita' || templateInfo?.id === 'dolcevita' || (customData.colorPalette && customData.colorPalette.length === 5);
          const hasGallery = isDolceVita || (customData.galleryPhotos && customData.galleryPhotos.length > 0);
          const activeGallery = customData.galleryPhotos || (isDolceVita ? DOLCE_VITA_DEFAULT_GALLERY : []);
          const replacedImagesList = customData.imageOverrides ? Object.entries(customData.imageOverrides) : [];

          return (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Universal In-Place Card Image Replacement Tip */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block text-amber-900">✨ Click Any Image on the Invitation Card</span>
                  <span className="text-amber-800 leading-relaxed block">
                    You can click directly on <strong>any photo, seal, illustration, or banner</strong> on the invitation card to instantly replace it with your own picture!
                  </span>
                </div>
              </div>

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

              {/* REPLACED CARD IMAGES MANAGER (If any images replaced on-card) */}
              {replacedImagesList.length > 0 && (
                <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-slate-800 font-bold">
                          Replaced Card Images
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {replacedImagesList.length} replaced
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Images replaced directly on the card
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onChangeCustomData({ ...customData, imageOverrides: {} })}
                      className="text-[11px] text-rose-600 hover:text-rose-700 font-bold hover:underline"
                    >
                      Reset All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {replacedImagesList.map(([elemId, dataUrl], idx) => (
                      <div
                        key={elemId}
                        className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img
                            src={dataUrl}
                            alt={`Replaced ${idx + 1}`}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[11px] font-bold text-slate-700 block truncate">
                              Image #{idx + 1}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono block truncate">
                              ID: {elemId}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = { ...customData.imageOverrides };
                            delete updated[elemId];
                            onChangeCustomData({ ...customData, imageOverrides: updated });
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                          title="Reset this image to original"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

            {/* Timeless Grace extra dress code notes */}
            {(() => {
              const isTimelessGrace = templateInfo?.id === 'timeless-grace' || templateInfo?.id === 'timelessgrace' || (customData.colorPalette && customData.colorPalette.length === 6);
              if (!isTimelessGrace) return null;
              return (
                <div className="space-y-2.5 pt-1">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                      Dress Code Subtitle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. in soft pastel shades."
                      value={customData.dressCodeSubtitle || ''}
                      onChange={(e) => onChangeCustomData({ ...customData, dressCodeSubtitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                      Dress Code Special Restrictions / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Please avoid wearing beige, as it has been reserved for the bride and groom..."
                      value={customData.dressCodeNote || ''}
                      onChange={(e) => onChangeCustomData({ ...customData, dressCodeNote: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-[11px]">
                      RSVP Confirmation Deadline Notice
                    </label>
                    <input
                      type="text"
                      placeholder="To help us prepare for a joyful celebration, kindly confirm your attendance by..."
                      value={customData.rsvpDeadlineMessage || ''}
                      onChange={(e) => onChangeCustomData({ ...customData, rsvpDeadlineMessage: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs"
                    />
                  </div>
                </div>
              );
            })()}

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
              const isTimelessGrace = templateInfo?.id === 'timeless-grace' || templateInfo?.id === 'timelessgrace' || (customData.colorPalette && customData.colorPalette.length === 6);
              const isDolceVita = !isTimelessGrace && (templateInfo?.id === 'dolce-vita' || templateInfo?.id === 'dolcevita' || (customData.colorPalette && customData.colorPalette.length === 5));
              const palettePresets = isTimelessGrace
                ? TIMELESS_GRACE_PALETTES
                : (isDolceVita ? DOLCE_VITA_PALETTES : BLOSSOM_OUD_PALETTES);
              const defaultPal = isTimelessGrace
                ? ['#d8c7e2', '#fcd2b7', '#fae6b1', '#f7d3d3', '#d1e2ec', '#d9d4d0']
                : (isDolceVita 
                    ? ['#faf1db', '#f5d9b1', '#f2cac9', '#afcff1', '#7ebbfa']
                    : ['#60603b', '#360c1a', '#40312c', '#efdfcd']);
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
