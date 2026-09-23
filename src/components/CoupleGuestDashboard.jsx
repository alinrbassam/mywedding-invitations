import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, UserCheck, UserX, Baby, Utensils, Download, 
  MessageSquare, Copy, Check, ExternalLink, Plus, Trash2, 
  Search, RefreshCw, Calendar, MapPin, Sparkles, Heart,
  ChevronRight, ArrowLeft, ShieldCheck, Share2
} from 'lucide-react';
import { getClientInvite, getClientRsvps, saveClientRsvp, deleteClientRsvp, getClientRsvpStats, verifyCoupleAccess } from '../data/clientInvites';
import { isSessionAdmin } from '../config/adminAuth';

export function CoupleGuestDashboard({ clientSlug = 'hadi', onBackToHome, onOpenInvite }) {
  const [slug] = useState((clientSlug || 'hadi').toLowerCase().replace(/[^a-z0-9_-]/g, ''));
  const [client, setClient] = useState(() => getClientInvite(slug));
  const [rsvps, setRsvps] = useState(() => getClientRsvps(slug));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'attending' | 'declined' | 'dietary'
  const [copiedToast, setCopiedToast] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Option C: Secure PIN / Key Gate
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    // 1. Admin session is automatically authorized
    if (isSessionAdmin()) return true;

    // 2. Previously authorized in session
    if (sessionStorage.getItem(`laylitna_couple_auth_${slug}`) === 'true') return true;

    // 3. Secret Key or PIN in query parameters (?key=... or ?pin=...)
    try {
      const params = new URLSearchParams(window.location.search);
      const key = params.get('key') || params.get('pin');
      if (key && verifyCoupleAccess(slug, key)) {
        sessionStorage.setItem(`laylitna_couple_auth_${slug}`, 'true');
        return true;
      }
    } catch (e) {}

    return false;
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [newGuest, setNewGuest] = useState({
    name: '',
    attending: 'yes',
    adultsCount: 1,
    kidsCount: 0,
    notes: '',
    phone: ''
  });

  const coupleNames = useMemo(() => {
    if (client?.customData?.partner1 && client?.customData?.partner2) {
      return `${client.customData.partner1} & ${client.customData.partner2}`;
    }
    return 'Hadi & Nour';
  }, [client]);

  const weddingDate = client?.customData?.dateText || 'September 20, 2026';
  const weddingVenue = client?.customData?.venueName || 'Château d’Amalfi';

  // Refresh data from storage & API
  const refreshData = () => {
    const local = getClientRsvps(slug);
    setRsvps(local);
    // Fetch from backend API
    fetch(`/api/rsvp?client=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.rsvps) && data.rsvps.length > 0) {
          // Merge API responses into local if not already stored
          data.rsvps.forEach(apiItem => {
            if (!local.some(l => l.id === apiItem.id || (l.name === apiItem.name && l.createdAt === apiItem.createdAt))) {
              saveClientRsvp(slug, apiItem);
            }
          });
          setRsvps(getClientRsvps(slug));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    refreshData();

    // Listen for storage events and postMessages
    const handleUpdate = (e) => {
      if (e.detail?.slug === slug) {
        setRsvps(e.detail.rsvps);
      } else {
        refreshData();
      }
    };

    const handleMessage = (e) => {
      if (e.data?.type === 'WBG_RSVP_SUBMITTED') {
        const item = e.data.data;
        if (item && (!item.clientSlug || item.clientSlug === slug)) {
          saveClientRsvp(slug, item);
          refreshData();
        }
      }
    };

    window.addEventListener('wbg_rsvp_updated', handleUpdate);
    window.addEventListener('message', handleMessage);

    // Periodic polling every 5s for live updates
    const timer = setInterval(refreshData, 5000);

    return () => {
      window.removeEventListener('wbg_rsvp_updated', handleUpdate);
      window.removeEventListener('message', handleMessage);
      clearInterval(timer);
    };
  }, [slug]);

  // Derived KPI calculations
  const stats = useMemo(() => {
    let totalAttendingParties = 0;
    let totalDeclinedParties = 0;
    let totalAdults = 0;
    let totalKids = 0;
    let withDietaryCount = 0;

    rsvps.forEach(r => {
      if (r.attending === 'yes') {
        totalAttendingParties += 1;
        totalAdults += (Number(r.adultsCount) || 1);
        totalKids += (Number(r.kidsCount) || 0);
      } else {
        totalDeclinedParties += 1;
      }
      if (r.notes && r.notes.trim().length > 0) {
        withDietaryCount += 1;
      }
    });

    const totalGuests = totalAdults + totalKids;
    const totalResponses = rsvps.length;
    const attendanceRate = totalResponses > 0 ? Math.round((totalAttendingParties / totalResponses) * 100) : 0;

    return {
      totalResponses,
      totalAttendingParties,
      totalDeclinedParties,
      totalAdults,
      totalKids,
      totalGuests,
      attendanceRate,
      withDietaryCount
    };
  }, [rsvps]);

  // Filter and search guest list
  const filteredRsvps = useMemo(() => {
    return rsvps.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q));

      if (!matchesQuery) return false;

      if (filterTab === 'attending') return item.attending === 'yes';
      if (filterTab === 'declined') return item.attending === 'no';
      if (filterTab === 'dietary') return Boolean(item.notes && item.notes.trim().length > 0);
      return true;
    });
  }, [rsvps, searchQuery, filterTab]);

  const handleCopyLink = (url, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedToast(`✓ Copied ${label}`);
      setTimeout(() => setCopiedToast(''), 3000);
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['Guest Name', 'Attending', 'Adults', 'Children', 'Total in Party', 'Dietary / Special Notes', 'Phone', 'Date Submitted', 'Source'];
    const rows = rsvps.map(r => [
      `"${(r.name || '').replace(/"/g, '""')}"`,
      r.attending === 'yes' ? 'Attending' : 'Declined',
      r.attending === 'yes' ? (r.adultsCount || 1) : 0,
      r.attending === 'yes' ? (r.kidsCount || 0) : 0,
      r.attending === 'yes' ? ((r.adultsCount || 1) + (r.kidsCount || 0)) : 0,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '',
      r.source || 'web'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${slug}_wedding_guest_list.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedToast('✓ Downloaded Guest List CSV');
    setTimeout(() => setCopiedToast(''), 3000);
  };

  const handleCopyWhatsAppSummary = () => {
    const attendingList = rsvps.filter(r => r.attending === 'yes');
    const dietaryList = rsvps.filter(r => r.notes && r.notes.trim().length > 0);

    let summary = `💍 *Wedding Guest RSVP Update: ${coupleNames}*\n`;
    summary += `📅 *Date:* ${weddingDate}\n`;
    summary += `📍 *Venue:* ${weddingVenue}\n\n`;
    summary += `📊 *Headcount Summary:*\n`;
    summary += `• 🥂 *Total Confirmed Guests:* ${stats.totalGuests} (${stats.totalAdults} Adults, ${stats.totalKids} Kids)\n`;
    summary += `• ✅ *Attending Parties:* ${stats.totalAttendingParties}\n`;
    summary += `• ❌ *Declined:* ${stats.totalDeclinedParties}\n`;
    summary += `• 📬 *Total Responses:* ${stats.totalResponses} (${stats.attendanceRate}% Attendance Rate)\n\n`;

    if (dietaryList.length > 0) {
      summary += `🍽️ *Dietary & Special Requests (${dietaryList.length}):*\n`;
      dietaryList.forEach(d => {
        summary += `• *${d.name}*: ${d.notes}\n`;
      });
      summary += `\n`;
    }

    summary += `✨ *Recent Confirmations:*\n`;
    attendingList.slice(0, 5).forEach(a => {
      summary += `• ${a.name} (${(a.adultsCount || 1)} Ad, ${(a.kidsCount || 0)} Ch)\n`;
    });

    summary += `\n_Live tracker: ${window.location.origin}/invite/${slug}/guests_`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopiedToast('✓ Copied WhatsApp Catering Summary');
      setTimeout(() => setCopiedToast(''), 3500);
    }
  };

  const handleAddManualGuest = (e) => {
    e.preventDefault();
    if (!newGuest.name.trim()) return;

    saveClientRsvp(slug, {
      name: newGuest.name,
      attending: newGuest.attending,
      adultsCount: newGuest.attending === 'yes' ? Number(newGuest.adultsCount) : 0,
      kidsCount: newGuest.attending === 'yes' ? Number(newGuest.kidsCount) : 0,
      notes: newGuest.notes,
      phone: newGuest.phone,
      source: 'manual'
    });

    setIsAddModalOpen(false);
    setNewGuest({
      name: '',
      attending: 'yes',
      adultsCount: 1,
      kidsCount: 0,
      notes: '',
      phone: ''
    });
    refreshData();

    setCopiedToast('✓ Guest added successfully');
    setTimeout(() => setCopiedToast(''), 3000);
  };

  const handleDeleteGuest = (id, name) => {
    if (window.confirm(`Remove ${name} from the RSVP guest list?`)) {
      deleteClientRsvp(slug, id);
      refreshData();
    }
  };

  const inviteUrl = `${window.location.origin}/invite/${slug}`;
  const dashboardUrl = `${window.location.origin}/invite/${slug}/guests${client?.secretPin ? `?key=${client.secretPin}` : ''}`;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (verifyCoupleAccess(slug, pinInput)) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`laylitna_couple_auth_${slug}`, 'true');
      }
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('Incorrect 4-digit PIN. Please try again or use your secret WhatsApp link.');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-[#cebb78]/30 selection:text-[#cebb78]">
        <div className="w-full max-w-md bg-[#08004b]/95 border border-[#cebb78]/40 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full mx-auto border-2 border-[#cebb78] overflow-hidden shadow-lg p-1 bg-white/5">
            <img src="/laylitna-logo.png" alt="Laylitna" className="w-full h-full object-cover rounded-full" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#cebb78]/15 text-[#cebb78] border border-[#cebb78]/30 inline-block">
              Private Couple Access
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {coupleNames}
            </h2>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed pt-1">
              Please enter your 4-digit Wedding PIN to view your private guest RSVP responses and headcount.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError('');
                }}
                placeholder="Enter 4-digit PIN..."
                className="w-full text-center tracking-[0.3em] font-mono text-xl py-3 px-4 rounded-xl bg-white/10 border border-slate-600 focus:border-[#cebb78] text-white placeholder-slate-500 focus:outline-none transition-all"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-medium animate-in fade-in">
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <button
              onClick={() => onOpenInvite ? onOpenInvite(slug) : window.location.href = `/invite/${slug}`}
              className="hover:text-white transition-colors"
            >
              ← View Invitation Card
            </button>
            <span className="text-[#cebb78]/70">Laylitna Security</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col font-sans selection:bg-[#cebb78]/30 selection:text-[#cebb78]">
      
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-2xl animate-in fade-in slide-in-from-top-4 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button 
                onClick={onBackToHome}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
                title="Back to Laylitna Studio"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#cebb78]/20 text-[#cebb78] border border-[#cebb78]/30">
                  Couple's Portal
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Live RSVP Tracker</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{coupleNames}</span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 inline" />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenInvite ? onOpenInvite(slug) : window.open(inviteUrl, '_blank')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-all shadow-sm"
              title="Open the live invitation card"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Invitation</span>
            </button>

            <button
              onClick={() => handleCopyLink(inviteUrl, 'Invitation Link')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] text-xs font-bold transition-all shadow-md hover:scale-105"
              title="Copy guest RSVP invitation link to share on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Share Invite Link</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Welcome & Event Overview Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#cebb78]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#cebb78] mb-1">
                Luxury Wedding RSVP Manager
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Guest Attendance & Catering Center
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-[#cebb78]" />
                  {weddingDate}
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-[#cebb78]" />
                  {weddingVenue}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync Active
                </span>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopyWhatsAppSummary}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 font-bold text-xs transition-all shadow-sm hover:scale-105"
                title="Copy catering summary for WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Catering Summary</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all shadow-sm hover:scale-105"
                title="Export guest list to Excel/CSV"
              >
                <Download className="w-4 h-4 text-[#cebb78]" />
                <span>Export CSV / Excel</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#cebb78] to-[#e5d59e] text-[#08004b] font-bold text-xs shadow-lg hover:brightness-110 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Guest Manually</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Main KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Confirmed Attending Guests */}
          <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/20 p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Confirmed Attending
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {stats.totalGuests}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">Guests</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-300">
              <span>👨‍👩‍👧 {stats.totalAdults} Adults</span>
              <span className="text-[#cebb78] font-bold">🎈 {stats.totalKids} Kids</span>
            </div>
          </div>

          {/* Declined Responses */}
          <div className="rounded-2xl bg-slate-900/90 border border-rose-500/20 p-5 shadow-lg relative overflow-hidden group hover:border-rose-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                Declined
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-400">
                <UserX className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {stats.totalDeclinedParties}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">Guests</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-white/5 text-xs text-slate-400 flex items-center justify-between">
              <span>Sent warm regrets</span>
              <span className="text-rose-400/80">Can't Attend</span>
            </div>
          </div>

          {/* Total Parties Responded */}
          <div className="rounded-2xl bg-slate-900/90 border border-sky-500/20 p-5 shadow-lg relative overflow-hidden group hover:border-sky-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Total Submissions
              </span>
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 flex items-center justify-center text-sky-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {stats.totalResponses}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">Parties</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-white/5 text-xs text-slate-300 flex items-center justify-between">
              <span>Attending parties:</span>
              <span className="font-bold text-white">{stats.totalAttendingParties}</span>
            </div>
          </div>

          {/* Dietary & Special Notes */}
          <div className="rounded-2xl bg-slate-900/90 border border-amber-500/20 p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Dietary & Notes
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-300">
                <Utensils className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {stats.withDietaryCount}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">Requests</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-white/5 text-xs text-slate-300 flex items-center justify-between">
              <span>Attendance Rate:</span>
              <span className="font-bold text-[#cebb78]">{stats.attendanceRate}%</span>
            </div>
          </div>

        </div>

        {/* Guest List Section */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5 sm:p-7 shadow-2xl">
          
          {/* Controls bar: Search & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by guest name or dietary note..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#cebb78]/60 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/5 overflow-x-auto text-xs">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterTab === 'all'
                    ? 'bg-[#cebb78] text-[#08004b] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({rsvps.length})
              </button>
              <button
                onClick={() => setFilterTab('attending')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterTab === 'attending'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Attending ({stats.totalAttendingParties})
              </button>
              <button
                onClick={() => setFilterTab('declined')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterTab === 'declined'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Declined ({stats.totalDeclinedParties})
              </button>
              <button
                onClick={() => setFilterTab('dietary')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterTab === 'dietary'
                    ? 'bg-amber-400 text-[#08004b] shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Dietary ({stats.withDietaryCount})
              </button>
            </div>

          </div>

          {/* Roster Table / Card list */}
          {filteredRsvps.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto text-slate-500 mb-3">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">No guests found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {searchQuery ? `No responses matched "${searchQuery}"` : 'When guests submit their RSVPs, they will appear here immediately.'}
              </p>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Guest / Party</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-center">Adults</th>
                    <th className="py-3 px-3 text-center">Kids</th>
                    <th className="py-3 px-3">Dietary & Wishes</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                  {filteredRsvps.map((guest) => {
                    const isYes = guest.attending === 'yes';
                    const initials = (guest.name || 'G')
                      .split(' ')
                      .map(w => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();

                    return (
                      <tr key={guest.id} className="hover:bg-white/[0.02] transition-colors group">
                        
                        {/* Guest Name & Avatar */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              isYes 
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                                : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            }`}>
                              {initials}
                            </div>
                            <div>
                              <div className="font-bold text-white group-hover:text-[#cebb78] transition-colors">
                                {guest.name}
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                                <span>{guest.createdAt ? new Date(guest.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Web'}</span>
                                {guest.source === 'manual' && (
                                  <span className="text-[9px] px-1.5 py-0.2 bg-white/10 rounded text-slate-300">Added manually</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-3">
                          {isYes ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
                              <Check className="w-3 h-3" />
                              Attending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold text-[11px]">
                              ✕ Declined
                            </span>
                          )}
                        </td>

                        {/* Adults */}
                        <td className="py-3.5 px-3 text-center font-semibold text-slate-200">
                          {isYes ? (guest.adultsCount || 1) : '-'}
                        </td>

                        {/* Kids */}
                        <td className="py-3.5 px-3 text-center">
                          {isYes && guest.kidsCount > 0 ? (
                            <span className="inline-block px-2 py-0.5 rounded bg-amber-400/20 text-[#cebb78] border border-amber-400/30 font-bold text-xs">
                              {guest.kidsCount}
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>

                        {/* Notes / Dietary */}
                        <td className="py-3.5 px-3 max-w-xs">
                          {guest.notes ? (
                            <div className="text-xs text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5 inline-block">
                              “{guest.notes}”
                            </div>
                          ) : (
                            <span className="text-slate-500 text-xs italic">None</span>
                          )}
                        </td>

                        {/* Delete Action */}
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => handleDeleteGuest(guest.id, guest.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-70 group-hover:opacity-100"
                            title="Remove guest"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

      {/* Manual Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#cebb78]" />
                <span>Log Guest RSVP</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualGuest} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Guest or Family Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Walid & Maya Kassir"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#cebb78]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Attendance Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewGuest({ ...newGuest, attending: 'yes' })}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      newGuest.attending === 'yes'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                        : 'bg-slate-950 text-slate-400 border-white/10'
                    }`}
                  >
                    ✓ Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGuest({ ...newGuest, attending: 'no' })}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      newGuest.attending === 'no'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                        : 'bg-slate-950 text-slate-400 border-white/10'
                    }`}
                  >
                    ✕ Declined
                  </button>
                </div>
              </div>

              {newGuest.attending === 'yes' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Adults
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={newGuest.adultsCount}
                      onChange={(e) => setNewGuest({ ...newGuest, adultsCount: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-[#cebb78]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Children / Kids
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={newGuest.kidsCount}
                      onChange={(e) => setNewGuest({ ...newGuest, kidsCount: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-[#cebb78]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Dietary Requirements / Notes
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Vegetarian, Nut allergy, Baby seat needed..."
                  value={newGuest.notes}
                  onChange={(e) => setNewGuest({ ...newGuest, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#cebb78]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold shadow-lg transition-all"
                >
                  Save Guest RSVP
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
        <p>Laylitna Luxury Wedding Invitations • Powered by Laylitna Studio</p>
      </footer>

    </div>
  );
}

export default CoupleGuestDashboard;
