import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Smartphone, Monitor, ShoppingBag, ExternalLink, 
  RefreshCw, SlidersHorizontal, Sparkles, Check, X, Plus,
  MessageCircle, Share2, Crown, Copy, Lock
} from 'lucide-react';
import { TemplateCustomizerDrawer } from './TemplateCustomizerDrawer';
import { packInviteData } from '../data/clientInvites';
import { isSessionAdmin, authenticateAdmin, deauthenticateAdmin } from '../config/adminAuth';

const TEMPLATE_INFO = {
  'blossom-oud': { id: 'blossom-oud', name: 'Amber & Silk', price: 'Bespoke Suite', url: '/blossomoud.html', type: 'template' },
  'blossomoud': { id: 'blossom-oud', name: 'Amber & Silk', price: 'Bespoke Suite', url: '/blossomoud.html', type: 'template' },
  'dolce-vita': { id: 'dolce-vita', name: 'Riviera Romance', price: 'Bespoke Suite', url: '/dolcevita.html', type: 'template' },
  'dolcevita': { id: 'dolce-vita', name: 'Riviera Romance', price: 'Bespoke Suite', url: '/dolcevita.html', type: 'template' },
  'timeless-grace': { id: 'timeless-grace', name: 'Lumière Royale', price: 'Bespoke Suite', url: '/timelessgrace.html', type: 'template' },
  'timelessgrace': { id: 'timeless-grace', name: 'Lumière Royale', price: 'Bespoke Suite', url: '/timelessgrace.html', type: 'template' },
  'vibrant-vows': { id: 'vibrant-vows', name: 'Scarlet Symphony', price: 'Bespoke Suite', url: '/vibrantvows.html', type: 'template' },
  'vibrantvows': { id: 'vibrant-vows', name: 'Scarlet Symphony', price: 'Bespoke Suite', url: '/vibrantvows.html', type: 'template' },
  'destination-love': { id: 'destination-love', name: "Voyage d'Amour", price: 'Bespoke Suite', url: '/destinationlove.html', type: 'template' },
  'destinationlove': { id: 'destination-love', name: "Voyage d'Amour", price: 'Bespoke Suite', url: '/destinationlove.html', type: 'template' },
  'eternal-romance': { id: 'eternal-romance', name: 'Champagne Muse', price: 'Bespoke Suite', url: '/eternalromance.html', type: 'template' },
  'eternalromance': { id: 'eternal-romance', name: 'Champagne Muse', price: 'Bespoke Suite', url: '/eternalromance.html', type: 'template' },
  'royal-gold': { id: 'royal-gold', name: 'Celestial Midnight', price: 'Bespoke Suite', url: '/royalgold.html', type: 'template' },
  'royalgold': { id: 'royal-gold', name: 'Celestial Midnight', price: 'Bespoke Suite', url: '/royalgold.html', type: 'template' },
  'minimalist': { id: 'minimalist', name: 'Atelier Botanica', price: 'Bespoke Suite', url: '/minimalist.html', type: 'template' },
  'golden-secret': { id: 'golden-secret', name: 'Gilded Mystery', price: 'Bespoke Suite', url: '/goldensecret.html', type: 'std' },
  'goldensecret': { id: 'golden-secret', name: 'Gilded Mystery', price: 'Bespoke Suite', url: '/goldensecret.html', type: 'std' },
  'petal-promise': { id: 'petal-promise', name: 'Rose Whisper', price: 'Bespoke Suite', url: '/petalpromise.html', type: 'std' },
  'petalpromise': { id: 'petal-promise', name: 'Rose Whisper', price: 'Bespoke Suite', url: '/petalpromise.html', type: 'std' },
  'captured-love': { id: 'captured-love', name: 'Vintage Polaroid', price: 'Bespoke Suite', url: '/capturedlove.html', type: 'std' },
  'capturedlove': { id: 'captured-love', name: 'Vintage Polaroid', price: 'Bespoke Suite', url: '/capturedlove.html', type: 'std' }
};

