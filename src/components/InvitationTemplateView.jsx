import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Smartphone, Monitor, ShoppingBag, ExternalLink, 
  RefreshCw, SlidersHorizontal, Sparkles, Check 
} from 'lucide-react';
import { TemplateCustomizerDrawer } from './TemplateCustomizerDrawer';

const TEMPLATE_INFO = {
  'blossom-oud': { id: 'blossom-oud', name: 'Blossom & Oud', price: '€75', url: '/blossomoud.html', type: 'template' },
  'blossomoud': { id: 'blossom-oud', name: 'Blossom & Oud', price: '€75', url: '/blossomoud.html', type: 'template' },
  'dolce-vita': { id: 'dolce-vita', name: 'Dolce Vita', price: '€75', url: '/dolcevita.html', type: 'template' },
  'dolcevita': { id: 'dolce-vita', name: 'Dolce Vita', price: '€75', url: '/dolcevita.html', type: 'template' },
  'timeless-grace': { id: 'timeless-grace', name: 'Timeless Grace', price: '€75', url: '/timelessgrace.html', type: 'template' },
  'timelessgrace': { id: 'timeless-grace', name: 'Timeless Grace', price: '€75', url: '/timelessgrace.html', type: 'template' },
  'vibrant-vows': { id: 'vibrant-vows', name: 'Vibrant Vows', price: '€75', url: '/vibrantvows.html', type: 'template' },
  'vibrantvows': { id: 'vibrant-vows', name: 'Vibrant Vows', price: '€75', url: '/vibrantvows.html', type: 'template' },
  'destination-love': { id: 'destination-love', name: 'Destination Love', price: '€75', url: '/destinationlove.html', type: 'template' },
  'destinationlove': { id: 'destination-love', name: 'Destination Love', price: '€75', url: '/destinationlove.html', type: 'template' },
  'eternal-romance': { id: 'eternal-romance', name: 'Eternal Romance', price: '€75', url: '/eternalromance.html', type: 'template' },
  'eternalromance': { id: 'eternal-romance', name: 'Eternal Romance', price: '€75', url: '/eternalromance.html', type: 'template' },
  'royal-gold': { id: 'royal-gold', name: 'Royal Gold', price: '€75', url: '/royalgold.html', type: 'template' },
  'royalgold': { id: 'royal-gold', name: 'Royal Gold', price: '€75', url: '/royalgold.html', type: 'template' },
  'minimalist': { id: 'minimalist', name: 'Minimalist', price: '€75', url: '/minimalist.html', type: 'template' },
  'golden-secret': { id: 'golden-secret', name: 'Golden Secret', price: '€35', url: '/goldensecret.html', type: 'std' },
  'goldensecret': { id: 'golden-secret', name: 'Golden Secret', price: '€35', url: '/goldensecret.html', type: 'std' },
  'petal-promise': { id: 'petal-promise', name: 'Petal Promise', price: '€35', url: '/petalpromise.html', type: 'std' },
  'petalpromise': { id: 'petal-promise', name: 'Petal Promise', price: '€35', url: '/petalpromise.html', type: 'std' },
  'captured-love': { id: 'captured-love', name: 'Captured Love', price: '€35', url: '/capturedlove.html', type: 'std' },
  'capturedlove': { id: 'captured-love', name: 'Captured Love', price: '€35', url: '/capturedlove.html', type: 'std' }
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
    photoUrl: '',
    welcomeMessage: 'Join us for an evening of love, laughter, duas, and unforgettable memories as we begin our forever.',
    dressCode: 'Black Tie.',
    giftPreference: 'Your presence is what matters most to us.',
    rsvpDeadline: 'August 25, 2025',
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
    photoUrl: '',
    welcomeMessage: 'Join us for an evening of love, laughter, duas, and unforgettable memories as we begin our forever.',
    dressCode: 'Black Tie.',
    giftPreference: 'Your presence is what matters most to us.',
    rsvpDeadline: 'August 25, 2025'
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
    photoUrl: '',
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
    photoUrl: '',
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
  initialCustomData = null
}) {
  const info = TEMPLATE_INFO[templateId] || TEMPLATE_INFO['blossom-oud'];
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' or 'full'
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState('names');
  const [mobileSheetMode, setMobileSheetMode] = useState('half'); // 'half', 'peek', 'full'
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const iframeRef = useRef(null);

  // Initialize custom data
  const baseDefaults = DEFAULT_TEMPLATE_DATA[templateId] || DEFAULT_TEMPLATE_DATA['blossom-oud'];
  const [customData, setCustomData] = useState(() => {
    return initialCustomData || { ...baseDefaults };
  });

  // Keep custom data in sync when switching templates
  useEffect(() => {
    if (!initialCustomData) {
      const newDefaults = DEFAULT_TEMPLATE_DATA[templateId] || DEFAULT_TEMPLATE_DATA['blossom-oud'];
      setCustomData({ ...newDefaults });
    }
  }, [templateId, initialCustomData]);

  // Zero-latency direct synchronous customization + postMessage fallback
  const broadcastCustomization = (data) => {
    if (!iframeRef.current) return;
    try {
      // 1. Direct call to bridge global function (runs synchronously on same origin!)
      if (iframeRef.current.contentWindow && iframeRef.current.contentWindow.__wbg_applyCustomization) {
        iframeRef.current.contentWindow.__wbg_applyCustomization(data);
      }
      // 2. PostMessage fallback
      if (iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'WBG_UPDATE_CUSTOMIZATION',
          data: data
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
      } else if (e.data.type === 'WBG_FIELD_CLICKED') {
        setIsCustomizerOpen(true);
        if (e.data.field) {
          setCustomizerTab(e.data.field);
        }
      } else if (e.data.type === 'WBG_INLINE_EDIT') {
        if (e.data.text !== undefined) {
          if (e.data.field === 'wording') {
            setCustomData(prev => ({ ...prev, invitationText: e.data.text }));
          } else if (e.data.field === 'names') {
            // If couple name was edited
            const parts = e.data.text.split(/&|\band\b|\n/).map(s => s.trim()).filter(Boolean);
            if (parts.length >= 2) {
              setCustomData(prev => ({ ...prev, partner1: parts[0], partner2: parts[1] }));
            }
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [customData]);

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
              {info.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#cebb78]/20 text-[#cebb78] font-semibold hidden md:inline">
              Exact Live Template
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
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

          {/* Direct Order Button */}
          <button
            onClick={() => onOrder(info.id, customData)}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 rounded-full bg-[#cebb78] hover:bg-[#dece88] text-[#08004b] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order ({info.price})</span>
          </button>
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
              <div className="relative w-full h-full rounded-none sm:rounded-[38px] overflow-hidden bg-white">
                <iframe
                  ref={iframeRef}
                  src={info.url}
                  title={info.name}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                />
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="hidden sm:block w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2 shrink-0 opacity-60" />
            </div>

            {/* Desktop Side-by-Side Personalizer Panel (Placed right next to phone on laptop/desktop!) */}
            {isCustomizerOpen && (
              <div className="hidden md:flex flex-col w-[440px] lg:w-[480px] h-full max-h-[860px] bg-white rounded-3xl shadow-2xl border border-slate-700/70 overflow-hidden shrink-0 animate-in fade-in slide-in-from-right-6 duration-200 z-30">
                <TemplateCustomizerDrawer
                  isOpen={true}
                  isInlineDesktop={true}
                  activeTab={customizerTab}
                  onTabChange={setCustomizerTab}
                  onClose={() => setIsCustomizerOpen(false)}
                  templateInfo={info}
                  customData={customData}
                  onChangeCustomData={handleCustomDataChange}
                  onResetCustomData={handleResetCustomData}
                  onUpdateView={handleForceUpdateView}
                  isUpdating={isUpdating}
                  onSaveAndOrder={(data) => {
                    setIsCustomizerOpen(false);
                    onOrder(info.id, data);
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          /* Full Page Viewport */
          <div className="w-full h-full rounded-none sm:rounded-2xl overflow-hidden shadow-2xl bg-white animate-in fade-in duration-200">
            <iframe
              ref={iframeRef}
              src={info.url}
              title={info.name}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
            />
          </div>
        )}

      </div>

      {/* Mobile Bottom-Sheet Template Customizer Drawer (Visible only on mobile screens < md) */}
      <div className="md:hidden">
        <TemplateCustomizerDrawer
          isOpen={isCustomizerOpen}
          activeTab={customizerTab}
          onTabChange={setCustomizerTab}
          onClose={() => setIsCustomizerOpen(false)}
          templateInfo={info}
          customData={customData}
          onChangeCustomData={handleCustomDataChange}
          onResetCustomData={handleResetCustomData}
          onUpdateView={handleForceUpdateView}
          isUpdating={isUpdating}
          mobileSheetMode={mobileSheetMode}
          onMobileSheetModeChange={setMobileSheetMode}
          onSaveAndOrder={(data) => {
            setIsCustomizerOpen(false);
            onOrder(info.id, data);
          }}
        />
      </div>

      {/* Desktop Docked Sidebar (Only when user views in Full Page mode) */}
      {viewMode === 'full' && isCustomizerOpen && (
        <div className="hidden md:block">
          <TemplateCustomizerDrawer
            isOpen={true}
            isDockedSidebar={true}
            activeTab={customizerTab}
            onTabChange={setCustomizerTab}
            onClose={() => setIsCustomizerOpen(false)}
            templateInfo={info}
            customData={customData}
            onChangeCustomData={handleCustomDataChange}
            onResetCustomData={handleResetCustomData}
            onUpdateView={handleForceUpdateView}
            isUpdating={isUpdating}
            onSaveAndOrder={(data) => {
              setIsCustomizerOpen(false);
              onOrder(info.id, data);
            }}
          />
        </div>
      )}

    </div>
  );
}

