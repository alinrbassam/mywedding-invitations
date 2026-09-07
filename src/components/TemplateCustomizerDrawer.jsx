import React, { useState, useRef } from 'react';
import { 
  X, Heart, Calendar, MapPin, Camera, Clock, 
  Sparkles, RotateCcw, Check, ShoppingBag, Upload, 
  Trash2, Plus, Info, ChevronRight, RefreshCw 
} from 'lucide-react';

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

export function TemplateCustomizerDrawer({ 
  isOpen, 
  onClose, 
  templateInfo, 
  customData, 
  onChangeCustomData, 
  onResetCustomData,
  onUpdateView,
  isUpdating = false,
  onSaveAndOrder 
}) {
  const [activeTab, setActiveTab] = useState('names'); // 'names', 'date', 'venue', 'photo', 'schedule', 'details'
  const fileInputRef = useRef(null);

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
  };

  const tabs = [
    { id: 'names', label: 'Names', icon: Heart },
    { id: 'date', label: 'Date & Time', icon: Calendar },
    { id: 'venue', label: 'Location', icon: MapPin },
    { id: 'photo', label: 'Photos', icon: Camera },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'details', label: 'Details', icon: Sparkles },
  ];

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Drawer Header */}
      <div className="p-4 bg-[#08004b] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#cebb78]/20 flex items-center justify-center text-[#cebb78]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold tracking-wide">
              Personalize Invitation
            </h3>
            <p className="text-[11px] text-slate-300">
              Live instant preview on {templateInfo?.name || 'Template'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onUpdateView && (
            <button
              onClick={onUpdateView}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#cebb78]/20 hover:bg-[#cebb78]/30 text-[#cebb78] border border-[#cebb78]/40 text-xs font-bold transition-all shadow-xs"
              title="Force update view preview"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>Update View</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-all"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time live status notification banner */}
      <div className="bg-emerald-50/90 border-b border-emerald-200/80 px-4 py-2 flex items-center justify-between text-[11px] text-emerald-800 shrink-0">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Changes update on the spot as you type
        </span>
        {onUpdateView && (
          <button
            onClick={onUpdateView}
            className="font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
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
                  ? 'bg-white text-[#08004b] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#006989]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 p-5 overflow-y-auto space-y-6 text-slate-800 text-xs font-sans">
        
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
              <label className="block font-bold text-slate-700 mb-1">Google Maps URL</label>
              <input
                type="text"
                placeholder="https://maps.google.com/?q=..."
                value={customData.mapUrl || ''}
                onChange={(e) => onChangeCustomData({ ...customData, mapUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#006989] outline-none text-xs"
              />
            </div>
          </div>
        )}

        {/* TAB 4: COUPLE PHOTOS */}
        {activeTab === 'photo' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-2">
              <Camera className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
              <span>
                Upload your favourite photo to preview how you will look inside the invitation frame!
              </span>
            </div>

            {/* Custom Photo Upload Area */}
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
                  Click to Upload Your Photo
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  PNG, JPG or WEBP (High resolution recommended)
                </p>
              </div>
            </div>

            {/* If Photo Uploaded: Active Preview & Clear */}
            {customData.photoUrl && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={customData.photoUrl}
                    alt="Uploaded Couple"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <span className="font-bold text-slate-800 text-xs block truncate">
                      Custom Photo Active
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Showing in template
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onChangeCustomData({ ...customData, photoUrl: '' })}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove custom photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Inspiration Presets */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-700 block mb-2">
                Or Try Sample Aesthetic Presets:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PHOTO_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => onChangeCustomData({ ...customData, photoUrl: preset.url })}
                    className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-[#006989] bg-white transition-all text-left"
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
          </div>
        )}

      </div>

      {/* Drawer Action Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2.5">
        {onUpdateView && (
          <button
            onClick={onUpdateView}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-300/80 hover:border-slate-400 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>⚡ Update View Preview</span>
          </button>
        )}

        <button
          onClick={() => onSaveAndOrder(customData)}
          className="w-full py-3.5 px-5 rounded-full bg-[#006989] hover:bg-[#005570] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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
            Live Preview Synchronized
          </span>
        </div>
      </div>

    </aside>
  );
}