const DEFAULT_TEMPLATE_DATA = {
  'timeless-grace': {
    partner1: 'Daanish',
    partner2: 'Adeena',
    connector: '&',
    initials: 'DA',
    dateText: 'October 10, 2025',
    dateInput: '2025-10-10',
    timeInput: '18:00',
    targetDate: '2025-10-10T18:00:00',
    venueName: 'Four Seasons Hotel in Jumeirah',
    venueAddress: 'Dana Ballroom, Dubai, UAE',
    mapUrl: 'https://maps.google.com/?q=Four+Seasons+Hotel+Jumeirah+Dubai',
    colorPalette: ['#d8c7e2', '#fcd2b7', '#fae6b1', '#f7d3d3', '#d1e2ec', '#d9d4d0'],
    photoUrl: '',
    ceremonyTitle: 'YOU ARE INVITED TO THE\nNIKKAH CEREMONY OF',
    groomParents: 'MR & MRS CH. Hussaini',
    groomParentsSubtitle: 'SON OF',
    brideParents: 'Mr & Mrs CH. Farooqi',
    brideParentsSubtitle: 'DAUGHTER OF',
    salutation: 'Dear Friends and Family',
    welcomeMessage: 'Join us for an evening of love, laughter, duas, and unforgettable memories as we begin our forever.',
    quranVerse: '"And We created you in pairs."',
    quranRef: '(Surah An-Naba 78:8)',
    dressCodeIntro: 'We kindly invite our guests to dress in',
    dressCode: 'Traditional Pakistani Attire',
    dressCodeSubtitle: 'in soft pastel shades.',
    dressCodeNote: 'Please avoid wearing beige, as it has been reserved for the bride and groom.\n\nSage green is reserved exclusively for the bridesmaids.',
    giftPreference: 'Your presence is what matters most to us.',
    rsvpDeadline: 'August 25, 2025',
    rsvpDeadlineMessage: 'To help us prepare for a joyful celebration, kindly confirm your attendance by 30 november 2026',
    rsvpTitle: 'Confirm Your Attendance',
    closingText: 'Hope to see you there',
    schedule: [
      { time: '6:00 PM', title: 'Guest Arrival', note: 'Welcome drinks', icon: '🌸' },
      { time: '6:30 PM', title: 'Bride Entrance', note: 'Grand welcome', icon: '✨' },
      { time: '7:30 PM', title: 'Salat al Isha', note: 'Prayer', icon: '🕌' },
      { time: '8:30 PM', title: 'Buffet Opening', note: 'Dinner feast', icon: '🍽️' },
      { time: '10:00 PM', title: 'Celebration', note: 'Duas and joyful farewell', icon: '💍' }
    ]
  },
  'timelessgrace': {
    partner1: 'Daanish',
    partner2: 'Adeena',
    connector: '&',
    initials: 'DA',
    dateText: 'October 10, 2025',
    dateInput: '2025-10-10',
    timeInput: '18:00',
    targetDate: '2025-10-10T18:00:00',
    venueName: 'Four Seasons Hotel in Jumeirah',
    venueAddress: 'Dana Ballroom, Dubai, UAE',
    mapUrl: 'https://maps.google.com/?q=Four+Seasons+Hotel+Jumeirah+Dubai',
    colorPalette: ['#d8c7e2', '#fcd2b7', '#fae6b1', '#f7d3d3', '#d1e2ec', '#d9d4d0'],
    photoUrl: '',
    ceremonyTitle: 'YOU ARE INVITED TO THE\nNIKKAH CEREMONY OF',
    groomParents: 'MR & MRS CH. Hussaini',
    groomParentsSubtitle: 'SON OF',
    brideParents: 'Mr & Mrs CH. Farooqi',
    brideParentsSubtitle: 'DAUGHTER OF',
    salutation: 'Dear Friends and Family',
    welcomeMessage: 'Join us for an evening of love, laughter, duas, and unforgettable memories as we begin our forever.',
    quranVerse: '"And We created you in pairs."',
    quranRef: '(Surah An-Naba 78:8)',
    dressCodeIntro: 'We kindly invite our guests to dress in',
    dressCode: 'Traditional Pakistani Attire',
    dressCodeSubtitle: 'in soft pastel shades.',
    dressCodeNote: 'Please avoid wearing beige, as it has been reserved for the bride and groom.\n\nSage green is reserved exclusively for the bridesmaids.',
    giftPreference: 'Your presence is what matters most to us.',
    rsvpDeadline: 'August 25, 2025',
    rsvpDeadlineMessage: 'To help us prepare for a joyful celebration, kindly confirm your attendance by 30 november 2026',
    rsvpTitle: 'Confirm Your Attendance',
    closingText: 'Hope to see you there'
  },
  'blossom-oud': {
    partner1: 'Amira',
    partner2: 'Yusuf',
    connector: '&',
    initials: 'AY',
    dateText: 'May 20, 2027',
    dateInput: '2027-05-20',
    timeInput: '16:00',
    targetDate: '2027-05-20T16:00:00',
    venueName: 'Beldi Country Club',
    venueAddress: 'Km 6 Route du Barrage, Marrakech 40000, Morocco',
    mapUrl: 'https://maps.google.com/?q=Beldi+Country+Club+Marrakech',
    mapEmbedUrl: '',
    colorPalette: ['#60603b', '#360c1a', '#40312c', '#efdfcd'],
    photoUrl: '',
    welcomeMessage: 'Together with our families, we request the honour of your presence to celebrate our wedding.',
    dressCode: 'Formal Evening / Traditional Elegant Attire.',
    giftPreference: 'No boxed gifts kindly requested.',
    rsvpDeadline: 'March 1, 2027',
    language: 'fr',
    envelopeText: 'Appuyez pour ouvrir',
    coverSubtitle: 'à partir de 16h',
    invitationText: 'الآنسة أميرة والسيد يوسف\n\nيسعدهما ويشرفهما أن يدعوا حضرتكم الكريمة\nلمشاركتهما فرحة حفل زفافهما\n\nوذلك بمشيئة الله تعالى يوم السبت 20 ماي 2027\nعلى الساعة الرابعة مساءً\n\nبقاعة',
    countdownTitle: 'La Célébration Commence',
    timelineTitle: "Chronologie de l'événement",
    locationTitle: 'Lieu',
    mapTitle: 'Itinéraire Google Maps',
    rsvpTitle: 'Confirmez Votre Présence',
    rsvpButtonText: 'SOUMETTRE',
    closingText: 'Au plaisir de vous accueillir',
    schedule: [
      { time: '4:00 PM', title: 'Welcome Reception', note: 'Mint tea & patisserie', icon: '☕' },
      { time: '5:00 PM', title: 'Nikah Ceremony', note: 'Solemnization', icon: '💍' },
      { time: '7:00 PM', title: 'Dinner', note: 'Moroccan banquet', icon: '🍽️' },
      { time: '8:00 PM', title: 'Party', note: 'Live Andalusian music', icon: '✨' }
    ]
  },
  'blossomoud': {
    partner1: 'Amira',
    partner2: 'Yusuf',
    connector: '&',
    initials: 'AY',
    dateText: 'May 20, 2027',
    dateInput: '2027-05-20',
    timeInput: '16:00',
    targetDate: '2027-05-20T16:00:00',
    venueName: 'Beldi Country Club',
    venueAddress: 'Km 6 Route du Barrage, Marrakech 40000, Morocco',
    mapUrl: 'https://maps.google.com/?q=Beldi+Country+Club+Marrakech',
    mapEmbedUrl: '',
    colorPalette: ['#60603b', '#360c1a', '#40312c', '#efdfcd'],
    photoUrl: '',
    welcomeMessage: 'Together with our families, we request the honour of your presence to celebrate our wedding.',
    dressCode: 'Formal Evening / Traditional Elegant Attire.',
    giftPreference: 'No boxed gifts kindly requested.',
    rsvpDeadline: 'March 1, 2027',
    language: 'fr',
    envelopeText: 'Appuyez pour ouvrir',
    coverSubtitle: 'à partir de 16h',
    invitationText: 'الآنسة أميرة والسيد يوسف\n\nيسعدهما ويشرفهما أن يدعوا حضرتكم الكريمة\nلمشاركتهما فرحة حفل زفافهما\n\nوذلك بمشيئة الله تعالى يوم السبت 20 ماي 2027\nعلى الساعة الرابعة مساءً\n\nبقاعة',
    countdownTitle: 'La Célébration Commence',
    timelineTitle: "Chronologie de l'événement",
    locationTitle: 'Lieu',
    mapTitle: 'Itinéraire Google Maps',
    rsvpTitle: 'Confirmez Votre Présence',
    rsvpButtonText: 'SOUMETTRE',
    closingText: 'Au plaisir de vous accueillir'
  },
  'dolce-vita': {
    partner1: 'Alexa',
    partner2: 'Richard',
    connector: '&',
    initials: 'AR',
    dateText: 'September 14, 2025',
    dateInput: '2025-09-14',
    timeInput: '16:30',
    targetDate: '2025-09-14T16:30:00',
    venueName: 'Villa Cimbrone',
    venueAddress: 'Via Santa Chiara, 26, 84010 Ravello, Amalfi Coast, Italy',
    mapUrl: 'https://maps.google.com/?q=Villa+Cimbrone+Ravello+Italy',
    colorPalette: ['#faf1db', '#f5d9b1', '#f2cac9', '#afcff1', '#7ebbfa'],
    photoUrl: '',
    bottomPhotoUrl: 'https://static.tildacdn.net/tild3965-6266-4165-b837-303236623330/elegant-couple-love-.jpg',
    galleryPhotos: [
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
    ],
    welcomeMessage: 'Together with our families, we request the pleasure of your company as we exchange our vows overlooking the Amalfi Coast.',
    dressCode: 'Black Tie Optional / Formal Italian Summer Attire.',
    giftPreference: 'Your presence is our present. A contribution to our honeymoon fund is warmly appreciated.',
    rsvpDeadline: 'July 15, 2025',
    schedule: [
      { time: '3:30 PM', title: 'Welcome Drinks', note: 'Prosecco & coastal breezes', icon: '🥂' },
      { time: '4:30 PM', title: 'Ceremony', note: 'Gardens of Villa Cimbrone', icon: '💍' },
      { time: '6:00 PM', title: 'Aperitivo & Sunset', note: 'Terrace overlooking the sea', icon: '🌅' },
      { time: '8:00 PM', title: 'Gala Dinner & Speeches', note: 'Under the olive trees', icon: '🍽️' },
      { time: '10:00 PM', title: 'Party & After Hours', note: 'Dancing until dawn', icon: '✨' }
    ]
  },
  'dolcevita': {
    partner1: 'Alexa',
    partner2: 'Richard',
    connector: '&',
    initials: 'AR',
    dateText: 'September 14, 2025',
    dateInput: '2025-09-14',
    timeInput: '16:30',
    targetDate: '2025-09-14T16:30:00',
    venueName: 'Villa Cimbrone',
    venueAddress: 'Via Santa Chiara, 26, 84010 Ravello, Amalfi Coast, Italy',
    mapUrl: 'https://maps.google.com/?q=Villa+Cimbrone+Ravello+Italy',
    colorPalette: ['#faf1db', '#f5d9b1', '#f2cac9', '#afcff1', '#7ebbfa'],
    photoUrl: '',
    bottomPhotoUrl: 'https://static.tildacdn.net/tild3965-6266-4165-b837-303236623330/elegant-couple-love-.jpg',
    galleryPhotos: [
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
    ],
    welcomeMessage: 'Together with our families, we request the pleasure of your company as we exchange our vows overlooking the Amalfi Coast.',
    dressCode: 'Black Tie Optional / Formal Italian Summer Attire.',
    giftPreference: 'Your presence is our present. A contribution to our honeymoon fund is warmly appreciated.',
    rsvpDeadline: 'July 15, 2025'
  },
  'vibrant-vows': {
    partner1: 'Viktor',
    partner2: 'Paula',
    connector: '&',
    initials: 'VP',
    dateText: 'July 05, 2026',
    dateInput: '2026-07-05',
    timeInput: '16:00',
    targetDate: '2026-07-05T16:00:00',
    venueName: 'Château de Paon',
    venueAddress: 'Petit Chemin de Saint-Gilles, 13200 Arles, France',
    mapUrl: 'https://maps.google.com/?q=Chateau+de+Paon+Arles+France',
    photoUrl: '',
    welcomeMessage: 'Dear Friends and Family, as we get ready to say “I do,” we feel grateful for the wonderful people in our lives.',
    dressCode: 'Formal attire in vibrant Mediterranean elegance.',
    giftPreference: 'Your presence is our gift.',
    rsvpDeadline: 'May 1, 2026'
  },
  'vibrantvows': {
    partner1: 'Viktor',
    partner2: 'Paula',
    connector: '&',
    initials: 'VP',
    dateText: 'July 05, 2026',
    dateInput: '2026-07-05',
    timeInput: '16:00',
    targetDate: '2026-07-05T16:00:00',
    venueName: 'Château de Paon',
    venueAddress: 'Petit Chemin de Saint-Gilles, 13200 Arles, France',
    mapUrl: 'https://maps.google.com/?q=Chateau+de+Paon+Arles+France',
    photoUrl: '',
    welcomeMessage: 'Dear Friends and Family, as we get ready to say “I do,” we feel grateful for the wonderful people in our lives.',
    dressCode: 'Formal attire in vibrant Mediterranean elegance.',
    giftPreference: 'Your presence is our gift.',
    rsvpDeadline: 'May 1, 2026'
  },
  'destination-love': {
    partner1: 'Elisabeth',
    partner2: 'Marcus',
    connector: '&',
    initials: 'EM',
    dateText: 'May 05, 2025',
    dateInput: '2025-05-05',
    timeInput: '17:00',
    targetDate: '2025-05-05T17:00:00',
    venueName: 'Hotel Esencia',
    venueAddress: 'Carretera Cancun-Tulum Km 265, 77733 Playa del Carmen, Mexico',
    mapUrl: 'https://maps.google.com/?q=Hotel+Esencia+Playa+del+Carmen',
    photoUrl: '',
    welcomeMessage: 'Pack your bags, fasten your seatbelts, and get ready for our greatest adventure!',
    dressCode: 'Tropical Black Tie / Resort Formal.',
    giftPreference: 'Your presence in Mexico is the greatest gift.',
    rsvpDeadline: 'March 1, 2025'
  },
  'destinationlove': {
    partner1: 'Elisabeth',
    partner2: 'Marcus',
    connector: '&',
    initials: 'EM',
    dateText: 'May 05, 2025',
    dateInput: '2025-05-05',
    timeInput: '17:00',
    targetDate: '2025-05-05T17:00:00',
    venueName: 'Hotel Esencia',
    venueAddress: 'Carretera Cancun-Tulum Km 265, 77733 Playa del Carmen, Mexico',
    mapUrl: 'https://maps.google.com/?q=Hotel+Esencia+Playa+del+Carmen',
    photoUrl: '',
    welcomeMessage: 'Pack your bags, fasten your seatbelts, and get ready for our greatest adventure!',
    dressCode: 'Tropical Black Tie / Resort Formal.',
    giftPreference: 'Your presence in Mexico is the greatest gift.',
    rsvpDeadline: 'March 1, 2025'
  },
  'eternal-romance': {
    partner1: 'Thanu',
    partner2: 'Jathu',
    connector: '&',
    initials: 'TJ',
    dateText: 'March 17, 2025',
    dateInput: '2025-03-17',
    timeInput: '15:30',
    targetDate: '2025-03-17T15:30:00',
    venueName: 'The Barn Tea',
    venueAddress: 'The Barn, Country Lane, Surrey, UK',
    mapUrl: 'https://maps.google.com/?q=The+Barn+Tea+Surrey',
    photoUrl: '',
    welcomeMessage: 'Let’s celebrate the best day of our life together! We are inviting you to our reception!',
    dressCode: 'Traditional elegance: Anarkali / sarees for ladies, smart suits for men.',
    giftPreference: 'Kindly, no boxed gifts please.',
    rsvpDeadline: 'February 1, 2025'
  },
  'eternalromance': {
    partner1: 'Thanu',
    partner2: 'Jathu',
    connector: '&',
    initials: 'TJ',
    dateText: 'March 17, 2025',
    dateInput: '2025-03-17',
    timeInput: '15:30',
    targetDate: '2025-03-17T15:30:00',
    venueName: 'The Barn Tea',
    venueAddress: 'The Barn, Country Lane, Surrey, UK',
    mapUrl: 'https://maps.google.com/?q=The+Barn+Tea+Surrey',
    photoUrl: '',
    welcomeMessage: 'Let’s celebrate the best day of our life together! We are inviting you to our reception!',
    dressCode: 'Traditional elegance: Anarkali / sarees for ladies, smart suits for men.',
    giftPreference: 'Kindly, no boxed gifts please.',
    rsvpDeadline: 'February 1, 2025'
  },
  'royal-gold': {
    partner1: 'Laura',
    partner2: 'Stephan',
    connector: '&',
    initials: 'LS',
    dateText: 'September 19, 2026',
    dateInput: '2026-09-19',
    timeInput: '12:00',
    targetDate: '2026-09-19T12:00:00',
    venueName: 'The Heerenhuys',
    venueAddress: 'Mijnsherenlaan 9, 3081 GA Rotterdam, Netherlands',
    mapUrl: 'https://maps.google.com/?q=The+Heerenhuys+Rotterdam',
    photoUrl: '',
    welcomeMessage: 'This autumn, a very special and happy event is going to happen - our wedding! We can’t imagine this day without our closest people.',
    dressCode: 'Royal Gold & Emerald Chic.',
    giftPreference: 'Your presence is our biggest blessing.',
    rsvpDeadline: 'July 15, 2026'
  },
  'royalgold': {
    partner1: 'Laura',
    partner2: 'Stephan',
    connector: '&',
    initials: 'LS',
    dateText: 'September 19, 2026',
    dateInput: '2026-09-19',
    timeInput: '12:00',
    targetDate: '2026-09-19T12:00:00',
    venueName: 'The Heerenhuys',
    venueAddress: 'Mijnsherenlaan 9, 3081 GA Rotterdam, Netherlands',
    mapUrl: 'https://maps.google.com/?q=The+Heerenhuys+Rotterdam',
    photoUrl: '',
    welcomeMessage: 'This autumn, a very special and happy event is going to happen - our wedding! We can’t imagine this day without our closest people.',
    dressCode: 'Royal Gold & Emerald Chic.',
    giftPreference: 'Your presence is our biggest blessing.',
    rsvpDeadline: 'July 15, 2026'
  },
  'minimalist': {
    partner1: 'Erika',
    partner2: 'Kylian',
    connector: '&',
    initials: 'EK',
    dateText: 'August 29, 2026',
    dateInput: '2026-08-29',
    timeInput: '12:00',
    targetDate: '2026-08-29T12:00:00',
    venueName: 'El Poble Espanyol',
    venueAddress: 'Av. de Francesc Ferrer i Guàrdia, 13, 08038 Barcelona, Spain',
    mapUrl: 'https://maps.google.com/?q=El+Poble+Espanyol+Barcelona',
    photoUrl: '',
    welcomeMessage: 'DEAR FAMILY AND FRIENDS, this summer a very special and happy event is going to happen - our wedding.',
    dressCode: 'Modern Minimalist / Neutral tones.',
    giftPreference: 'Your warmth and presence are all we ask for.',
    rsvpDeadline: 'June 30, 2026'
  },
  'golden-secret': {
    partner1: 'Isabelle',
    partner2: 'Édouard',
    connector: '&',
    initials: 'IE',
    dateText: 'September 14, 2025',
    dateInput: '2025-09-14',
    timeInput: '16:00',
    targetDate: '2025-09-14T16:00:00',
    venueName: 'Château de Vaux-le-Vicomte',
    venueAddress: '77950 Maincy, France',
    mapUrl: 'https://maps.google.com/?q=Chateau+de+Vaux-le-Vicomte+France',
    photoUrl: '',
    welcomeMessage: 'We invite you to celebrate our wedding.',
    dressCode: 'Formal Black Tie.',
    giftPreference: 'Honeymoon fund contribution appreciated.',
    rsvpDeadline: 'July 1, 2025'
  },
  'goldensecret': {
    partner1: 'Isabelle',
    partner2: 'Édouard',
    connector: '&',
    initials: 'IE',
    dateText: 'September 14, 2025',
    dateInput: '2025-09-14',
    timeInput: '16:00',
    targetDate: '2025-09-14T16:00:00',
    venueName: 'Château de Vaux-le-Vicomte',
    venueAddress: '77950 Maincy, France',
    mapUrl: 'https://maps.google.com/?q=Chateau+de+Vaux-le-Vicomte+France',
    photoUrl: '',
    welcomeMessage: 'We invite you to celebrate our wedding.',
    dressCode: 'Formal Black Tie.',
    giftPreference: 'Honeymoon fund contribution appreciated.',
    rsvpDeadline: 'July 1, 2025'
  },
  'petal-promise': {
    partner1: 'Emily',
    partner2: 'James',
    connector: '&',
    initials: 'EJ',
    dateText: 'August 22, 2026',
    dateInput: '2026-08-22',
    timeInput: '16:00',
    targetDate: '2026-08-22T16:00:00',
    venueName: 'Central Park Conservatory',
    venueAddress: 'Central Park, New York, NY',
    mapUrl: 'https://maps.google.com/?q=Central+Park+New+York',
    photoUrl: '',
    welcomeMessage: 'Brush the petals to reveal our special date.',
    dressCode: 'Cocktail Attire / Floral Summer Chic.',
    giftPreference: 'Warmest presence is the best gift.',
    rsvpDeadline: 'July 1, 2026'
  },
  'petalpromise': {
    partner1: 'Emily',
    partner2: 'James',
    connector: '&',
    initials: 'EJ',
    dateText: 'August 22, 2026',
    dateInput: '2026-08-22',
    timeInput: '16:00',
    targetDate: '2026-08-22T16:00:00',
    venueName: 'Central Park Conservatory',
    venueAddress: 'Central Park, New York, NY',
    mapUrl: 'https://maps.google.com/?q=Central+Park+New+York',
    photoUrl: '',
    welcomeMessage: 'Brush the petals to reveal our special date.',
    dressCode: 'Cocktail Attire / Floral Summer Chic.',
    giftPreference: 'Warmest presence is the best gift.',
    rsvpDeadline: 'July 1, 2026'
  },
  'captured-love': {
    partner1: 'Sophia',
    partner2: 'Laurent',
    connector: '&',
    initials: 'SL',
    dateText: 'June 18, 2026',
    dateInput: '2026-06-18',
    timeInput: '17:00',
    targetDate: '2026-06-18T17:00:00',
    venueName: 'Villa Balbianello',
    venueAddress: 'Via Statale 1, 22016 Tremezzina, Lake Como, Italy',
    mapUrl: 'https://maps.google.com/?q=Villa+Balbianello+Lake+Como',
    photoUrl: '',
    welcomeMessage: 'Tap the polaroid to reveal the date.',
    dressCode: 'Italian Riviera Elegance.',
    giftPreference: 'Honeymoon donations welcomed.',
    rsvpDeadline: 'May 1, 2026'
  },
  'capturedlove': {
    partner1: 'Sophia',
    partner2: 'Laurent',
    connector: '&',
    initials: 'SL',
    dateText: 'June 18, 2026',
    dateInput: '2026-06-18',
    timeInput: '17:00',
    targetDate: '2026-06-18T17:00:00',
    venueName: 'Villa Balbianello',
    venueAddress: 'Via Statale 1, 22016 Tremezzina, Lake Como, Italy',
    mapUrl: 'https://maps.google.com/?q=Villa+Balbianello+Lake+Como',
    photoUrl: '',
    welcomeMessage: 'Tap the polaroid to reveal the date.',
    dressCode: 'Italian Riviera Elegance.',
    giftPreference: 'Honeymoon donations welcomed.',
    rsvpDeadline: 'May 1, 2026'
  }
};

