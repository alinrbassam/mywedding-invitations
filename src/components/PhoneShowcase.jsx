import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, MapPin, Calendar, Check, Music, Sparkles } from 'lucide-react';

export function PhoneShowcase({ onOpenOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [activeTab, setActiveTab] = useState('details'); // details, schedule, rsvp

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setIsPlayingMusic(true);
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (guestName.trim()) {
      setRsvpStatus('confirmed');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#fbfbfb] via-[#f2f9fd] to-[#fbfbfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006989]/10 text-[#006989] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Experience
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#08004b] leading-tight">
              An invitation that feels like opening a personal gift.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              No apps, no downloads, no clunky PDFs. Your guests receive a single magical link that works on any phone, tablet, or computer with seamless music, opening animations, and Google Maps directions.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#006989] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-slate-800">Animated Envelope & Wax Seal:</span>
                  <span className="text-slate-600 text-sm ml-1">Creates an unforgettable unboxing moment before the details reveal.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#006989] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-slate-800">One-Tap Smart RSVP:</span>
                  <span className="text-slate-600 text-sm ml-1">Responses instantly sync into your private Google Spreadsheet.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#006989] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-slate-800">Your Song Playing in the Background:</span>
                  <span className="text-slate-600 text-sm ml-1">Sets the emotional tone for your celebration right from the start.</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/96170710406?text=Hello!%20I%20would%20like%20to%20inquire%20about%20the%20Blossom%20%26%20Oud%20design"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 py-3.5 bg-[#006989] text-white font-bold rounded-full hover:bg-[#005570] transition-all shadow-md hover:shadow-lg"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Phone Frame Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              
              {/* Subtle background glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#006989]/20 to-[#cebb78]/20 rounded-[50px] filter blur-xl opacity-70" />

              {/* iPhone Hardware Outer */}
              <div className="relative bg-[#1c1c1e] p-3 rounded-[46px] shadow-2xl border-4 border-[#2c2c2e]">
                
                {/* Dynamic Island / Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-between px-3">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-slate-700" />
                </div>

                {/* iPhone Screen Content */}
                <div className="relative bg-[#fbf9f5] rounded-[36px] overflow-hidden aspect-[9/18.5] text-slate-800 flex flex-col font-sans select-none border border-black/10">
                  
                  {/* Floating Music Indicator */}
                  {isOpen && (
                    <div className="absolute top-10 right-4 z-20">
                      <button
                        onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                        className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-[#006989] hover:scale-105 transition-transform"
                      >
                        {isPlayingMusic ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                      </button>
                    </div>
                  )}

                  {!isOpen ? (
                    /* Envelope Opening State */
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#f7f2ea] to-[#ebdccb] relative">
                      
                      {/* Envelope illustration */}
                      <div className="w-full max-w-[240px] aspect-[4/3] bg-white rounded-2xl shadow-xl border border-amber-200/60 p-5 flex flex-col items-center justify-between relative overflow-hidden">
                        <div className="w-full border-b border-dashed border-amber-300 pb-2 text-[10px] uppercase tracking-widest text-[#9a8848] font-bold">
                          Wedding Invitation
                        </div>
                        
                        <div className="my-auto text-center space-y-1">
                          <p className="font-serif text-lg font-bold text-[#08004b]">Alexa & Richard</p>
                          <p className="text-xs text-slate-500 italic">September 14, 2025</p>
                        </div>

                        {/* Wax Seal Button */}
                        <button
                          onClick={handleOpenEnvelope}
                          className="w-14 h-14 -mb-8 rounded-full bg-gradient-to-br from-[#c2763a] via-[#cebb78] to-[#9a8848] text-white shadow-lg flex flex-col items-center justify-center hover:scale-110 active:scale-95 transition-all group z-10 cursor-pointer border-2 border-white/60"
                        >
                          <Heart className="w-5 h-5 fill-white" />
                          <span className="text-[8px] font-bold tracking-tighter uppercase mt-0.5">OPEN</span>
                        </button>
                      </div>

                      <div className="mt-12 text-center">
                        <p className="text-xs font-semibold text-slate-600 tracking-wide">
                          Tap wax seal to open invitation
                        </p>
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          🎵 Music Included
                        </span>
                      </div>

                    </div>
                  ) : (
                    /* Invitation Revealed State */
                    <div className="flex-1 overflow-y-auto pt-10 pb-6 px-4 space-y-4 text-center">
                      
                      {/* Subtitle / Header */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#cebb78] font-bold">Together with their families</span>
                        <h3 className="font-serif text-2xl font-bold text-[#08004b] leading-tight">
                          Alexa & Richard
                        </h3>
                        <p className="text-xs text-slate-500 italic">request the honor of your presence</p>
                      </div>

                      {/* Photo banner */}
                      <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/10] relative">
                        <img
                          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80"
                          alt="Wedding Couple"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-2">
                          <span className="text-white text-xs font-serif italic tracking-wide">Florence, Italy</span>
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 grid grid-cols-4 gap-1 text-center">
                        <div>
                          <div className="font-bold text-sm text-[#006989]">142</div>
                          <div className="text-[9px] uppercase text-slate-400">Days</div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#006989]">08</div>
                          <div className="text-[9px] uppercase text-slate-400">Hours</div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#006989]">34</div>
                          <div className="text-[9px] uppercase text-slate-400">Mins</div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#006989]">19</div>
                          <div className="text-[9px] uppercase text-slate-400">Secs</div>
                        </div>
                      </div>

                      {/* Micro Navigation Tabs */}
                      <div className="flex rounded-lg bg-slate-100 p-0.5 text-[10px] font-semibold">
                        <button
                          onClick={() => setActiveTab('details')}
                          className={`flex-1 py-1 rounded-md transition-colors ${activeTab === 'details' ? 'bg-white text-[#006989] shadow-xs' : 'text-slate-500'}`}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setActiveTab('schedule')}
                          className={`flex-1 py-1 rounded-md transition-colors ${activeTab === 'schedule' ? 'bg-white text-[#006989] shadow-xs' : 'text-slate-500'}`}
                        >
                          Timeline
                        </button>
                        <button
                          onClick={() => setActiveTab('rsvp')}
                          className={`flex-1 py-1 rounded-md transition-colors ${activeTab === 'rsvp' ? 'bg-white text-[#006989] shadow-xs' : 'text-slate-500'}`}
                        >
                          RSVP
                        </button>
                      </div>

                      {/* Tab Content: Details */}
                      {activeTab === 'details' && (
                        <div className="bg-white rounded-xl p-3 text-left shadow-xs border border-slate-100 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Calendar className="w-4 h-4 text-[#006989] shrink-0" />
                            <span>Sunday, September 14, 2025</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <MapPin className="w-4 h-4 text-[#006989] shrink-0" />
                            <span>Villa Cimbrone, Ravello, Amalfi Coast</span>
                          </div>
                          <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noreferrer"
                            className="block text-center mt-2 py-1.5 px-3 bg-slate-50 text-[#006989] font-bold rounded-lg hover:bg-slate-100 text-[11px]"
                          >
                            Open in Google Maps ↗
                          </a>
                        </div>
                      )}

                      {/* Tab Content: Schedule */}
                      {activeTab === 'schedule' && (
                        <div className="bg-white rounded-xl p-3 text-left shadow-xs border border-slate-100 space-y-2 text-xs">
                          <div className="flex justify-between border-b border-slate-100 pb-1">
                            <span className="font-bold text-[#006989]">15:30</span>
                            <span className="text-slate-700">Welcome Drinks</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-1">
                            <span className="font-bold text-[#006989]">16:30</span>
                            <span className="text-slate-700">Ceremony in the Gardens</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-1">
                            <span className="font-bold text-[#006989]">18:00</span>
                            <span className="text-slate-700">Aperitivo & Sunset</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-[#006989]">20:00</span>
                            <span className="text-slate-700">Gala Dinner & Party</span>
                          </div>
                        </div>
                      )}

                      {/* Tab Content: RSVP */}
                      {activeTab === 'rsvp' && (
                        <div className="bg-white rounded-xl p-3 text-left shadow-xs border border-slate-100 text-xs">
                          {rsvpStatus === 'confirmed' ? (
                            <div className="text-center py-4 space-y-2">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                                <Check className="w-4 h-4" />
                              </div>
                              <p className="font-bold text-slate-800">RSVP Confirmed!</p>
                              <p className="text-[10px] text-slate-500">Thank you, {guestName}. We cannot wait to celebrate together!</p>
                            </div>
                          ) : (
                            <form onSubmit={handleRsvpSubmit} className="space-y-2">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600">Your Full Name</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Charlotte Miller"
                                  value={guestName}
                                  onChange={(e) => setGuestName(e.target.value)}
                                  className="w-full text-xs p-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-[#006989]"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-600">Attending?</label>
                                <select className="w-full text-xs p-1.5 border border-slate-200 rounded-md">
                                  <option>Joyfully Accept 🎉</option>
                                  <option>Regretfully Decline</option>
                                </select>
                              </div>
                              <button
                                type="submit"
                                className="w-full py-2 bg-[#006989] text-white font-bold rounded-lg text-xs"
                              >
                                Send RSVP
                              </button>
                            </form>
                          )}
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="text-[10px] text-slate-400 hover:text-slate-600 underline"
                        >
                          Close and re-open envelope
                        </button>
                      </div>

                    </div>
                  )}

                  {/* Home Bar Indicator */}
                  <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto my-1.5 shrink-0" />

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
