export const PACKAGES = [
  {
    id: 'std',
    name: 'Save the Date',
    tagline: 'Announce your date with a stunning interactive experience.',
    badge: '✨ New · Intro Price',
    price: 35,
    originalPrice: 50,
    priceNote: 'Limited time · introductory price',
    deliveryTime: 'Ready in 2–4 days',
    expressTime: '⚡ Express: 24h',
    featuresTitle: 'Always included',
    features: [
      'Fully interactive personalised page',
      'Your names, date & venue',
      'Share with unlimited guests',
      'Available in any language'
    ],
    buttonText: 'Choose Your Save the Date',
    subText: '3 interactive designs to choose from'
  },
  {
    id: 'template',
    name: 'Template Invitation',
    tagline: 'Choose from 9 beautiful designs. We adjust colors, texts, and photos to yours.',
    badge: '⭐ Most Popular',
    popular: true,
    price: 75,
    originalPrice: 120,
    priceNote: 'Limited time offer',
    deliveryTime: 'Ready in 4–7 days',
    expressTime: '⚡ Express: 24–48h',
    featuresTitle: 'Always included',
    features: [
      'Personal designer by your side',
      '5 sections of your choice',
      'Smart RSVP tracking',
      'Opening animation (envelope / seal)',
      '3 photos of your choice',
      'Unlimited revisions and unlimited guests'
    ],
    buttonText: 'Choose Template Invitation',
    subText: '9 templates to choose from'
  },
  {
    id: 'custom',
    name: 'Custom Invitation',
    tagline: 'A completely unique invitation built from scratch: no templates, pure imagination.',
    badge: '✦ 100% Bespoke',
    price: 135,
    originalPrice: 300,
    priceNote: 'Base price · extra features available',
    deliveryTime: 'Ready in 1–2 weeks',
    expressTime: '⚡ Express: 2–4 days',
    featuresTitle: 'Everything in Template, plus',
    features: [
      '100% original design from scratch',
      'Unique concept matching your theme',
      'Custom animations and interactions',
      'Priority designer support'
    ],
    buttonText: 'Choose Custom Invitation',
    subText: 'Tailored specifically to your wedding dream'
  }
];

export const FREE_INCLUDED_SECTIONS = [
  'Date & Location',
  'Welcome Message',
  'RSVP Tracking'
];

export const OPTIONAL_SECTIONS = [
  { id: 'timeline', name: 'Event Timeline', icon: 'Clock', popular: true, desc: 'Schedule of the day (ceremony, dinner, party)' },
  { id: 'gift', name: 'Gift List', icon: 'Gift', desc: 'Share your gift preferences, registry, bank details, or honeymoon fund links.' },
  { id: 'transport', name: 'Transport', icon: 'Car', desc: 'Directions, shuttle times, parking info, or taxi booking links.' },
  { id: 'activities', name: 'Activities', icon: 'Compass', desc: 'Things for guests to do around the venue — local gems and sightseeing.' },
  { id: 'prewedding', name: 'Pre-wedding', icon: 'Heart', desc: 'Details for rehearsal dinner, welcome drinks, or day-after brunch.' },
  { id: 'accommodation', name: 'Accommodation', icon: 'Hotel', desc: 'Recommended hotels or villas nearby with booking codes and links.' },
  { id: 'dresscode', name: 'Dress Code', icon: 'Shirt', popular: true, desc: 'Color palette guide, formality, and moodboard inspiration.' },
  { id: 'menu', name: 'Menu', icon: 'Utensils', desc: 'Food courses, drinks selection, and dietary options.' },
  { id: 'gallery', name: 'Photo Gallery', icon: 'Images', desc: 'Add unlimited photos to a gallery (3 photos already included).' },
  { id: 'countdown', name: 'Countdown Timer', icon: 'Hourglass', popular: true, desc: 'Live countdown timer ticking down to the big moment.' },
  { id: 'map', name: 'Google Map', icon: 'MapPin', popular: true, desc: 'One-tap directions straight to Google Maps & Apple Maps.' },
  { id: 'lovestory', name: 'Your Love Story', icon: 'BookOpen', desc: 'How you met, proposal story, and memories together.' },
  { id: 'faq', name: 'FAQ', icon: 'HelpCircle', popular: true, desc: 'Answer guest questions: parking, children, plus-ones, timings.' },
  { id: 'childhood', name: 'Childhood Pictures', icon: 'Smile', isNew: true, desc: 'Sweet throwback photos of you both as kids.' },
  { id: 'video', name: 'Your Video', icon: 'Video', desc: 'Add your own proposal video, greeting, or drone clip.' }
];

export const EXTRAS = [
  {
    id: 'express',
    name: 'Express Delivery',
    price: 30,
    badge: 'Fast ★',
    badgeClass: 'bg-[#006989] text-white',
    desc: 'Standard 4–7 days ➔ Express 24–48h delivery guaranteed.'
  },
  {
    id: 'music',
    name: 'Background Music',
    price: 15,
    badge: 'Most Popular',
    badgeClass: 'bg-emerald-600 text-white',
    desc: 'Choose any song you love — plays softly with ambient sound upon opening.'
  },
  {
    id: 'domain',
    name: 'Custom Domain',
    price: 60,
    badge: 'Premium',
    badgeClass: 'bg-[#9a8848] text-white',
    desc: 'Your invitation gets its own web address (e.g. sophie-and-james.com).'
  },
  {
    id: 'wax',
    name: 'Custom Wax Seal',
    price: 20,
    badge: 'New',
    badgeClass: 'bg-amber-100 text-amber-900',
    desc: 'A unique wax seal design just for you — your initials, crest, or motif.'
  },
  {
    id: 'envelope',
    name: 'Custom Envelope',
    price: 20,
    badge: 'New',
    badgeClass: 'bg-amber-100 text-amber-900',
    desc: 'Bespoke illustrated envelope in your wedding colors and textures.'
  },
  {
    id: 'illus',
    name: 'Custom Illustration',
    price: 20,
    badge: 'New',
    badgeClass: 'bg-purple-100 text-purple-900',
    desc: 'Custom illustration of your wedding venue, couple silhouette, or pets.'
  },
  {
    id: 'video',
    name: 'Animated AI Video',
    price: 40,
    badge: 'Cinematic',
    badgeClass: 'bg-indigo-600 text-white',
    desc: 'Cinematic falling petals, moving fairy lights, or animated story scene.'
  }
];

export const BUNDLES = [
  {
    id: 'sig',
    name: 'Signature Bundle',
    items: ['wax', 'envelope'],
    price: 30,
    originalPrice: 40,
    desc: 'Custom Wax Seal + Custom Envelope in matching wedding colors.'
  },
  {
    id: 'story',
    name: 'Story Bundle',
    items: ['illus', 'video'],
    price: 50,
    originalPrice: 60,
    desc: 'Custom Venue Illustration + Animated AI Video for the most immersive experience.'
  }
];