export function InvitationTemplateView({ 
  templateId = 'blossom-oud', 
  onBack, 
  onOrder,
  initialCustomData = null,
  clientProfile = null,
  onOpenDashboard = null
}) {
  const info = TEMPLATE_INFO[templateId] || TEMPLATE_INFO['blossom-oud'];
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'false' || urlParams.get('preview') === 'true') {
      deauthenticateAdmin();
      return false;
    }
    return isSessionAdmin();
  });
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash || '';
    // If admin is explicitly requested via URL and user isn't logged in, prompt for password!
    return (urlParams.get('admin') === 'true' || urlParams.get('edit') === 'true' || hash.includes('admin=true')) && !isSessionAdmin();
  });
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [shareToast, setShareToast] = useState('');
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' or 'full'
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState('style');
  const [mobileSheetMode, setMobileSheetMode] = useState('half'); // 'half', 'peek', 'full'
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDraggingWidget, setIsDraggingWidget] = useState(false);
  const [draggedWidgetType, setDraggedWidgetType] = useState(null);
  const [isAddBlockModalOpen, setIsAddBlockModalOpen] = useState(false);
  const [addBlockTargetAfterRec, setAddBlockTargetAfterRec] = useState(null);
  const iframeRef = useRef(null);
  const dragTimeoutRef = useRef(null);
  const isAdminRef = useRef(isAdmin);

  useEffect(() => {
    isAdminRef.current = isAdmin;
  }, [isAdmin]);

  // Initialize custom data
  const baseDefaults = DEFAULT_TEMPLATE_DATA[templateId] || DEFAULT_TEMPLATE_DATA['blossom-oud'];
  const [customData, setCustomData] = useState(() => {
    const data = initialCustomData ? { ...initialCustomData } : { ...baseDefaults };
    if (templateId === 'dolce-vita' || templateId === 'dolcevita') {
      data.photoUrl = '';
      if (!data.bottomPhotoUrl && baseDefaults.bottomPhotoUrl) {
        data.bottomPhotoUrl = baseDefaults.bottomPhotoUrl;
      }
    }
    data.textOverrides = data.textOverrides || {};
    data.imageOverrides = data.imageOverrides || {};
    data.styleOverrides = data.styleOverrides || {};
    data.positionOverrides = data.positionOverrides || {};
    data.rotationOverrides = data.rotationOverrides || {};
    data.deletedElements = data.deletedElements || [];
    data.addedTexts = data.addedTexts || [];
    data.addedImages = data.addedImages || [];
    data.addedSliders = data.addedSliders || [];
    data.addedScrollGalleries = data.addedScrollGalleries || [];
    data.addedArrows = data.addedArrows || [];
    data.sectionOrder = data.sectionOrder || [];
    return data;
  });

  // Keep custom data in sync when switching templates
  useEffect(() => {
    if (!initialCustomData) {
      const newDefaults = DEFAULT_TEMPLATE_DATA[templateId] || DEFAULT_TEMPLATE_DATA['blossom-oud'];
      const sanitized = { ...newDefaults };
      if (templateId === 'dolce-vita' || templateId === 'dolcevita') {
        sanitized.photoUrl = '';
        if (!sanitized.bottomPhotoUrl && newDefaults.bottomPhotoUrl) {
          sanitized.bottomPhotoUrl = newDefaults.bottomPhotoUrl;
        }
      }
      sanitized.textOverrides = sanitized.textOverrides || {};
      sanitized.imageOverrides = sanitized.imageOverrides || {};
      sanitized.styleOverrides = sanitized.styleOverrides || {};
      sanitized.positionOverrides = sanitized.positionOverrides || {};
      sanitized.rotationOverrides = sanitized.rotationOverrides || {};
      sanitized.deletedElements = sanitized.deletedElements || [];
      sanitized.addedTexts = sanitized.addedTexts || [];
      sanitized.addedImages = sanitized.addedImages || [];
      sanitized.addedSliders = sanitized.addedSliders || [];
      sanitized.addedScrollGalleries = sanitized.addedScrollGalleries || [];
      sanitized.addedArrows = sanitized.addedArrows || [];
      sanitized.sectionOrder = sanitized.sectionOrder || [];
      setCustomData(sanitized);
    }
  }, [templateId, initialCustomData]);

  const handleDeleteElement = (elemId) => {
    if (!elemId) return;

    // Handle deletion of built-in gallery slide photo
    if (selectedElement?.type === 'gallery-photo' || (typeof elemId === 'string' && elemId.startsWith('rec2442651103_photo_'))) {
      const idx = selectedElement?.galleryIndex !== undefined 
        ? selectedElement.galleryIndex 
        : parseInt(String(elemId).replace('rec2442651103_photo_', ''), 10);
      if (!isNaN(idx)) {
        setCustomData(prev => {
          const currentList = prev.galleryPhotos ? [...prev.galleryPhotos] : [...(templateInfo?.galleryPhotos || [])];
          currentList.splice(idx, 1);
          const updated = { ...prev, galleryPhotos: currentList };
          broadcastCustomization(updated);
          return updated;
        });
        setSelectedElement(null);
        return;
      }
    }

    setCustomData(prev => {
      const isAddedText = (prev.addedTexts || []).some(t => t.id === elemId);
      const isAddedImage = (prev.addedImages || []).some(img => img.id === elemId);
      const isAddedSlider = (prev.addedSliders || []).some(s => s.id === elemId);
      const isAddedScroll = (prev.addedScrollGalleries || []).some(g => g.id === elemId);
      const isAddedArrow = (prev.addedArrows || []).some(a => a.id === elemId);

      let updated;
      if (isAddedText || isAddedImage || isAddedSlider || isAddedScroll || isAddedArrow) {
        updated = {
          ...prev,
          addedTexts: (prev.addedTexts || []).filter(t => t.id !== elemId),
          addedImages: (prev.addedImages || []).filter(img => img.id !== elemId),
          addedSliders: (prev.addedSliders || []).filter(s => s.id !== elemId),
          addedScrollGalleries: (prev.addedScrollGalleries || []).filter(g => g.id !== elemId),
          addedArrows: (prev.addedArrows || []).filter(a => a.id !== elemId)
        };
      } else {
        const currentDeleted = Array.isArray(prev.deletedElements) ? [...prev.deletedElements] : [];
        if (!currentDeleted.includes(elemId)) {
          currentDeleted.push(elemId);
        }
        if (elemId === 'rec2442651103' && !currentDeleted.includes('rec2442651093')) {
          currentDeleted.push('rec2442651093');
        }
        updated = {
          ...prev,
          deletedElements: currentDeleted
        };
      }
      broadcastCustomization(updated);
      return updated;
    });

    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({
          type: 'WBG_DELETE_ELEMENT',
          elemId: elemId
        }, '*');
      } catch (e) {}
    }

    setSelectedElement(null);
  };

  const handleRestoreElement = (elemId) => {
    if (!elemId) return;
    setCustomData(prev => {
      const currentDeleted = (prev.deletedElements || []).filter(id => id !== elemId);
      const updated = {
        ...prev,
        deletedElements: currentDeleted
      };
      broadcastCustomization(updated);
      return updated;
    });

    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({
          type: 'WBG_RESTORE_ELEMENT',
          elemId: elemId
        }, '*');
      } catch (e) {}
    }
  };

  const handleResetElementPosition = (elemId) => {
    if (!elemId) return;
    setCustomData(prev => {
      const currentPos = { ...(prev.positionOverrides || {}) };
      delete currentPos[elemId];
      const updated = {
        ...prev,
        positionOverrides: currentPos
      };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleRotateElement = (elemId, angle) => {
    if (!elemId) return;
    const normAngle = Math.round(angle);
    setCustomData(prev => {
      const updated = {
        ...prev,
        addedTexts: (prev.addedTexts || []).map(t => t.id === elemId ? { ...t, rotate: normAngle } : t),
        addedImages: (prev.addedImages || []).map(img => img.id === elemId ? { ...img, rotate: normAngle } : img),
        addedSliders: (prev.addedSliders || []).map(s => s.id === elemId ? { ...s, rotate: normAngle } : s),
        addedScrollGalleries: (prev.addedScrollGalleries || []).map(g => g.id === elemId ? { ...g, rotate: normAngle } : g),
        rotationOverrides: {
          ...(prev.rotationOverrides || {}),
          [elemId]: normAngle
        }
      };
      broadcastCustomization(updated);
      return updated;
    });

    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({
          type: 'WBG_UPDATE_ROTATION',
          elemId: elemId,
          rotate: normAngle
        }, '*');
      } catch (e) {}
    }

    setSelectedElement(prev => {
      if (!prev || prev.elemId !== elemId) return prev;
      return { ...prev, rotation: normAngle };
    });
  };

  const getSectionFriendlyName = (recId, doc) => {
    if (!recId) return 'Cover Section';
    if (doc) {
      const el = doc.getElementById(recId);
      if (el) {
        const heading = el.querySelector('.t-title, .tn-elem[data-elem-type="text"], h1, h2, h3');
        if (heading && heading.innerText) {
          const text = heading.innerText.trim().replace(/\s+/g, ' ').slice(0, 26);
          if (text && text.length > 2) return text;
        }
      }
    }
    const known = {
      'rec2442650993': 'Envelope / Cover',
      'rec2442651003': 'Welcome Intro',
      'rec2442651013': 'Couple Names & Hero',
      'rec2442651033': 'Date & Countdown',
      'rec2442651083': 'Location & Map',
      'rec2442651093': 'Dress Code',
      'rec2442651103': 'Photo Gallery',
      'rec2442651113': 'Color Palette',
      'rec2442651143': 'RSVP Attendance',
      'rec2442651163': 'Closing Couple Photo'
    };
    return known[recId] || recId;
  };

  const getSectionsList = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return [];
      const allRecords = doc.getElementById('allrecords') || doc.querySelector('.t-records') || doc.body;
      const recs = Array.from(allRecords.children).filter(el => {
        return el.id && (el.id.startsWith('rec') || el.classList.contains('t-rec')) && !el.classList.contains('wbg-added-section-block');
      });
      return recs.map(r => ({
        id: r.id,
        offsetTop: r.offsetTop,
        offsetHeight: r.offsetHeight,
        name: getSectionFriendlyName(r.id, doc)
      }));
    } catch (e) {
      return [];
    }
  };

  const findTargetRecAtScrollOrY = (targetY) => {
    try {
      const doc = iframeRef.current?.contentDocument;
      const win = iframeRef.current?.contentWindow;
      const sections = getSectionsList();
      if (sections.length === 0) return null;

      let y = targetY;
      if (typeof y !== 'number') {
        const scrollY = win?.scrollY || doc?.documentElement?.scrollTop || 0;
        y = scrollY + 250;
      }

      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        if (s.offsetTop <= y && (s.offsetTop + s.offsetHeight) >= y) {
          return s.id;
        }
      }
      if (y > sections[sections.length - 1].offsetTop) {
        return sections[sections.length - 1].id;
      }
      return sections[0].id;
    } catch (e) {
      return null;
    }
  };

  const handleResetElementRotation = (elemId) => {
    if (!elemId) return;
    handleRotateElement(elemId, 0);
  };

  const handleAddImage = (src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', dropX, dropY, afterRecId) => {
    const newId = 'wbg_img_' + Date.now();
    const targetAfterRec = afterRecId || findTargetRecAtScrollOrY(dropY);
    const newImageItem = {
      id: newId,
      src: src,
      width: 340,
      height: 360,
      borderRadius: 16,
      rotate: 0,
      afterRecId: targetAfterRec
    };

    setCustomData(prev => {
      const nextAdded = [...(prev.addedImages || []), newImageItem];
      const updated = {
        ...prev,
        addedImages: nextAdded
      };
      broadcastCustomization(updated);
      return updated;
    });

    setSelectedElement({
      elemId: newId,
      type: 'image',
      src: newImageItem.src,
      rotation: 0,
      isAddedImage: true
    });

    setIsCustomizerOpen(true);
    setCustomizerTab('style');
  };

  const handleUpdateAddedImage = (id, updates) => {
    setCustomData(prev => {
      const nextAdded = (prev.addedImages || []).map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      });
      const updated = { ...prev, addedImages: nextAdded };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleAddSlider = (dropX, dropY, afterRecId) => {
    const newId = 'wbg_slider_' + Date.now();
    const targetAfterRec = afterRecId || findTargetRecAtScrollOrY(dropY);
    const newSliderItem = {
      id: newId,
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
      ],
      width: 340,
      height: 360,
      borderRadius: 16,
      rotate: 0,
      autoplay: true,
      currentIndex: 0,
      afterRecId: targetAfterRec
    };

    setCustomData(prev => {
      const nextAdded = [...(prev.addedSliders || []), newSliderItem];
      const updated = {
        ...prev,
        addedSliders: nextAdded
      };
      broadcastCustomization(updated);
      return updated;
    });

    setSelectedElement({
      elemId: newId,
      type: 'slider',
      sliderId: newId,
      rotation: 0,
      isSlider: true
    });

    setIsCustomizerOpen(true);
    setCustomizerTab('style');
  };

  const handleUpdateSlider = (sliderId, updates) => {
    setCustomData(prev => {
      const nextSliders = (prev.addedSliders || []).map(s => {
        if (s.id === sliderId) {
          return { ...s, ...updates };
        }
        return s;
      });
      const updated = { ...prev, addedSliders: nextSliders };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleAddSlideToSlider = (sliderId, photoUrl) => {
    if (!sliderId || !photoUrl) return;
    setCustomData(prev => {
      const nextSliders = (prev.addedSliders || []).map(s => {
        if (s.id === sliderId) {
          return { ...s, photos: [...(s.photos || []), photoUrl] };
        }
        return s;
      });
      const updated = { ...prev, addedSliders: nextSliders };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleRemoveSlideFromSlider = (sliderId, slideIndex) => {
    if (!sliderId) return;
    setCustomData(prev => {
      const nextSliders = (prev.addedSliders || []).map(s => {
        if (s.id === sliderId) {
          const filtered = (s.photos || []).filter((_, idx) => idx !== slideIndex);
          return { ...s, photos: filtered };
        }
        return s;
      });
      const updated = { ...prev, addedSliders: nextSliders };
      broadcastCustomization(updated);
      return updated;
    });
  };

  // Horizontal Scroll Images Gallery Handlers
  const handleAddScrollGallery = (dropX, dropY, afterRecId) => {
    const newId = 'wbg_scroll_' + Date.now();
    const targetAfterRec = afterRecId || findTargetRecAtScrollOrY(dropY);
    const newScrollItem = {
      id: newId,
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
      ],
      width: 340,
      height: 230,
      photoWidth: 150,
      borderRadius: 16,
      rotate: 0,
      afterRecId: targetAfterRec,
      headerStyle: customData.scrollArrowDesign || 'scroll-classic',
      headerText: 'scroll',
      headerColor: '#cebb78'
    };

    setCustomData(prev => {
      const nextAdded = [...(prev.addedScrollGalleries || []), newScrollItem];
      const updated = {
        ...prev,
        addedScrollGalleries: nextAdded
      };
      broadcastCustomization(updated);
      return updated;
    });

    setSelectedElement({
      elemId: newId,
      type: 'scroll-gallery',
      scrollId: newId,
      rotation: 0,
      isScrollGallery: true
    });

    setIsCustomizerOpen(true);
    setCustomizerTab('style');
  };

  const handleUpdateScrollGallery = (scrollId, updates) => {
    setCustomData(prev => {
      const nextList = (prev.addedScrollGalleries || []).map(g => {
        if (g.id === scrollId) {
          return { ...g, ...updates };
        }
        return g;
      });
      const updated = { ...prev, addedScrollGalleries: nextList };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleAddPhotoToScrollGallery = (scrollId, photoUrl) => {
    if (!scrollId || !photoUrl) return;
    setCustomData(prev => {
      const nextList = (prev.addedScrollGalleries || []).map(g => {
        if (g.id === scrollId) {
          return { ...g, photos: [...(g.photos || []), photoUrl] };
        }
        return g;
      });
      const updated = { ...prev, addedScrollGalleries: nextList };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleReplacePhotoInScrollGallery = (scrollId, photoIndex, newPhotoUrl) => {
    if (!scrollId || !newPhotoUrl) return;
    setCustomData(prev => {
      const nextList = (prev.addedScrollGalleries || []).map(g => {
        if (g.id === scrollId) {
          const nextPhotos = [...(g.photos || [])];
          nextPhotos[photoIndex] = newPhotoUrl;
          return { ...g, photos: nextPhotos };
        }
        return g;
      });
      const updated = { ...prev, addedScrollGalleries: nextList };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleRemovePhotoFromScrollGallery = (scrollId, photoIndex) => {
    if (!scrollId) return;
    setCustomData(prev => {
      const nextList = (prev.addedScrollGalleries || []).map(g => {
        if (g.id === scrollId) {
          const filtered = (g.photos || []).filter((_, idx) => idx !== photoIndex);
          return { ...g, photos: filtered };
        }
        return g;
      });
      const updated = { ...prev, addedScrollGalleries: nextList };
      broadcastCustomization(updated);
      return updated;
    });
  };

  // Standalone Scroll Arrow Handler
  const handleAddArrow = (style, dropX, dropY, afterRecId) => {
    const newId = 'wbg_arrow_' + Date.now();
    const targetAfterRec = afterRecId || findTargetRecAtScrollOrY(dropY);
    const arrowStyle = style || customData.scrollArrowDesign || 'scroll-classic';
    const newArrowItem = {
      id: newId,
      style: arrowStyle,
      text: 'scroll',
      color: '#cebb78',
      afterRecId: targetAfterRec
    };

    setCustomData(prev => {
      const nextAdded = [...(prev.addedArrows || []), newArrowItem];
      const updated = {
        ...prev,
        addedArrows: nextAdded,
        scrollArrowDesign: arrowStyle
      };
      broadcastCustomization(updated);
      return updated;
    });

    setSelectedElement({
      elemId: newId,
      type: 'arrow',
      arrowId: newId,
      style: newArrowItem
    });

    setIsCustomizerOpen(true);
    setCustomizerTab('widgets');
  };

  // Reorder Section Placement: Move widget up or down relative to sections
  const handleMoveWidgetUp = (widgetId) => {
    const sections = getSectionsList();
    if (sections.length <= 1) return;

    setCustomData(prev => {
      const findIn = (list) => (list || []).find(w => w.id === widgetId);
      const item = findIn(prev.addedScrollGalleries) || findIn(prev.addedSliders) || findIn(prev.addedImages) || findIn(prev.addedTexts) || findIn(prev.addedArrows);
      if (!item) return prev;

      const currentAfterRecId = item.afterRecId || sections[1]?.id;
      const currIdx = sections.findIndex(s => s.id === currentAfterRecId);
      if (currIdx <= 0) return prev;

      const newAfterRecId = sections[currIdx - 1].id;
      const updateList = (list) => (list || []).map(w => w.id === widgetId ? { ...w, afterRecId: newAfterRecId } : w);

      const updated = {
        ...prev,
        addedScrollGalleries: updateList(prev.addedScrollGalleries),
        addedSliders: updateList(prev.addedSliders),
        addedImages: updateList(prev.addedImages),
        addedTexts: updateList(prev.addedTexts),
        addedArrows: updateList(prev.addedArrows)
      };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleMoveWidgetDown = (widgetId) => {
    const sections = getSectionsList();
    if (sections.length <= 1) return;

    setCustomData(prev => {
      const findIn = (list) => (list || []).find(w => w.id === widgetId);
      const item = findIn(prev.addedScrollGalleries) || findIn(prev.addedSliders) || findIn(prev.addedImages) || findIn(prev.addedTexts) || findIn(prev.addedArrows);
      if (!item) return prev;

      const currentAfterRecId = item.afterRecId || sections[0]?.id;
      const currIdx = sections.findIndex(s => s.id === currentAfterRecId);
      if (currIdx >= sections.length - 1 || currIdx === -1) return prev;

      const newAfterRecId = sections[currIdx + 1].id;
      const updateList = (list) => (list || []).map(w => w.id === widgetId ? { ...w, afterRecId: newAfterRecId } : w);

      const updated = {
        ...prev,
        addedScrollGalleries: updateList(prev.addedScrollGalleries),
        addedSliders: updateList(prev.addedSliders),
        addedImages: updateList(prev.addedImages),
        addedTexts: updateList(prev.addedTexts),
        addedArrows: updateList(prev.addedArrows)
      };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const getOrderedSectionIds = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return [];
      const allRecords = doc.getElementById('allrecords') || doc.querySelector('.t-records') || doc.body;
      return Array.from(allRecords.children)
        .filter(el => el.id && (el.id.startsWith('rec') || el.classList.contains('t-rec') || el.classList.contains('wbg-added-section-block')) && !el.classList.contains('wbg-section-divider-inserter') && !el.classList.contains('wbg-empty-canvas-placeholder'))
        .map(el => el.getAttribute('data-wbg-widget-id') || el.id);
    } catch (e) {
      return [];
    }
  };

  const handleMoveSectionUp = (sectionId) => {
    if (!sectionId) return;
    handleMoveWidgetUp(sectionId);

    setCustomData(prev => {
      let currentOrder = Array.isArray(prev.sectionOrder) && prev.sectionOrder.length > 0 
        ? [...prev.sectionOrder] 
        : getOrderedSectionIds();
      
      const idx = currentOrder.indexOf(sectionId);
      if (idx > 0) {
        const temp = currentOrder[idx];
        currentOrder[idx] = currentOrder[idx - 1];
        currentOrder[idx - 1] = temp;
        const updated = { ...prev, sectionOrder: currentOrder };
        broadcastCustomization(updated);
        return updated;
      }
      return prev;
    });
  };

  const handleMoveSectionDown = (sectionId) => {
    if (!sectionId) return;
    handleMoveWidgetDown(sectionId);

    setCustomData(prev => {
      let currentOrder = Array.isArray(prev.sectionOrder) && prev.sectionOrder.length > 0 
        ? [...prev.sectionOrder] 
        : getOrderedSectionIds();
      
      const idx = currentOrder.indexOf(sectionId);
      if (idx >= 0 && idx < currentOrder.length - 1) {
        const temp = currentOrder[idx];
        currentOrder[idx] = currentOrder[idx + 1];
        currentOrder[idx + 1] = temp;
        const updated = { ...prev, sectionOrder: currentOrder };
        broadcastCustomization(updated);
        return updated;
      }
      return prev;
    });
  };

  const handleClearAllSections = () => {
    const builtins = getSectionsList();
    const allIds = builtins.map(b => b.id);
    setCustomData(prev => {
      const updated = {
        ...prev,
        deletedElements: Array.from(new Set([...(prev.deletedElements || []), ...allIds]))
      };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleRestoreAllSections = () => {
    setCustomData(prev => {
      const updated = {
        ...prev,
        deletedElements: [],
        sectionOrder: []
      };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const getAllCanvasBlocksList = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      const builtins = getSectionsList();
      const addedTexts = customData?.addedTexts || [];
      const addedImages = customData?.addedImages || [];
      const addedSliders = customData?.addedSliders || [];
      const addedScrolls = customData?.addedScrollGalleries || [];
      const addedArrows = customData?.addedArrows || [];
      const deletedList = customData?.deletedElements || [];

      const items = [];
      builtins.forEach(b => {
        items.push({
          id: b.id,
          type: 'builtin',
          title: b.name || getSectionFriendlyName(b.id, doc),
          isDeleted: deletedList.includes(b.id),
          badge: 'Built-in Section'
        });
      });

      addedTexts.forEach(t => {
        items.push({
          id: t.id,
          type: 'text',
          title: t.text ? (t.text.length > 24 ? t.text.slice(0, 24) + '...' : t.text) : 'Headline / Text',
          badge: 'Text Block',
          afterRecId: t.afterRecId
        });
      });

      addedImages.forEach(img => {
        items.push({
          id: img.id,
          type: 'image',
          title: 'Single Photo',
          badge: 'Photo Block',
          src: img.src,
          afterRecId: img.afterRecId
        });
      });

      addedScrolls.forEach(g => {
        items.push({
          id: g.id,
          type: 'scroll-gallery',
          title: 'Scroll Reel (' + (g.photos?.length || 0) + ' photos)',
          badge: 'Scroll Reel',
          afterRecId: g.afterRecId
        });
      });

      addedSliders.forEach(s => {
        items.push({
          id: s.id,
          type: 'slider',
          title: 'Slideshow (' + (s.photos?.length || 0) + ' slides)',
          badge: 'Slideshow',
          afterRecId: s.afterRecId
        });
      });

      addedArrows.forEach(a => {
        items.push({
          id: a.id,
          type: 'arrow',
          title: 'Scroll Arrow (' + (a.style || 'classic') + ')',
          badge: 'Arrow Indicator',
          afterRecId: a.afterRecId
        });
      });

      if (Array.isArray(customData.sectionOrder) && customData.sectionOrder.length > 0) {
        items.sort((a, b) => {
          const idxA = customData.sectionOrder.indexOf(a.id);
          const idxB = customData.sectionOrder.indexOf(b.id);
          if (idxA === -1 && idxB === -1) return 0;
          if (idxA === -1) return 1;
          if (idxB === -1) return -1;
          return idxA - idxB;
        });
      }

      return items;
    } catch (e) {
      return [];
    }
  };

  const handleWidgetDragStart = (type) => {
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    if (typeof window !== 'undefined') {
      window.__wbg_dragged_widget_type = type;
    }
    setIsDraggingWidget(true);
    setDraggedWidgetType(type);

    // Failsafe: automatically dismiss after 6 seconds if user abandoned the drag
    dragTimeoutRef.current = setTimeout(() => {
      setIsDraggingWidget(false);
      setDraggedWidgetType(null);
      if (typeof window !== 'undefined') {
        window.__wbg_dragged_widget_type = null;
      }
    }, 6000);
  };

  const handleWidgetDragEnd = () => {
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    // Keep overlay active for 350ms so drop event executes before unmounting
    dragTimeoutRef.current = setTimeout(() => {
      setIsDraggingWidget(false);
      setDraggedWidgetType(null);
      if (typeof window !== 'undefined') {
        window.__wbg_dragged_widget_type = null;
      }
    }, 350);
  };

  const handleWidgetDrop = (widgetType, dropX, dropY) => {
    const type = widgetType || draggedWidgetType || (typeof window !== 'undefined' ? window.__wbg_dragged_widget_type : null);
    if (!type) return;

    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    setIsDraggingWidget(false);
    setDraggedWidgetType(null);
    if (typeof window !== 'undefined') {
      window.__wbg_dragged_widget_type = null;
    }

    const targetAfterRec = findTargetRecAtScrollOrY(dropY);

    if (type === 'scroll-gallery' || type === 'scroll-images') {
      handleAddScrollGallery(dropX, dropY, targetAfterRec);
    } else if (type === 'slider' || type === 'carousel') {
      handleAddSlider(dropX, dropY, targetAfterRec);
    } else if (type === 'image' || type === 'photo') {
      handleAddImage(undefined, dropX, dropY, targetAfterRec);
    } else if (type === 'heading' || type === 'subtitle' || type === 'body') {
      handleAddText(type, dropX, dropY, targetAfterRec);
    } else if (type === 'scroll-arrow' || type === 'arrow') {
      handleAddArrow(customData.scrollArrowDesign || 'scroll-classic', dropX, dropY, targetAfterRec);
    }
  };

  const handleTriggerImageUpload = (elemId) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({
          type: 'WBG_TRIGGER_IMAGE_UPLOAD',
          elemId: elemId
        }, '*');
      } catch (e) {}
    }
  };

  const handleAddText = (templateType = 'heading', dropX, dropY, afterRecId) => {
    const newId = 'wbg_txt_' + Date.now();
    const targetAfterRec = afterRecId || findTargetRecAtScrollOrY(dropY);
    const defaultProps = templateType === 'heading' 
      ? { text: 'Together Forever', fontFamily: "'Great Vibes', cursive", fontSize: 38, color: '#cebb78', fontWeight: '400', letterSpacing: '1px' }
      : templateType === 'subtitle'
      ? { text: 'SAVE THE DATE', fontFamily: "'Cinzel', serif", fontSize: 18, color: '#08004b', fontWeight: '600', letterSpacing: '3px' }
      : templateType === 'quote'
      ? { text: '“Two souls with but a single thought, two hearts that beat as one.”', fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: '#cebb78', fontStyle: 'italic', fontWeight: '400', letterSpacing: '1px' }
      : { text: 'We invite you to celebrate the joyous union of our families with an evening of dinner and dancing.', fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: '#334155', fontWeight: '400', letterSpacing: '0px' };

    const newTextItem = {
      id: newId,
      ...defaultProps,
      textAlign: 'center',
      fontStyle: defaultProps.fontStyle || 'normal',
      afterRecId: targetAfterRec
    };

    setCustomData(prev => {
      const nextAdded = [...(prev.addedTexts || []), newTextItem];
      const updated = {
        ...prev,
        addedTexts: nextAdded
      };
      broadcastCustomization(updated);
      return updated;
    });

    setSelectedElement({
      elemId: newId,
      text: newTextItem.text,
      style: newTextItem,
      isAddedText: true
    });

    setIsCustomizerOpen(true);
    setCustomizerTab('style');
  };

  const handleUpdateAddedText = (id, updates) => {
    setCustomData(prev => {
      const nextAdded = (prev.addedTexts || []).map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      });
      const updated = { ...prev, addedTexts: nextAdded };
      broadcastCustomization(updated);
      return updated;
    });
  };

  const handleUpdateElementStyle = (elemId, styleChanges) => {
    if (!elemId) return;
    setCustomData(prev => {
      const prevStyles = prev.styleOverrides?.[elemId] || {};
      const nextStyles = { ...prevStyles, ...styleChanges };
      const updated = {
        ...prev,
        styleOverrides: {
          ...(prev.styleOverrides || {}),
          [elemId]: nextStyles
        }
      };

      // Live update style in iframe with zero latency
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage({
            type: 'WBG_UPDATE_STYLE',
            elemId: elemId,
            style: nextStyles
          }, '*');
        } catch (e) {}
      }

      return updated;
    });

    setSelectedElement(prev => {
      if (!prev || prev.elemId !== elemId) return prev;
      return {
        ...prev,
        style: { ...(prev.style || {}), ...styleChanges }
      };
    });
  };

  const handleResetElementStyle = (elemId) => {
    if (!elemId) return;
    setCustomData(prev => {
      const nextStyles = { ...(prev.styleOverrides || {}) };
      delete nextStyles[elemId];
      const updated = { ...prev, styleOverrides: nextStyles };
      broadcastCustomization(updated);
      return updated;
    });
    setSelectedElement(prev => {
      if (!prev || prev.elemId !== elemId) return prev;
      return { ...prev, style: {} };
    });
  };

  // Zero-latency direct synchronous customization + postMessage fallback
  const broadcastCustomization = (data, forceAdmin = null) => {
    if (!iframeRef.current) return;
    const payload = {
      ...(data || {}),
      isAdmin: forceAdmin !== null ? Boolean(forceAdmin) : Boolean(isAdminRef.current)
    };
    try {
      // 1. Direct call to bridge global function (runs synchronously on same origin!)
      if (iframeRef.current.contentWindow && iframeRef.current.contentWindow.__wbg_applyCustomization) {
        iframeRef.current.contentWindow.__wbg_applyCustomization(payload);
      }
      // 2. PostMessage fallback
      if (iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'WBG_UPDATE_CUSTOMIZATION',
          data: payload
        }, '*');
      }
    } catch (e) {
      console.warn('Bridge direct call error:', e);
    }
  };

  // Instant on-the-spot update as the user types
  const handleCustomDataChange = (newData) => {
    setCustomData(newData);
    const cleanTpl = (templateId || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    try {
      sessionStorage.setItem('wbg_custom_' + cleanTpl, JSON.stringify(newData));
      sessionStorage.setItem('wbg_current_custom', JSON.stringify(newData));
      localStorage.setItem('wbg_custom_' + cleanTpl, JSON.stringify(newData));
    } catch (e) {}
    broadcastCustomization(newData);
  };

  // Explicit Update View / Refresh trigger
  const handleForceUpdateView = (fullReload = true) => {
    setIsUpdating(true);
    const cleanTpl = (templateId || '').replace(/[^a-z0-9]/gi, '').toLowerCase();

    // 1. Store state in sessionStorage & localStorage
    try {
      sessionStorage.setItem('wbg_custom_' + cleanTpl, JSON.stringify(customData));
      sessionStorage.setItem('wbg_current_custom', JSON.stringify(customData));
      localStorage.setItem('wbg_custom_' + cleanTpl, JSON.stringify(customData));
    } catch (e) {}

    // 2. Direct DOM mutation in iframe
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        if (iframeRef.current.contentWindow.__wbg_rediscover) {
          iframeRef.current.contentWindow.__wbg_rediscover();
        }
        if (iframeRef.current.contentWindow.__wbg_applyCustomization) {
          iframeRef.current.contentWindow.__wbg_applyCustomization(customData);
        }
        iframeRef.current.contentWindow.postMessage({
          type: 'WBG_FORCE_REFRESH',
          data: customData
        }, '*');
      } catch (e) {}
    }

    // 3. True refresh of view from top
    if (fullReload && iframeRef.current) {
      setIframeLoaded(false);
      try {
        const urlObj = new URL(info.url, window.location.origin);
        urlObj.searchParams.set('t', Date.now().toString());
        iframeRef.current.src = urlObj.pathname + urlObj.search;
      } catch (e) {
        iframeRef.current.src = info.url + '?t=' + Date.now();
      }
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.scrollTo?.({ top: 0, behavior: 'smooth' });
      } catch (e) {}
    }

    setShowUpdateToast(true);
    setTimeout(() => setIsUpdating(false), 500);
    setTimeout(() => setShowUpdateToast(false), 2400);
  };

  const handleResetCustomData = () => {
    const original = { ...baseDefaults };
    setCustomData(original);
    broadcastCustomization(original);
    setShowUpdateToast(true);
    setTimeout(() => setShowUpdateToast(false), 2000);
  };

  // Listen for iframe readiness & click-to-edit
  useEffect(() => {
    const handleMessage = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'WBG_BRIDGE_READY') {
        broadcastCustomization(customData);
        return;
      }

      // If NOT in Admin mode, ignore all customization, selection, and editing events
      if (!isAdminRef.current) {
        return;
      }

      if (e.data.type === 'WBG_UPDATE_PALETTE_COLOR') {
        const { index, color } = e.data;
        if (typeof index === 'number' && color) {
          setCustomData(prev => {
            const defaultFallback = (prev.colorPalette && prev.colorPalette.length > 0)
              ? prev.colorPalette
              : ((templateId === 'timeless-grace' || templateId === 'timelessgrace')
                  ? ['#d8c7e2', '#fcd2b7', '#fae6b1', '#f7d3d3', '#d1e2ec', '#d9d4d0']
                  : ((templateId === 'dolce-vita' || templateId === 'dolcevita')
                      ? ['#faf1db', '#f5d9b1', '#f2cac9', '#afcff1', '#7ebbfa']
                      : ['#60603b', '#360c1a', '#40312c', '#efdfcd']));
            const pal = [...defaultFallback];
            pal[index] = color;
            return { ...prev, colorPalette: pal };
          });
        }
      } else if (e.data.type === 'WBG_FIELD_CLICKED') {
        setIsCustomizerOpen(true);
        if (e.data.field) {
          if (e.data.field === 'palette') {
            setCustomizerTab('style');
          } else if (e.data.field === 'bottomPhoto' || e.data.field === 'photo') {
            setCustomizerTab('photo');
          } else {
            setCustomizerTab(e.data.field);
          }
        }
      } else if (e.data.type === 'WBG_ELEMENT_ROTATED') {
        const { elemId, rotate } = e.data;
        if (elemId) {
          const deg = rotate !== undefined ? rotate : (e.data.rotation || 0);
          setCustomData(prev => {
            const nextAddedTexts = (prev.addedTexts || []).map(t => t.id === elemId ? { ...t, rotate: deg } : t);
            const nextAddedImages = (prev.addedImages || []).map(img => img.id === elemId ? { ...img, rotate: deg } : img);
            const nextAddedSliders = (prev.addedSliders || []).map(s => s.id === elemId ? { ...s, rotate: deg } : s);
            const nextAddedScrollGalleries = (prev.addedScrollGalleries || []).map(g => g.id === elemId ? { ...g, rotate: deg } : g);

            return {
              ...prev,
              addedTexts: nextAddedTexts,
              addedImages: nextAddedImages,
              addedSliders: nextAddedSliders,
              addedScrollGalleries: nextAddedScrollGalleries,
              rotationOverrides: {
                ...(prev.rotationOverrides || {}),
                [elemId]: deg
              }
            };
          });

          setSelectedElement(prev => {
            if (!prev || prev.elemId !== elemId) return prev;
            return {
              ...prev,
              rotation: deg
            };
          });
        }
      } else if (e.data.type === 'WBG_TEXT_SELECTED') {
        setSelectedElement({
          elemId: e.data.elemId,
          type: 'text',
          fieldAttr: e.data.fieldAttr,
          text: e.data.text,
          style: { ...(e.data.style || {}), ...(customData.styleOverrides?.[e.data.elemId] || {}) },
          position: e.data.position || null,
          rotation: customData.rotationOverrides?.[e.data.elemId] ?? e.data.rotate ?? 0,
          isAddedText: !!e.data.isAddedText
        });
        setIsCustomizerOpen(true);
        setCustomizerTab('style');
      } else if (e.data.type === 'WBG_IMAGE_SELECTED') {
        const isAdded = (customData.addedImages || []).some(img => img.id === e.data.elemId);
        setSelectedElement({
          elemId: e.data.elemId,
          type: 'image',
          src: e.data.src,
          position: e.data.position || null,
          rotation: customData.rotationOverrides?.[e.data.elemId] ?? e.data.rotate ?? 0,
          isAddedImage: isAdded
        });
        setIsCustomizerOpen(true);
        setCustomizerTab('style');
      } else if (e.data.type === 'WBG_SLIDER_SELECTED') {
        setSelectedElement({
          elemId: e.data.elemId,
          type: 'slider',
          sliderId: e.data.elemId,
          position: e.data.position || null,
          rotation: customData.rotationOverrides?.[e.data.elemId] ?? e.data.rotate ?? 0,
          isSlider: true
        });
        setIsCustomizerOpen(true);
        setCustomizerTab('style');
      } else if (e.data.type === 'WBG_SCROLL_GALLERY_SELECTED') {
        setSelectedElement({
          elemId: e.data.elemId,
          type: 'scroll-gallery',
          scrollId: e.data.elemId,
          position: e.data.position || null,
          rotation: customData.rotationOverrides?.[e.data.elemId] ?? e.data.rotate ?? 0,
          isScrollGallery: true
        });
        setIsCustomizerOpen(true);
        setCustomizerTab('style');
      } else if (e.data.type === 'WBG_ARROW_SELECTED') {
        setSelectedElement({
          elemId: e.data.arrowId,
          type: 'arrow',
          arrowId: e.data.arrowId,
          style: e.data.style || customData.scrollArrowDesign || 'scroll-classic'
        });
        setIsCustomizerOpen(true);
        setCustomizerTab('widgets');
      } else if (e.data.type === 'WBG_GALLERY_PHOTO_SELECTED') {
        setSelectedElement({
          elemId: e.data.elemId,
          type: 'gallery-photo',
          galleryIndex: e.data.galleryIndex,
          blockId: e.data.blockId || 'rec2442651103',
          src: e.data.src,
          position: e.data.position || null
        });
        setIsCustomizerOpen(true);
        setCustomizerTab('photo');
      } else if (e.data.type === 'WBG_GALLERY_PHOTO_REPLACED') {
        const { galleryIndex, src } = e.data;
        if (galleryIndex !== undefined && src) {
          setCustomData(prev => {
            const currentList = prev.galleryPhotos ? [...prev.galleryPhotos] : [...(templateInfo?.galleryPhotos || [])];
            currentList[galleryIndex] = src;
            const updated = { ...prev, galleryPhotos: currentList };
            broadcastCustomization(updated);
            return updated;
          });
        }
      } else if (e.data.type === 'WBG_ADDED_SCROLL_PHOTO_REPLACED') {
        const { scrollId, photoIndex, src } = e.data;
        if (scrollId && photoIndex !== undefined && src) {
          handleReplacePhotoInScrollGallery(scrollId, photoIndex, src);
        }
      } else if (e.data.type === 'WBG_DELETE_GALLERY_PHOTO') {
        const { galleryIndex } = e.data;
        if (galleryIndex !== undefined) {
          setCustomData(prev => {
            const currentList = prev.galleryPhotos ? [...prev.galleryPhotos] : [...(templateInfo?.galleryPhotos || [])];
            currentList.splice(galleryIndex, 1);
            const updated = { ...prev, galleryPhotos: currentList };
            broadcastCustomization(updated);
            return updated;
          });
          setSelectedElement(null);
        }
      } else if (e.data.type === 'WBG_DELETE_ELEMENT_REQUEST') {
        if (e.data.elemId) {
          handleDeleteElement(e.data.elemId);
        }
      } else if (e.data.type === 'WBG_ELEMENT_MOVED') {
        const { elemId, left, top, isAddedText } = e.data;
        if (elemId) {
          setCustomData(prev => {
            if (isAddedText || (prev.addedTexts || []).some(t => t.id === elemId)) {
              const nextAdded = (prev.addedTexts || []).map(item => {
                if (item.id === elemId) {
                  return { ...item, x: left, y: top, left, top };
                }
                return item;
              });
              return { ...prev, addedTexts: nextAdded };
            }
            if ((prev.addedImages || []).some(img => img.id === elemId)) {
              const nextImages = (prev.addedImages || []).map(img => {
                if (img.id === elemId) {
                  return { ...img, x: left, y: top, left, top };
                }
                return img;
              });
              return { ...prev, addedImages: nextImages };
            }
            if ((prev.addedSliders || []).some(s => s.id === elemId)) {
              const nextSliders = (prev.addedSliders || []).map(s => {
                if (s.id === elemId) {
                  return { ...s, x: left, y: top, left, top };
                }
                return s;
              });
              return { ...prev, addedSliders: nextSliders };
            }
            if ((prev.addedScrollGalleries || []).some(g => g.id === elemId)) {
              const nextGalleries = (prev.addedScrollGalleries || []).map(g => {
                if (g.id === elemId) {
                  return { ...g, x: left, y: top, left, top };
                }
                return g;
              });
              return { ...prev, addedScrollGalleries: nextGalleries };
            }
            return {
              ...prev,
              positionOverrides: {
                ...(prev.positionOverrides || {}),
                [elemId]: { left, top }
              }
            };
          });

          setSelectedElement(prev => {
            if (!prev || prev.elemId !== elemId) return prev;
            return {
              ...prev,
              position: { left, top }
            };
          });
        }
      } else if (e.data.type === 'WBG_ELEMENT_RESIZED') {
        const { elemId, fontSize, width, height, isAddedText, isAddedImage, isSlider, isScrollGallery } = e.data;
        if (elemId) {
          setCustomData(prev => {
            const nextAddedTexts = (prev.addedTexts || []).map(t => {
              if (t.id === elemId) {
                return {
                  ...t,
                  ...(fontSize !== undefined ? { fontSize } : {}),
                  ...(width !== undefined ? { width } : {}),
                  style: {
                    ...(t.style || {}),
                    ...(fontSize !== undefined ? { fontSize: fontSize + 'px' } : {}),
                    ...(width !== undefined ? { width: width + 'px' } : {})
                  }
                };
              }
              return t;
            });

            const nextAddedImages = (prev.addedImages || []).map(img => {
              if (img.id === elemId) {
                return {
                  ...img,
                  width: width || img.width,
                  height: height || img.height
                };
              }
              return img;
            });

            const nextAddedSliders = (prev.addedSliders || []).map(s => {
              if (s.id === elemId) {
                return {
                  ...s,
                  width: width || s.width,
                  height: height || s.height
                };
              }
              return s;
            });

            const nextAddedScrollGalleries = (prev.addedScrollGalleries || []).map(g => {
              if (g.id === elemId) {
                return {
                  ...g,
                  width: width || g.width,
                  height: height || g.height
                };
              }
              return g;
            });

            const nextStyleOverrides = {
              ...(prev.styleOverrides || {}),
              [elemId]: {
                ...(prev.styleOverrides?.[elemId] || {}),
                ...(fontSize !== undefined ? { fontSize: fontSize + 'px' } : {}),
                ...(width !== undefined ? { width: width + 'px' } : {}),
                ...(height !== undefined ? { height: height + 'px' } : {})
              }
            };

            return {
              ...prev,
              addedTexts: nextAddedTexts,
              addedImages: nextAddedImages,
              addedSliders: nextAddedSliders,
              addedScrollGalleries: nextAddedScrollGalleries,
              styleOverrides: nextStyleOverrides
            };
          });

          setSelectedElement(prev => {
            if (!prev || prev.elemId !== elemId) return prev;
            return {
              ...prev,
              style: {
                ...(prev.style || {}),
                ...(fontSize !== undefined ? { fontSize: fontSize + 'px' } : {}),
                ...(width !== undefined ? { width: width + 'px' } : {}),
                ...(height !== undefined ? { height: height + 'px' } : {})
              },
              width: width || prev.width,
              height: height || prev.height
            };
          });
        }
      } else if (e.data.type === 'WBG_IMAGE_EDIT') {
        if (e.data.elemId && e.data.src) {
          setCustomData(prev => {
            let nextAddedImages = prev.addedImages;
            if ((prev.addedImages || []).some(img => img.id === e.data.elemId)) {
              nextAddedImages = prev.addedImages.map(img => img.id === e.data.elemId ? { ...img, src: e.data.src } : img);
            }
            const nextOverrides = {
              ...(prev.imageOverrides || {}),
              [e.data.elemId]: e.data.src
            };
            const updated = {
              ...prev,
              addedImages: nextAddedImages,
              imageOverrides: nextOverrides
            };
            if (e.data.isCouplePhoto) {
              updated.photoUrl = e.data.src;
            }
            return updated;
          });
          setSelectedElement(prev => {
            if (!prev || prev.elemId !== e.data.elemId) return prev;
            return { ...prev, src: e.data.src };
          });
        }
      } else if (e.data.type === 'WBG_INLINE_EDIT') {
        if (e.data.text !== undefined) {
          setCustomData(prev => {
            if (e.data.isAddedText && e.data.elemId) {
              const nextAdded = (prev.addedTexts || []).map(item => {
                if (item.id === e.data.elemId) {
                  return { ...item, text: e.data.text };
                }
                return item;
              });
              return { ...prev, addedTexts: nextAdded };
            }

            const updated = {
              ...prev,
              textOverrides: {
                ...(prev.textOverrides || {}),
                ...(e.data.elemId ? { [e.data.elemId]: e.data.text } : {})
              }
            };
            if (e.data.dataKey) {
              updated[e.data.dataKey] = e.data.text;
            } else if (e.data.field === 'names') {
              const parts = e.data.text.split(/&|\band\b|\n/).map(s => s.trim()).filter(Boolean);
              if (parts.length >= 2) {
                updated.partner1 = parts[0];
                updated.partner2 = parts[1];
              }
            }
            return updated;
          });
        }
      } else if (e.data.type === 'WBG_CANCEL_DRAG') {
        if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
        setIsDraggingWidget(false);
        setDraggedWidgetType(null);
        if (typeof window !== 'undefined') {
          window.__wbg_dragged_widget_type = null;
        }
      } else if (e.data.type === 'WBG_OPEN_ADD_BLOCK_MODAL') {
        setAddBlockTargetAfterRec(e.data.afterRecId || null);
        setIsAddBlockModalOpen(true);
      } else if (e.data.type === 'WBG_MOVE_SECTION_UP') {
        if (e.data.sectionId) handleMoveSectionUp(e.data.sectionId);
      } else if (e.data.type === 'WBG_MOVE_SECTION_DOWN') {
        if (e.data.sectionId) handleMoveSectionDown(e.data.sectionId);
      } else if (e.data.type === 'WBG_EDIT_SECTION') {
        if (e.data.sectionId) {
          const sid = e.data.sectionId;
          const textItem = (customData.addedTexts || []).find(t => t.id === sid);
          const imgItem = (customData.addedImages || []).find(img => img.id === sid);
          const scrollItem = (customData.addedScrollGalleries || []).find(g => g.id === sid);
          const sliderItem = (customData.addedSliders || []).find(s => s.id === sid);
          const arrowItem = (customData.addedArrows || []).find(a => a.id === sid);

          if (textItem) {
            setSelectedElement({ elemId: sid, type: 'text', text: textItem.text, style: textItem, isAddedText: true });
            setCustomizerTab('style');
          } else if (imgItem) {
            setSelectedElement({ elemId: sid, type: 'image', src: imgItem.src, isAddedImage: true });
            setCustomizerTab('style');
          } else if (scrollItem) {
            setSelectedElement({ elemId: sid, type: 'scroll-gallery', scrollId: sid, isScrollGallery: true });
            setCustomizerTab('style');
          } else if (sliderItem) {
            setSelectedElement({ elemId: sid, type: 'slider', sliderId: sid, isSlider: true });
            setCustomizerTab('style');
          } else if (arrowItem) {
            setSelectedElement({ elemId: sid, type: 'arrow', arrowId: sid, style: arrowItem });
            setCustomizerTab('widgets');
          } else {
            setCustomizerTab('sections');
          }
          setIsCustomizerOpen(true);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [customData]);

  // Safety window listeners to prevent drag overlay freeze
  useEffect(() => {
    const handleDragCancel = () => {
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
      setIsDraggingWidget(false);
      setDraggedWidgetType(null);
      if (typeof window !== 'undefined') {
        window.__wbg_dragged_widget_type = null;
      }
    };

    const handleWindowKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDragCancel();
      }
    };

    window.addEventListener('mouseup', handleDragCancel);
    window.addEventListener('pointerup', handleDragCancel);
    window.addEventListener('dragend', handleDragCancel);
    window.addEventListener('blur', handleDragCancel);
    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.removeEventListener('mouseup', handleDragCancel);
      window.removeEventListener('pointerup', handleDragCancel);
      window.removeEventListener('dragend', handleDragCancel);
      window.removeEventListener('blur', handleDragCancel);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);

  // Handle Delete key on keyboard when an element is selected
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Delete' && e.key !== 'Backspace') return;
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      if (selectedElement && selectedElement.elemId) {
        e.preventDefault();
        handleDeleteElement(selectedElement.elemId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, customData]);

  // When iframe loads, push active customization
  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setTimeout(() => {
      broadcastCustomization(customData);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] flex flex-col font-sans overflow-hidden">
      
      {/* Top Header Control Bar */}
      <header className="h-14 bg-[#08004b]/95 backdrop-blur-md border-b border-slate-700/80 px-4 flex items-center justify-between text-white shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold transition-all"
            title="Return to Main Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Main Site</span>
          </button>

          <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
            <span className="font-serif text-sm sm:text-base font-bold tracking-wide text-[#cebb78]">
              {clientProfile?.clientName ? `${clientProfile.clientName}'s Invitation` : info.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#cebb78]/20 text-[#cebb78] font-semibold hidden md:inline">
              {clientProfile ? 'Personalized Invitation' : 'Luxury Invitation'}
            </span>
          </div>
        </div>

        {/* Share Toast Banner */}
        {shareToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
            <Check className="w-4 h-4" />
            <span>{shareToast}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Admin Studio Controls (Only visible to you when admin) */}
          {isAdmin ? (
            <>
              {/* Exit Studio Button */}
              <button
                onClick={() => {
                  deauthenticateAdmin();
                  setIsAdmin(false);
                  setIsCustomizerOpen(false);
                  broadcastCustomization({ ...customData, isAdmin: false }, false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold hover:bg-amber-500/30 transition-all"
                title="Switch to Customer/Guest View"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Exit Studio</span>
              </button>

              {/* Guest RSVPs Dashboard Button */}
              <button
                onClick={() => {
                  const slug = clientProfile?.slug || 'hadi';
                  if (onOpenDashboard) {
                    onOpenDashboard(slug);
                  } else {
                    window.open(`/invite/${slug}/guests`, '_blank');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
                title="View live RSVP guest list and catering stats"
              >
                <span>📊 Guest RSVPs</span>
              </button>

              {/* Share Client Link Button */}
              <button
                onClick={() => {
                  let slug = clientProfile?.slug || 'hadi';
                  const url = `${window.location.origin}/invite/${slug}`;
                  const dashUrl = `${window.location.origin}/invite/${slug}/guests`;
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(url);
                  }
                  setShareToast(`✓ Copied Invite: ${url} | Dashboard: ${dashUrl}`);
                  setTimeout(() => setShareToast(''), 5000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
                title="Copy shareable link for client"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share Client Link</span>
              </button>

              {/* Update View / Force Instant Refresh Button */}
              <button
                onClick={handleForceUpdateView}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all border shadow-xs ${
                  showUpdateToast
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-md scale-105'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40 hover:scale-105'
                }`}
                title="Force immediate update of template preview"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
                <span>{showUpdateToast ? '⚡ View Updated!' : 'Update View'}</span>
              </button>

              {/* Personalize Button */}
              <button
                onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isCustomizerOpen
                    ? 'bg-amber-400 text-[#08004b] shadow-md scale-105'
                    : 'bg-white/15 hover:bg-white/25 text-[#cebb78] border border-amber-300/40 hover:scale-105'
                }`}
                title="Open Personalization Drawer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalize</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </button>
            </>
          ) : (
            /* Public / Customer Mode: Inquire on WhatsApp */
            <a
              href={`https://wa.me/96170710406?text=${encodeURIComponent(
                clientProfile
                  ? `Hello! I am reaching out regarding ${clientProfile.clientName || 'our'} wedding invitation.`
                  : `Hello! I would like to inquire about the ${info.name} luxury wedding invitation.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
              title="Chat with our designer on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Inquire on WhatsApp</span>
            </a>
          )}

          {/* Viewport Switcher - hidden on real mobile phones to avoid header clutter */}
          <div className="hidden sm:flex items-center bg-white/10 rounded-full p-0.5 text-xs">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                viewMode === 'mobile' ? 'bg-[#006989] text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
              title="Mobile Device View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Mobile Frame</span>
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                viewMode === 'full' ? 'bg-[#006989] text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
              title="Full Screen View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Full Page</span>
            </button>
          </div>

          {/* Open Raw in New Tab */}
          <a
            href={info.url}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-all"
            title="Open pure template in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">New Tab</span>
          </a>

          {/* Discreet Admin Login Key */}
          {!isAdmin && (
            <button
              onClick={() => setIsUnlockModalOpen(true)}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-300 transition-colors"
              title="Admin Studio Login"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Container Area */}
      <div className={`flex-1 relative flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4 lg:p-6 overflow-hidden transition-all duration-300 ${
        isCustomizerOpen
          ? mobileSheetMode === 'half'
            ? 'pb-[50vh] md:pb-0'
            : mobileSheetMode === 'peek'
            ? 'pb-[58px] md:pb-0'
            : 'pb-[88vh] md:pb-0'
          : ''
      }`}>
        
        {/* Loading Indicator */}
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 z-10">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 text-[#cebb78] animate-spin" />
              <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
                Loading {info.name}...
              </p>
            </div>
          </div>
        )}

        {viewMode === 'mobile' ? (
          /* Side-by-side studio layout on laptop/desktop; single phone on mobile */
          <div className="flex flex-row items-center justify-center gap-6 lg:gap-8 w-full max-w-6xl h-full">
            
            {/* Smartphone Bezel Container */}
            <div className={`relative w-full max-w-[390px] sm:max-w-[410px] transition-all duration-300 ${
              isCustomizerOpen ? 'h-full max-h-[860px]' : 'h-[94vh] max-h-[860px]'
            } bg-black rounded-none sm:rounded-[48px] p-0 sm:p-3 shadow-2xl border-0 sm:border-[4px] border-slate-700/80 flex flex-col shrink-0 animate-in fade-in zoom-in-95 duration-200`}>
              
              {/* Dynamic Island / Speaker Pill */}
              <div className="hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800 ml-auto mr-2" />
              </div>

              {/* Iframe Viewport inside phone */}
              <div 
                onDragOver={(e) => {
                  if (isDraggingWidget || (typeof window !== 'undefined' && window.__wbg_dragged_widget_type)) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = 'copy';
                  }
                }}
                onDrop={(e) => {
                  if (isDraggingWidget || (typeof window !== 'undefined' && window.__wbg_dragged_widget_type)) {
                    e.preventDefault();
                    e.stopPropagation();
                    const rawType = e.dataTransfer?.getData('text/plain');
                    const type = rawType || draggedWidgetType || (typeof window !== 'undefined' ? window.__wbg_dragged_widget_type : null);
                    const rect = e.currentTarget.getBoundingClientRect();
                    const iframeWin = iframeRef.current?.contentWindow;
                    const iframeDoc = iframeRef.current?.contentDocument;
                    const iframeScrollY = iframeWin?.scrollY || iframeDoc?.documentElement?.scrollTop || iframeDoc?.body?.scrollTop || 0;
                    const dropX = Math.max(10, Math.round(e.clientX - rect.left - 40));
                    const dropY = Math.max(10, Math.round(e.clientY - rect.top + iframeScrollY - 40));
                    handleWidgetDrop(type, dropX, dropY);
                  }
                }}
                className="relative w-full h-full rounded-none sm:rounded-[38px] overflow-hidden bg-white"
              >
                <iframe
                  ref={iframeRef}
                  src={info.url}
                  title={info.name}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                />

                {/* Drag-and-Drop Drop Target Overlay */}
                {isAdmin && isDraggingWidget && (
                  <div
                    onClick={() => {
                      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
                      setIsDraggingWidget(false);
                      setDraggedWidgetType(null);
                      if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = null;
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.dataTransfer.dropEffect = 'copy';
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const rawType = e.dataTransfer?.getData('text/plain');
                      const type = rawType || draggedWidgetType || (typeof window !== 'undefined' ? window.__wbg_dragged_widget_type : null);
                      const rect = e.currentTarget.getBoundingClientRect();
                      const iframeWin = iframeRef.current?.contentWindow;
                      const iframeDoc = iframeRef.current?.contentDocument;
                      const iframeScrollY = iframeWin?.scrollY || iframeDoc?.documentElement?.scrollTop || iframeDoc?.body?.scrollTop || 0;
                      const dropX = Math.max(10, Math.round(e.clientX - rect.left - 40));
                      const dropY = Math.max(10, Math.round(e.clientY - rect.top + iframeScrollY - 40));
                      handleWidgetDrop(type, dropX, dropY);
                    }}
                    className="absolute inset-0 z-50 bg-sky-950/40 backdrop-blur-[2px] border-3 border-dashed border-sky-400 rounded-none sm:rounded-[38px] flex flex-col items-center justify-center text-center p-6 cursor-copy transition-all"
                  >
                    <div className="p-4 bg-[#08004b]/95 border border-sky-400/70 rounded-2xl shadow-2xl text-white max-w-[280px] space-y-2 pointer-events-none select-none transform scale-105">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center text-xl">
                        🎯
                      </div>
                      <p className="font-bold text-xs text-sky-200 uppercase tracking-wider">
                        Drop Widget Here on Card
                      </p>
                      <p className="text-[10px] text-slate-300 leading-snug">
                        Release to place at this spot. Freely move, rotate, & resize anytime!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
                        setIsDraggingWidget(false);
                        setDraggedWidgetType(null);
                        if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = null;
                      }}
                      className="mt-3 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-[10px] font-semibold backdrop-blur-sm pointer-events-auto border border-white/30 transition-all cursor-pointer shadow-md"
                    >
                      ✕ Cancel (Click to Close)
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="hidden sm:block w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2 shrink-0 opacity-60" />
            </div>

            {/* Desktop Side-by-Side Personalizer Panel (Placed right next to phone on laptop/desktop!) */}
            {isAdmin && isCustomizerOpen && (
              <div className="hidden md:flex flex-col w-[440px] lg:w-[480px] h-full max-h-[860px] bg-white rounded-3xl shadow-2xl border border-slate-700/70 overflow-hidden shrink-0 animate-in fade-in slide-in-from-right-6 duration-200 z-30">
                <TemplateCustomizerDrawer
                  isOpen={true}
                  isInlineDesktop={true}
                  activeTab={customizerTab}
                  onTabChange={setCustomizerTab}
                  onClose={() => setIsCustomizerOpen(false)}
                  templateInfo={info}
                  customData={customData}
                  selectedElement={selectedElement}
                  onUpdateElementStyle={handleUpdateElementStyle}
                  onResetElementStyle={handleResetElementStyle}
                  onDeleteElement={handleDeleteElement}
                  onRestoreElement={handleRestoreElement}
                  onResetElementPosition={handleResetElementPosition}
                  onRotateElement={handleRotateElement}
                  onResetElementRotation={handleResetElementRotation}
                  onAddText={handleAddText}
                  onAddImage={handleAddImage}
                  onAddSlider={handleAddSlider}
                  onUpdateSlider={handleUpdateSlider}
                  onAddSlideToSlider={handleAddSlideToSlider}
                  onRemoveSlideFromSlider={handleRemoveSlideFromSlider}
                  onAddScrollGallery={handleAddScrollGallery}
                  onUpdateScrollGallery={handleUpdateScrollGallery}
                  onAddPhotoToScrollGallery={handleAddPhotoToScrollGallery}
                  onReplacePhotoInScrollGallery={handleReplacePhotoInScrollGallery}
                  onRemovePhotoFromScrollGallery={handleRemovePhotoFromScrollGallery}
                  onAddArrow={handleAddArrow}
                  onMoveWidgetUp={handleMoveWidgetUp}
                  onMoveWidgetDown={handleMoveWidgetDown}
                  sectionsList={getSectionsList()}
                  onOpenAddBlockModal={() => {
                    setAddBlockTargetAfterRec(null);
                    setIsAddBlockModalOpen(true);
                  }}
                  onClearAllSections={handleClearAllSections}
                  onRestoreAllSections={handleRestoreAllSections}
                  onMoveSectionUp={handleMoveSectionUp}
                  onMoveSectionDown={handleMoveSectionDown}
                  allBlocksList={getAllCanvasBlocksList()}
                  onWidgetDragStart={handleWidgetDragStart}
                  onWidgetDragEnd={handleWidgetDragEnd}
                  onUpdateAddedImage={handleUpdateAddedImage}
                  onTriggerImageUpload={handleTriggerImageUpload}
                  onSelectElement={setSelectedElement}
                  onChangeCustomData={handleCustomDataChange}
                  onResetCustomData={handleResetCustomData}
                  onUpdateView={handleForceUpdateView}
                  isUpdating={isUpdating}
                  onSaveAndOrder={(data) => {
                    setIsCustomizerOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          /* Full Page Viewport */
          <div 
            onDragOver={(e) => {
              if (isDraggingWidget || (typeof window !== 'undefined' && window.__wbg_dragged_widget_type)) {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'copy';
              }
            }}
            onDrop={(e) => {
              if (isDraggingWidget || (typeof window !== 'undefined' && window.__wbg_dragged_widget_type)) {
                e.preventDefault();
                e.stopPropagation();
                const rawType = e.dataTransfer?.getData('text/plain');
                const type = rawType || draggedWidgetType || (typeof window !== 'undefined' ? window.__wbg_dragged_widget_type : null);
                const rect = e.currentTarget.getBoundingClientRect();
                const iframeWin = iframeRef.current?.contentWindow;
                const iframeDoc = iframeRef.current?.contentDocument;
                const iframeScrollY = iframeWin?.scrollY || iframeDoc?.documentElement?.scrollTop || iframeDoc?.body?.scrollTop || 0;
                const dropX = Math.max(10, Math.round(e.clientX - rect.left - 50));
                const dropY = Math.max(10, Math.round(e.clientY - rect.top + iframeScrollY - 50));
                handleWidgetDrop(type, dropX, dropY);
              }
            }}
            className="relative w-full h-full rounded-none sm:rounded-2xl overflow-hidden shadow-2xl bg-white animate-in fade-in duration-200"
          >
            <iframe
              ref={iframeRef}
              src={info.url}
              title={info.name}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
            />

            {/* Drag-and-Drop Drop Target Overlay in Full Page */}
            {isAdmin && isDraggingWidget && (
              <div
                onClick={() => {
                  if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
                  setIsDraggingWidget(false);
                  setDraggedWidgetType(null);
                  if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = null;
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.dataTransfer.dropEffect = 'copy';
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const rawType = e.dataTransfer?.getData('text/plain');
                  const type = rawType || draggedWidgetType || (typeof window !== 'undefined' ? window.__wbg_dragged_widget_type : null);
                  const rect = e.currentTarget.getBoundingClientRect();
                  const iframeWin = iframeRef.current?.contentWindow;
                  const iframeDoc = iframeRef.current?.contentDocument;
                  const iframeScrollY = iframeWin?.scrollY || iframeDoc?.documentElement?.scrollTop || iframeDoc?.body?.scrollTop || 0;
                  const dropX = Math.max(10, Math.round(e.clientX - rect.left - 50));
                  const dropY = Math.max(10, Math.round(e.clientY - rect.top + iframeScrollY - 50));
                  handleWidgetDrop(type, dropX, dropY);
                }}
                className="absolute inset-0 z-50 bg-sky-950/40 backdrop-blur-[2px] border-4 border-dashed border-sky-400 rounded-none sm:rounded-2xl flex flex-col items-center justify-center text-center p-6 cursor-copy transition-all"
              >
                <div className="p-4 bg-[#08004b]/95 border border-sky-400/70 rounded-2xl shadow-2xl text-white max-w-sm space-y-2 pointer-events-none select-none transform scale-105">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <p className="font-bold text-sm text-sky-200 uppercase tracking-wider">
                    Drop Widget Here on Card
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Release to place at this spot. Freely move, rotate, & resize anytime!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
                    setIsDraggingWidget(false);
                    setDraggedWidgetType(null);
                    if (typeof window !== 'undefined') window.__wbg_dragged_widget_type = null;
                  }}
                  className="mt-3 px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-semibold backdrop-blur-sm pointer-events-auto border border-white/30 transition-all cursor-pointer shadow-md"
                >
                  ✕ Cancel (Click to Close)
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Mobile Bottom-Sheet Template Customizer Drawer (Visible only on mobile screens < md when admin) */}
      {isAdmin && (
        <div className="md:hidden">
          <TemplateCustomizerDrawer
            isOpen={isCustomizerOpen}
            activeTab={customizerTab}
            onTabChange={setCustomizerTab}
            onClose={() => setIsCustomizerOpen(false)}
            templateInfo={info}
            customData={customData}
            selectedElement={selectedElement}
            onUpdateElementStyle={handleUpdateElementStyle}
            onResetElementStyle={handleResetElementStyle}
            onDeleteElement={handleDeleteElement}
            onRestoreElement={handleRestoreElement}
            onResetElementPosition={handleResetElementPosition}
            onRotateElement={handleRotateElement}
            onResetElementRotation={handleResetElementRotation}
            onAddText={handleAddText}
            onAddImage={handleAddImage}
            onAddSlider={handleAddSlider}
            onUpdateSlider={handleUpdateSlider}
            onAddSlideToSlider={handleAddSlideToSlider}
            onRemoveSlideFromSlider={handleRemoveSlideFromSlider}
            onAddScrollGallery={handleAddScrollGallery}
            onUpdateScrollGallery={handleUpdateScrollGallery}
            onAddPhotoToScrollGallery={handleAddPhotoToScrollGallery}
            onReplacePhotoInScrollGallery={handleReplacePhotoInScrollGallery}
            onRemovePhotoFromScrollGallery={handleRemovePhotoFromScrollGallery}
            onAddArrow={handleAddArrow}
            onMoveWidgetUp={handleMoveWidgetUp}
            onMoveWidgetDown={handleMoveWidgetDown}
            sectionsList={getSectionsList()}
            onOpenAddBlockModal={() => {
              setAddBlockTargetAfterRec(null);
              setIsAddBlockModalOpen(true);
            }}
            onClearAllSections={handleClearAllSections}
            onRestoreAllSections={handleRestoreAllSections}
            onMoveSectionUp={handleMoveSectionUp}
            onMoveSectionDown={handleMoveSectionDown}
            allBlocksList={getAllCanvasBlocksList()}
            onWidgetDragStart={handleWidgetDragStart}
            onWidgetDragEnd={handleWidgetDragEnd}
            onUpdateAddedImage={handleUpdateAddedImage}
            onTriggerImageUpload={handleTriggerImageUpload}
            onSelectElement={setSelectedElement}
            onChangeCustomData={handleCustomDataChange}
            onResetCustomData={handleResetCustomData}
            onUpdateView={handleForceUpdateView}
            isUpdating={isUpdating}
            mobileSheetMode={mobileSheetMode}
            onMobileSheetModeChange={setMobileSheetMode}
            onSaveAndOrder={(data) => {
              setIsCustomizerOpen(false);
            }}
          />
        </div>
      )}

      {/* Desktop Docked Sidebar (Only when user views in Full Page mode and admin) */}
      {isAdmin && viewMode === 'full' && isCustomizerOpen && (
        <div className="hidden md:block">
          <TemplateCustomizerDrawer
            isOpen={true}
            isDockedSidebar={true}
            activeTab={customizerTab}
            onTabChange={setCustomizerTab}
            onClose={() => setIsCustomizerOpen(false)}
            templateInfo={info}
            customData={customData}
            selectedElement={selectedElement}
            onUpdateElementStyle={handleUpdateElementStyle}
            onResetElementStyle={handleResetElementStyle}
            onDeleteElement={handleDeleteElement}
            onRestoreElement={handleRestoreElement}
            onResetElementPosition={handleResetElementPosition}
            onRotateElement={handleRotateElement}
            onResetElementRotation={handleResetElementRotation}
            onAddText={handleAddText}
            onAddImage={handleAddImage}
            onAddSlider={handleAddSlider}
            onUpdateSlider={handleUpdateSlider}
            onAddSlideToSlider={handleAddSlideToSlider}
            onRemoveSlideFromSlider={handleRemoveSlideFromSlider}
            onAddScrollGallery={handleAddScrollGallery}
            onUpdateScrollGallery={handleUpdateScrollGallery}
            onAddPhotoToScrollGallery={handleAddPhotoToScrollGallery}
            onReplacePhotoInScrollGallery={handleReplacePhotoInScrollGallery}
            onRemovePhotoFromScrollGallery={handleRemovePhotoFromScrollGallery}
            onAddArrow={handleAddArrow}
            onMoveWidgetUp={handleMoveWidgetUp}
            onMoveWidgetDown={handleMoveWidgetDown}
            sectionsList={getSectionsList()}
            onOpenAddBlockModal={() => {
              setAddBlockTargetAfterRec(null);
              setIsAddBlockModalOpen(true);
            }}
            onClearAllSections={handleClearAllSections}
            onRestoreAllSections={handleRestoreAllSections}
            onMoveSectionUp={handleMoveSectionUp}
            onMoveSectionDown={handleMoveSectionDown}
            allBlocksList={getAllCanvasBlocksList()}
            onWidgetDragStart={handleWidgetDragStart}
            onWidgetDragEnd={handleWidgetDragEnd}
            onUpdateAddedImage={handleUpdateAddedImage}
            onTriggerImageUpload={handleTriggerImageUpload}
            onSelectElement={setSelectedElement}
            onChangeCustomData={handleCustomDataChange}
            onResetCustomData={handleResetCustomData}
            onUpdateView={handleForceUpdateView}
            isUpdating={isUpdating}
            onSaveAndOrder={(data) => {
              setIsCustomizerOpen(false);
            }}
          />
        </div>
      )}

      {/* Quick Add Block Modal (Triggered by inline card "+ Add Block Here" or drawer button) */}
      {isAdmin && isAddBlockModalOpen && (
        <div 
          onClick={() => setIsAddBlockModalOpen(false)}
          className="fixed inset-0 z-[99999] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
          >
            {/* Modal Header Banner */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#08004b] via-indigo-950 to-slate-900 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#cebb78]/20 border border-[#cebb78]/40 flex items-center justify-center text-[#cebb78]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                      Add Section Block
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      Choose an element to build your invitation from scratch
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddBlockModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {addBlockTargetAfterRec && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] text-[#cebb78] font-medium">
                  <span>📍 Placing after section:</span>
                  <strong className="text-white">
                    {getSectionFriendlyName(addBlockTargetAfterRec, iframeRef.current?.contentDocument) || addBlockTargetAfterRec}
                  </strong>
                </div>
              )}
            </div>

            {/* Modal Blocks Grid */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 divide-y divide-slate-100">
              
              {/* Category 1: Typography & Copy */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Typography &amp; Headings
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  
                  {/* 1. Main Headline */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddText('heading', undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-purple-500 bg-white hover:bg-purple-50/50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                      🏷️
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-purple-900">
                        Main Headline
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Calligraphy or serif title for names, welcome, or hero
                      </p>
                    </div>
                  </button>

                  {/* 2. Subtitle / Tagline */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddText('subtitle', undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                      📝
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-indigo-900">
                        Subtitle / Tagline
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Clean spaced roman text for dates, venues, or intros
                      </p>
                    </div>
                  </button>

                  {/* 3. Paragraph / Story */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddText('paragraph', undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-amber-500 bg-white hover:bg-amber-50/50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                      📄
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-amber-900">
                        Paragraph / Story
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Multi-line love story, schedule note, or ceremony details
                      </p>
                    </div>
                  </button>

                  {/* 4. Romantic Quote */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddText('quote', undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                      💬
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-rose-900">
                        Romantic Quote
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Poetic vows or passage in literary Garamond italics
                      </p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Category 2: Photos & Galleries */}
              <div className="pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Photos &amp; Reels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                  {/* 5. Single Photo */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddImage(undefined, undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-sky-500 bg-white hover:bg-sky-50/50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                      🖼️
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-sky-900">
                        Single Photo
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Floating portrait with customizable border styling &amp; upload
                      </p>
                    </div>
                  </button>

                  {/* 6. Scroll Reel */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddScrollGallery(undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-purple-200 hover:border-purple-600 bg-purple-50/30 hover:bg-purple-50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md ring-1 ring-purple-400/30"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                      📜
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] bg-purple-600 text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-0.5">
                        Interactive
                      </span>
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-purple-900">
                        Scroll Images Gallery
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Horizontal swipeable reel with directional scroll arrow
                      </p>
                    </div>
                  </button>

                  {/* 7. Slide Carousel */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddSlider(undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                      🎞️
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-indigo-900">
                        Slide Carousel
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Autoplay slideshow with fade transitions &amp; dot indicators
                      </p>
                    </div>
                  </button>

                  {/* 8. Scroll Arrow */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddArrow(customData.scrollArrowDesign || 'scroll-classic', undefined, undefined, addBlockTargetAfterRec);
                      setIsAddBlockModalOpen(false);
                    }}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/50 transition-all group flex items-start gap-2.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                      🏹
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-rose-900">
                        Scroll Design Arrow
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Standalone animated swipe indicator with custom arrow styles
                      </p>
                    </div>
                  </button>

                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>💡 You can reorder, move, or delete any block anytime.</span>
              <button
                type="button"
                onClick={() => setIsAddBlockModalOpen(false)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Admin Studio Passcode Unlock Modal */}
      {isUnlockModalOpen && (
        <div 
          onClick={() => {
            setIsUnlockModalOpen(false);
            setPasscodeError('');
            setAdminPasscode('');
          }}
          className="fixed inset-0 z-[999999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#08004b] text-white p-6 sm:p-7 rounded-3xl border border-[#cebb78]/50 shadow-2xl max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#cebb78]/20 flex items-center justify-center text-[#cebb78] border border-[#cebb78]/40">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#cebb78]">Admin Studio Access</h3>
                  <p className="text-[10px] text-slate-400">Unlock customization controls</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsUnlockModalOpen(false);
                  setPasscodeError('');
                  setAdminPasscode('');
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your admin passcode to access text styling, block arrangements, and customer invitation tools.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const code = adminPasscode.trim();
                if (authenticateAdmin(code)) {
                  setIsAdmin(true);
                  setIsUnlockModalOpen(false);
                  setPasscodeError('');
                  setAdminPasscode('');
                  broadcastCustomization(customData, true);
                } else {
                  setPasscodeError('Incorrect password. Please try again.');
                }
              }}
              className="space-y-3 pt-1"
            >
              <div>
                <input
                  type="password"
                  autoFocus
                  value={adminPasscode}
                  onChange={(e) => {
                    setAdminPasscode(e.target.value);
                    if (passcodeError) setPasscodeError('');
                  }}
                  placeholder="Passcode (e.g. 1234)"
                  className="w-full px-4 py-2.5 bg-white/10 border border-slate-600 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#cebb78]"
                />
                {passcodeError && (
                  <p className="text-[11px] text-rose-400 mt-1">{passcodeError}</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsUnlockModalOpen(false);
                    setPasscodeError('');
                    setAdminPasscode('');
                  }}
                  className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-slate-300 font-semibold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-3 bg-[#006989] hover:bg-[#005570] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

