/**
 * Webgency Invitations - Template Customizer Bridge
 * Enables instantaneous, on-the-spot 2-way visual personalization
 * across all 12 wedding templates.
 */

(function () {
  'use strict';

  // Admin Mode Gate - Customization is strictly locked for customers and visitors
  window.__wbg_is_admin = (function () {
    try {
      var s = window.location.search || '';
      var h = window.location.hash || '';
      if (s.indexOf('admin=true') !== -1 || h.indexOf('admin=true') !== -1) return true;
      if (window.parent && window.parent !== window) {
        var ps = window.parent.location.search || '';
        var ph = window.parent.location.hash || '';
        if (ps.indexOf('admin=true') !== -1 || ph.indexOf('admin=true') !== -1) return true;
      }
    } catch (e) {}
    return false;
  })();

  // Intercept countdown timers so they don't fight with user customized date
  var origSetInterval = window.setInterval;
  window.setInterval = function (fn, delay) {
    var fnStr = fn ? fn.toString() : '';
    var id = origSetInterval.apply(this, arguments);
    if (fnStr.includes('countdownContainer') || fnStr.includes('eventLocal') || fnStr.includes('eventDate')) {
      window.__wbg_origCountdownInterval = id;
    }
    return id;
  };

  // Master list of known couple names across all templates
  var KNOWN_PARTNER_1 = [
    'Daanish', 'Zohan', 'Amira', 'Alexa', 'Elisabeth', 'Thanu', 
    'Laura', 'Erika', 'Viktor', 'Sophia', 'Isabelle', 'Emily', 'Charlotte', 'Ben'
  ];

  var KNOWN_PARTNER_2 = [
    'Adeena', 'Rose', 'Yusuf', 'Richard', 'Marcus', 'Jathu', 
    'Stephan', 'Kylian', 'Paula', 'Laurent', 'Édouard', 'Edouard', 'James', 'William'
  ];

  var KNOWN_COUPLES = [
    'Daanish & Adeena', 'Daanish and Adeena',
    'Zohan & Rose', 'Zohan and Rose', 'Zohan Rose',
    'Amira & Yusuf', 'Amira and Yusuf', 'AmiraYusuf',
    'Alexa & Richard', 'Alexa and Richard',
    'Elisabeth & Marcus', 'Elisabeth and Marcus', 'Elisabeth Swan and Marcus Lagarde',
    'Thanu & Jathu', 'Thanu and Jathu',
    'Laura & Stephan', 'Laura and Stephan',
    'Erika & Kylian', 'Erika and Kylian',
    'Viktor & Paula', 'Viktor and Paula', 'ViktorPaula',
    'Sophia & Laurent', 'Sophia and Laurent',
    'Isabelle & Édouard', 'Isabelle & Edouard', 'Isabelle and Édouard',
    'Emily & James', 'Emily and James',
    'Charlotte & William', 'Charlotte and William'
  ];

  var KNOWN_VENUES = [
    'Islamic Center of Melville',
    'Villa Cimbrone',
    'Beldi Country Club',
    'The Dorchester',
    'Mexico',
    'The Barn Tea',
    'The Heerenhuys',
    'El Poble Espanyol',
    'Château de Paon',
    'Chateau de Paon',
    'Château de Vaux-le-Vicomte',
    'Chateau de Vaux-le-Vicomte',
    'Central Park',
    'Villa Balbianello',
    'Villa Borghese',
    'One&Only Royal Mirage'
  ];

  var KNOWN_ADDRESSES = [
    '118 Old East Neck Road',
    'Via Santa Chiara',
    '53 Park Lane',
    'Mijnsherenlaan 9',
    'Av. de Francesc Ferrer i Guàrdia',
    'Petit Chemin de Saint-Gilles',
    'King Salman Bin Abdulaziz Al Saud St'
  ];

  var KNOWN_DATES = [
    '27.09.26', '05.07.26', '05.05.25', '17.03.2025', '19.09.2026', '20.09.2026', 
    '29.08.26', '20 Mai 2027', '14 September 2025', '18 June 2026', '22 August 2026',
    'September 27, 2026', 'September 14, 2025', 'October 10, 2025'
  ];

  // Specific atom selectors scoped by artboard for 100% collision-free targeting
  var SPECIFIC_SELECTORS = {
    // 1. The Sacred Garden
    sacredGardenMultiline: "[data-elem-id='1763402147625'] .tn-atom, [field='tn_text_1763402147625']",
    sacredGardenConnector: "[data-elem-id='176340390975774690'] .tn-atom, [field='tn_text_176340390975774690']",
    sacredGardenDate: "[data-elem-id='176340401720454780'] .tn-atom, [field='tn_text_176340401720454780']",
    sacredGardenVenue: "[data-elem-id='1772804808869'] .tn-atom, [field='tn_text_1772804808869']",
    sacredGardenAddress: "[data-elem-id='1772813480591000001'] .tn-atom, [field='tn_text_1772813480591000001']",
    sacredGardenDressCode: "[data-elem-id='1778524751695000001'] .tn-atom, [field='tn_text_1778524751695000001']",
    sacredGardenGift: "[data-elem-id='1772813849329000001'] .tn-atom, [field='tn_text_1772813849329000001']",
    sacredGardenAttendance: "[data-elem-id='1772813849329000001'] .tn-atom, [field='tn_text_1772813849329000001']",
    sacredGardenEnding: "[data-elem-id='1772813849329000001'] .tn-atom, [field='tn_text_1772813849329000001']",

    // 2. Blossom & Oud
    blossomOudCouple: "[data-elem-id='1779566247730000001'] .tn-atom, [field='tn_text_1779566247730000001']",
    blossomOudConnector: "[data-elem-id='1779566247730000004'] .tn-atom, [field='tn_text_1779566247730000004']",
    blossomOudDate: "[data-elem-id='1779566247730000003'] .tn-atom, [field='tn_text_1779566247730000003']",
    blossomOudSubtitle: "[data-elem-id='1779626065755000001'] .tn-atom, [field='tn_text_1779626065755000001']",
    blossomOudEnvelopeBtn: "[data-elem-id='1777183175514000001'] .tn-atom, [field='tn_text_1777183175514000001']",
    blossomOudArabicText: "[data-elem-id='1779624381838000001'] .tn-atom, [field='tn_text_1779624381838000001']",
    blossomOudCountdownHeader: "[data-artboard-recid='2443433763'] .tn-atom, [data-artboard-recid='2443433763'] [field='tn_text_1771277026942000001']",
    blossomOudTimelineHeader: "[data-artboard-recid='2443433773'] .tn-atom, [data-artboard-recid='2443433773'] [field='tn_text_1771277026942000001']",
    blossomOudVenue: "[data-artboard-recid='2443433783'] [data-elem-id='1779544773135'] .tn-atom, [data-artboard-recid='2443433783'] [field='tn_text_1779544773135']",
    blossomOudCity: "[data-artboard-recid='2443433783'] [data-elem-id='1779545032699000001'] .tn-atom, [data-artboard-recid='2443433783'] [field='tn_text_1779545032699000001']",
    blossomOudLocationHeader: "[data-artboard-recid='2443433783'] [field='tn_text_1771277026942000001']",
    blossomOudDressCode: "[data-artboard-recid='2443433793'] [data-elem-id='1779544773135'] .tn-atom, [data-artboard-recid='2443433793'] [field='tn_text_1779544773135']",
    blossomOudDressHeader: "[data-artboard-recid='2443433793'] [field='tn_text_1771277026942000001']",
    blossomOudMapHeader: "[data-artboard-recid='2443433823'] [field='tn_text_1771277026942000001']",
    blossomOudRsvpHeader: "[data-artboard-recid='2443433803'] [field='tn_text_1771277026942000001']",
    blossomOudRsvpForm: "[data-elem-id='1779545532876']",
    blossomOudClosingText: "[data-elem-id='1763405219328'] .tn-atom, [field='tn_text_1763405219328']",

    // 3. Dolce Vita
    dolceVitaHeadline: "[data-elem-id='1776948176126'] .tn-atom, [field='tn_text_1776948176126']",
    dolceVitaEnding: "[data-elem-id='1710522265391'] .tn-atom, [field='tn_text_1710522265391']",
    dolceVitaVenue: "[data-elem-id='1776866271348000003'] .tn-atom, [field='tn_text_1776866271348000003']",
    dolceVitaDressCode: "[data-elem-id='1741427070967'] .tn-atom, [field='tn_text_1741427070967']",
    dolceVitaTileDay: "#tdr-tile-day .tdr-num",
    dolceVitaTileMonth: "#tdr-tile-month .tdr-num",
    dolceVitaTileYear: "#tdr-tile-year .tdr-num",

    // 4. Timeless Grace
    timelessGraceP1: "[data-elem-id='1782990372985000002'] .tn-atom, [field='tn_text_1782990372985000002']",
    timelessGraceP2: "[data-elem-id='1782990570479000010'] .tn-atom, [field='tn_text_1782990570479000010']",
    timelessGraceConnector: "[data-elem-id='1782990549039000006'] .tn-atom, [field='tn_text_1782990549039000006']",

    // 5. Vibrant Vows
    vibrantVowsMultiline: "[data-elem-id='1763402147625'] .tn-atom, [field='tn_text_1763402147625']",
    vibrantVowsConnector: "[data-elem-id='176340390975774690'] .tn-atom, [field='tn_text_176340390975774690']",
    vibrantVowsDate: "[data-elem-id='176340401720454780'] .tn-atom, [field='tn_text_176340401720454780']",
    vibrantVowsVenue: "[data-elem-id='1772804808869'] .tn-atom, [field='tn_text_1772804808869']",
    vibrantVowsDressCode: "[data-artboard-recid='2003451831'] [data-elem-id='1772813849329000001'] .tn-atom, [data-artboard-recid='2003451831'] [field='tn_text_1772813849329000001']",
    vibrantVowsAttendance: "[data-artboard-recid='2003860951'] [data-elem-id='1772813849329000001'] .tn-atom, [data-artboard-recid='2003860951'] [field='tn_text_1772813849329000001']",
    vibrantVowsEnding: "[data-artboard-recid='2003869491'] [data-elem-id='1772813849329000001'] .tn-atom, [data-artboard-recid='2003869491'] [field='tn_text_1772813849329000001']",

    // 6. Destination Love
    destLovePass: "[data-elem-id='1739457970056'] .tn-atom, [field='tn_text_1739457970056']",
    destLoveFlightBadge: "[data-elem-id='1739457970065'] .tn-atom, [field='tn_text_1739457970065']",
    destLoveCity: "[data-elem-id='1739457970068'] .tn-atom, [field='tn_text_1739457970068']",
    destLoveFullName: "[data-elem-id='1741107633653'] .tn-atom, [field='tn_text_1741107633653']",
    destLoveDate: "[data-elem-id='1741107633658'] .tn-atom, [field='tn_text_1741107633658']",
    destLoveDressCode: "[data-elem-id='1741427070967'] .tn-atom, [field='tn_text_1741427070967']",
    destLoveEnding: "[data-elem-id='1705236303923'] .tn-atom, [field='tn_text_1705236303923']",

    // 7. Eternal Romance
    eternalRomanceHeadline: "[data-elem-id='1730310670429'] .tn-atom, [field='tn_text_1730310670429']",
    eternalRomanceDate: "[data-elem-id='1730310670422'] .tn-atom, [field='tn_text_1730310670422']",
    eternalRomanceMidDate: "[data-elem-id='1705235414658'] .tn-atom, [field='tn_text_1705235414658']",
    eternalRomanceDressCode: "[data-elem-id='1730375467556'] .tn-atom, [field='tn_text_1730375467556']",
    eternalRomanceEnding: "[data-elem-id='1710522265391'] .tn-atom, [field='tn_text_1710522265391']",

    // 8. Royal Gold
    royalGoldHeadline: "[data-elem-id='1709580515237'] .tn-atom, [field='tn_text_1709580515237']",
    royalGoldDate: "[data-elem-id='1709580515218'] .tn-atom, [field='tn_text_1709580515218']",
    royalGoldTimeline1: "[data-elem-id='1709506567892'] .tn-atom, [field='tn_text_1709506567892']",
    royalGoldTimeline2: "[data-elem-id='1709506567893'] .tn-atom, [field='tn_text_1709506567893']",
    royalGoldDressCode: "[data-elem-id='1709507064325'] .tn-atom, [field='tn_text_1709507064325']",
    royalGoldEnding: "[data-elem-id='1688726914364'] .tn-atom, [field='tn_text_1688726914364']",

    // 9. Minimalist
    minimalistHeadline: "[data-elem-id='1690458811493'] .tn-atom, [field='tn_text_1690458811493']",
    minimalistDate: "[data-elem-id='1690458811484'] .tn-atom, [field='tn_text_1690458811484']",
    minimalistCity: "[data-elem-id='1690458811491'] .tn-atom, [field='tn_text_1690458811491']",
    minimalistBigDate: "[data-elem-id='1690458966885'] .tn-atom, [field='tn_text_1690458966885']",
    minimalistVenue: "[data-elem-id='1746701376970'] .tn-atom, [field='tn_text_1746701376970']",
    minimalistEnding: "[data-elem-id='1692969909762'] .tn-atom, [field='tn_text_1692969909762']",

    // 10. Golden Secret
    stdNames: ".std-names",
    stdDate: "#std-date, .std-date",
    stdVenue: ".std-venue, .std-loc",

    // 11. Petal Promise
    petalNames: ".pp-nm",
    petalVenue: ".pp-lc",

    // 12. Captured Love
    polaroidNames: ".pl-cap-names",
    polaroidDate: ".pl-rev-date",
    polaroidVenue: ".pl-rev-venue"
  };

  var tracked = {
    partner1Nodes: [],
    partner2Nodes: [],
    connectorNodes: [],
    coupleNodes: [],
    multilineCoupleNodes: [],
    dateNodes: [],
    venueNodes: [],
    addressNodes: [],
    dressCodeNodes: [],
    giftNodes: [],
    photoNodes: [],
    bottomPhotoNode: null,
    countdown: {},
    dolceVitaTiles: {}
  };

  var lastApplied = {
    partner1: '',
    partner2: '',
    fullName: '',
    dateText: '',
    venueName: '',
    venueAddress: '',
    dressCode: '',
    giftPreference: '',
    welcomeMessage: ''
  };

  var countdownInterval = null;
  var targetDateObj = null;

  function safeText(str) {
    return str ? String(str).trim() : '';
  }

  function tagRole(elem, role) {
    if (!elem) return;
    try {
      elem.setAttribute('data-wbg-role', role);
      elem.setAttribute('data-wbg-bound', 'true');
    } catch (e) {}
  }

  // Scan and discover all customizable elements in the current template
  function discoverElements() {
    tracked.partner1Nodes = [];
    tracked.partner2Nodes = [];
    tracked.connectorNodes = [];
    tracked.coupleNodes = [];
    tracked.multilineCoupleNodes = [];
    tracked.dateNodes = [];
    tracked.venueNodes = [];
    tracked.addressNodes = [];
    tracked.dressCodeNodes = [];
    tracked.giftNodes = [];
    tracked.photoNodes = [];
    tracked.bottomPhotoNode = null;
    tracked.countdown = {};
    tracked.dolceVitaTiles = {};

    // 1. Check known specific selectors
    var p1Elem = document.querySelector(SPECIFIC_SELECTORS.timelessGraceP1);
    if (p1Elem) {
      tracked.partner1Nodes.push(p1Elem);
      tagRole(p1Elem, 'partner1');
    }

    var p2Elem = document.querySelector(SPECIFIC_SELECTORS.timelessGraceP2);
    if (p2Elem) {
      tracked.partner2Nodes.push(p2Elem);
      tagRole(p2Elem, 'partner2');
    }

    var connSelectors = [
      SPECIFIC_SELECTORS.timelessGraceConnector,
      SPECIFIC_SELECTORS.sacredGardenConnector,
      SPECIFIC_SELECTORS.vibrantVowsConnector
    ];
    connSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (tracked.connectorNodes.indexOf(el) === -1) {
          tracked.connectorNodes.push(el);
          tagRole(el, 'connector');
        }
      });
    });

    // In Blossom & Oud, hide the standalone connector atom to prevent duplicate connectors
    var boConnector = document.querySelector(SPECIFIC_SELECTORS.blossomOudConnector);
    if (boConnector) {
      var boParent = boConnector.closest('.tn-elem') || boConnector;
      boParent.style.setProperty('display', 'none', 'important');
    }

    // Multiline couple elements
    var multilineSelectors = [
      SPECIFIC_SELECTORS.sacredGardenMultiline,
      SPECIFIC_SELECTORS.blossomOudCouple,
      SPECIFIC_SELECTORS.vibrantVowsMultiline
    ];
    multilineSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (tracked.multilineCoupleNodes.indexOf(el) === -1) {
          tracked.multilineCoupleNodes.push(el);
          tagRole(el, 'couple-multiline');
        }
      });
    });

    // Single-line couple elements
    var singleLineSelectors = [
      SPECIFIC_SELECTORS.sacredGardenEnding,
      SPECIFIC_SELECTORS.dolceVitaHeadline,
      SPECIFIC_SELECTORS.dolceVitaEnding,
      SPECIFIC_SELECTORS.vibrantVowsEnding,
      SPECIFIC_SELECTORS.destLovePass,
      SPECIFIC_SELECTORS.destLoveFullName,
      SPECIFIC_SELECTORS.destLoveEnding,
      SPECIFIC_SELECTORS.eternalRomanceHeadline,
      SPECIFIC_SELECTORS.eternalRomanceEnding,
      SPECIFIC_SELECTORS.royalGoldHeadline,
      SPECIFIC_SELECTORS.royalGoldEnding,
      SPECIFIC_SELECTORS.minimalistHeadline,
      SPECIFIC_SELECTORS.minimalistEnding,
      SPECIFIC_SELECTORS.stdNames,
      SPECIFIC_SELECTORS.polaroidNames,
      SPECIFIC_SELECTORS.petalNames
    ];
    singleLineSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (tracked.coupleNodes.indexOf(el) === -1) {
          tracked.coupleNodes.push(el);
          tagRole(el, 'couple-single');
        }
      });
    });

    // Date specific elements
    var specificDateSelectors = [
      SPECIFIC_SELECTORS.sacredGardenDate,
      SPECIFIC_SELECTORS.blossomOudDate,
      SPECIFIC_SELECTORS.vibrantVowsDate,
      SPECIFIC_SELECTORS.destLoveFlightBadge,
      SPECIFIC_SELECTORS.destLoveDate,
      SPECIFIC_SELECTORS.eternalRomanceDate,
      SPECIFIC_SELECTORS.eternalRomanceMidDate,
      SPECIFIC_SELECTORS.royalGoldDate,
      SPECIFIC_SELECTORS.royalGoldTimeline1,
      SPECIFIC_SELECTORS.royalGoldTimeline2,
      SPECIFIC_SELECTORS.minimalistDate,
      SPECIFIC_SELECTORS.minimalistBigDate,
      SPECIFIC_SELECTORS.stdDate,
      SPECIFIC_SELECTORS.polaroidDate
    ];
    specificDateSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (tracked.dateNodes.indexOf(el) === -1) {
          tracked.dateNodes.push(el);
          tagRole(el, 'date');
        }
      });
    });

    // Venue specific elements
    var specificVenueSelectors = [
      SPECIFIC_SELECTORS.sacredGardenVenue,
      SPECIFIC_SELECTORS.sacredGardenAddress,
      SPECIFIC_SELECTORS.blossomOudVenue,
      SPECIFIC_SELECTORS.blossomOudCity,
      SPECIFIC_SELECTORS.dolceVitaVenue,
      SPECIFIC_SELECTORS.vibrantVowsVenue,
      SPECIFIC_SELECTORS.destLoveCity,
      SPECIFIC_SELECTORS.minimalistVenue,
      SPECIFIC_SELECTORS.minimalistCity,
      SPECIFIC_SELECTORS.stdVenue,
      SPECIFIC_SELECTORS.petalVenue,
      SPECIFIC_SELECTORS.polaroidVenue
    ];
    specificVenueSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (tracked.venueNodes.indexOf(el) === -1) {
          tracked.venueNodes.push(el);
          tagRole(el, 'venue');
        }
      });
    });

    // Dolce Vita Date Scratch Tiles
    var dvDay = document.querySelector(SPECIFIC_SELECTORS.dolceVitaTileDay);
    var dvMonth = document.querySelector(SPECIFIC_SELECTORS.dolceVitaTileMonth);
    var dvYear = document.querySelector(SPECIFIC_SELECTORS.dolceVitaTileYear);
    if (dvDay) tracked.dolceVitaTiles.day = dvDay;
    if (dvMonth) tracked.dolceVitaTiles.month = dvMonth;
    if (dvYear) tracked.dolceVitaTiles.year = dvYear;

    // Gift Preference elements
    var giftElem = document.querySelector(SPECIFIC_SELECTORS.sacredGardenGift);
    if (giftElem) tracked.giftNodes.push(giftElem);

    // Dress Code elements
    var dressSelectors = [
      SPECIFIC_SELECTORS.sacredGardenDressCode,
      SPECIFIC_SELECTORS.blossomOudDressCode,
      SPECIFIC_SELECTORS.dolceVitaDressCode,
      SPECIFIC_SELECTORS.vibrantVowsDressCode,
      SPECIFIC_SELECTORS.destLoveDressCode,
      SPECIFIC_SELECTORS.eternalRomanceDressCode,
      SPECIFIC_SELECTORS.royalGoldDressCode
    ];
    dressSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (tracked.dressCodeNodes.indexOf(el) === -1) {
          tracked.dressCodeNodes.push(el);
          tagRole(el, 'dresscode');
        }
      });
    });

    // 2. Scan remaining general .tn-atom and divs for zero-miss detection
    var allAtoms = Array.from(document.querySelectorAll('.tn-atom, h1, h2, h3, .std-names, .pl-cap-names, .pp-nm'));

    allAtoms.forEach(function (el) {
      var raw = (el.innerText || '').trim();
      if (!raw || raw.length < 2 || raw.length > 120) return;

      var lower = raw.toLowerCase();
      if (lower.includes('boxed gifts') || lower.includes('attendance') || lower.includes('dress code') || lower.includes('attire')) return;
      if (lower.includes('countdown') || lower.includes('celebration begins')) return;

      // Partner 1 alone
      for (var i = 0; i < KNOWN_PARTNER_1.length; i++) {
        var p1 = KNOWN_PARTNER_1[i];
        if (raw.toLowerCase() === p1.toLowerCase()) {
          if (tracked.partner1Nodes.indexOf(el) === -1) {
            tracked.partner1Nodes.push(el);
            tagRole(el, 'partner1');
          }
          return;
        }
      }

      // Partner 2 alone
      for (var j = 0; j < KNOWN_PARTNER_2.length; j++) {
        var p2 = KNOWN_PARTNER_2[j];
        if (raw.toLowerCase() === p2.toLowerCase()) {
          if (tracked.partner2Nodes.indexOf(el) === -1) {
            tracked.partner2Nodes.push(el);
            tagRole(el, 'partner2');
          }
          return;
        }
      }

      // Couple combined
      for (var k = 0; k < KNOWN_COUPLES.length; k++) {
        var couple = KNOWN_COUPLES[k];
        if (raw.toLowerCase().includes(couple.toLowerCase())) {
          if (raw.includes('\n') || el.innerHTML.includes('<br')) {
            if (tracked.multilineCoupleNodes.indexOf(el) === -1) {
              tracked.multilineCoupleNodes.push(el);
              tagRole(el, 'couple-multiline');
            }
          } else {
            if (tracked.coupleNodes.indexOf(el) === -1) {
              tracked.coupleNodes.push(el);
              tagRole(el, 'couple-single');
            }
          }
          return;
        }
      }

      // Dates
      for (var d = 0; d < KNOWN_DATES.length; d++) {
        var dt = KNOWN_DATES[d];
        if (raw.toLowerCase().includes(dt.toLowerCase())) {
          if (tracked.dateNodes.indexOf(el) === -1) {
            tracked.dateNodes.push(el);
            tagRole(el, 'date');
          }
          return;
        }
      }

      // Venues
      for (var v = 0; v < KNOWN_VENUES.length; v++) {
        var vn = KNOWN_VENUES[v];
        if (raw.toLowerCase().includes(vn.toLowerCase())) {
          if (tracked.venueNodes.indexOf(el) === -1) {
            tracked.venueNodes.push(el);
            tagRole(el, 'venue');
          }
          return;
        }
      }

      // Addresses
      for (var a = 0; a < KNOWN_ADDRESSES.length; a++) {
        var ad = KNOWN_ADDRESSES[a];
        if (raw.toLowerCase().includes(ad.toLowerCase())) {
          if (tracked.addressNodes.indexOf(el) === -1) {
            tracked.addressNodes.push(el);
            tagRole(el, 'address');
          }
          return;
        }
      }
    });

    // 3. Countdown timer elements (Never include .tdr-num!)
    var daysEl = document.getElementById('days') || document.querySelector('#tb-days .number');
    var hoursEl = document.getElementById('hours') || document.querySelector('#tb-hours .number');
    var minEl = document.getElementById('minutes') || document.querySelector('#tb-minutes .number') || document.querySelector('#tb-mins .number');
    var secEl = document.getElementById('seconds') || document.querySelector('#tb-seconds .number') || document.querySelector('#tb-secs .number');

    if (daysEl) tracked.countdown.days = daysEl;
    if (hoursEl) tracked.countdown.hours = hoursEl;
    if (minEl) tracked.countdown.minutes = minEl;
    if (secEl) tracked.countdown.seconds = secEl;

    // 4. Photo elements
    // Dolce Vita uses horizontal gallery slider only; no individual couple photo elements
    var isDolce = !!document.querySelector('#carousel_2442651103') || !!document.querySelector('#rec2442651083') || (window.location.pathname.includes('dolce'));
    if (isDolce) {
      tracked.photoNodes = [];
    } else {
      var allImgs = Array.from(document.querySelectorAll('img'));
      var coupleImgs = allImgs.filter(function (img) {
        var src = img.getAttribute('src') || img.getAttribute('data-original') || '';
        var width = img.naturalWidth || img.clientWidth || parseInt(img.getAttribute('width') || '0', 10);
        var height = img.naturalHeight || img.clientHeight || parseInt(img.getAttribute('height') || '0', 10);
        var isIcon = src.includes('icon') || src.includes('seal') || src.includes('arrow') || src.includes('Group_269') || src.includes('Screenshot_2026') || src.includes('Polygon');
        var isEnvelope = img.closest('.t396') && (src.includes('Envelope') || src.includes('noroot') || src.includes('Untitled_Project') || src.includes('Group_'));
        var isCarouselOrVenue = img.closest('.t1148__item, .t-slds__item, #rec2442651103, #rec2442651083, [id*="carousel"]');
        return !isIcon && !isEnvelope && !isCarouselOrVenue && (img.closest('.pl-img') || width > 180 || height > 180);
      });
      tracked.photoNodes = coupleImgs;
    }

    // 4b. Bottom photo element (Dolce Vita)
    var bottomPhotoAtom = document.querySelector("#rec2442651163 [data-elem-id='1776926930895000002'] .tn-atom") ||
                          document.querySelector("[data-elem-id='1776926930895000002'] .tn-atom");
    if (bottomPhotoAtom) {
      tracked.bottomPhotoNode = bottomPhotoAtom;
      tagRole(bottomPhotoAtom, 'bottomPhoto');
      var parentElem = bottomPhotoAtom.closest('.tn-elem') || bottomPhotoAtom;
      parentElem.style.cursor = 'pointer';
      parentElem.setAttribute('title', 'Click to edit Bottom Photo');
      if (!parentElem.__wbg_clickBound) {
        parentElem.__wbg_clickBound = true;
        parentElem.addEventListener('click', function (e) {
          e.stopPropagation();
          try {
            window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'bottomPhoto' }, '*');
          } catch (err) {}
        });
      }
    }
  }

  function formatDateShort(dateStr) {
    if (!dateStr) return '';
    try {
      var d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      var dd = String(d.getDate()).padStart(2, '0');
      var mm = String(d.getMonth() + 1).padStart(2, '0');
      var yy = String(d.getFullYear()).slice(-2);
      return dd + '.' + mm + '.' + yy;
    } catch (e) {
      return '';
    }
  }

  // Update Hero Screen for Timeless Grace
  function updateTimelessGraceHero(p1, p2, conn, eventTitle) {
    var heroElems = [
      document.querySelector("[data-elem-id='1785746425236'] .tn-atom"),
      document.querySelector("[data-elem-id='1785746843632'] .tn-atom")
    ].filter(Boolean);

    if (heroElems.length === 0) return;

    var partner1 = p1 || 'Daanish';
    var partner2 = p2 || 'Adeena';
    var connector = conn || '&';
    var ceremony = eventTitle || 'Nikkah Ceremony';

    heroElems.forEach(function (container) {
      var origImg = container.querySelector('img.tn-atom__img');
      if (origImg) origImg.style.display = 'none';

      var dynBox = container.querySelector('.tg-hero-dyn');
      if (!dynBox) {
        dynBox = document.createElement('div');
        dynBox.className = 'tg-hero-dyn';
        dynBox.setAttribute('data-wbg-role', 'names');
        dynBox.setAttribute('data-wbg-bound', 'true');
        dynBox.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;color:#806b43;user-select:none;cursor:pointer;padding:4px 0;line-height:1;';
        container.appendChild(dynBox);

        dynBox.addEventListener('click', function (e) {
          e.stopPropagation();
          try {
            window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'names' }, '*');
          } catch (err) {}
        });
      }

      dynBox.innerHTML = 
        '<div style="font-family:\'Rufina\',\'Cinzel\',Georgia,serif;font-size:17px;font-weight:400;letter-spacing:0.8px;color:#806b43;line-height:1.2;margin-bottom:2px;text-align:center;">Welcome to the</div>' +
        '<div style="font-family:\'Alex Brush\',\'Great Vibes\',cursive;font-size:35px;font-weight:400;line-height:1.1;color:#806b43;margin-bottom:6px;text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.4);">' + ceremony + '</div>' +
        '<div style="display:flex;align-items:center;justify-content:center;width:92%;margin:2px 0 10px 0;gap:8px;">' +
          '<div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#b89758 40%,#806b43 100%);"></div>' +
          '<span style="font-size:9px;color:#b89758;line-height:1;">✦</span>' +
          '<span style="font-family:\'Rufina\',serif;font-style:italic;font-size:15px;color:#806b43;line-height:1;padding:0 3px;">of</span>' +
          '<span style="font-size:9px;color:#b89758;line-height:1;">✦</span>' +
          '<div style="flex:1;height:1px;background:linear-gradient(90deg,#806b43 0%,#b89758 60%,transparent);"></div>' +
        '</div>' +
        '<div style="font-family:\'Alex Brush\',\'Great Vibes\',cursive;font-size:46px;font-weight:400;line-height:1;color:#806b43;text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.4);">' + partner1 + '</div>' +
        '<div style="font-family:\'Alex Brush\',\'Great Vibes\',cursive;font-size:26px;font-weight:400;line-height:0.85;color:#806b43;margin:3px 0;text-align:center;">' + connector + '</div>' +
        '<div style="font-family:\'Alex Brush\',\'Great Vibes\',cursive;font-size:46px;font-weight:400;line-height:1;color:#806b43;text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.4);">' + partner2 + '</div>';
    });
  }

  // Update Location Block for Timeless Grace
  function updateTimelessGraceLocation(venueName, venueAddress) {
    var locContainer = document.querySelector("[data-elem-id='1785747277552'] .tn-atom");
    if (!locContainer) return;

    var vName = venueName || 'Four Seasons Hotel in Jumeirah';
    var vAddr = venueAddress || 'Dana Ballroom, Dubai, UAE';

    var origImg = locContainer.querySelector('img.tn-atom__img');
    if (origImg) origImg.style.display = 'none';

    var dynBox = locContainer.querySelector('.tg-loc-dyn');
    if (!dynBox) {
      dynBox = document.createElement('div');
      dynBox.className = 'tg-loc-dyn';
      dynBox.setAttribute('data-wbg-role', 'venue');
      dynBox.setAttribute('data-wbg-bound', 'true');
      dynBox.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;color:#806b43;user-select:none;cursor:pointer;padding:4px 0;line-height:1;';
      locContainer.appendChild(dynBox);

      dynBox.addEventListener('click', function (e) {
        e.stopPropagation();
        try {
          window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'venue' }, '*');
        } catch (err) {}
      });
    }

    dynBox.innerHTML = 
      '<div style="font-family:\'Alex Brush\',\'Great Vibes\',cursive;font-size:36px;font-weight:400;line-height:1.1;color:#806b43;margin-bottom:2px;text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.4);">Location</div>' +
      '<div style="display:flex;align-items:center;justify-content:center;width:75%;margin:2px 0 8px 0;gap:6px;">' +
        '<div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#b89758 40%,#806b43 100%);"></div>' +
        '<span style="font-size:10px;color:#b89758;line-height:1;">❦</span>' +
        '<div style="flex:1;height:1px;background:linear-gradient(90deg,#806b43 0%,#b89758 60%,transparent);"></div>' +
      '</div>' +
      '<div style="font-family:\'Rufina\',\'Cinzel\',Georgia,serif;font-size:18px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#806b43;line-height:1.2;margin-bottom:4px;text-align:center;">' + vName + '</div>' +
      '<div style="font-family:\'Rufina\',\'Cinzel\',Georgia,serif;font-size:14px;font-weight:400;color:#806b43;line-height:1.35;max-width:250px;text-align:center;">' + vAddr + '</div>';
  }

  // Update Wax Seal Monogram (e.g. envelope overlay or RSVP seals)
  function updateWaxSealMonograms(rawInitials, connector, p1, p2) {
    var text = (rawInitials || '').trim();
    if (!text && (p1 || p2)) {
      text = ((p1 ? p1[0] : '') + (p2 ? p2[0] : '')).toUpperCase();
    }
    if (!text) return;

    var conn = connector || '&';
    if (text.includes('&')) conn = '&';
    else if (text.includes('+')) conn = '+';
    else if (text.includes('•')) conn = '•';

    var letters = text.replace(/[^a-zA-Z0-9]/g, '');
    var char1 = '', char2 = '';

    if (text.includes('&') || text.includes('+') || text.includes('•') || text.includes(' ')) {
      var parts = text.split(/[&+•\s]+/).filter(Boolean);
      if (parts.length >= 2) {
        char1 = parts[0].toUpperCase();
        char2 = parts[1].toUpperCase();
      } else if (parts.length === 1) {
        char1 = parts[0].toUpperCase();
      }
    } else if (letters.length === 2) {
      char1 = letters[0].toUpperCase();
      char2 = letters[1].toUpperCase();
    } else if (letters.length === 1) {
      char1 = letters[0].toUpperCase();
    } else if (letters.length > 2) {
      char1 = letters[0].toUpperCase();
      char2 = letters.slice(1).toUpperCase();
    }

    var sealElements = document.querySelectorAll('.seal-monogram, [data-seal-initials], #weiSealInitials');
    sealElements.forEach(function (elem) {
      elem.setAttribute('data-seal-initials', text);
      if (elem.id === 'weiSealInitials' || elem.classList.contains('seal-monogram')) {
        if (char1 && char2) {
          elem.innerHTML =
            '<div class="seal-staggered">' +
              '<span class="seal-char seal-p1">' + char1 + '</span>' +
              '<span class="seal-char seal-amp">' + conn + '</span>' +
              '<span class="seal-char seal-p2">' + char2 + '</span>' +
            '</div>';
        } else if (char1) {
          elem.innerHTML =
            '<div class="seal-single">' +
              '<span class="seal-char seal-main">' + char1 + '</span>' +
            '</div>';
        } else {
          elem.innerText = text;
        }
      } else {
        elem.innerText = text;
      }
    });
  }

  // Dress Code Palette Selectors for Blossom & Oud (4 colors)
  var BLOSSOM_OUD_PALETTE_SELECTORS = [
    '[data-elem-id="1780767598424000008"] .tn-atom',
    '[data-elem-id="1780767598425000011"] .tn-atom',
    '[data-elem-id="1780767598425000014"] .tn-atom',
    '[data-elem-id="1780767598425000017"] .tn-atom'
  ];

  // Dress Code Palette Selectors for Dolce Vita (5 circles from left to right)
  var DOLCE_VITA_PALETTE_SELECTORS = [
    '[data-elem-id="1741430557591"] .tn-atom', // 1: Cream (#faf1db)
    '[data-elem-id="1741430557589"] .tn-atom', // 2: Peach (#f5d9b1)
    '[data-elem-id="1741430557587"] .tn-atom', // 3: Blush Pink (#f2cac9)
    '[data-elem-id="1741430557585"] .tn-atom', // 4: Sky Blue (#afcff1)
    '[data-elem-id="1741430557581"] .tn-atom'  // 5: Ocean Blue (#7ebbfa)
  ];

  // Dress Code Palette Selectors for Timeless Grace (6 circles from left to right)
  var TIMELESS_GRACE_PALETTE_SELECTORS = [
    '[data-elem-id="1782997625349000007"] .tn-atom', // 1: Lilac (#d8c7e2)
    '[data-elem-id="1782997625349000006"] .tn-atom', // 2: Peach (#fcd2b7)
    '[data-elem-id="1782997625349000005"] .tn-atom', // 3: Buttercream (#fae6b1)
    '[data-elem-id="1782997625349000002"] .tn-atom', // 4: Blush Pink (#f7d3d3)
    '[data-elem-id="1782997625348000001"] .tn-atom', // 5: Powder Blue (#d1e2ec)
    '[data-elem-id="1782997625349000004"] .tn-atom'  // 6: Soft Sage/Stone (#d9d4d0)
  ];

  var TIMELESS_GRACE_OUTER_SELECTORS = [
    '[data-elem-id="1783247080484000002"]',
    '[data-elem-id="1783247205387000003"]',
    '[data-elem-id="1783247211384000004"]',
    '[data-elem-id="1783247215627000005"]',
    '[data-elem-id="1783247219418000006"]',
    '[data-elem-id="1783247222950000007"]'
  ];

  // Dolce Vita Dress Code Layout Auto-Spacing
  // Dynamically separates cursive dress code heading, secondary instruction, and scroll arrow to prevent collision
  function adjustDolceVitaDressCodeLayout() {
    var rec = document.getElementById('rec2442651093');
    if (!rec) return;

    var elHeading = rec.querySelector('[data-elem-id="1741427070967"]');
    var elSub = rec.querySelector('[data-elem-id="1741427070972"]');
    var elArrow = rec.querySelector('[data-elem-id="1741431382522"]');
    var artboard = rec.querySelector('.t396__artboard');
    var carrier = rec.querySelector('.t396__carrier');
    var filter = rec.querySelector('.t396__filter');

    if (!elHeading || !elSub) return;

    // Refine heading styling
    var headingAtom = elHeading.querySelector('.tn-atom') || elHeading;
    headingAtom.style.setProperty('font-size', 'clamp(28px, 6vw, 36px)', 'important');
    headingAtom.style.setProperty('line-height', '1.22', 'important');
    headingAtom.style.setProperty('text-align', 'center', 'important');
    headingAtom.style.setProperty('white-space', 'normal', 'important');
    headingAtom.style.setProperty('word-break', 'normal', 'important');
    elHeading.style.setProperty('top', '30px', 'important');

    // Subtitle / Note styling
    var subAtom = elSub.querySelector('.tn-atom') || elSub;
    subAtom.style.setProperty('text-align', 'center', 'important');
    subAtom.style.setProperty('line-height', '1.35', 'important');

    // Dynamic vertical separation
    var h1 = elHeading.offsetHeight || 80;
    var top2 = 30 + h1 + 18;
    elSub.style.setProperty('top', top2 + 'px', 'important');

    var h2 = elSub.offsetHeight || 45;
    var topArrow = top2 + h2 + 16;
    if (elArrow) {
      elArrow.style.setProperty('top', topArrow + 'px', 'important');
    }

    var totalH = topArrow + 40 + 20;
    if (artboard) artboard.style.setProperty('height', totalH + 'px', 'important');
    if (carrier) carrier.style.setProperty('height', totalH + 'px', 'important');
    if (filter) filter.style.setProperty('height', totalH + 'px', 'important');
  }

  function setupDressCodePaletteInteractivity(initialPalette) {
    var isTimeless = !!document.getElementById('rec2684633103') || !!document.querySelector('[data-elem-id="1782997625349000007"]');
    var isDolce = !isTimeless && !!document.querySelector('[data-elem-id="1741430557591"]');
    var activeSelectors = isTimeless
      ? TIMELESS_GRACE_PALETTE_SELECTORS
      : (isDolce ? DOLCE_VITA_PALETTE_SELECTORS : BLOSSOM_OUD_PALETTE_SELECTORS);
    var defaultPalette = isTimeless
      ? ['#d8c7e2', '#fcd2b7', '#fae6b1', '#f7d3d3', '#d1e2ec', '#d9d4d0']
      : (isDolce
          ? ['#faf1db', '#f5d9b1', '#f2cac9', '#afcff1', '#7ebbfa']
          : ['#60603b', '#360c1a', '#40312c', '#efdfcd']);

    var palette = (Array.isArray(initialPalette) && initialPalette.length >= activeSelectors.length)
      ? initialPalette.slice()
      : defaultPalette;

    // Force outer rings to be visible
    if (isTimeless) {
      TIMELESS_GRACE_OUTER_SELECTORS.forEach(function (sel) {
        var el = document.querySelector(sel);
        if (el) {
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('visibility', 'visible', 'important');
          el.classList.remove('t-animate_hidden');
        }
      });
    } else if (!isDolce) {
      var outerSelectors = [
        '[data-elem-id="1780767598424000007"]',
        '[data-elem-id="1780767598425000010"]',
        '[data-elem-id="1780767598425000013"]',
        '[data-elem-id="1780767598425000016"]'
      ];
      outerSelectors.forEach(function (sel) {
        var el = document.querySelector(sel);
        if (el) {
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('visibility', 'visible', 'important');
          el.classList.remove('t-animate_hidden');
        }
      });
    }

    activeSelectors.forEach(function (sel, idx) {
      var circleAtom = document.querySelector(sel);
      if (!circleAtom) return;

      var parentElem = circleAtom.closest('.tn-elem') || circleAtom;
      parentElem.style.setProperty('opacity', '1', 'important');
      parentElem.style.setProperty('visibility', 'visible', 'important');
      parentElem.classList.remove('t-animate_hidden');
      circleAtom.style.setProperty('opacity', '1', 'important');
      circleAtom.style.setProperty('visibility', 'visible', 'important');

      if (palette[idx]) {
        circleAtom.style.setProperty('background-color', palette[idx], 'important');
      }

      parentElem.style.cursor = 'pointer';
      parentElem.setAttribute('title', 'Click to change Color ' + (idx + 1));

      var colorInput = circleAtom.querySelector('input[type="color"]');
      if (!colorInput) {
        colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.style.position = 'absolute';
        colorInput.style.opacity = '0';
        colorInput.style.pointerEvents = 'none';
        colorInput.style.width = '1px';
        colorInput.style.height = '1px';
        circleAtom.appendChild(colorInput);

        circleAtom.addEventListener('mouseenter', function () {
          circleAtom.style.transform = 'scale(1.12)';
          circleAtom.style.transition = 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease';
          circleAtom.style.boxShadow = isTimeless
            ? '0 0 0 3px rgba(128, 107, 67, 0.45)'
            : (isDolce 
                ? '0 0 0 3px rgba(126, 187, 250, 0.5)'
                : '0 0 0 3px rgba(134, 103, 57, 0.45)');
        });

        circleAtom.addEventListener('mouseleave', function () {
          circleAtom.style.transform = 'scale(1)';
          circleAtom.style.boxShadow = 'none';
        });

        circleAtom.addEventListener('click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          try {
            window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'palette' }, '*');
          } catch (err) {}
          colorInput.click();
        });

        function handleColorChange(e) {
          var newColor = e.target.value;
          circleAtom.style.setProperty('background-color', newColor, 'important');
          try {
            window.parent.postMessage({
              type: 'WBG_UPDATE_PALETTE_COLOR',
              index: idx,
              color: newColor
            }, '*');
          } catch (err) {}
        }

        colorInput.addEventListener('input', handleColorChange);
        colorInput.addEventListener('change', handleColorChange);
      }

      if (palette[idx]) {
        try {
          if (palette[idx].startsWith('#') && (palette[idx].length === 7 || palette[idx].length === 4)) {
            colorInput.value = palette[idx].length === 4 
              ? ('#' + palette[idx][1] + palette[idx][1] + palette[idx][2] + palette[idx][2] + palette[idx][3] + palette[idx][3])
              : palette[idx];
          }
        } catch (e) {}
      }
    });
  }

  function setupDolceVitaGalleryControls() {
    var gallery = document.querySelector('#rec2442651103 .t1148__gallery');
    var slider = document.querySelector('#carousel_2442651103');
    if (!gallery || !slider) return;

    slider.style.scrollBehavior = 'smooth';
    slider.style.overflowX = 'auto';
    slider.style.webkitOverflowScrolling = 'touch';
    slider.style.cursor = 'grab';
    slider.style.userSelect = 'none';
    slider.style.webkitUserSelect = 'none';

    // Desktop mouse drag to scroll left/right
    if (!slider.__wbg_dragInit) {
      slider.__wbg_dragInit = true;
      var isDown = false;
      var startX = 0;
      var scrollStart = 0;

      slider.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollStart = slider.scrollLeft;
      });

      window.addEventListener('mouseup', function () {
        if (isDown) {
          isDown = false;
          slider.style.cursor = 'grab';
        }
      });

      slider.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - slider.offsetLeft;
        var walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollStart - walk;
      });
    }

    // Add navigation arrows if not present
    if (!gallery.querySelector('.wbg-slider-arrow-next')) {
      gallery.style.position = 'relative';

      var arrowStyle = 
        'position: absolute; top: 50%; transform: translateY(-50%); z-index: 30;' +
        'width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.08);' +
        'background: rgba(255, 255, 255, 0.95); box-shadow: 0 4px 14px rgba(0,0,0,0.18);' +
        'display: flex; align-items: center; justify-content: center; cursor: pointer;' +
        'color: #2c3e50; transition: all 0.2s ease; outline: none; padding: 0;';

      var prev = document.createElement('button');
      prev.className = 'wbg-slider-arrow wbg-slider-arrow-prev';
      prev.setAttribute('aria-label', 'Previous photo');
      prev.setAttribute('type', 'button');
      prev.style.cssText = arrowStyle + 'left: 10px;';
      prev.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';

      var next = document.createElement('button');
      next.className = 'wbg-slider-arrow wbg-slider-arrow-next';
      next.setAttribute('aria-label', 'Next photo');
      next.setAttribute('type', 'button');
      next.style.cssText = arrowStyle + 'right: 10px;';
      next.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

      function addHover(btn) {
        btn.addEventListener('mouseenter', function () {
          btn.style.transform = 'translateY(-50%) scale(1.1)';
          btn.style.background = '#ffffff';
          btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        });
        btn.addEventListener('mouseleave', function () {
          btn.style.transform = 'translateY(-50%) scale(1)';
          btn.style.background = 'rgba(255, 255, 255, 0.95)';
          btn.style.boxShadow = '0 4px 14px rgba(0,0,0,0.18)';
        });
      }
      addHover(prev);
      addHover(next);

      prev.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var step = Math.max(280, slider.clientWidth * 0.7);
        slider.scrollBy({ left: -step, behavior: 'smooth' });
      });

      next.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var step = Math.max(280, slider.clientWidth * 0.7);
        slider.scrollBy({ left: step, behavior: 'smooth' });
      });

      gallery.appendChild(prev);
      gallery.appendChild(next);
    }
  }

  // Load and apply saved customization from sessionStorage / localStorage
  function loadSavedCustomization() {
    try {
      var path = window.location.pathname || '';
      var clean = path.replace(/[\/\.]/g, '').replace('html', '').toLowerCase();
      var saved = sessionStorage.getItem('wbg_custom_' + clean) || 
                  sessionStorage.getItem('wbg_current_custom') ||
                  localStorage.getItem('wbg_custom_' + clean);
      if (saved) {
        var parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          if (clean.includes('dolce')) {
            delete parsed.photoUrl;
          }
          applyCustomization(parsed);
        }
      }
    } catch (e) {}
  }

  // Apply customization synchronously with immediate visual mutation
  function applyCustomization(data) {
    if (!data) return;

    if (tracked.partner1Nodes.length === 0 && tracked.coupleNodes.length === 0) {
      discoverElements();
    }

    var p1 = safeText(data.partner1);
    var p2 = safeText(data.partner2);
    var conn = safeText(data.connector) || '&';
    var fullName = '';

    if (p1 && p2) {
      fullName = p1 + ' ' + conn + ' ' + p2;
    } else {
      fullName = p1 || p2;
    }

    // 1. UPDATE PARTNER 1
    if (p1) {
      tracked.partner1Nodes.forEach(function (node) {
        try { node.innerText = p1; } catch (e) {}
      });

      if (lastApplied.partner1 && lastApplied.partner1 !== p1) {
        document.querySelectorAll('.tn-atom').forEach(function (atom) {
          if (atom.innerText.trim() === lastApplied.partner1) {
            atom.innerText = p1;
            if (tracked.partner1Nodes.indexOf(atom) === -1) tracked.partner1Nodes.push(atom);
          }
        });
      }
    }

    // 2. UPDATE PARTNER 2
    if (p2) {
      tracked.partner2Nodes.forEach(function (node) {
        try { node.innerText = p2; } catch (e) {}
      });

      if (lastApplied.partner2 && lastApplied.partner2 !== p2) {
        document.querySelectorAll('.tn-atom').forEach(function (atom) {
          if (atom.innerText.trim() === lastApplied.partner2) {
            atom.innerText = p2;
            if (tracked.partner2Nodes.indexOf(atom) === -1) tracked.partner2Nodes.push(atom);
          }
        });
      }
    }

    // 3. UPDATE CONNECTOR
    if (conn) {
      tracked.connectorNodes.forEach(function (node) {
        try {
          node.innerText = conn === '&' ? '&' : (conn === 'and' ? 'and' : conn);
        } catch (e) {}
      });
    }

    // Always keep Blossom & Oud standalone connector hidden
    var boConnEl = document.querySelector(SPECIFIC_SELECTORS.blossomOudConnector);
    if (boConnEl) {
      var boParentEl = boConnEl.closest('.tn-elem') || boConnEl;
      boParentEl.style.setProperty('display', 'none', 'important');
    }

    // 4. UPDATE MULTILINE COUPLE
    if (p1 || p2) {
      tracked.multilineCoupleNodes.forEach(function (node) {
        try {
          node.style.setProperty('line-height', '1.12', 'important');
          node.style.setProperty('display', 'block', 'important');
          if (node.closest("[data-artboard-recid='2443433723']")) {
            node.style.setProperty('transform', 'translateY(-14px)', 'important');
          }
          if (p1 && p2) {
            node.innerHTML = 
              '<div style="line-height: 1.12; margin-bottom: 4px; font-size: inherit; font-family: inherit;">' + p1 + '</div>' +
              (conn ? '<div style="font-size: 26px; line-height: 1; margin: 3px 0 5px 0; opacity: 0.85; font-family: inherit;">' + (conn === '&' ? '&amp;' : conn) + '</div>' : '') +
              '<div style="line-height: 1.12; font-size: inherit; font-family: inherit;">' + p2 + '</div>';
          } else {
            node.innerHTML = '<div style="line-height: 1.12;">' + (p1 || p2) + '</div>';
          }
        } catch (e) {}
      });

      // 5. UPDATE SINGLE-LINE COUPLE
      tracked.coupleNodes.forEach(function (node) {
        try {
          if (node.classList.contains('pl-cap-names') || node.classList.contains('pp-nm') || node.classList.contains('std-names')) {
            node.innerHTML = p1 + ' <span class="amp">&amp;</span> ' + p2;
          } else {
            var curr = node.innerText || '';
            if (curr.includes('are getting married!')) {
              node.innerText = fullName + ' are getting married!';
            } else if (curr.includes('Hope to see you there')) {
              node.innerText = 'Hope to see you there!\n' + fullName;
            } else {
              node.innerText = fullName;
            }
          }
        } catch (e) {}
      });

      if (lastApplied.fullName && lastApplied.fullName !== fullName) {
        document.querySelectorAll('.tn-atom').forEach(function (atom) {
          if (atom.innerText.includes(lastApplied.fullName)) {
            atom.innerText = atom.innerText.replace(lastApplied.fullName, fullName);
          }
        });
      }
    }

    // 5b. UPDATE WAX SEAL / MONOGRAM
    updateWaxSealMonograms(data.initials, data.connector || conn, p1, p2);

    // Update Timeless Grace Hero Screen
    updateTimelessGraceHero(p1, p2, conn, data.ceremonyTitle);

    // 6. UPDATE DATE
    if (data.dateText) {
      var shortDate = formatDateShort(data.dateInput) || data.dateText;
      tracked.dateNodes.forEach(function (node) {
        try {
          var t = node.innerText.trim();
          if (/\b\d{2}\.\d{2}\.\d{2,4}\b/.test(t)) {
            node.innerText = shortDate;
          } else if (t.includes('|')) {
            node.innerText = shortDate + ' ' + t.substring(t.indexOf('|'));
          } else {
            node.innerText = data.dateText;
          }
        } catch (e) {}
      });

      // Save the Date SPA templates
      var stdDateElem = document.querySelector(SPECIFIC_SELECTORS.stdDate);
      if (stdDateElem) stdDateElem.innerText = data.dateText;

      var plRevDate = document.querySelector(SPECIFIC_SELECTORS.polaroidDate);
      if (plRevDate) {
        plRevDate.innerText = data.dateText;
      }

      // Petal Promise Canvas date
      window.__wbg_petal_date = data.dateText;
      if (typeof window.__wbg_redrawPetals === 'function') {
        try { window.__wbg_redrawPetals(); } catch (e) {}
      }

      // Dolce Vita scratch tiles
      if (tracked.dolceVitaTiles.day || tracked.dolceVitaTiles.month || tracked.dolceVitaTiles.year) {
        try {
          var dObj = data.dateInput ? new Date(data.dateInput) : new Date(data.dateText);
          if (!isNaN(dObj.getTime())) {
            var dayNum = dObj.getDate();
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var monthStr = monthNames[dObj.getMonth()];
            var yearNum = dObj.getFullYear();
            if (tracked.dolceVitaTiles.day) tracked.dolceVitaTiles.day.innerText = String(dayNum);
            if (tracked.dolceVitaTiles.month) tracked.dolceVitaTiles.month.innerText = monthStr;
            if (tracked.dolceVitaTiles.year) tracked.dolceVitaTiles.year.innerText = String(yearNum);
          }
        } catch (e) {}
      }
    }

    // 7. RECALCULATE LIVE COUNTDOWN TIMER
    if (data.targetDate) {
      if (window.__wbg_origCountdownInterval) {
        clearInterval(window.__wbg_origCountdownInterval);
      }
      targetDateObj = new Date(data.targetDate);
      startCountdownTicker();
    }

    // 8. UPDATE VENUE & ADDRESS
    if (data.venueName) {
      tracked.venueNodes.forEach(function (node) {
        try { node.innerText = data.venueName; } catch (e) {}
      });
      document.querySelectorAll('.std-venue, .std-loc, .pl-rev-venue, .pp-lc').forEach(function (el) {
        el.innerText = data.venueName;
      });
    }

    if (data.venueAddress) {
      tracked.addressNodes.forEach(function (node) {
        try { node.innerText = 'Address: ' + data.venueAddress; } catch (e) {}
      });
    }

    // Update Timeless Grace Location Block
    if (data.venueName || data.venueAddress) {
      updateTimelessGraceLocation(data.venueName, data.venueAddress);
    }

    // 8b. UPDATE GOOGLE MAPS EMBED & DIRECTIONS LINK
    var rawMapUrl = data.mapUrl ? String(data.mapUrl).trim() : '';
    var embedSrc = '';

    // Priority 1: explicitly provided embed URL (e.g. from server resolver)
    if (data.mapEmbedUrl) {
      embedSrc = data.mapEmbedUrl;
    } else if (rawMapUrl && rawMapUrl.includes('google.com/maps/embed')) {
      embedSrc = rawMapUrl;
    } else if (rawMapUrl) {
      // Priority 2: Extract coordinates if present in URL
      var coordMatch = rawMapUrl.match(/search\/(-?\d+\.\d+),\+?(-?\d+\.\d+)/) ||
                       rawMapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) ||
                       rawMapUrl.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        embedSrc = 'https://maps.google.com/maps?q=' + coordMatch[1] + ',' + coordMatch[2] + '&output=embed';
      } else {
        var placeMatch = rawMapUrl.match(/\/place\/([^/@?]+)/);
        if (placeMatch) {
          try {
            embedSrc = 'https://maps.google.com/maps?q=' + placeMatch[1] + '&output=embed';
          } catch (e) {}
        }
      }
    }

    // Priority 3: Fall back to venue address or venue name
    if (!embedSrc && (data.venueAddress || data.venueName)) {
      var mapQuery = (data.venueAddress || data.venueName || '').trim();
      embedSrc = 'https://maps.google.com/maps?q=' + encodeURIComponent(mapQuery) + '&output=embed';
    }

    if (embedSrc) {
      var mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
      mapIframes.forEach(function (ifr) {
        if (!ifr.src || ifr.src !== embedSrc) {
          ifr.src = embedSrc;
        }
      });
    }

    // Direction links on button & map
    var directionsLink = rawMapUrl || (data.venueAddress ? ('https://maps.google.com/?q=' + encodeURIComponent(data.venueAddress)) : '');
    if (directionsLink) {
      var mapHeaders = [
        document.querySelector(SPECIFIC_SELECTORS.blossomOudMapHeader),
        document.querySelector("[data-elem-id='1710614957366']"),
        document.querySelector("[data-elem-id='1779544773135']")
      ];
      mapHeaders.forEach(function (el) {
        if (!el) return;
        el.style.cursor = 'pointer';
        el.setAttribute('title', 'Open in Google Maps');
        el.onclick = function (e) {
          e.stopPropagation();
          window.open(directionsLink, '_blank');
        };
      });
    }

    // 8c. UPDATE DRESS CODE COLOR PALETTE
    var palette = (data.colorPalette && Array.isArray(data.colorPalette)) ? data.colorPalette : null;
    if (palette) {
      var isTimeless = !!document.getElementById('rec2684633103') || !!document.querySelector('[data-elem-id="1782997625349000007"]');
      var isDolce = !isTimeless && !!document.querySelector('[data-elem-id="1741430557591"]');
      var activeSelectors = isTimeless 
        ? TIMELESS_GRACE_PALETTE_SELECTORS 
        : (isDolce ? DOLCE_VITA_PALETTE_SELECTORS : BLOSSOM_OUD_PALETTE_SELECTORS);
      activeSelectors.forEach(function (sel, idx) {
        if (palette[idx]) {
          var circleAtom = document.querySelector(sel);
          if (circleAtom) {
            circleAtom.style.setProperty('background-color', palette[idx], 'important');
          }
        }
      });
    }
    setupDressCodePaletteInteractivity(palette);

    // 9a. UPDATE COUPLE PHOTO (Main Portrait for templates that support it, NOT Dolce Vita)
    var isDolce = !!document.querySelector('#carousel_2442651103') || !!document.querySelector('#rec2442651083') || (window.location.pathname.includes('dolce'));
    if (data.photoUrl && !isDolce) {
      // Captured Love polaroid photo
      var plImg = document.getElementById('plImg');
      if (plImg) {
        plImg.src = data.photoUrl;
      }

      // Other templates with dedicated couple images
      if (tracked.photoNodes && tracked.photoNodes.length > 0) {
        tracked.photoNodes.forEach(function (img) {
          try {
            img.src = data.photoUrl;
            img.setAttribute('data-original', data.photoUrl);
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.objectFit = 'cover';
          } catch (e) {}
        });
      }
    }

    // 9b. UPDATE DRESS CODE & GALLERY PHOTOS (Carousel slider)
    if (data.galleryPhotos && Array.isArray(data.galleryPhotos)) {
      var carousel = document.querySelector('#carousel_2442651103') ||
                     document.querySelector('#rec2442651103 .t1148__slider');
      if (carousel) {
        var items = Array.from(carousel.querySelectorAll('.t1148__item'));
        // If user added more photos than existing DOM items, clone the last item
        while (items.length < data.galleryPhotos.length && items.length > 0) {
          var clone = items[items.length - 1].cloneNode(true);
          carousel.appendChild(clone);
          items.push(clone);
        }

        data.galleryPhotos.forEach(function (url, idx) {
          if (items[idx]) {
            items[idx].style.display = '';
            var img = items[idx].querySelector('img');
            if (img) {
              img.src = url;
              img.setAttribute('data-original', url);
              img.style.objectFit = 'cover';
            }
            items[idx].setAttribute('aria-label', (idx + 1) + ' of ' + data.galleryPhotos.length);
          }
        });

        // Hide any remaining DOM items if galleryPhotos has fewer items
        for (var j = data.galleryPhotos.length; j < items.length; j++) {
          items[j].style.display = 'none';
        }

        setupDolceVitaGalleryControls();
      }
    }

    // 9c. UPDATE BOTTOM PHOTO (Dolce Vita)
    if (data.bottomPhotoUrl !== undefined) {
      var bottomAtom = tracked.bottomPhotoNode ||
                       document.querySelector("#rec2442651163 [data-elem-id='1776926930895000002'] .tn-atom") ||
                       document.querySelector("[data-elem-id='1776926930895000002'] .tn-atom");
      var bottomContainer = document.querySelector("#rec2442651163 [data-elem-id='1776926930895000002']") ||
                            document.querySelector("[data-elem-id='1776926930895000002']");
      var gradientOverlay = document.querySelector("#rec2442651163 [data-elem-id='1776926930895000003']") ||
                            document.querySelector("[data-elem-id='1776926930895000003']");
      var bottomArtboard = document.querySelector("#rec2442651163 .t396__artboard");

      if (data.bottomPhotoUrl) {
        if (bottomAtom) {
          bottomAtom.style.setProperty('background-image', 'url("' + data.bottomPhotoUrl + '")', 'important');
          bottomAtom.style.setProperty('background-size', 'cover', 'important');
          bottomAtom.style.setProperty('background-position', 'center center', 'important');
          bottomAtom.setAttribute('data-original', data.bottomPhotoUrl);
        }
        if (bottomContainer) {
          bottomContainer.style.setProperty('display', '', 'important');
        }
        if (gradientOverlay) {
          gradientOverlay.style.setProperty('display', '', 'important');
        }
        if (bottomArtboard) {
          bottomArtboard.style.setProperty('height', '669px', 'important');
        }
      } else {
        if (bottomContainer) {
          bottomContainer.style.setProperty('display', 'none', 'important');
        }
        if (gradientOverlay) {
          gradientOverlay.style.setProperty('display', 'none', 'important');
        }
        if (bottomArtboard) {
          bottomArtboard.style.setProperty('height', '230px', 'important');
        }
      }
    }

    // 9d. UPDATE SCROLL ARROW DESIGN (Dolce Vita Built-in Arrow & Global Arrow)
    if (data.scrollArrowDesign !== undefined) {
      var arrowAtom = document.querySelector("#rec2442651093 [data-elem-id='1741431382522'] .tn-atom") ||
                      document.querySelector("[data-elem-id='1741431382522'] .tn-atom");
      var arrowParent = document.querySelector("#rec2442651093 [data-elem-id='1741431382522']") ||
                        document.querySelector("[data-elem-id='1741431382522']");
      if (arrowAtom && arrowParent) {
        if (data.scrollArrowDesign === 'clean-none' || data.scrollArrowDesign === 'none') {
          arrowParent.style.setProperty('display', 'none', 'important');
        } else {
          arrowParent.style.setProperty('display', 'block', 'important');
          var arrowHtml = renderScrollGalleryHeader(data.scrollArrowDesign, 'scroll', '#cebb78');
          arrowAtom.innerHTML = arrowHtml;
          arrowAtom.style.overflow = 'visible';
          arrowAtom.style.whiteSpace = 'nowrap';
        }
      }

      var dolceArrowEl = document.querySelector("#rec2442651093 [data-elem-id='1741431382522']");
      if (dolceArrowEl && !dolceArrowEl._wbgArrowSetup) {
        dolceArrowEl._wbgArrowSetup = true;
        dolceArrowEl.style.cursor = 'pointer';
        dolceArrowEl.addEventListener('click', function (e) {
          e.stopPropagation();
          selectElement(dolceArrowEl, '1741431382522', 'arrow');
          try {
            window.parent.postMessage({
              type: 'WBG_ARROW_SELECTED',
              arrowId: '1741431382522',
              style: data.scrollArrowDesign || 'scroll-classic'
            }, '*');
          } catch (err) {}
        });
      }
    }

    // 10. UPDATE WELCOME MESSAGE
    if (data.welcomeMessage) {
      var tgWelcome = document.querySelector("[field='tn_text_1782990616505000011']");
      if (tgWelcome) tgWelcome.innerText = data.welcomeMessage;

      document.querySelectorAll('.tn-atom').forEach(function (atom) {
        if (atom.getAttribute('field') === 'tn_text_1782990740288000012') return;
        var raw = (atom.innerText || '').trim();
        if (raw === 'Dear Friends and Family' || raw === 'DEAR FAMILY AND FRIENDS') return;

        if (
          raw.includes('Join us for an evening') ||
          raw.includes('unforgettable memories') ||
          raw.includes('as we begin our forever') ||
          raw.includes('Together with our families') ||
          raw.includes('pleasure of your company') ||
          raw.includes('as we get ready to say') ||
          (lastApplied.welcomeMessage && raw.includes(lastApplied.welcomeMessage))
        ) {
          atom.innerText = data.welcomeMessage;
        }
      });
    }

    // 11. UPDATE DRESS CODE
    if (data.dressCode) {
      tracked.dressCodeNodes.forEach(function (node) {
        try { node.innerText = data.dressCode; } catch (e) {}
      });
      document.querySelectorAll('.tn-atom').forEach(function (atom) {
        var raw = (atom.innerText || '').toLowerCase();
        if (raw.includes('dress code') && raw.length > 20) {
          atom.innerText = data.dressCode;
        }
      });
    }
    adjustDolceVitaDressCodeLayout();

    // 12. UPDATE GIFT PREFERENCE
    if (data.giftPreference) {
      tracked.giftNodes.forEach(function (node) {
        try { node.innerText = data.giftPreference; } catch (e) {}
      });
    }

    // 13. UPDATE WORDING & CUSTOM TEXTS
    // Envelope Button
    if (data.envelopeText) {
      var envBtn = document.querySelector(SPECIFIC_SELECTORS.blossomOudEnvelopeBtn);
      if (envBtn) envBtn.innerText = data.envelopeText;
    }

    // Cover Subtitle
    if (data.coverSubtitle || data.timeInput) {
      var subElem = document.querySelector(SPECIFIC_SELECTORS.blossomOudSubtitle);
      if (subElem) {
        subElem.innerText = data.coverSubtitle || ('à partir de ' + (data.timeInput || '16h'));
      }
    }

    // Arabic Formal Invitation Text
    var arabicElem = document.querySelector(SPECIFIC_SELECTORS.blossomOudArabicText);
    if (arabicElem) {
      if (data.invitationText) {
        arabicElem.innerHTML = data.invitationText.replace(/\n/g, '<br />');
      } else if (p1 || p2 || data.dateText) {
        arabicElem.innerHTML = 
          'الآنسة ' + (p1 || 'أميرة') + ' والسيد ' + (p2 || 'يوسف') + '<br /><br />' +
          'يسعدهما ويشرفهما أن يدعوا حضرتكم الكريمة<br />' +
          'لمشاركتهما فرحة حفل زفافهما<br /><br />' +
          'وذلك بمشيئة الله تعالى ' + (data.dateText ? data.dateText : 'يوم السبت 20 ماي 2027') + '<br />' +
          (data.timeInput ? 'على الساعة ' + data.timeInput : 'على الساعة الرابعة مساءً') + '<br /><br />' +
          'بقاعة <br /><br />';
      }
    }

    // Countdown Title
    if (data.countdownTitle) {
      var cdHeader = document.querySelector(SPECIFIC_SELECTORS.blossomOudCountdownHeader);
      if (cdHeader) cdHeader.innerText = data.countdownTitle;
    }

    // Timeline Title
    if (data.timelineTitle) {
      var tlHeader = document.querySelector(SPECIFIC_SELECTORS.blossomOudTimelineHeader);
      if (tlHeader) tlHeader.innerText = data.timelineTitle;
    }

    // Location Title
    if (data.locationTitle) {
      var locHeader = document.querySelector(SPECIFIC_SELECTORS.blossomOudLocationHeader);
      if (locHeader) locHeader.innerText = data.locationTitle;
    }

    // Map Header Title
    if (data.mapTitle) {
      var mHeader = document.querySelector(SPECIFIC_SELECTORS.blossomOudMapHeader);
      if (mHeader) mHeader.innerText = data.mapTitle;
    }

    // RSVP Header Title
    if (data.rsvpTitle) {
      var rsvpHeader = document.querySelector(SPECIFIC_SELECTORS.blossomOudRsvpHeader);
      if (rsvpHeader) rsvpHeader.innerText = data.rsvpTitle;
    }

    // Closing Text
    if (data.closingText) {
      var closingElem = document.querySelector(SPECIFIC_SELECTORS.blossomOudClosingText);
      if (closingElem) closingElem.innerText = data.closingText;
    }

    // 14. TIMELESS GRACE SPECIFIC TEXT UPDATES
    function centerTgElem(atom) {
      if (!atom) return;
      var elem = atom.closest('.tn-elem');
      if (elem) {
        elem.style.setProperty('left', '50%', 'important');
        elem.style.setProperty('transform', 'translateX(-50%)', 'important');
        elem.style.setProperty('text-align', 'center', 'important');
        elem.style.setProperty('width', 'max-content', 'important');
        elem.style.setProperty('max-width', '88%', 'important');
      }
    }

    if (data.ceremonyTitle !== undefined) {
      var tgTitle = document.querySelector("#rec2684632503 [data-elem-id='1782990313526000001'] .tn-atom") ||
                    document.querySelector("[field='tn_text_1782990313526000001']");
      if (tgTitle) {
        tgTitle.innerHTML = data.ceremonyTitle.replace(/\n/g, '<br />');
        tgTitle.style.setProperty('white-space', 'normal', 'important');
        tgTitle.style.setProperty('text-align', 'center', 'important');
        centerTgElem(tgTitle);
      }
    }

    if (data.groomParents !== undefined) {
      var tgGP = document.querySelector("[data-elem-id='1782990453976000005'] .tn-atom") ||
                 document.querySelector("[field='tn_text_1782990453976000005']");
      if (tgGP) {
        tgGP.innerText = data.groomParents;
        centerTgElem(tgGP);
      }
    }

    if (data.groomParentsSubtitle !== undefined) {
      var tgGPSub = document.querySelector("[data-elem-id='1782990435802000004'] .tn-atom") ||
                    document.querySelector("[field='tn_text_1782990435802000004']");
      if (tgGPSub) {
        tgGPSub.innerText = data.groomParentsSubtitle;
        centerTgElem(tgGPSub);
      }
    }

    if (data.brideParents !== undefined) {
      var tgBP = document.querySelector("[data-elem-id='1782990570479000008'] .tn-atom") ||
                 document.querySelector("[field='tn_text_1782990570479000008']");
      if (tgBP) {
        tgBP.innerText = data.brideParents;
        centerTgElem(tgBP);
      }
    }

    if (data.brideParentsSubtitle !== undefined) {
      var tgBPSub = document.querySelector("[data-elem-id='1782990570479000009'] .tn-atom") ||
                    document.querySelector("[field='tn_text_1782990570479000009']");
      if (tgBPSub) {
        tgBPSub.innerText = data.brideParentsSubtitle;
        centerTgElem(tgBPSub);
      }
    }

    if (data.salutation !== undefined) {
      var tgSal = document.querySelector("#rec2684632503 [data-elem-id='1782990740288000012'] .tn-atom") ||
                  document.querySelector("#rec2684632503 [field='tn_text_1782990740288000012']");
      if (tgSal) {
        tgSal.innerText = data.salutation;
        centerTgElem(tgSal);
      }
    }

    if (data.welcomeMessage !== undefined) {
      var tgWelcome = document.querySelector("[data-elem-id='1782990616505000011'] .tn-atom") ||
                      document.querySelector("[field='tn_text_1782990616505000011']");
      if (tgWelcome) {
        tgWelcome.innerHTML = data.welcomeMessage.replace(/\n/g, '<br />');
        tgWelcome.style.setProperty('white-space', 'normal', 'important');
        tgWelcome.style.setProperty('text-align', 'center', 'important');
        var tgWelElem = tgWelcome.closest('.tn-elem');
        if (tgWelElem) {
          tgWelElem.style.setProperty('left', '50%', 'important');
          tgWelElem.style.setProperty('transform', 'translateX(-50%)', 'important');
          tgWelElem.style.setProperty('text-align', 'center', 'important');
          tgWelElem.style.setProperty('width', 'min(320px, 82%)', 'important');
          tgWelElem.style.setProperty('max-width', '85%', 'important');
        }
      }
    }

    if (data.quranVerse !== undefined) {
      var tgVerse = document.querySelector("[data-elem-id='1783290377990000001'] .tn-atom") ||
                    document.querySelector("[field='tn_text_1783290377990000001']") ||
                    document.querySelector("[data-elem-id='1782990287805'] .tn-atom");
      if (tgVerse) {
        tgVerse.innerHTML = data.quranVerse.replace(/\n/g, '<br />');
        tgVerse.style.setProperty('white-space', 'normal', 'important');
        tgVerse.style.setProperty('text-align', 'center', 'important');
        centerTgElem(tgVerse);
      }
    }

    if (data.quranRef !== undefined) {
      var tgRef = document.querySelector("[data-elem-id='1783290435575000002'] .tn-atom") ||
                  document.querySelector("[field='tn_text_1783290435575000002']");
      if (tgRef) {
        tgRef.innerText = data.quranRef;
        centerTgElem(tgRef);
      }
    }

    if (data.dressCode !== undefined) {
      var tgAttire = document.querySelector("#rec2684633103 [data-elem-id='1783246802492000001'] .tn-atom") ||
                     document.querySelector("[field='tn_text_1783246802492000001']");
      if (tgAttire) {
        tgAttire.innerText = data.dressCode;
        centerTgElem(tgAttire);
      }
    }

    if (data.dressCodeSubtitle !== undefined) {
      var tgAttireSub = document.querySelector("[data-elem-id='1783246870761000002'] .tn-atom") ||
                        document.querySelector("[field='tn_text_1783246870761000002']");
      if (tgAttireSub) {
        tgAttireSub.innerText = data.dressCodeSubtitle;
        centerTgElem(tgAttireSub);
      }
    }

    if (data.dressCodeNote !== undefined) {
      var tgNote = document.querySelector("[data-elem-id='1782997572531000001'] .tn-atom") ||
                   document.querySelector("[field='tn_text_1782997572531000001']");
      if (tgNote) {
        tgNote.innerHTML = data.dressCodeNote.replace(/\n/g, '<br />');
        tgNote.style.setProperty('white-space', 'normal', 'important');
        tgNote.style.setProperty('text-align', 'center', 'important');
        var tgNoteElem = tgNote.closest('.tn-elem');
        if (tgNoteElem) {
          tgNoteElem.style.setProperty('left', '50%', 'important');
          tgNoteElem.style.setProperty('transform', 'translateX(-50%)', 'important');
          tgNoteElem.style.setProperty('text-align', 'center', 'important');
          tgNoteElem.style.setProperty('width', 'min(380px, 88%)', 'important');
          tgNoteElem.style.setProperty('max-width', '90%', 'important');
        }
      }
    }

    if (data.rsvpDeadlineMessage !== undefined) {
      var tgRsvpMsg = document.querySelector("[data-elem-id='1785227556011000003'] .tn-atom") ||
                      document.querySelector("[field='tn_text_1784905898051000001']");
      if (tgRsvpMsg) tgRsvpMsg.innerText = data.rsvpDeadlineMessage;
    }

    if (data.rsvpTitle !== undefined) {
      var tgRsvpTitle = document.querySelector("#rec2684633403 [data-elem-id='1688561179508'] .tn-atom") ||
                        document.querySelector("#rec2684633403 [field='tn_text_1688561179508']");
      if (tgRsvpTitle) tgRsvpTitle.innerText = data.rsvpTitle;
    }

    if (data.closingText !== undefined) {
      var tgClosing = document.querySelector("[data-elem-id='1785086272369'] .tn-atom") ||
                      document.querySelector("[field='tn_text_1783006367834000001']");
      if (tgClosing) {
        tgClosing.innerHTML = data.closingText.replace(/\n/g, '<br />');
        tgClosing.style.setProperty('white-space', 'normal', 'important');
        tgClosing.style.setProperty('text-align', 'center', 'important');
      }
    }

    // RSVP Form Labels & Button
    var rsvpForm = document.querySelector(SPECIFIC_SELECTORS.blossomOudRsvpForm);
    if (rsvpForm) {
      if (data.rsvpButtonText) {
        var submitBtn = rsvpForm.querySelector('.t-submit, button[type="submit"], .t-btn');
        if (submitBtn) submitBtn.innerText = data.rsvpButtonText;
      }
      var titles = rsvpForm.querySelectorAll('.t-input-title');
      if (titles.length >= 1 && data.rsvpNameLabel) titles[0].innerText = data.rsvpNameLabel;
      if (titles.length >= 2 && data.rsvpCountLabel) titles[1].innerText = data.rsvpCountLabel;
      if (titles.length >= 3 && data.rsvpAttendLabel) titles[2].innerText = data.rsvpAttendLabel;

      var radios = rsvpForm.querySelectorAll('.t-radio__control');
      if (radios.length >= 1 && data.rsvpYesLabel) {
        var txtSpan1 = radios[0].querySelector('.t-radio__text') || radios[0];
        txtSpan1.innerText = data.rsvpYesLabel;
      }
      if (radios.length >= 2 && data.rsvpNoLabel) {
        var txtSpan2 = radios[1].querySelector('.t-radio__text') || radios[1];
        txtSpan2.innerText = data.rsvpNoLabel;
      }
    }

    // 15. DESTINATION LOVE SPECIFIC UPDATES
    if (p1 || p2) {
      var destPass = document.querySelector("[data-elem-id='1741107633653'] .tn-atom") ||
                     document.querySelector("[field='tn_text_1741107633653']");
      if (destPass && (!data.textOverrides || !data.textOverrides['1741107633653'])) {
        destPass.innerText = (p1 || 'Elisabeth') + ' and ' + (p2 || 'Marcus');
      }
      var destTopNames = document.querySelector("[data-elem-id='1739457970056'] .tn-atom");
      if (destTopNames && (!data.textOverrides || !data.textOverrides['1739457970056'])) {
        destTopNames.innerText = (p1 || 'Elisabeth') + ' & ' + (p2 || 'Marcus');
      }
      var destEndNames = document.querySelector("[data-elem-id='1705236303923'] .tn-atom");
      if (destEndNames && (!data.textOverrides || !data.textOverrides['1705236303923'])) {
        destEndNames.innerText = (p1 || 'Elisabeth') + ' and ' + (p2 || 'Marcus');
      }
      var destMono = document.querySelector("[data-elem-id='1741107633684'] .tn-atom");
      if (destMono && (!data.textOverrides || !data.textOverrides['1741107633684'])) {
        var m1 = p1 ? p1.charAt(0).toUpperCase() : 'E';
        var m2 = p2 ? p2.charAt(0).toUpperCase() : 'M';
        destMono.innerText = m1 + ' + ' + m2;
      }
    }
    if (data.dateText) {
      var destDate1 = document.querySelector("[data-elem-id='1741107633658'] .tn-atom");
      if (destDate1 && (!data.textOverrides || !data.textOverrides['1741107633658'])) {
        destDate1.innerText = data.dateText;
      }
      var destBadge = document.querySelector("[data-elem-id='1739457970065'] .tn-atom");
      if (destBadge && (!data.textOverrides || !data.textOverrides['1739457970065'])) {
        destBadge.innerText = formatDateShort(data.dateText || data.dateInput) + ' | ' + (data.venueAddress || data.venueName || 'Mexico');
      }
    }
    if (data.venueName) {
      var destPassVenue = document.querySelector("[data-elem-id='1741107633670'] .tn-atom");
      if (destPassVenue && (!data.textOverrides || !data.textOverrides['1741107633670'])) {
        destPassVenue.innerText = data.venueName;
      }
      var destVenueBlock = document.querySelector("[data-elem-id='1739461934117'] .tn-atom");
      if (destVenueBlock && (!data.textOverrides || !data.textOverrides['1739461934117'])) {
        destVenueBlock.innerText = data.venueName;
      }
      var destCity = document.querySelector("[data-elem-id='1739457970068'] .tn-atom");
      if (destCity && (!data.textOverrides || !data.textOverrides['1739457970068'])) {
        destCity.innerText = data.venueName;
      }
    }
    if (data.venueAddress) {
      var destAddrBlock = document.querySelector("[data-elem-id='1739461934122'] .tn-atom");
      if (destAddrBlock && (!data.textOverrides || !data.textOverrides['1739461934122'])) {
        destAddrBlock.innerText = 'Address: ' + data.venueAddress;
      }
    }
    if (data.welcomeMessage) {
      var destWelcome = document.querySelector("[data-elem-id='1739457970066'] .tn-atom");
      if (destWelcome && (!data.textOverrides || !data.textOverrides['1739457970066'])) {
        destWelcome.innerText = data.welcomeMessage;
      }
    }
    if (data.closingText) {
      var destClosing = document.querySelector("[data-elem-id='1705236303918'] .tn-atom");
      if (destClosing && (!data.textOverrides || !data.textOverrides['1705236303918'])) {
        destClosing.innerText = data.closingText;
      }
    }

    // 16. UNIVERSAL TEXT OVERRIDES (Applied on top of all defaults)
    if (data.textOverrides && typeof data.textOverrides === 'object') {
      Object.keys(data.textOverrides).forEach(function (id) {
        var txt = data.textOverrides[id];
        if (txt === undefined || txt === null) return;
        var el = document.querySelector("[data-elem-id='" + id + "'] .tn-atom") ||
                 document.querySelector("[field='" + id + "']") ||
                 document.querySelector("[data-elem-id='" + id + "']") ||
                 document.getElementById(id);
        if (el) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.value = txt;
          } else {
            el.innerHTML = String(txt).replace(/\n/g, '<br />');
          }
        }
      });
    }

    // 17. UNIVERSAL IMAGE OVERRIDES (Applied on top of all defaults)
    if (data.imageOverrides && typeof data.imageOverrides === 'object') {
      Object.keys(data.imageOverrides).forEach(function (id) {
        var src = data.imageOverrides[id];
        if (!src) return;
        var candidates = [
          document.querySelector("[data-elem-id='" + id + "'] img"),
          document.querySelector("img[data-elem-id='" + id + "']"),
          document.querySelector("[imgfield='" + id + "']"),
          document.querySelector("[data-elem-id='" + id + "'] .tn-atom"),
          document.querySelector("[data-elem-id='" + id + "']"),
          document.getElementById(id)
        ].filter(Boolean);

        if (candidates.length > 0) {
          var targetEl = candidates[0];
          if (targetEl.tagName === 'IMG') {
            targetEl.src = src;
            targetEl.setAttribute('data-original', src);
            targetEl.style.objectFit = 'cover';
          } else {
            var subImg = targetEl.querySelector('img');
            if (subImg) {
              subImg.src = src;
              subImg.setAttribute('data-original', src);
              subImg.style.objectFit = 'cover';
            } else {
              targetEl.style.setProperty('background-image', 'url("' + src + '")', 'important');
              targetEl.style.setProperty('background-size', 'cover', 'important');
            }
          }
        }
      });
    }

    // 18. UNIVERSAL STYLE OVERRIDES (Typography, font size, color, letter-spacing)
    if (data.styleOverrides && typeof data.styleOverrides === 'object') {
      Object.keys(data.styleOverrides).forEach(function (id) {
        var st = data.styleOverrides[id];
        if (!st || typeof st !== 'object') return;
        var el = document.querySelector("[data-elem-id='" + id + "'] .tn-atom") ||
                 document.querySelector("[field='" + id + "']") ||
                 document.querySelector("[data-elem-id='" + id + "']") ||
                 document.getElementById(id);
        if (el) {
          if (st.fontSize !== undefined) el.style.setProperty('font-size', (typeof st.fontSize === 'number' ? st.fontSize + 'px' : st.fontSize), 'important');
          if (st.color) el.style.setProperty('color', st.color, 'important');
          if (st.fontFamily) el.style.setProperty('font-family', st.fontFamily, 'important');
          if (st.letterSpacing !== undefined) el.style.setProperty('letter-spacing', (typeof st.letterSpacing === 'number' ? st.letterSpacing + 'px' : st.letterSpacing), 'important');
          if (st.lineHeight) el.style.setProperty('line-height', st.lineHeight, 'important');
          if (st.fontWeight) el.style.setProperty('font-weight', st.fontWeight, 'important');
          if (st.fontStyle) el.style.setProperty('font-style', st.fontStyle, 'important');
          if (st.textTransform) el.style.setProperty('text-transform', st.textTransform, 'important');
          if (st.textAlign) el.style.setProperty('text-align', st.textAlign, 'important');
          if (st.width !== undefined) {
            var wEl = el.classList.contains('tn-elem') ? el : (el.closest('.tn-elem') || el);
            wEl.style.setProperty('width', (typeof st.width === 'number' ? st.width + 'px' : st.width), 'important');
          }
          if (st.height !== undefined) {
            var hEl = el.classList.contains('tn-elem') ? el : (el.closest('.tn-elem') || el);
            hEl.style.setProperty('height', (typeof st.height === 'number' ? st.height + 'px' : st.height), 'important');
          }
        }
      });
    }

    // 19. POSITION OVERRIDES (Freeform Drag-and-Drop Repositioning)
    if (data.positionOverrides && typeof data.positionOverrides === 'object') {
      Object.keys(data.positionOverrides).forEach(function (id) {
        var pos = data.positionOverrides[id];
        if (!pos) return;
        var el = document.querySelector("[data-elem-id='" + id + "']") ||
                 document.querySelector("[field='" + id + "']") ||
                 document.getElementById(id);
        if (el) {
          var targetWrapper = el.classList.contains('tn-elem') ? el : (el.closest('.tn-elem') || el);
          if (pos.left !== undefined) targetWrapper.style.setProperty('left', (typeof pos.left === 'number' ? pos.left + 'px' : pos.left), 'important');
          if (pos.top !== undefined) targetWrapper.style.setProperty('top', (typeof pos.top === 'number' ? pos.top + 'px' : pos.top), 'important');
          targetWrapper.style.setProperty('transform', 'none', 'important');
        }
      });
    }

    // 20. DELETED / HIDDEN ELEMENTS
    var deletedList = Array.isArray(data.deletedElements) ? data.deletedElements : [];
    var previouslyDeleted = document.querySelectorAll('[data-wbg-deleted="true"]');
    previouslyDeleted.forEach(function (el) {
      var eId = el.getAttribute('data-elem-id') || el.id;
      if (!deletedList.includes(eId)) {
        el.removeAttribute('data-wbg-deleted');
        el.style.removeProperty('display');
      }
    });
    deletedList.forEach(function (id) {
      var el = document.querySelector("[data-elem-id='" + id + "']") ||
               document.querySelector("[field='" + id + "']") ||
               document.getElementById(id);
      if (el) {
        var targetWrapper = el.classList.contains('tn-elem') ? el : (el.closest('.tn-elem') || el);
        targetWrapper.setAttribute('data-wbg-deleted', 'true');
        targetWrapper.style.setProperty('display', 'none', 'important');
      }
      if (id === 'rec2442651103') {
        var arrowEl = document.getElementById('rec2442651093');
        if (arrowEl) {
          arrowEl.setAttribute('data-wbg-deleted', 'true');
          arrowEl.style.setProperty('display', 'none', 'important');
        }
      }
    });

    // SECTION FLOW HELPER: Inserts or updates an added widget block directly inside #allrecords (or main records container)
    // This ensures widgets appear exactly between sections where dropped/added, and automatically pushes down all subsequent sections!
    function getOrCreateSectionWrapper(widgetId, widgetType, afterRecId, dropY) {
      var allRecords = document.getElementById('allrecords') || document.querySelector('.t-records') || document.body;
      var existing = document.querySelector('.wbg-added-section-block[data-wbg-widget-id="' + widgetId + '"]');
      
      // Find anchor block in allRecords
      var targetRec = null;
      if (afterRecId) {
        targetRec = document.getElementById(afterRecId);
      }
      
      // If targetRec not found or afterRecId not provided, locate best section by dropY or default
      if (!targetRec && allRecords) {
        var recs = Array.from(allRecords.children).filter(function (el) {
          return el.id && (el.id.startsWith('rec') || el.classList.contains('t-rec')) && !el.classList.contains('wbg-added-section-block');
        });
        if (typeof dropY === 'number' && dropY > 0 && recs.length > 0) {
          for (var i = 0; i < recs.length; i++) {
            var r = recs[i];
            if (r.offsetTop <= dropY && (r.offsetTop + r.offsetHeight) >= dropY) {
              targetRec = r;
              break;
            }
          }
          if (!targetRec && recs.length > 0) {
            targetRec = recs.reduce(function (prev, curr) {
              return (Math.abs(curr.offsetTop - dropY) < Math.abs(prev.offsetTop - dropY) ? curr : prev);
            });
          }
        }
        if (!targetRec && recs.length > 0) {
          targetRec = recs[Math.min(2, recs.length - 1)];
        }
      }

      if (!existing) {
        existing = document.createElement('div');
        existing.id = widgetId;
        existing.className = 'wbg-added-section-block r t-rec';
        existing.setAttribute('data-wbg-widget-id', widgetId);
        existing.setAttribute('data-wbg-type', widgetType);
        existing.style.cssText = 'position:relative;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;margin:20px 0;padding:8px 12px;clear:both;z-index:9999;';
      }

      if (targetRec) {
        existing.setAttribute('data-wbg-after-rec', targetRec.id);
      }

      // Insert or move wrapper after targetRec in natural DOM flow
      if (targetRec && targetRec.parentNode) {
        if (targetRec.nextSibling !== existing) {
          targetRec.parentNode.insertBefore(existing, targetRec.nextSibling);
        }
      } else if (allRecords && existing.parentNode !== allRecords) {
        allRecords.appendChild(existing);
      }

      return existing;
    }

    // 21. ADDED CUSTOM TEXT ELEMENTS (Section Flow)
    var addedList = Array.isArray(data.addedTexts) ? data.addedTexts : [];
    document.querySelectorAll('.wbg-added-section-block[data-wbg-type="text"]').forEach(function (block) {
      var dId = block.getAttribute('data-wbg-widget-id');
      if (!addedList.some(function (item) { return item.id === dId; })) {
        block.remove();
      }
    });

    addedList.forEach(function (item) {
      var block = getOrCreateSectionWrapper(item.id, 'text', item.afterRecId, item.y || item.top);
      var domEl = block.querySelector('.wbg-added-text-elem');
      if (!domEl) {
        domEl = document.createElement('div');
        domEl.className = 'wbg-added-text-elem tn-elem wbg-editable-text';
        domEl.setAttribute('data-added-id', item.id);
        domEl.setAttribute('data-elem-id', item.id);
        domEl.setAttribute('data-wbg-role', 'added-text');
        domEl.style.cssText = 'position:relative;margin:0 auto;cursor:pointer;user-select:none;padding:10px 18px;max-width:520px;line-height:1.3;text-align:center;box-sizing:border-box;';
        block.appendChild(domEl);

        domEl.addEventListener('click', function (e) {
          e.stopPropagation();
          selectElement(domEl, item.id, 'text');
        });
      }

      domEl.innerText = item.text || 'Your Custom Text';
      domEl.style.setProperty('font-size', (item.fontSize || 24) + 'px', 'important');
      domEl.style.setProperty('color', item.color || '#cebb78', 'important');
      domEl.style.setProperty('font-family', item.fontFamily || "'Playfair Display', serif", 'important');
      domEl.style.setProperty('font-weight', item.fontWeight || '400', 'important');
      domEl.style.setProperty('font-style', item.fontStyle || 'normal', 'important');
      domEl.style.setProperty('letter-spacing', item.letterSpacing || '0px', 'important');
      domEl.style.setProperty('text-align', item.textAlign || 'center', 'important');
      if (item.textTransform) domEl.style.setProperty('text-transform', item.textTransform, 'important');
    });

    // 22. ADDED MULTI-IMAGE SLIDE CAROUSELS (Section Flow)
    var addedSlidersList = Array.isArray(data.addedSliders) ? data.addedSliders : [];
    document.querySelectorAll('.wbg-added-section-block[data-wbg-type="slider"]').forEach(function (block) {
      var sId = block.getAttribute('data-wbg-widget-id');
      if (!addedSlidersList.some(function (item) { return item.id === sId; })) {
        var existingSlider = block.querySelector('.wbg-added-slider-elem');
        if (existingSlider && existingSlider._autoInterval) clearInterval(existingSlider._autoInterval);
        block.remove();
      }
    });

    addedSlidersList.forEach(function (item) {
      var block = getOrCreateSectionWrapper(item.id, 'slider', item.afterRecId, item.y || item.top);
      var sliderEl = block.querySelector('.wbg-added-slider-elem');
      if (!sliderEl) {
        sliderEl = document.createElement('div');
        sliderEl.className = 'wbg-added-slider-elem tn-elem';
        sliderEl.setAttribute('data-slider-id', item.id);
        sliderEl.setAttribute('data-elem-id', item.id);
        sliderEl.setAttribute('data-wbg-role', 'added-slider');
        sliderEl.style.cssText = 'position:relative;margin:0 auto;z-index:99998;cursor:pointer;user-select:none;box-shadow:0 8px 30px rgba(0,0,0,0.18);overflow:hidden;box-sizing:border-box;';

        sliderEl.innerHTML = 
          '<div class="wbg-slider-track" style="position:relative;width:100%;height:100%;overflow:hidden;border-radius:inherit;">' +
            '<img class="wbg-slider-img" style="width:100%;height:100%;object-fit:cover;display:block;transition:opacity 0.35s ease;" />' +
            '<div class="wbg-slider-badge" style="position:absolute;top:8px;left:8px;background:rgba(0,0,0,0.55);backdrop-filter:blur(4px);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:12px;font-family:sans-serif;pointer-events:none;">📷 Slideshow</div>' +
            '<button type="button" class="wbg-slider-prev" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.9);backdrop-filter:blur(4px);color:#0f172a;font-size:16px;font-weight:bold;border:none;box-shadow:0 2px 8px rgba(0,0,0,0.25);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;">‹</button>' +
            '<button type="button" class="wbg-slider-next" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.9);backdrop-filter:blur(4px);color:#0f172a;font-size:16px;font-weight:bold;border:none;box-shadow:0 2px 8px rgba(0,0,0,0.25);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;">›</button>' +
            '<div class="wbg-slider-dots" style="position:absolute;bottom:10px;left:0;right:0;display:flex;justify-content:center;gap:5px;z-index:10;pointer-events:auto;"></div>' +
          '</div>';

        block.appendChild(sliderEl);

        sliderEl.addEventListener('click', function (e) {
          e.stopPropagation();
          selectElement(sliderEl, item.id, 'slider');
        });

        var curIdx = item.currentIndex || 0;
        var pList = item.photos && item.photos.length > 0 ? item.photos : [
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
        ];

        sliderEl._renderSlide = function (idx) {
          var photos = sliderEl._photos || pList;
          if (!photos || photos.length === 0) return;
          sliderEl._currentIndex = (idx + photos.length) % photos.length;
          var img = sliderEl.querySelector('.wbg-slider-img');
          if (img) img.src = photos[sliderEl._currentIndex];
          var dots = sliderEl.querySelector('.wbg-slider-dots');
          if (dots) {
            dots.innerHTML = '';
            photos.forEach(function (_, i) {
              var dot = document.createElement('span');
              dot.style.cssText = 'width:' + (i === sliderEl._currentIndex ? '16px' : '6px') + ';height:6px;border-radius:3px;background:' + (i === sliderEl._currentIndex ? '#cebb78' : 'rgba(255,255,255,0.7)') + ';transition:all 0.2s;cursor:pointer;display:inline-block;box-shadow:0 1px 3px rgba(0,0,0,0.3);';
              dot.onclick = function (e) {
                e.stopPropagation();
                sliderEl._renderSlide(i);
              };
              dots.appendChild(dot);
            });
          }
        };

        var prevBtn = sliderEl.querySelector('.wbg-slider-prev');
        var nextBtn = sliderEl.querySelector('.wbg-slider-next');
        if (prevBtn) {
          prevBtn.onclick = function (e) {
            e.stopPropagation();
            sliderEl._renderSlide((sliderEl._currentIndex || 0) - 1);
          };
        }
        if (nextBtn) {
          nextBtn.onclick = function (e) {
            e.stopPropagation();
            sliderEl._renderSlide((sliderEl._currentIndex || 0) + 1);
          };
        }

        sliderEl._photos = pList;
        sliderEl._renderSlide(curIdx);

        if (item.autoplay !== false) {
          sliderEl._autoInterval = setInterval(function () {
            if (!sliderEl.matches(':hover') && sliderEl._photos && sliderEl._photos.length > 1) {
              sliderEl._renderSlide((sliderEl._currentIndex || 0) + 1);
            }
          }, 4000);
        }
      }

      var sW = item.width || 340;
      var sH = item.height || 360;
      var sR = item.borderRadius !== undefined ? item.borderRadius : 16;
      sliderEl.style.setProperty('width', '100%', 'important');
      sliderEl.style.setProperty('max-width', sW + 'px', 'important');
      sliderEl.style.setProperty('height', sH + 'px', 'important');
      sliderEl.style.setProperty('border-radius', sR + 'px', 'important');

      var rot = item.rotate || 0;
      sliderEl.style.setProperty('transform', rot ? 'rotate(' + rot + 'deg)' : 'none', 'important');
      sliderEl.style.setProperty('transform-origin', 'center center', 'important');

      if (item.photos && item.photos.length > 0 && sliderEl._renderSlide) {
        sliderEl._photos = item.photos;
        sliderEl._renderSlide(sliderEl._currentIndex || 0);
      }
    });

    // 23. ADDED STANDALONE CUSTOM IMAGES (Section Flow)
    var addedImagesList = Array.isArray(data.addedImages) ? data.addedImages : [];
    document.querySelectorAll('.wbg-added-section-block[data-wbg-type="image"]').forEach(function (block) {
      var iId = block.getAttribute('data-wbg-widget-id');
      if (!addedImagesList.some(function (item) { return item.id === iId; })) {
        block.remove();
      }
    });

    addedImagesList.forEach(function (item) {
      var block = getOrCreateSectionWrapper(item.id, 'image', item.afterRecId, item.y || item.top);
      var imgEl = block.querySelector('.wbg-added-image-elem');
      if (!imgEl) {
        imgEl = document.createElement('div');
        imgEl.className = 'wbg-added-image-elem tn-elem wbg-editable-image';
        imgEl.setAttribute('data-image-id', item.id);
        imgEl.setAttribute('data-elem-id', item.id);
        imgEl.setAttribute('data-wbg-role', 'added-image');
        imgEl.style.cssText = 'position:relative;margin:0 auto;z-index:99998;cursor:pointer;user-select:none;box-shadow:0 8px 30px rgba(0,0,0,0.18);overflow:hidden;box-sizing:border-box;';

        var img = document.createElement('img');
        img.src = item.src || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
        imgEl.appendChild(img);

        block.appendChild(imgEl);

        imgEl.addEventListener('click', function (e) {
          e.stopPropagation();
          selectElement(imgEl, item.id, 'image');
        });
      }

      var iW = item.width || 340;
      var iH = item.height || 360;
      var iR = item.borderRadius !== undefined ? item.borderRadius : 16;
      imgEl.style.setProperty('width', '100%', 'important');
      imgEl.style.setProperty('max-width', iW + 'px', 'important');
      imgEl.style.setProperty('height', iH + 'px', 'important');
      imgEl.style.setProperty('border-radius', iR + 'px', 'important');

      var rot = item.rotate || 0;
      imgEl.style.setProperty('transform', rot ? 'rotate(' + rot + 'deg)' : 'none', 'important');
      imgEl.style.setProperty('transform-origin', 'center center', 'important');

      var innerImg = imgEl.querySelector('img');
      if (innerImg && item.src && innerImg.src !== item.src) {
        innerImg.src = item.src;
      }
    });

  function renderScrollGalleryHeader(headerStyle, headerText, headerColor) {
    var style = headerStyle || 'scroll-classic';
    var text = headerText || 'scroll';
    var color = headerColor || '#cebb78';

    if (style === 'clean-none' || style === 'none') {
      return '';
    }

    if (style === 'scroll-classic') {
      return (
        '<div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:8px 16px 4px;pointer-events:none;user-select:none;">' +
          '<span style="font-family:\'Bodoni Moda\',\'Playfair Display\',\'Cinzel\',serif;font-style:italic;font-size:16px;letter-spacing:1px;color:' + color + ';font-weight:400;">' +
            text +
          '</span>' +
          '<span style="display:inline-flex;align-items:center;width:46px;height:1px;background:' + color + ';position:relative;margin-top:2px;">' +
            '<span style="position:absolute;right:0;top:-3px;width:0;height:0;border-top:3.5px solid transparent;border-bottom:3.5px solid transparent;border-left:6px solid ' + color + ';"></span>' +
          '</span>' +
        '</div>'
      );
    }

    if (style === 'swipe-double') {
      return (
        '<div style="display:flex;align-items:center;justify-content:center;gap:10px;padding:8px 16px 4px;pointer-events:none;user-select:none;font-family:\'Cinzel\',serif;font-size:11px;letter-spacing:2px;color:' + color + ';text-transform:uppercase;">' +
          '<span>←</span>' +
          '<span>' + (headerText || 'swipe to view') + '</span>' +
          '<span>→</span>' +
        '</div>'
      );
    }

    if (style === 'minimal-arrow') {
      return (
        '<div style="display:flex;align-items:center;justify-content:flex-end;gap:6px;padding:6px 14px 4px;pointer-events:none;user-select:none;font-family:\'Montserrat\',sans-serif;font-size:11px;letter-spacing:1.5px;color:' + color + ';text-transform:uppercase;font-weight:600;">' +
          '<span>' + (headerText || 'swipe') + '</span>' +
          '<span style="font-size:14px;line-height:1;">→</span>' +
        '</div>'
      );
    }

    if (style === 'chevrons') {
      return (
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 14px 4px;pointer-events:none;user-select:none;font-family:\'Bodoni Moda\',serif;font-size:13px;letter-spacing:1px;color:' + color + ';">' +
          '<span style="font-size:16px;font-weight:bold;">‹</span>' +
          '<span style="font-style:italic;">' + (headerText || 'scroll gallery') + '</span>' +
          '<span style="font-size:16px;font-weight:bold;">›</span>' +
        '</div>'
      );
    }

    if (style === 'drag-hand') {
      return (
        '<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:6px 14px 4px;pointer-events:none;user-select:none;font-family:\'Montserrat\',sans-serif;font-size:11px;color:' + color + ';font-weight:600;">' +
          '<span>👆</span>' +
          '<span>' + (headerText || 'swipe left or right') + '</span>' +
          '<span>↔</span>' +
        '</div>'
      );
    }

    // Default navy-pill
    return (
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 12px;background:rgba(8,0,75,0.92);color:' + color + ';font-size:10px;font-weight:700;letter-spacing:0.5px;pointer-events:none;">' +
        '<span>📜 ' + (headerText || 'Scroll Gallery') + '</span>' +
        '<span style="font-size:9px;color:rgba(255,255,255,0.85);">Swipe ↔</span>' +
      '</div>'
    );
  }

    // 24. ADDED HORIZONTAL SCROLL GALLERIES (Section Flow)
    var addedScrollList = Array.isArray(data.addedScrollGalleries) ? data.addedScrollGalleries : [];
    document.querySelectorAll('.wbg-added-section-block[data-wbg-type="scroll-gallery"]').forEach(function (block) {
      var gId = block.getAttribute('data-wbg-widget-id');
      if (!addedScrollList.some(function (item) { return item.id === gId; })) {
        block.remove();
      }
    });

    addedScrollList.forEach(function (item) {
      var block = getOrCreateSectionWrapper(item.id, 'scroll-gallery', item.afterRecId, item.y || item.top);
      var scrollEl = block.querySelector('.wbg-added-scroll-gallery-elem');
      if (!scrollEl) {
        scrollEl = document.createElement('div');
        scrollEl.className = 'wbg-added-scroll-gallery-elem tn-elem';
        scrollEl.setAttribute('data-scroll-id', item.id);
        scrollEl.setAttribute('data-elem-id', item.id);
        scrollEl.setAttribute('data-wbg-role', 'added-scroll-gallery');
        scrollEl.style.cssText = 'position:relative;margin:0 auto;z-index:99998;cursor:pointer;user-select:none;box-shadow:0 8px 30px rgba(0,0,0,0.18);overflow:hidden;background:rgba(255,255,255,0.96);border:1.5px solid rgba(206,187,120,0.7);backdrop-filter:blur(8px);box-sizing:border-box;';

        scrollEl.innerHTML = 
          '<div class="wbg-scroll-header"></div>' +
          '<div class="wbg-scroll-track" style="display:flex;gap:12px;overflow-x:auto;padding:10px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:#cebb78 rgba(0,0,0,0.15);">' +
          '</div>';

        block.appendChild(scrollEl);

        scrollEl.addEventListener('click', function (e) {
          e.stopPropagation();
          selectElement(scrollEl, item.id, 'scroll-gallery');
        });
      }

      var headerEl = scrollEl.querySelector('.wbg-scroll-header');
      var headerStyle = item.headerStyle || data.scrollArrowDesign || 'scroll-classic';
      var headerHtml = renderScrollGalleryHeader(headerStyle, item.headerText, item.headerColor);
      if (headerEl) {
        headerEl.innerHTML = headerHtml;
        headerEl.style.display = headerHtml ? 'block' : 'none';
      }

      var sW = item.width || 340;
      var sH = item.height || 230;
      var sR = item.borderRadius !== undefined ? item.borderRadius : 16;
      scrollEl.style.setProperty('width', '100%', 'important');
      scrollEl.style.setProperty('max-width', sW + 'px', 'important');
      scrollEl.style.setProperty('height', sH + 'px', 'important');
      scrollEl.style.setProperty('border-radius', sR + 'px', 'important');

      var rot = (data.rotationOverrides && data.rotationOverrides[item.id]) !== undefined ? data.rotationOverrides[item.id] : (item.rotate || 0);
      scrollEl.style.setProperty('transform', rot ? 'rotate(' + rot + 'deg)' : 'none', 'important');
      scrollEl.style.setProperty('transform-origin', 'center center', 'important');

      var track = scrollEl.querySelector('.wbg-scroll-track');
      if (track) {
        var photos = Array.isArray(item.photos) && item.photos.length > 0 ? item.photos : [
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
        ];
        var photoWidth = item.photoWidth || 150;
        var headerDeduct = (!headerHtml || headerStyle === 'clean-none' || headerStyle === 'none') ? 20 : 54;
        var photoHeight = Math.max(80, (sH - headerDeduct));

        track.innerHTML = '';
        photos.forEach(function (src) {
          var card = document.createElement('div');
          card.style.cssText = 'flex:0 0 ' + photoWidth + 'px;height:' + photoHeight + 'px;border-radius:10px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,0.18);position:relative;scroll-snap-align:start;';
          var img = document.createElement('img');
          img.src = src;
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;';
          card.appendChild(img);
          track.appendChild(card);
        });
      }
    });

    // 25. ADDED STANDALONE SCROLL ARROW DIVIDERS (Section Flow)
    var addedArrowList = Array.isArray(data.addedArrows) ? data.addedArrows : [];
    document.querySelectorAll('.wbg-added-section-block[data-wbg-type="arrow"]').forEach(function (block) {
      var aId = block.getAttribute('data-wbg-widget-id');
      if (!addedArrowList.some(function (item) { return item.id === aId; })) {
        block.remove();
      }
    });

    addedArrowList.forEach(function (item) {
      var block = getOrCreateSectionWrapper(item.id, 'arrow', item.afterRecId, item.y || item.top);
      var arrowEl = block.querySelector('.wbg-added-arrow-elem');
      if (!arrowEl) {
        arrowEl = document.createElement('div');
        arrowEl.className = 'wbg-added-arrow-elem tn-elem';
        arrowEl.setAttribute('data-arrow-id', item.id);
        arrowEl.setAttribute('data-elem-id', item.id);
        arrowEl.setAttribute('data-wbg-role', 'added-arrow');
        arrowEl.style.cssText = 'position:relative;margin:0 auto;display:inline-flex;align-items:center;justify-content:center;padding:10px 24px;cursor:pointer;user-select:none;transition:transform 0.2s ease;';
        block.appendChild(arrowEl);

        arrowEl.addEventListener('click', function (e) {
          e.stopPropagation();
          selectElement(arrowEl, item.id, 'arrow');
          try {
            window.parent.postMessage({
              type: 'WBG_ARROW_SELECTED',
              arrowId: item.id,
              style: item.style
            }, '*');
          } catch (err) {}
        });
      }

      var arrowStyle = item.style || data.scrollArrowDesign || 'scroll-classic';
      var arrowColor = item.color || '#cebb78';
      var arrowText = item.text || 'scroll';
      arrowEl.innerHTML = renderScrollGalleryHeader(arrowStyle, arrowText, arrowColor);
    });

    // 25. ROTATION OVERRIDES (For any standard template element)
    if (data.rotationOverrides && typeof data.rotationOverrides === 'object') {
      Object.keys(data.rotationOverrides).forEach(function (id) {
        var deg = data.rotationOverrides[id];
        if (deg === undefined || deg === null) return;
        var el = document.querySelector("[data-elem-id='" + id + "']") ||
                 document.querySelector("[field='" + id + "']") ||
                 document.getElementById(id);
        if (el) {
          var targetWrapper = el.classList.contains('tn-elem') ? el : (el.closest('.tn-elem') || el);
          targetWrapper.style.setProperty('transform', 'rotate(' + deg + 'deg)', 'important');
          targetWrapper.style.setProperty('transform-origin', 'center center', 'important');
        }
      });
    }

    lastApplied = {
      partner1: p1,
      partner2: p2,
      fullName: fullName,
      dateText: data.dateText || lastApplied.dateText,
      venueName: data.venueName || lastApplied.venueName,
      venueAddress: data.venueAddress || lastApplied.venueAddress,
      dressCode: data.dressCode || lastApplied.dressCode,
      giftPreference: data.giftPreference || lastApplied.giftPreference,
      welcomeMessage: data.welcomeMessage || lastApplied.welcomeMessage
    };

    // 26. SECTION ORDERING (Custom canvas sequence)
    if (Array.isArray(data.sectionOrder) && data.sectionOrder.length > 0) {
      var allRecordsContainer = document.getElementById('allrecords') || document.querySelector('.t-records') || document.body;
      if (allRecordsContainer) {
        data.sectionOrder.forEach(function (id) {
          var el = document.getElementById(id) || document.querySelector('.wbg-added-section-block[data-wbg-widget-id="' + id + '"]');
          if (el && el.parentNode === allRecordsContainer) {
            allRecordsContainer.appendChild(el);
          }
        });
      }
    }

    // 27. RENDER INLINE "+ ADD BLOCK HERE" INSERTERS & ACTION BARS (Admin only)
    if (data && typeof data.isAdmin !== 'undefined') {
      var prevAdmin = window.__wbg_is_admin;
      window.__wbg_is_admin = Boolean(data.isAdmin);
      if (window.__wbg_is_admin !== prevAdmin) {
        setupInteractiveClicks();
      }
    }

    if (window.__wbg_is_admin) {
      renderSectionInserters();
      attachSectionActionBars();
    } else {
      document.querySelectorAll('.wbg-section-divider-inserter, .wbg-section-action-bar, .wbg-empty-canvas-placeholder').forEach(function (el) {
        el.remove();
      });
    }

    try {
      window.parent.postMessage({ type: 'WBG_CUSTOMIZATION_APPLIED', timestamp: Date.now() }, '*');
    } catch (e) {}
  }

  function createInserterElement(afterRecId) {
    var div = document.createElement('div');
    div.className = 'wbg-section-divider-inserter';
    div.setAttribute('data-wbg-after-rec', afterRecId || '');
    div.style.cssText = 'position:relative;width:100%;height:32px;display:flex;align-items:center;justify-content:center;z-index:99990;margin:-16px 0;opacity:0.35;transition:all 0.2s ease;cursor:pointer;user-select:none;';
    
    div.innerHTML = 
      '<div style="position:absolute;left:20px;right:20px;height:1px;background:rgba(206,187,120,0.6);border-top:1px dashed rgba(206,187,120,0.85);pointer-events:none;"></div>' +
      '<button type="button" class="wbg-inserter-btn" style="position:relative;z-index:2;background:#08004b;color:#cebb78;border:1.5px solid #cebb78;border-radius:20px;padding:3px 14px;font-size:10px;font-weight:700;font-family:\'Montserrat\',sans-serif;display:flex;align-items:center;gap:5px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,0.3);transition:all 0.2s ease;transform:scale(0.95);">' +
        '<span style="font-size:13px;line-height:1;font-weight:900;">+</span>' +
        '<span>Add Block Here</span>' +
      '</button>';

    div.onmouseenter = function () {
      div.style.opacity = '1';
      div.style.zIndex = '99999';
      var btn = div.querySelector('.wbg-inserter-btn');
      if (btn) {
        btn.style.transform = 'scale(1.06)';
        btn.style.background = '#006989';
        btn.style.borderColor = '#38bdf8';
        btn.style.color = '#ffffff';
        btn.style.boxShadow = '0 4px 14px rgba(0,105,137,0.5)';
      }
    };
    div.onmouseleave = function () {
      div.style.opacity = '0.35';
      div.style.zIndex = '99990';
      var btn = div.querySelector('.wbg-inserter-btn');
      if (btn) {
        btn.style.transform = 'scale(0.95)';
        btn.style.background = '#08004b';
        btn.style.borderColor = '#cebb78';
        btn.style.color = '#cebb78';
        btn.style.boxShadow = '0 3px 10px rgba(0,0,0,0.3)';
      }
    };

    div.onclick = function (e) {
      e.stopPropagation();
      try {
        window.parent.postMessage({
          type: 'WBG_OPEN_ADD_BLOCK_MODAL',
          afterRecId: afterRecId
        }, '*');
      } catch (err) {}
    };

    return div;
  }

  function renderSectionInserters() {
    if (!window.__wbg_is_admin) return;
    document.querySelectorAll('.wbg-section-divider-inserter').forEach(function (el) {
      el.remove();
    });

    var allRecords = document.getElementById('allrecords') || document.querySelector('.t-records') || document.body;
    if (!allRecords) return;

    var sections = Array.from(allRecords.children).filter(function (el) {
      return el.id && (el.id.startsWith('rec') || el.classList.contains('t-rec') || el.classList.contains('wbg-added-section-block')) && 
             !el.classList.contains('wbg-section-divider-inserter') && 
             !el.classList.contains('wbg-empty-canvas-placeholder');
    });

    var visibleSections = sections.filter(function (el) {
      return el.getAttribute('data-wbg-deleted') !== 'true' && el.style.display !== 'none';
    });

    if (visibleSections.length === 0) {
      var emptyEl = document.querySelector('.wbg-empty-canvas-placeholder');
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'wbg-empty-canvas-placeholder';
        emptyEl.innerHTML = 
          '<div style="font-size:36px;margin-bottom:8px;">✨</div>' +
          '<h3 style="font-family:\'Bodoni Moda\',\'Playfair Display\',serif;font-size:19px;font-weight:700;color:#cebb78;margin:0 0 6px;letter-spacing:1px;">Blank Canvas Mode</h3>' +
          '<p style="font-family:\'Montserrat\',sans-serif;font-size:12px;color:#cbd5e1;max-width:290px;margin:0 auto 18px;line-height:1.5;">All template sections have been cleared. Build your one-of-a-kind wedding card from scratch below.</p>' +
          '<button type="button" class="wbg-add-first-btn" style="background:#006989;color:#fff;border:none;padding:10px 24px;border-radius:22px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,105,137,0.45);font-family:\'Montserrat\',sans-serif;transition:all 0.2s;">+ Add First Section Block</button>';
        emptyEl.style.cssText = 'padding:60px 20px;text-align:center;background:rgba(8,0,75,0.92);border:2px dashed rgba(206,187,120,0.5);border-radius:24px;margin:40px 16px;box-sizing:border-box;box-shadow:0 10px 36px rgba(0,0,0,0.4);';
        
        var firstBtn = emptyEl.querySelector('.wbg-add-first-btn');
        if (firstBtn) {
          firstBtn.onclick = function (e) {
            e.stopPropagation();
            window.parent.postMessage({ type: 'WBG_OPEN_ADD_BLOCK_MODAL', afterRecId: null }, '*');
          };
        }
        allRecords.appendChild(emptyEl);
      }
      return;
    } else {
      var existingEmpty = document.querySelector('.wbg-empty-canvas-placeholder');
      if (existingEmpty) existingEmpty.remove();
    }

    // Top inserter
    var topInserter = createInserterElement(null);
    allRecords.insertBefore(topInserter, visibleSections[0]);

    // Inserters between visible sections
    visibleSections.forEach(function (sec) {
      var inserter = createInserterElement(sec.id);
      if (sec.nextSibling) {
        allRecords.insertBefore(inserter, sec.nextSibling);
      } else {
        allRecords.appendChild(inserter);
      }
    });
  }

  function attachSectionActionBars() {
    if (!window.__wbg_is_admin) return;
    var allRecords = document.getElementById('allrecords') || document.querySelector('.t-records') || document.body;
    if (!allRecords) return;

    var sections = Array.from(allRecords.children).filter(function (el) {
      return el.id && (el.id.startsWith('rec') || el.classList.contains('t-rec') || el.classList.contains('wbg-added-section-block')) && 
             !el.classList.contains('wbg-section-divider-inserter') && 
             !el.classList.contains('wbg-empty-canvas-placeholder');
    });

    sections.forEach(function (sec) {
      if (sec.querySelector('.wbg-section-action-bar')) return;
      
      var bar = document.createElement('div');
      bar.className = 'wbg-section-action-bar';
      bar.style.cssText = 'position:absolute;top:10px;right:12px;z-index:99996;display:none;align-items:center;gap:3px;background:rgba(8,0,75,0.94);padding:3px 6px;border-radius:12px;border:1px solid rgba(206,187,120,0.7);box-shadow:0 4px 14px rgba(0,0,0,0.35);backdrop-filter:blur(8px);';
      
      bar.innerHTML = 
        '<button type="button" class="wbg-bar-btn wbg-bar-up" title="Move Up" style="background:rgba(255,255,255,0.1);border:none;color:#cebb78;cursor:pointer;padding:3px 6px;font-size:11px;font-weight:bold;border-radius:6px;transition:background 0.15s;">▲</button>' +
        '<button type="button" class="wbg-bar-btn wbg-bar-down" title="Move Down" style="background:rgba(255,255,255,0.1);border:none;color:#cebb78;cursor:pointer;padding:3px 6px;font-size:11px;font-weight:bold;border-radius:6px;transition:background 0.15s;">▼</button>' +
        '<button type="button" class="wbg-bar-btn wbg-bar-edit" title="Customize Section" style="background:#006989;border:none;color:#ffffff;cursor:pointer;padding:3px 8px;font-size:10px;font-weight:700;border-radius:6px;font-family:\'Montserrat\',sans-serif;transition:background 0.15s;">✏️ Edit</button>' +
        '<button type="button" class="wbg-bar-btn wbg-bar-del" title="Delete Section" style="background:rgba(239,68,68,0.25);border:none;color:#fca5a5;cursor:pointer;padding:3px 6px;font-size:11px;border-radius:6px;transition:background 0.15s;">🗑️</button>';

      var upBtn = bar.querySelector('.wbg-bar-up');
      if (upBtn) {
        upBtn.onclick = function (e) {
          e.stopPropagation();
          window.parent.postMessage({ type: 'WBG_MOVE_SECTION_UP', sectionId: sec.id }, '*');
        };
      }

      var downBtn = bar.querySelector('.wbg-bar-down');
      if (downBtn) {
        downBtn.onclick = function (e) {
          e.stopPropagation();
          window.parent.postMessage({ type: 'WBG_MOVE_SECTION_DOWN', sectionId: sec.id }, '*');
        };
      }

      var editBtn = bar.querySelector('.wbg-bar-edit');
      if (editBtn) {
        editBtn.onclick = function (e) {
          e.stopPropagation();
          window.parent.postMessage({ type: 'WBG_EDIT_SECTION', sectionId: sec.id }, '*');
        };
      }

      var delBtn = bar.querySelector('.wbg-bar-del');
      if (delBtn) {
        delBtn.onclick = function (e) {
          e.stopPropagation();
          window.parent.postMessage({ type: 'WBG_DELETE_ELEMENT_REQUEST', elemId: sec.id }, '*');
        };
      }

      sec.style.position = sec.style.position || 'relative';
      sec.appendChild(bar);

      sec.addEventListener('mouseenter', function () {
        bar.style.display = 'flex';
      });
      sec.addEventListener('mouseleave', function () {
        bar.style.display = 'none';
      });
    });
  }

  function startCountdownTicker() {
    if (countdownInterval) clearInterval(countdownInterval);

    function tick() {
      if (!targetDateObj || isNaN(targetDateObj.getTime())) return;
      var now = new Date().getTime();
      var distance = targetDateObj.getTime() - now;

      if (distance < 0) distance = 0;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var sDays = String(days).padStart(2, '0');
      var sHours = String(hours).padStart(2, '0');
      var sMin = String(minutes).padStart(2, '0');
      var sSec = String(seconds).padStart(2, '0');

      if (tracked.countdown.days) tracked.countdown.days.innerText = sDays;
      if (tracked.countdown.hours) tracked.countdown.hours.innerText = sHours;
      if (tracked.countdown.minutes) tracked.countdown.minutes.innerText = sMin;
      if (tracked.countdown.seconds) tracked.countdown.seconds.innerText = sSec;
    }

    tick();
    countdownInterval = setInterval(tick, 1000);
  }

  function setupInteractiveClicks() {
    if (!window.__wbg_is_admin) {
      var existingStyles = document.getElementById('wbg-edit-styles');
      if (existingStyles) existingStyles.remove();
      var existingBadge = document.getElementById('wbg-floating-badge');
      if (existingBadge) existingBadge.remove();
      var existingSel = document.getElementById('wbg-selection-box');
      if (existingSel) existingSel.remove();
      var existingHud = document.getElementById('wbg-drag-hud');
      if (existingHud) existingHud.remove();
      document.querySelectorAll('.wbg-section-divider-inserter, .wbg-section-action-bar, .wbg-empty-canvas-placeholder').forEach(function (el) {
        el.remove();
      });
      return;
    }

    if (window.self !== window.top && !document.getElementById('wbg-edit-styles')) {
      var style = document.createElement('style');
      style.id = 'wbg-edit-styles';
      style.textContent = 
        '.wbg-editable-text { position: relative !important; cursor: pointer !important; transition: outline 0.15s ease, background 0.15s ease !important; }' +
        '.wbg-editable-text:hover { outline: 2px dashed #cebb78 !important; outline-offset: 3px !important; background-color: rgba(206, 187, 120, 0.12) !important; border-radius: 4px !important; }' +
        '.wbg-editable-image { position: relative !important; cursor: pointer !important; transition: outline 0.15s ease, filter 0.15s ease !important; }' +
        '.wbg-editable-image:hover { outline: 3px dashed #cebb78 !important; outline-offset: -2px !important; filter: brightness(0.92) !important; border-radius: 4px !important; }' +
        '.wbg-editing-active { outline: 2px solid #b8860b !important; outline-offset: 3px !important; background-color: rgba(255, 255, 255, 0.95) !important; color: #1e293b !important; border-radius: 4px !important; z-index: 99999 !important; box-shadow: 0 4px 16px rgba(0,0,0,0.2) !important; cursor: text !important; user-select: text !important; }' +
        '.wbg-dragging-active { outline: 2px dashed #0284c7 !important; outline-offset: 4px !important; cursor: grabbing !important; z-index: 999999 !important; box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important; transition: none !important; }' +
        '.wbg-added-text-elem { position: absolute !important; z-index: 99999 !important; cursor: pointer !important; user-select: none !important; padding: 4px 8px !important; min-width: 40px !important; line-height: 1.2 !important; touch-action: none !important; }' +
        '.wbg-added-text-elem:hover { outline: 2px dashed #cebb78 !important; outline-offset: 3px !important; }' +
        '.wbg-selection-box { position: absolute; pointer-events: none; z-index: 2147483640; box-sizing: border-box; }' +
        '.wbg-sel-border { position: absolute; inset: 0; border: 1.5px solid #0284c7; box-sizing: border-box; pointer-events: none; }' +
        '.wbg-edge-bar { position: absolute; z-index: 2147483642; pointer-events: auto; cursor: move !important; touch-action: none; }' +
        '.wbg-edge-bar:hover { background: rgba(2, 132, 199, 0.16); }' +
        '.wbg-edge-top { top: -6px; left: 8px; right: 8px; height: 12px; }' +
        '.wbg-edge-bottom { bottom: -6px; left: 8px; right: 8px; height: 12px; }' +
        '.wbg-edge-left { left: -6px; top: 8px; bottom: 8px; width: 12px; }' +
        '.wbg-edge-right { right: -6px; top: 8px; bottom: 8px; width: 12px; }' +
        '.wbg-handle { position: absolute; width: 10px; height: 10px; background: #ffffff; border: 1.5px solid #0284c7; border-radius: 50%; box-shadow: 0 1px 4px rgba(0,0,0,0.3); box-sizing: border-box; pointer-events: auto; z-index: 2147483646; touch-action: none; transition: transform 0.1s ease, background 0.1s ease; }' +
        '.wbg-handle:hover { background: #f0f9ff; border-color: #0369a1; transform: scale(1.3); }' +
        '.wbg-handle-nw { top: -5px; left: -5px; cursor: nwse-resize !important; }' +
        '.wbg-handle-n { top: -5px; left: 50%; transform: translateX(-50%); cursor: ns-resize !important; }' +
        '.wbg-handle-n:hover { transform: translateX(-50%) scale(1.3); }' +
        '.wbg-handle-ne { top: -5px; right: -5px; cursor: nesw-resize !important; }' +
        '.wbg-handle-e { top: 50%; right: -5px; transform: translateY(-50%); cursor: ew-resize !important; }' +
        '.wbg-handle-e:hover { transform: translateY(-50%) scale(1.3); }' +
        '.wbg-handle-se { bottom: -5px; right: -5px; cursor: nwse-resize !important; }' +
        '.wbg-handle-s { bottom: -5px; left: 50%; transform: translateX(-50%); cursor: ns-resize !important; }' +
        '.wbg-handle-s:hover { transform: translateX(-50%) scale(1.3); }' +
        '.wbg-handle-sw { bottom: -5px; left: -5px; cursor: nesw-resize !important; }' +
        '.wbg-handle-w { top: 50%; left: -5px; transform: translateY(-50%); cursor: ew-resize !important; }' +
        '.wbg-handle-w:hover { transform: translateY(-50%) scale(1.3); }' +
        '.wbg-rotate-stem { position: absolute; left: 50%; top: -24px; width: 1.5px; height: 24px; background: #0284c7; transform: translateX(-50%); pointer-events: none; }' +
        '#wbg-rotate-knob { position: absolute; left: 50%; top: -46px; width: 24px; height: 24px; border-radius: 50%; background: #ffffff; border: 1.5px solid #0284c7; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transform: translateX(-50%); pointer-events: auto; cursor: grab; display: flex; align-items: center; justify-content: center; transition: transform 0.1s ease; z-index: 2147483647; }' +
        '#wbg-rotate-knob:hover { background: #f0f9ff; transform: translateX(-50%) scale(1.12); }' +
        '#wbg-image-replace-btn { position: absolute; right: -14px; top: -14px; width: 28px; height: 28px; border-radius: 50%; background: #0284c7; color: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.3); pointer-events: auto; cursor: pointer; display: none; align-items: center; justify-content: center; border: 2px solid #ffffff; transition: transform 0.15s ease, background 0.15s ease; z-index: 2147483648; }' +
        '#wbg-image-replace-btn:hover { background: #0369a1; transform: scale(1.15); }' +
        '#wbg-drag-hud { position: fixed; display: none; pointer-events: none; z-index: 2147483647; background: rgba(8, 0, 75, 0.95); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #cebb78; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(206, 187, 120, 0.9); box-shadow: 0 4px 14px rgba(0,0,0,0.4); align-items: center; gap: 6px; white-space: nowrap; }' +
        '#wbg-floating-badge { position: fixed; display: none; pointer-events: none; z-index: 2147483647; background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(206, 187, 120, 0.8); box-shadow: 0 4px 14px rgba(0,0,0,0.35); align-items: center; gap: 6px; white-space: nowrap; line-height: 1; }';
      document.head.appendChild(style);
    }

    // Floating Edit Sign (Badge) for Customizer Studio
    var badge = document.getElementById('wbg-floating-badge');
    if (window.self !== window.top && !badge) {
      badge = document.createElement('div');
      badge.id = 'wbg-floating-badge';
      document.body.appendChild(badge);
    }

    var currentHoveredEl = null;
    var currentHoveredType = null;

    function showBadgeFor(targetEl, type) {
      if (!badge || (document.activeElement && document.activeElement.isContentEditable)) {
        if (badge) badge.style.display = 'none';
        return;
      }
      currentHoveredEl = targetEl;
      currentHoveredType = type;

      var rect = targetEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0 || rect.bottom < 0 || rect.top > window.innerHeight) {
        badge.style.display = 'none';
        return;
      }

      if (type === 'image') {
        badge.innerHTML = '<span style="color:#cebb78;font-size:12px;">📷</span> Click to Select / Move Photo';
      } else {
        badge.innerHTML = '<span style="color:#cebb78;font-size:12px;">✎</span> Click to Move / Double-click to Edit';
      }
      badge.style.display = 'inline-flex';

      var badgeWidth = type === 'image' ? 180 : 210;
      var left = rect.right - badgeWidth;
      if (left < 10) left = rect.left;
      if (left + badgeWidth > window.innerWidth - 10) left = window.innerWidth - badgeWidth - 10;

      var top = rect.top - 28;
      if (top < 10) top = rect.bottom + 6;

      badge.style.left = left + 'px';
      badge.style.top = top + 'px';
    }

    function hideBadge() {
      currentHoveredEl = null;
      currentHoveredType = null;
      if (badge) badge.style.display = 'none';
    }

    // Floating Drag Coordinates Indicator
    var dragHud = document.getElementById('wbg-drag-hud');
    if (window.self !== window.top && !dragHud) {
      dragHud = document.createElement('div');
      dragHud.id = 'wbg-drag-hud';
      document.body.appendChild(dragHud);
    }

    function showDragIndicator(targetEl, left, top) {
      if (!dragHud) return;
      var rect = targetEl.getBoundingClientRect();
      dragHud.innerHTML = '<span style="font-size:12px;">✥</span> X: ' + left + 'px &nbsp; Y: ' + top + 'px';
      dragHud.style.display = 'inline-flex';
      var hudLeft = rect.left;
      var hudTop = rect.top - 32;
      if (hudTop < 10) hudTop = rect.bottom + 8;
      dragHud.style.left = Math.max(10, hudLeft) + 'px';
      dragHud.style.top = Math.max(10, hudTop) + 'px';
    }

    function hideDragIndicator() {
      if (dragHud) dragHud.style.display = 'none';
    }

    function getElementRotation(el) {
      if (!el) return 0;
      var tr = el.style.transform || window.getComputedStyle(el).transform;
      if (!tr || tr === 'none') return 0;
      var m = tr.match(/rotate\(([-0-9.]+)deg\)/);
      if (m) return parseFloat(m[1]) || 0;
      var mat = tr.match(/^matrix\((.+)\)$/);
      if (mat) {
        var values = mat[1].split(',');
        var a = parseFloat(values[0]);
        var b = parseFloat(values[1]);
        return Math.round(Math.atan2(b, a) * (180 / Math.PI));
      }
      return 0;
    }

    // Canva / Figma Style Selection Bounding Box with Rotation Handle
    var selectionBox = document.getElementById('wbg-selection-box');
    if (window.self !== window.top && !selectionBox) {
      selectionBox = document.createElement('div');
      selectionBox.id = 'wbg-selection-box';
      selectionBox.className = 'wbg-selection-box';
      selectionBox.innerHTML = 
        '<div class="wbg-sel-border"></div>' +
        '<div class="wbg-edge-bar wbg-edge-top" data-edge="top" title="Drag to move"></div>' +
        '<div class="wbg-edge-bar wbg-edge-bottom" data-edge="bottom" title="Drag to move"></div>' +
        '<div class="wbg-edge-bar wbg-edge-left" data-edge="left" title="Drag to move"></div>' +
        '<div class="wbg-edge-bar wbg-edge-right" data-edge="right" title="Drag to move"></div>' +
        '<div class="wbg-handle wbg-handle-nw" data-handle="nw" title="Resize"></div>' +
        '<div class="wbg-handle wbg-handle-n" data-handle="n" title="Resize"></div>' +
        '<div class="wbg-handle wbg-handle-ne" data-handle="ne" title="Resize"></div>' +
        '<div class="wbg-handle wbg-handle-e" data-handle="e" title="Resize"></div>' +
        '<div class="wbg-handle wbg-handle-se" data-handle="se" title="Resize"></div>' +
        '<div class="wbg-handle wbg-handle-s" data-handle="s" title="Resize"></div>' +
        '<div class="wbg-handle wbg-handle-sw" data-handle="sw" title="Resize"></div>' +
        '<div class="wbg-handle wbg-handle-w" data-handle="w" title="Resize"></div>' +
        '<div class="wbg-rotate-stem"></div>' +
        '<div id="wbg-rotate-knob" title="Drag to Rotate">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>' +
          '</svg>' +
        '</div>' +
        '<div id="wbg-image-replace-btn" title="Replace / Upload Photo">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
            '<line x1="12" y1="5" x2="12" y2="19"></line>' +
            '<line x1="5" y1="12" x2="19" y2="12"></line>' +
          '</svg>' +
        '</div>';
      document.body.appendChild(selectionBox);
    }

    var activeSelectedTarget = null;
    var activeSelectedElemId = null;
    var activeSelectedType = null;
    var imageReplaceBtn = document.getElementById('wbg-image-replace-btn');
    var rotateKnob = document.getElementById('wbg-rotate-knob');

    function updateSelectionBox(target, type) {
      if (!selectionBox || !target) return;
      var rect = target.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      var w = target.offsetWidth;
      var h = target.offsetHeight;
      if (!w || !h) {
        var atom = target.querySelector('.tn-atom') || target;
        w = atom.offsetWidth || rect.width;
        h = atom.offsetHeight || rect.height;
      }

      var deg = getElementRotation(target);
      var cx = rect.left + rect.width / 2 + scrollLeft;
      var cy = rect.top + rect.height / 2 + scrollTop;

      selectionBox.style.width = w + 'px';
      selectionBox.style.height = h + 'px';
      selectionBox.style.left = (cx - w / 2) + 'px';
      selectionBox.style.top = (cy - h / 2) + 'px';
      selectionBox.style.transform = 'rotate(' + deg + 'deg)';
      selectionBox.style.transformOrigin = 'center center';
      selectionBox.style.display = 'block';

      var isImg = type === 'image' || target.classList.contains('wbg-editable-image') || target.classList.contains('wbg-added-image-elem') || target.classList.contains('wbg-added-slider-elem') || target.classList.contains('wbg-added-scroll-gallery-elem') || target.querySelector('img') || target.tagName === 'IMG';
      if (imageReplaceBtn) {
        imageReplaceBtn.style.display = isImg ? 'flex' : 'none';
      }
    }

    function selectElement(wrapper, elemId, type) {
      activeSelectedTarget = wrapper;
      activeSelectedElemId = elemId;
      activeSelectedType = type;
      updateSelectionBox(wrapper, type);
    }

    function hideSelectionBox() {
      activeSelectedTarget = null;
      activeSelectedElemId = null;
      activeSelectedType = null;
      if (selectionBox) selectionBox.style.display = 'none';
    }

    if (imageReplaceBtn) {
      imageReplaceBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (universalFilePicker) universalFilePicker.click();
      });
    }

    if (rotateKnob) {
      var isRotating = false;
      rotateKnob.addEventListener('mousedown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!activeSelectedTarget) return;

        var rect = activeSelectedTarget.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        isRotating = true;
        rotateKnob.style.cursor = 'grabbing';

        function onPointerMove(moveEvt) {
          if (!isRotating || !activeSelectedTarget) return;
          var clientX = moveEvt.clientX;
          var clientY = moveEvt.clientY;
          var rad = Math.atan2(clientY - cy, clientX - cx);
          var deg = Math.round(rad * (180 / Math.PI)) + 90;
          while (deg < -180) deg += 360;
          while (deg > 180) deg -= 360;

          // Snap to cardinal angles
          if (Math.abs(deg) <= 3) deg = 0;
          else if (Math.abs(deg - 45) <= 3) deg = 45;
          else if (Math.abs(deg + 45) <= 3) deg = -45;
          else if (Math.abs(deg - 90) <= 3) deg = 90;
          else if (Math.abs(deg + 90) <= 3) deg = -90;
          else if (Math.abs(deg - 180) <= 3 || Math.abs(deg + 180) <= 3) deg = 180;

          activeSelectedTarget.style.setProperty('transform', 'rotate(' + deg + 'deg)', 'important');
          activeSelectedTarget.style.setProperty('transform-origin', 'center center', 'important');
          selectionBox.style.transform = 'rotate(' + deg + 'deg)';
          selectionBox.style.transformOrigin = 'center center';

          if (dragHud) {
            dragHud.innerHTML = '<span style="font-size:13px;">⟳</span> Angle: ' + deg + '°';
            dragHud.style.left = Math.max(10, clientX + 15) + 'px';
            dragHud.style.top = Math.max(10, clientY - 30) + 'px';
            dragHud.style.display = 'inline-flex';
          }
        }

        function onPointerUp(upEvt) {
          isRotating = false;
          rotateKnob.style.cursor = 'grab';
          window.removeEventListener('mousemove', onPointerMove, true);
          window.removeEventListener('mouseup', onPointerUp, true);
          hideDragIndicator();

          if (!activeSelectedTarget) return;
          var elemId = (activeSelectedTarget.getAttribute && activeSelectedTarget.getAttribute('data-elem-id')) || activeSelectedTarget.id;
          var finalAngle = getElementRotation(activeSelectedTarget);
          try {
            window.parent.postMessage({
              type: 'WBG_ELEMENT_ROTATED',
              elemId: elemId,
              rotate: finalAngle
            }, '*');
          } catch (err) {}
        }

        window.addEventListener('mousemove', onPointerMove, true);
        window.addEventListener('mouseup', onPointerUp, true);
      });
    }

    function setupEdgeDragging() {
      if (!selectionBox) return;
      var edgeBars = selectionBox.querySelectorAll('.wbg-edge-bar');
      edgeBars.forEach(function (bar) {
        bar.addEventListener('mousedown', function (e) {
          if (e.button !== 0) return;
          e.preventDefault();
          e.stopPropagation();
          if (!activeSelectedTarget) return;

          var target = activeSelectedTarget;
          var elemId = activeSelectedElemId;
          var startX = e.clientX;
          var startY = e.clientY;
          var origLeft = target.offsetLeft;
          var origTop = target.offsetTop;
          var isMoving = false;

          target.classList.add('wbg-dragging-active');
          document.body.style.cursor = 'grabbing';
          bar.style.cursor = 'grabbing';

          function onPointerMove(moveEvt) {
            var dx = moveEvt.clientX - startX;
            var dy = moveEvt.clientY - startY;

            if (!isMoving && Math.hypot(dx, dy) > 2) {
              isMoving = true;
              hideBadge();
            }

            if (isMoving) {
              if (moveEvt.cancelable) moveEvt.preventDefault();
              var newLeft = Math.round(origLeft + dx);
              var newTop = Math.round(origTop + dy);

              target.style.setProperty('left', newLeft + 'px', 'important');
              target.style.setProperty('top', newTop + 'px', 'important');

              var curRot = getElementRotation(target);
              if (curRot) {
                target.style.setProperty('transform', 'rotate(' + curRot + 'deg)', 'important');
              } else {
                target.style.setProperty('transform', 'none', 'important');
              }

              showDragIndicator(target, newLeft, newTop);
              updateSelectionBox(target, activeSelectedType);
            }
          }

          function onPointerUp(upEvt) {
            document.body.style.cursor = '';
            bar.style.cursor = 'move';
            target.classList.remove('wbg-dragging-active');
            window.removeEventListener('mousemove', onPointerMove, true);
            window.removeEventListener('mouseup', onPointerUp, true);
            hideDragIndicator();

            if (isMoving && activeSelectedTarget) {
              var finalLeft = target.offsetLeft;
              var finalTop = target.offsetTop;
              updateSelectionBox(target, activeSelectedType);

              try {
                window.parent.postMessage({
                  type: 'WBG_ELEMENT_MOVED',
                  elemId: elemId,
                  left: finalLeft,
                  top: finalTop,
                  isAddedText: target.classList.contains('wbg-added-text-elem')
                }, '*');
              } catch (err) {}
            }
          }

          window.addEventListener('mousemove', onPointerMove, true);
          window.addEventListener('mouseup', onPointerUp, true);
        });
      });
    }

    function setupHandleResizing() {
      if (!selectionBox) return;
      var handles = selectionBox.querySelectorAll('.wbg-handle');
      handles.forEach(function (handleEl) {
        handleEl.addEventListener('mousedown', function (e) {
          if (e.button !== 0) return;
          e.preventDefault();
          e.stopPropagation();
          if (!activeSelectedTarget) return;

          var handleType = handleEl.getAttribute('data-handle');
          var target = activeSelectedTarget;
          var elemId = activeSelectedElemId;
          var type = activeSelectedType;
          var atom = target.querySelector('.tn-atom') || target;

          var rect = target.getBoundingClientRect();
          var cx = rect.left + rect.width / 2;
          var cy = rect.top + rect.height / 2;
          var startX = e.clientX;
          var startY = e.clientY;

          var initialDist = Math.hypot(startX - cx, startY - cy);
          if (initialDist < 10) initialDist = 10;

          var startWidth = target.offsetWidth || rect.width;
          var startHeight = target.offsetHeight || rect.height;
          var startFontSize = parseFloat(window.getComputedStyle(atom).fontSize) || 20;
          var deg = getElementRotation(target);
          var rad = (deg * Math.PI) / 180;

          var isCorner = (handleType === 'nw' || handleType === 'ne' || handleType === 'se' || handleType === 'sw');
          var isHorizontal = (handleType === 'e' || handleType === 'w');
          var isVertical = (handleType === 'n' || handleType === 's');

          var finalFontSize = startFontSize;
          var finalWidth = startWidth;
          var finalHeight = startHeight;
          var isResizing = false;

          var origCursor = window.getComputedStyle(handleEl).cursor;
          document.body.style.cursor = origCursor;

          function onPointerMove(moveEvt) {
            var curX = moveEvt.clientX;
            var curY = moveEvt.clientY;
            if (!isResizing && Math.hypot(curX - startX, curY - startY) > 2) {
              isResizing = true;
              hideBadge();
            }
            if (!isResizing) return;
            if (moveEvt.cancelable) moveEvt.preventDefault();

            if (isCorner) {
              var curDist = Math.hypot(curX - cx, curY - cy);
              var scale = curDist / initialDist;
              scale = Math.max(0.2, Math.min(5.0, scale));

              if (type === 'text' || (!type && atom.classList.contains('wbg-editable-text'))) {
                var newFs = Math.round(startFontSize * scale);
                newFs = Math.max(10, Math.min(160, newFs));
                finalFontSize = newFs;
                atom.style.setProperty('font-size', newFs + 'px', 'important');

                var newW = Math.round(startWidth * scale);
                newW = Math.max(40, Math.min(1800, newW));
                finalWidth = newW;
                target.style.setProperty('width', newW + 'px', 'important');

                if (dragHud) {
                  dragHud.innerHTML = '<span style="font-size:13px;">🗚</span> Font Size: ' + newFs + 'px &nbsp; (' + newW + 'px)';
                  dragHud.style.left = Math.max(10, curX + 15) + 'px';
                  dragHud.style.top = Math.max(10, curY - 30) + 'px';
                  dragHud.style.display = 'inline-flex';
                }
              } else {
                var newW = Math.round(startWidth * scale);
                var newH = Math.round(startHeight * scale);
                newW = Math.max(40, Math.min(2000, newW));
                newH = Math.max(40, Math.min(2000, newH));
                finalWidth = newW;
                finalHeight = newH;
                target.style.setProperty('width', newW + 'px', 'important');
                target.style.setProperty('height', newH + 'px', 'important');
                var subImg = target.querySelector('img');
                if (subImg) {
                  subImg.style.setProperty('width', '100%', 'important');
                  subImg.style.setProperty('height', '100%', 'important');
                  subImg.style.setProperty('object-fit', 'cover', 'important');
                }

                if (dragHud) {
                  dragHud.innerHTML = '<span style="font-size:13px;">📐</span> ' + newW + ' × ' + newH + 'px';
                  dragHud.style.left = Math.max(10, curX + 15) + 'px';
                  dragHud.style.top = Math.max(10, curY - 30) + 'px';
                  dragHud.style.display = 'inline-flex';
                }
              }
            } else if (isHorizontal) {
              var ux = Math.cos(rad);
              var uy = Math.sin(rad);
              var vx = curX - cx;
              var vy = curY - cy;
              var proj = vx * ux + vy * uy;
              var newW = Math.round(Math.abs(proj) * 2);
              newW = Math.max(40, Math.min(2000, newW));
              finalWidth = newW;
              target.style.setProperty('width', newW + 'px', 'important');

              if (dragHud) {
                dragHud.innerHTML = '<span style="font-size:13px;">↔</span> Width: ' + newW + 'px';
                dragHud.style.left = Math.max(10, curX + 15) + 'px';
                dragHud.style.top = Math.max(10, curY - 30) + 'px';
                dragHud.style.display = 'inline-flex';
              }
            } else if (isVertical) {
              var vx_local = -Math.sin(rad);
              var vy_local = Math.cos(rad);
              var vx = curX - cx;
              var vy = curY - cy;
              var proj = vx * vx_local + vy * vy_local;
              var newH = Math.round(Math.abs(proj) * 2);
              newH = Math.max(20, Math.min(2000, newH));
              finalHeight = newH;
              target.style.setProperty('height', newH + 'px', 'important');
              target.style.setProperty('min-height', newH + 'px', 'important');

              if (dragHud) {
                dragHud.innerHTML = '<span style="font-size:13px;">↕</span> Height: ' + newH + 'px';
                dragHud.style.left = Math.max(10, curX + 15) + 'px';
                dragHud.style.top = Math.max(10, curY - 30) + 'px';
                dragHud.style.display = 'inline-flex';
              }
            }

            updateSelectionBox(target, type);
          }

          function onPointerUp(upEvt) {
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', onPointerMove, true);
            window.removeEventListener('mouseup', onPointerUp, true);
            hideDragIndicator();

            if (isResizing && activeSelectedTarget) {
              updateSelectionBox(target, type);

              try {
                window.parent.postMessage({
                  type: 'WBG_ELEMENT_RESIZED',
                  elemId: elemId,
                  fontSize: isCorner && (type === 'text' || atom.classList.contains('wbg-editable-text')) ? finalFontSize : undefined,
                  width: finalWidth,
                  height: finalHeight,
                  isAddedText: target.classList.contains('wbg-added-text-elem'),
                  isAddedImage: target.classList.contains('wbg-added-image-elem'),
                  isSlider: target.classList.contains('wbg-added-slider-elem'),
                  isScrollGallery: target.classList.contains('wbg-added-scroll-gallery-elem'),
                  elementType: type
                }, '*');
              } catch (err) {}
            }
          }

          window.addEventListener('mousemove', onPointerMove, true);
          window.addEventListener('mouseup', onPointerUp, true);
        });
      });
    }

    setupEdgeDragging();
    setupHandleResizing();

    function makeElementDraggable(wrapper, elemId) {
      if (!window.__wbg_is_admin) return;
      if (!wrapper || wrapper.getAttribute('data-wbg-draggable') === 'true') return;
      wrapper.setAttribute('data-wbg-draggable', 'true');

      var startX = 0, startY = 0;
      var origLeft = 0, origTop = 0;
      var isDragging = false;

      function onPointerDown(e) {
        if (window.self === window.top) return;
        var atom = wrapper.querySelector('.tn-atom') || wrapper;
        if (atom.classList.contains('wbg-editing-active')) return;
        if (e.target.closest('button, a, input, select, textarea, .popup-enter, #wbg-rotate-knob, #wbg-image-replace-btn, .wbg-handle, .wbg-edge-bar')) return;

        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        var clientY = e.touches ? e.touches[0].clientY : e.clientY;

        startX = clientX;
        startY = clientY;
        isDragging = false;

        origLeft = wrapper.offsetLeft;
        origTop = wrapper.offsetTop;

        function onPointerMove(moveEvt) {
          var curX = moveEvt.touches ? moveEvt.touches[0].clientX : moveEvt.clientX;
          var curY = moveEvt.touches ? moveEvt.touches[0].clientY : moveEvt.clientY;
          var dx = curX - startX;
          var dy = curY - startY;

          if (!isDragging && Math.hypot(dx, dy) > 4) {
            isDragging = true;
            wrapper.classList.add('wbg-dragging-active');
            hideBadge();
            var targetType = wrapper.classList.contains('wbg-added-scroll-gallery-elem') ? 'scroll-gallery' : wrapper.classList.contains('wbg-added-slider-elem') ? 'slider' : (wrapper.querySelector('img') || wrapper.tagName === 'IMG' || wrapper.classList.contains('wbg-editable-image')) ? 'image' : 'text';
            selectElement(wrapper, elemId, targetType);
          }

          if (isDragging) {
            if (moveEvt.cancelable) moveEvt.preventDefault();
            var newLeft = Math.round(origLeft + dx);
            var newTop = Math.round(origTop + dy);
            wrapper.style.setProperty('left', newLeft + 'px', 'important');
            wrapper.style.setProperty('top', newTop + 'px', 'important');
            var curRot = getElementRotation(wrapper);
            if (curRot) {
              wrapper.style.setProperty('transform', 'rotate(' + curRot + 'deg)', 'important');
            } else {
              wrapper.style.setProperty('transform', 'none', 'important');
            }
            showDragIndicator(wrapper, newLeft, newTop);
            if (typeof updateSelectionBox === 'function') {
              updateSelectionBox(wrapper, activeSelectedType);
            }
          }
        }

        function onPointerUp(upEvt) {
          window.removeEventListener('mousemove', onPointerMove, true);
          window.removeEventListener('mouseup', onPointerUp, true);
          window.removeEventListener('touchmove', onPointerMove, true);
          window.removeEventListener('touchend', onPointerUp, true);

          hideDragIndicator();

          if (isDragging) {
            wrapper.classList.remove('wbg-dragging-active');
            upEvt.preventDefault();
            upEvt.stopPropagation();

            var finalLeft = wrapper.offsetLeft;
            var finalTop = wrapper.offsetTop;

            if (typeof updateSelectionBox === 'function') {
              updateSelectionBox(wrapper, activeSelectedType);
            }

            try {
              window.parent.postMessage({
                type: 'WBG_ELEMENT_MOVED',
                elemId: elemId,
                left: finalLeft,
                top: finalTop,
                isAddedText: wrapper.classList.contains('wbg-added-text-elem')
              }, '*');
            } catch (err) {}
          }
        }

        window.addEventListener('mousemove', onPointerMove, true);
        window.addEventListener('mouseup', onPointerUp, true);
        window.addEventListener('touchmove', onPointerMove, { passive: false, capture: true });
        window.addEventListener('touchend', onPointerUp, true);
      }

      wrapper.addEventListener('mousedown', onPointerDown);
      wrapper.addEventListener('touchstart', onPointerDown, { passive: true });
    }

    if (window.self !== window.top) {
      document.addEventListener('mouseover', function (e) {
        if (!window.__wbg_is_admin) return;
        var target = e.target;
        if (target.closest('.popup-enter, #audio-control, .t-submit, button, a, #wbg-preview-bar, .seal-monogram, [data-animate-sbs-event="click"]')) {
          hideBadge();
          return;
        }
        var img = target.closest('.wbg-editable-image, img, [data-elem-type="image"]');
        if (img && !img.closest('.t1148__item, button, a')) {
          showBadgeFor(img, 'image');
          return;
        }
        var textAtom = target.closest('.wbg-editable-text, .tn-atom, h1, h2, h3, p');
        if (textAtom && !textAtom.querySelector('img, svg, iframe') && (textAtom.innerText || '').trim().length > 0) {
          showBadgeFor(textAtom, 'text');
          return;
        }
        hideBadge();
      }, true);

      document.addEventListener('mouseleave', hideBadge);

      window.addEventListener('scroll', function () {
        if (currentHoveredEl) {
          showBadgeFor(currentHoveredEl, currentHoveredType);
        } else {
          hideBadge();
        }
      }, { passive: true });
    }

    // Attach hover effects to editable elements
    var markEditable = function () {
      if (window.self === window.top) return;

      // 1. Text elements
      document.querySelectorAll('.tn-atom, h1, h2, h3, p, .std-names, .std-heading-text, .pl-cap-names, .pp-nm, [data-elem-type="text"] .tn-atom, .wbg-added-text-elem').forEach(function (el) {
        if (el.closest('.popup-enter, #audio-control, .t-submit, button, a, #wbg-preview-bar, .seal-monogram, [data-animate-sbs-event="click"]')) {
          return;
        }
        if (!el.querySelector('img, svg, iframe') && (el.innerText || '').trim().length > 0) {
          el.classList.add('wbg-editable-text');
          var wrapper = el.closest('.tn-elem') || el;
          var elemId = (wrapper && wrapper.getAttribute('data-elem-id')) || el.getAttribute('field') || el.id;
          if (wrapper && elemId) {
            makeElementDraggable(wrapper, elemId);
          }
        }
      });

      // 2. Images
      document.querySelectorAll('img, .tn-elem[data-elem-type="image"] .tn-atom, .tn-elem[data-elem-type="image"], .pl-img, .t-bgimg').forEach(function (el) {
        if (el.closest('.popup-enter, #audio-control, .t-submit, button, a, #wbg-preview-bar, .seal-monogram, [data-animate-sbs-event="click"]')) {
          return;
        }
        var w = el.naturalWidth || el.clientWidth || 0;
        var h = el.naturalHeight || el.clientHeight || 0;
        if ((w > 0 && w < 12) || (h > 0 && h < 12)) return;
        el.classList.add('wbg-editable-image');
        var wrapper = el.closest('.tn-elem') || el;
        var elemId = (wrapper && wrapper.getAttribute('data-elem-id')) || el.getAttribute('data-elem-id') || el.id;
        if (wrapper && elemId) {
          makeElementDraggable(wrapper, elemId);
        }
      });
    };

    if (window.self !== window.top) {
      markEditable();
      setTimeout(markEditable, 500);
      setTimeout(markEditable, 1200);
      setTimeout(markEditable, 2500);
    }

    // Hidden File Picker for Universal In-Place Image Upload
    var universalFilePicker = document.getElementById('wbg-img-file-picker');
    if (window.self !== window.top && !universalFilePicker) {
      universalFilePicker = document.createElement('input');
      universalFilePicker.type = 'file';
      universalFilePicker.id = 'wbg-img-file-picker';
      universalFilePicker.accept = 'image/*';
      universalFilePicker.style.display = 'none';
      document.body.appendChild(universalFilePicker);
    }

    var activeImageForUpload = null;
    if (universalFilePicker) {
      universalFilePicker.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file || !activeImageForUpload) return;
        var reader = new FileReader();
        reader.onload = function (evt) {
          var dataUrl = evt.target.result;
          if (!dataUrl) return;

          if (activeImageForUpload.tagName === 'IMG') {
            activeImageForUpload.src = dataUrl;
            activeImageForUpload.setAttribute('data-original', dataUrl);
            activeImageForUpload.style.objectFit = 'cover';
          } else {
            var subImg = activeImageForUpload.querySelector('img');
            if (subImg) {
              subImg.src = dataUrl;
              subImg.setAttribute('data-original', dataUrl);
              subImg.style.objectFit = 'cover';
            } else {
              activeImageForUpload.style.setProperty('background-image', 'url("' + dataUrl + '")', 'important');
              activeImageForUpload.style.setProperty('background-size', 'cover', 'important');
            }
          }

          var galleryItem = activeImageForUpload.closest('.t1148__item');
          if (galleryItem) {
            var allItems = Array.from(galleryItem.parentNode ? galleryItem.parentNode.querySelectorAll('.t1148__item') : []);
            var slideIdx = allItems.indexOf(galleryItem);
            try {
              window.parent.postMessage({
                type: 'WBG_GALLERY_PHOTO_REPLACED',
                galleryIndex: slideIdx >= 0 ? slideIdx : 0,
                src: dataUrl
              }, '*');
            } catch (err) {}
            return;
          }

          var addedScroll = activeImageForUpload.closest('.wbg-added-scroll-gallery-elem');
          if (addedScroll) {
            var sId = addedScroll.getAttribute('data-scroll-id');
            var card = activeImageForUpload.closest('div[style*="flex"]');
            var allCards = Array.from(addedScroll.querySelectorAll('.wbg-scroll-track > div'));
            var cardIdx = allCards.indexOf(card);
            try {
              window.parent.postMessage({
                type: 'WBG_ADDED_SCROLL_PHOTO_REPLACED',
                scrollId: sId,
                photoIndex: cardIdx >= 0 ? cardIdx : 0,
                src: dataUrl
              }, '*');
            } catch (err) {}
            return;
          }

          var elem = activeImageForUpload.closest('.tn-elem') || activeImageForUpload;
          var elemId = (elem && elem.getAttribute) 
            ? (elem.getAttribute('data-elem-id') || elem.getAttribute('id'))
            : (activeImageForUpload.getAttribute('data-elem-id') || activeImageForUpload.getAttribute('imgfield') || activeImageForUpload.id || 'custom_img_' + Date.now());

          var isCouplePhoto = tracked.photoNodes.indexOf(activeImageForUpload) !== -1 || (activeImageForUpload.closest && activeImageForUpload.closest('.pl-img'));

          try {
            window.parent.postMessage({
              type: 'WBG_IMAGE_EDIT',
              elemId: elemId,
              src: dataUrl,
              isCouplePhoto: !!isCouplePhoto
            }, '*');
          } catch (err) {}
        };
        reader.readAsDataURL(file);
        e.target.value = '';
      });
    }

    // Keyboard Delete & Backspace support for currently selected elements & gallery photos
    document.addEventListener('keydown', function (e) {
      if (!window.__wbg_is_admin) return;
      if (e.key !== 'Delete' && e.key !== 'Backspace') return;
      var activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }

      if (!activeSelectedTarget) return;

      e.preventDefault();
      e.stopPropagation();

      if (activeSelectedType === 'gallery-photo' || activeSelectedTarget.classList.contains('t1148__item')) {
        var allItems = Array.from(activeSelectedTarget.parentNode ? activeSelectedTarget.parentNode.querySelectorAll('.t1148__item') : []);
        var slideIdx = allItems.indexOf(activeSelectedTarget);
        try {
          window.parent.postMessage({
            type: 'WBG_DELETE_GALLERY_PHOTO',
            galleryIndex: slideIdx >= 0 ? slideIdx : 0
          }, '*');
        } catch (err) {}
        hideSelectionBox();
        return;
      }

      if (activeSelectedElemId) {
        try {
          window.parent.postMessage({
            type: 'WBG_DELETE_ELEMENT_REQUEST',
            elemId: activeSelectedElemId
          }, '*');
        } catch (err) {}
        hideSelectionBox();
      }
    });

    document.addEventListener('click', function (e) {
      if (!window.__wbg_is_admin) return;
      var target = e.target;

      // Do NOT intercept or modify buttons, wax seals, audio controls, or links!
      if (target.closest('.popup-enter, #audio-control, .t-submit, button, a, #wbg-preview-bar, .seal-monogram, [data-animate-sbs-event="click"]')) {
        return;
      }

      // Check for carousel slides (e.g. Dolce Vita built-in scroll gallery) or couple photos
      var carouselItem = target.closest('.t1148__item');
      var dolceCouple = target.closest('#rec2442651163') || (target.getAttribute && target.getAttribute('data-elem-id') === '1776926930895000002');
      if (carouselItem && window.self !== window.top) {
        e.preventDefault();
        e.stopPropagation();
        hideBadge();
        var allItems = Array.from(carouselItem.parentNode ? carouselItem.parentNode.querySelectorAll('.t1148__item') : []);
        var slideIdx = allItems.indexOf(carouselItem);
        var slideImg = carouselItem.querySelector('img') || carouselItem;
        activeImageForUpload = slideImg;
        var slideElemId = 'rec2442651103_photo_' + (slideIdx >= 0 ? slideIdx : 0);
        selectElement(carouselItem, slideElemId, 'gallery-photo');
        try {
          window.parent.postMessage({
            type: 'WBG_GALLERY_PHOTO_SELECTED',
            elemId: slideElemId,
            galleryIndex: slideIdx >= 0 ? slideIdx : 0,
            blockId: 'rec2442651103',
            src: slideImg.getAttribute('src') || slideImg.getAttribute('data-original') || '',
            position: { left: carouselItem.offsetLeft, top: carouselItem.offsetTop }
          }, '*');
        } catch (err) {}
        return;
      }
      if (dolceCouple) {
        try {
          window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'bottomPhoto', couplePhoto: true }, '*');
        } catch (err) {}
        return;
      }

      // Check if user clicked on custom added scroll gallery (Scroll Images)
      var clickedScroll = target.closest('.wbg-added-scroll-gallery-elem');
      if (clickedScroll && !target.closest('button, #wbg-rotate-knob, .wbg-handle, .wbg-edge-bar') && window.self !== window.top) {
        e.preventDefault();
        e.stopPropagation();
        hideBadge();
        var gId = clickedScroll.getAttribute('data-scroll-id') || clickedScroll.getAttribute('data-elem-id');
        selectElement(clickedScroll, gId, 'scroll-gallery');
        try {
          window.parent.postMessage({
            type: 'WBG_SCROLL_GALLERY_SELECTED',
            elemId: gId,
            position: { left: clickedScroll.offsetLeft, top: clickedScroll.offsetTop },
            rotate: getElementRotation(clickedScroll)
          }, '*');
        } catch (err) {}
        return;
      }

      // Check if user clicked on custom added slide carousel
      var clickedSlider = target.closest('.wbg-added-slider-elem');
      if (clickedSlider && !target.closest('button, #wbg-rotate-knob') && window.self !== window.top) {
        e.preventDefault();
        e.stopPropagation();
        hideBadge();
        var sId = clickedSlider.getAttribute('data-slider-id') || clickedSlider.getAttribute('data-elem-id');
        selectElement(clickedSlider, sId, 'slider');
        try {
          window.parent.postMessage({
            type: 'WBG_SLIDER_SELECTED',
            elemId: sId,
            position: { left: clickedSlider.offsetLeft, top: clickedSlider.offsetTop },
            rotate: getElementRotation(clickedSlider)
          }, '*');
        } catch (err) {}
        return;
      }

      // Universal Click to Select Any Image (Allows moving and rotating, does NOT open file upload dialog!)
      var clickedImg = target.closest('.wbg-editable-image, img, [data-elem-type="image"], .wbg-added-image-elem');
      if (clickedImg && !target.closest('.t1148__item, button, a, #wbg-image-replace-btn, #wbg-rotate-knob') && window.self !== window.top) {
        e.preventDefault();
        e.stopPropagation();
        hideBadge();
        var wrapper = clickedImg.closest('.tn-elem') || clickedImg;
        var elemId = (wrapper && wrapper.getAttribute('data-elem-id')) || clickedImg.getAttribute('data-elem-id') || clickedImg.id;
        var imgNode = clickedImg.tagName === 'IMG' ? clickedImg : (clickedImg.querySelector('img') || clickedImg);
        var src = (imgNode && (imgNode.getAttribute('src') || imgNode.getAttribute('data-original'))) || '';

        activeImageForUpload = imgNode;
        selectElement(wrapper, elemId, 'image');

        try {
          window.parent.postMessage({
            type: 'WBG_IMAGE_SELECTED',
            elemId: elemId,
            src: src,
            position: { left: wrapper.offsetLeft, top: wrapper.offsetTop },
            rotate: getElementRotation(wrapper)
          }, '*');
        } catch (err) {}
        return;
      }

      var atom = target.closest('.tn-atom') || target;
      var text = (atom.innerText || '').toLowerCase();
      var role = atom.getAttribute('data-wbg-role') || '';
      var elem = target.closest('.tn-elem') || target;
      var elemId = (elem && elem.getAttribute) ? elem.getAttribute('data-elem-id') : '';
      var fieldAttr = (atom && atom.getAttribute) ? atom.getAttribute('field') : '';
      var dataKey = null;

      var field = 'wording';
      if (elemId === '1782990313526000001' || fieldAttr === 'tn_text_1782990313526000001') {
        field = 'names';
        dataKey = 'ceremonyTitle';
      } else if (elemId === '1782990372985000002' || fieldAttr === 'tn_text_1782990372985000002') {
        field = 'names';
        dataKey = 'partner1';
      } else if (elemId === '1782990570479000010' || fieldAttr === 'tn_text_1782990570479000010') {
        field = 'names';
        dataKey = 'partner2';
      } else if (elemId === '1782990549039000006' || fieldAttr === 'tn_text_1782990549039000006') {
        field = 'names';
        dataKey = 'connector';
      } else if (elemId === '1782990453976000005' || fieldAttr === 'tn_text_1782990453976000005') {
        field = 'names';
        dataKey = 'groomParents';
      } else if (elemId === '1782990435802000004' || fieldAttr === 'tn_text_1782990435802000004') {
        field = 'names';
        dataKey = 'groomParentsSubtitle';
      } else if (elemId === '1782990570479000008' || fieldAttr === 'tn_text_1782990570479000008') {
        field = 'names';
        dataKey = 'brideParents';
      } else if (elemId === '1782990570479000009' || fieldAttr === 'tn_text_1782990570479000009') {
        field = 'names';
        dataKey = 'brideParentsSubtitle';
      } else if ((elemId === '1782990740288000012' || fieldAttr === 'tn_text_1782990740288000012') && atom.closest('#rec2684632503')) {
        field = 'wording';
        dataKey = 'salutation';
      } else if (elemId === '1783335402884' || fieldAttr === 'tn_text_1782990616505000011') {
        field = 'wording';
        dataKey = 'welcomeMessage';
      } else if (elemId === '1782990287805' || fieldAttr === 'tn_text_1783290377990000001') {
        field = 'wording';
        dataKey = 'quranVerse';
      } else if (elemId === '1783290435575000002' || fieldAttr === 'tn_text_1783290435575000002') {
        field = 'wording';
        dataKey = 'quranRef';
      } else if (elemId === '1783246802492000001' || fieldAttr === 'tn_text_1783246802492000001') {
        field = 'details';
        dataKey = 'dressCode';
      } else if (elemId === '1783246870761000002' || fieldAttr === 'tn_text_1783246870761000002') {
        field = 'details';
        dataKey = 'dressCodeSubtitle';
      } else if (elemId === '1782997572531000001' || fieldAttr === 'tn_text_1782997572531000001') {
        field = 'details';
        dataKey = 'dressCodeNote';
      } else if (elemId === '1785227556011000003' || fieldAttr === 'tn_text_1784905898051000001') {
        field = 'details';
        dataKey = 'rsvpDeadlineMessage';
      } else if (elemId === '1785086272369' || fieldAttr === 'tn_text_1783006367834000001') {
        field = 'wording';
        dataKey = 'closingText';
      } else if (tracked.partner1Nodes.includes(atom) || tracked.partner2Nodes.includes(atom) || tracked.coupleNodes.includes(atom) || tracked.multilineCoupleNodes.includes(atom) || role.includes('partner') || role.includes('couple')) {
        field = 'names';
      } else if (tracked.dateNodes.includes(atom) || text.includes('date') || text.includes('reveal') || text.includes('célébration') || text.includes('celebration') || role === 'date') {
        field = 'date';
      } else if (tracked.venueNodes.includes(atom) || text.includes('location') || text.includes('venue') || text.includes('itin') || text.includes('lieu') || role === 'venue' || role === 'address') {
        field = 'venue';
      } else if (target.tagName === 'IMG' && tracked.photoNodes.includes(target)) {
        field = 'photo';
      } else if (text.includes('reception') || text.includes('ceremony') || text.includes('dinner') || text.includes('party') || text.includes('timeline') || text.includes('chronologie')) {
        field = 'schedule';
      } else if (text.includes('dress code') || text.includes('attire') || text.includes('gift') || role === 'dresscode') {
        field = 'details';
      } else {
        field = 'wording';
      }

      // Notify parent to open corresponding customizer tab
      try {
        window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: field, text: atom.innerText }, '*');
      } catch (err) {}

      // If user clicked inside the studio iframe on a text atom, allow direct inline editing & send computed styles to inspector
      var isTextAtom = !atom.querySelector('img, svg, iframe') && (atom.innerText || '').trim().length > 0;
      if (window.self !== window.top && isTextAtom && atom.tagName !== 'IMG' && atom.tagName !== 'IFRAME') {
        var comp = window.getComputedStyle(atom);
        var rgbColor = comp.color || '';
        var parseColorToHex = function (rgb) {
          if (!rgb) return '#000000';
          if (rgb.charAt(0) === '#') return rgb;
          var m = rgb.match(/\d+/g);
          if (!m || m.length < 3) return rgb;
          return '#' + ((1 << 24) + (parseInt(m[0]) << 16) + (parseInt(m[1]) << 8) + parseInt(m[2])).toString(16).slice(1);
        };
        var computedStyle = {
          fontSize: parseInt(comp.fontSize) || 18,
          color: parseColorToHex(rgbColor),
          fontFamily: comp.fontFamily ? comp.fontFamily.replace(/["']/g, '') : '',
          letterSpacing: comp.letterSpacing === 'normal' ? '0px' : comp.letterSpacing,
          lineHeight: comp.lineHeight,
          fontWeight: comp.fontWeight,
          fontStyle: comp.fontStyle,
          textTransform: comp.textTransform || 'none',
          textAlign: comp.textAlign
        };

        var wrapper = atom.closest('.tn-elem') || atom;
        var pos = { left: wrapper.offsetLeft, top: wrapper.offsetTop };
        var isAdded = wrapper.classList.contains('wbg-added-text-elem');
        selectElement(wrapper, elemId || fieldAttr, 'text');

        try {
          window.parent.postMessage({
            type: 'WBG_TEXT_SELECTED',
            elemId: elemId || fieldAttr,
            fieldAttr: fieldAttr,
            field: field,
            dataKey: dataKey,
            text: atom.innerText,
            style: computedStyle,
            position: pos,
            rotate: getElementRotation(wrapper),
            isAddedText: isAdded
          }, '*');
        } catch (err) {}

        // Single-click selects text without locking it into contentEditable
        // This allows dragging the text element directly, dragging between dots, or resizing via dots
      }

      // Hide selection box if clicked outside any editable element or controls
      if (!target.closest('.wbg-editable-text, .wbg-editable-image, .wbg-added-text-elem, .wbg-added-slider-elem, .wbg-added-image-elem, .wbg-added-scroll-gallery-elem, #wbg-selection-box, #wbg-rotate-knob, #wbg-image-replace-btn, .wbg-handle, .wbg-edge-bar')) {
        hideSelectionBox();
      }
    }, true);

    // Double-click to enter inline text editing mode (Canva / PowerPoint style)
    function enableInlineTextEdit(atomToEdit) {
      if (!window.__wbg_is_admin) return;
      if (!atomToEdit) return;
      var elem = atomToEdit.closest('.tn-elem') || atomToEdit;
      var elemId = (elem && elem.getAttribute) ? elem.getAttribute('data-elem-id') : '';
      var fieldAttr = (atomToEdit && atomToEdit.getAttribute) ? atomToEdit.getAttribute('field') : '';
      var isAdded = elem.classList.contains('wbg-added-text-elem');

      hideBadge();
      hideSelectionBox();
      atomToEdit.contentEditable = 'true';
      atomToEdit.classList.add('wbg-editing-active');
      atomToEdit.focus();

      var onBlur = function () {
        atomToEdit.contentEditable = 'false';
        atomToEdit.classList.remove('wbg-editing-active');
        atomToEdit.removeEventListener('blur', onBlur);
        try {
          window.parent.postMessage({
            type: 'WBG_INLINE_EDIT',
            elemId: elemId,
            fieldAttr: fieldAttr,
            text: atomToEdit.innerText,
            isAddedText: isAdded
          }, '*');
        } catch (err) {}
        selectElement(elem, elemId || fieldAttr, 'text');
      };
      atomToEdit.addEventListener('blur', onBlur);
    }

    document.addEventListener('dblclick', function (e) {
      if (!window.__wbg_is_admin) return;
      if (window.self === window.top) return;
      var textEl = e.target.closest('.wbg-editable-text, .tn-atom, .wbg-added-text-elem, h1, h2, h3, p');
      if (textEl && !textEl.querySelector('img, svg, iframe') && (textEl.innerText || '').trim().length > 0) {
        var atomToEdit = textEl.classList.contains('tn-atom') ? textEl : (textEl.querySelector('.tn-atom') || textEl);
        enableInlineTextEdit(atomToEdit);
      }
    }, true);

    window.addEventListener('scroll', function () {
      if (activeSelectedTarget) updateSelectionBox(activeSelectedTarget, activeSelectedType);
    }, { passive: true });

    window.addEventListener('resize', function () {
      if (activeSelectedTarget) updateSelectionBox(activeSelectedTarget, activeSelectedType);
    });
  }

  window.__wbg_applyCustomization = applyCustomization;
  window.__wbg_rediscover = discoverElements;

  window.addEventListener('message', function (event) {
    if (!event.data || typeof event.data !== 'object') return;

    if (event.data.type === 'WBG_UPDATE_CUSTOMIZATION') {
      applyCustomization(event.data.data);
    } else if (event.data.type === 'WBG_UPDATE_STYLE') {
      var sId = event.data.elemId;
      var st = event.data.style;
      if (sId && st) {
        var targetEl = document.querySelector("[data-elem-id='" + sId + "'] .tn-atom") ||
                       document.querySelector("[field='" + sId + "']") ||
                       document.querySelector("[data-elem-id='" + sId + "']") ||
                       document.getElementById(sId);
        if (targetEl) {
          if (st.fontSize !== undefined) targetEl.style.setProperty('font-size', (typeof st.fontSize === 'number' ? st.fontSize + 'px' : st.fontSize), 'important');
          if (st.color) targetEl.style.setProperty('color', st.color, 'important');
          if (st.fontFamily) targetEl.style.setProperty('font-family', st.fontFamily, 'important');
          if (st.letterSpacing !== undefined) targetEl.style.setProperty('letter-spacing', (typeof st.letterSpacing === 'number' ? st.letterSpacing + 'px' : st.letterSpacing), 'important');
          if (st.lineHeight) targetEl.style.setProperty('line-height', st.lineHeight, 'important');
          if (st.fontWeight) targetEl.style.setProperty('font-weight', st.fontWeight, 'important');
          if (st.fontStyle) targetEl.style.setProperty('font-style', st.fontStyle, 'important');
          if (st.textTransform) targetEl.style.setProperty('text-transform', st.textTransform, 'important');
          if (st.textAlign) targetEl.style.setProperty('text-align', st.textAlign, 'important');
          if (st.width !== undefined) {
            var wEl = targetEl.classList.contains('tn-elem') ? targetEl : (targetEl.closest('.tn-elem') || targetEl);
            wEl.style.setProperty('width', (typeof st.width === 'number' ? st.width + 'px' : st.width), 'important');
          }
          if (st.height !== undefined) {
            var hEl = targetEl.classList.contains('tn-elem') ? targetEl : (targetEl.closest('.tn-elem') || targetEl);
            hEl.style.setProperty('height', (typeof st.height === 'number' ? st.height + 'px' : st.height), 'important');
          }
        }
      }
    } else if (event.data.type === 'WBG_UPDATE_POSITION') {
      var pId = event.data.elemId;
      var pLeft = event.data.left;
      var pTop = event.data.top;
      if (pId) {
        var targetEl = document.querySelector("[data-elem-id='" + pId + "']") ||
                       document.querySelector("[field='" + pId + "']") ||
                       document.getElementById(pId);
        if (targetEl) {
          var targetWrapper = targetEl.classList.contains('tn-elem') ? targetEl : (targetEl.closest('.tn-elem') || targetEl);
          if (pLeft !== undefined) targetWrapper.style.setProperty('left', (typeof pLeft === 'number' ? pLeft + 'px' : pLeft), 'important');
          if (pTop !== undefined) targetWrapper.style.setProperty('top', (typeof pTop === 'number' ? pTop + 'px' : pTop), 'important');
          var curR = getElementRotation(targetWrapper);
          if (curR) {
            targetWrapper.style.setProperty('transform', 'rotate(' + curR + 'deg)', 'important');
          } else {
            targetWrapper.style.setProperty('transform', 'none', 'important');
          }
          if (typeof updateSelectionBox === 'function') {
            updateSelectionBox(targetWrapper);
          }
        }
      }
    } else if (event.data.type === 'WBG_UPDATE_ROTATION') {
      var rotId = event.data.elemId;
      var rotDeg = event.data.rotate;
      if (rotId && rotDeg !== undefined) {
        var rotTarget = document.querySelector("[data-elem-id='" + rotId + "']") ||
                        document.querySelector("[field='" + rotId + "']") ||
                        document.getElementById(rotId);
        if (rotTarget) {
          var rotWrapper = rotTarget.classList.contains('tn-elem') ? rotTarget : (rotTarget.closest('.tn-elem') || rotTarget);
          rotWrapper.style.setProperty('transform', 'rotate(' + rotDeg + 'deg)', 'important');
          rotWrapper.style.setProperty('transform-origin', 'center center', 'important');
          if (typeof updateSelectionBox === 'function') {
            updateSelectionBox(rotWrapper);
          }
        }
      }
    } else if (event.data.type === 'WBG_TRIGGER_IMAGE_UPLOAD') {
      var uId = event.data.elemId;
      if (uId) {
        var uTarget = document.querySelector("[data-elem-id='" + uId + "']") ||
                      document.getElementById(uId);
        if (uTarget) {
          activeImageForUpload = uTarget.tagName === 'IMG' ? uTarget : (uTarget.querySelector('img') || uTarget);
        }
      }
      if (universalFilePicker) universalFilePicker.click();
    } else if (event.data.type === 'WBG_DELETE_ELEMENT') {
      var dId = event.data.elemId;
      if (dId) {
        var targetEl = document.querySelector("[data-elem-id='" + dId + "']") ||
                       document.querySelector("[field='" + dId + "']") ||
                       document.getElementById(dId);
        if (targetEl) {
          var targetWrapper = targetEl.classList.contains('tn-elem') ? targetEl : (targetEl.closest('.tn-elem') || targetEl);
          targetWrapper.setAttribute('data-wbg-deleted', 'true');
          targetWrapper.style.setProperty('display', 'none', 'important');
        }
        if (dId === 'rec2442651103') {
          var arrowEl = document.getElementById('rec2442651093');
          if (arrowEl) {
            arrowEl.setAttribute('data-wbg-deleted', 'true');
            arrowEl.style.setProperty('display', 'none', 'important');
          }
        }
      }
    } else if (event.data.type === 'WBG_RESTORE_ELEMENT') {
      var rId = event.data.elemId;
      if (rId) {
        var targetEl = document.querySelector("[data-elem-id='" + rId + "']") ||
                       document.querySelector("[field='" + rId + "']") ||
                       document.getElementById(rId);
        if (targetEl) {
          var targetWrapper = targetEl.classList.contains('tn-elem') ? targetEl : (targetEl.closest('.tn-elem') || targetEl);
          targetWrapper.removeAttribute('data-wbg-deleted');
          targetWrapper.style.removeProperty('display');
        }
        if (rId === 'rec2442651103') {
          var arrowEl = document.getElementById('rec2442651093');
          if (arrowEl) {
            arrowEl.removeAttribute('data-wbg-deleted');
            arrowEl.style.removeProperty('display');
          }
        }
      }
    } else if (event.data.type === 'WBG_FORCE_REFRESH') {
      discoverElements();
      if (event.data.data) applyCustomization(event.data.data);
    }
  });

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showLuxuryConfirmation(formEl, payload) {
    if (!formEl) return;
    var container = formEl.closest('.t702__wrapper') || formEl.closest('.t-popup__container') || formEl.parentElement || formEl;
    var partner1 = (lastApplied && lastApplied.partner1) || 'Hadi';
    var partner2 = (lastApplied && lastApplied.partner2) || 'Nour';
    var couple = partner1 + ' & ' + partner2;

    var isYes = payload.attending === 'yes';
    var title = isYes ? 'RSVP Confirmed!' : 'Response Received';
    var subtitle = isYes
      ? (couple + ' look forward to celebrating together!')
      : 'Thank you for letting us know. You will be dearly missed!';

    var detailsBadge = isYes
      ? '<div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(206,187,120,0.15);border:1px solid rgba(206,187,120,0.35);border-radius:30px;color:#857035;font-size:13px;font-weight:600;margin-bottom:18px;">' +
        '🥂 ' + payload.adultsCount + ' Adult' + (payload.adultsCount > 1 ? 's' : '') +
        (payload.kidsCount > 0 ? (' • ' + payload.kidsCount + ' Child' + (payload.kidsCount > 1 ? 'ren' : '')) : '') +
        '</div>'
      : '<div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.2);border-radius:30px;color:#b91c1c;font-size:13px;font-weight:600;margin-bottom:18px;">' +
        'Declined with regrets' +
        '</div>';

    var confirmCard = document.createElement('div');
    confirmCard.className = 'wbg-luxury-confirm-card';
    confirmCard.style.cssText = [
      'display: flex',
      'flex-direction: column',
      'align-items: center',
      'justify-content: center',
      'text-align: center',
      'padding: 36px 24px',
      'background: linear-gradient(135deg, #ffffff 0%, #fffdf8 100%)',
      'border: 1px solid rgba(206,187,120,0.4)',
      'border-radius: 24px',
      'box-shadow: 0 16px 36px rgba(0,0,0,0.07)',
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Georgia, serif',
      'width: 100%',
      'max-width: 460px',
      'margin: 0 auto',
      'box-sizing: border-box'
    ].join(';');

    confirmCard.innerHTML = 
      '<div style="width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#cebb78 0%,#e5d59e 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(206,187,120,0.35);margin-bottom:18px;color:#08004b;font-size:28px;font-weight:bold;">' +
        (isYes ? '✓' : '✦') +
      '</div>' +
      '<h2 style="font-family:\'Alex Brush\',\'Great Vibes\',Georgia,serif;font-size:38px;color:#08004b;margin:0 0 6px 0;line-height:1.2;">' +
        'Thank You, ' + escapeHtml(payload.name) +
      '</h2>' +
      '<div style="font-size:14px;font-weight:700;color:#806b43;margin-bottom:12px;letter-spacing:1px;text-transform:uppercase;">' +
        title +
      '</div>' +
      '<p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 16px 0;max-width:320px;">' +
        subtitle +
      '</p>' +
      detailsBadge +
      (payload.notes ? ('<div style="font-size:12px;color:#666;font-style:italic;background:#f9f8f5;padding:10px 16px;border-radius:12px;border:1px dashed rgba(206,187,120,0.3);margin-bottom:20px;max-width:340px;line-height:1.4;">“' + escapeHtml(payload.notes) + '”</div>') : '') +
      '<button id="wbgCloseConfirmBtn" style="padding:11px 28px;border-radius:30px;background:#08004b;color:#fff;border:none;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(8,0,75,0.25);">' +
        'Close Window' +
      '</button>';

    // Hide original form inputs & text header
    formEl.style.display = 'none';
    var textWrapper = container.querySelector('.t702__text-wrapper');
    if (textWrapper) textWrapper.style.display = 'none';
    var imgWrapper = container.querySelector('.t702__img');
    if (imgWrapper) imgWrapper.style.display = 'none';

    container.appendChild(confirmCard);

    var closeBtn = confirmCard.querySelector('#wbgCloseConfirmBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var popup = container.closest('.t-popup, .t702');
        if (popup) {
          popup.classList.remove('t-popup_show');
          popup.style.display = 'none';
        }
        var closeButton = document.querySelector('.t-popup__close-wrapper, .t-popup__close, .t-popup__block-close-button');
        if (closeButton) {
          try { closeButton.click(); } catch (err) {}
        }
        if (typeof window.t702_closePopup === 'function') {
          try { window.t702_closePopup(); } catch (err) {}
        }
      });
    }
  }

  function handleRsvpSubmission(formEl) {
    if (!formEl) return;

    // 1. Guest Name
    var nameInput = formEl.querySelector('input[name="Name"], input[name*="name" i], input[data-field-name*="name" i], input[type="text"]');
    var guestName = nameInput ? nameInput.value.trim() : '';
    if (!guestName) {
      if (nameInput) {
        nameInput.focus();
        nameInput.style.borderColor = '#ef4444';
        setTimeout(function () { nameInput.style.borderColor = ''; }, 2500);
      }
      return;
    }

    // 2. Attendance Status
    var attending = 'yes';
    var checkedBoxes = Array.from(formEl.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'));
    if (checkedBoxes.length > 0) {
      var val = checkedBoxes.map(function (c) { return c.value || ''; }).join(' ').toLowerCase();
      if (val.includes('cant') || val.includes("can't") || val.includes('unfortunately') || val.includes('no') || val.includes('decline')) {
        attending = 'no';
      } else if (val.includes('yes') || val.includes('will') || val.includes('attend')) {
        attending = 'yes';
      }
    } else {
      var hiddenInput = formEl.querySelector('.t-checkboxes__hiddeninput, input[name*="come" i], input[data-field-name*="come" i]');
      if (hiddenInput && hiddenInput.value) {
        var hVal = hiddenInput.value.toLowerCase();
        if (hVal.includes('cant') || hVal.includes("can't") || hVal.includes('unfortunately') || hVal.includes('no') || hVal.includes('decline')) {
          attending = 'no';
        }
      }
    }

    // 3. Notes / Dietary
    var notes = '';
    var dietaryInput = formEl.querySelector('input[name*="intolerances" i], input[name*="diet" i], textarea[name*="diet" i], textarea[name*="message" i], textarea[name*="note" i], input[name*="food" i]');
    if (dietaryInput && dietaryInput.value) {
      notes = dietaryInput.value.trim();
    }

    // 4. Adults & Kids Count
    var adultsCount = attending === 'yes' ? 1 : 0;
    var kidsCount = 0;

    var adultsInput = formEl.querySelector('input[name*="adult" i], select[name*="adult" i]');
    if (adultsInput && adultsInput.value) {
      var parsedAdults = parseInt(adultsInput.value, 10);
      if (!isNaN(parsedAdults) && parsedAdults >= 0) adultsCount = parsedAdults;
    }

    var kidsInput = formEl.querySelector('input[name*="kid" i], input[name*="child" i], select[name*="kid" i], select[name*="child" i]');
    if (kidsInput && kidsInput.value) {
      var parsedKids = parseInt(kidsInput.value, 10);
      if (!isNaN(parsedKids) && parsedKids >= 0) kidsCount = parsedKids;
    }

    // Auto-parse natural numbers in guest name or notes (e.g. "Hadi & Nour + 4 kids" or "Family of 4")
    var combinedText = (guestName + ' ' + notes).toLowerCase();
    var kidMatch = combinedText.match(/(\d+)\s*(kids?|children|child)/i);
    if (kidMatch && kidMatch[1] && kidsCount === 0) {
      kidsCount = parseInt(kidMatch[1], 10);
    }
    var adultMatch = combinedText.match(/(\d+)\s*(adults?)/i);
    if (adultMatch && adultMatch[1]) {
      adultsCount = parseInt(adultMatch[1], 10);
    } else {
      var guestMatchBoth = combinedText.match(/(\d+)\s*(guests?|people|persons?)/i);
      if (guestMatchBoth && guestMatchBoth[1]) {
        var total = parseInt(guestMatchBoth[1], 10);
        if (total > kidsCount) {
          adultsCount = total - kidsCount;
        }
      }
    }

    // 5. Client Slug
    var clientSlug = 'hadi';
    try {
      if (window.__wbg_clientSlug) {
        clientSlug = window.__wbg_clientSlug;
      } else {
        var parentUrl = window.location.href;
        var m = parentUrl.match(/invite\/([a-z0-9_-]+)/i);
        if (m && m[1]) clientSlug = m[1];
      }
    } catch (e) {}

    var payload = {
      clientSlug: clientSlug,
      guestName: guestName,
      name: guestName,
      attending: attending,
      adultsCount: adultsCount,
      kidsCount: kidsCount,
      notes: notes,
      createdAt: new Date().toISOString(),
      source: 'template_form'
    };

    // 6. Post to /api/rsvp
    try {
      fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function (err) {
        console.warn('RSVP fetch warning:', err);
      });
    } catch (e) {}

    // 7. Post message to parent
    try {
      window.parent.postMessage({
        type: 'WBG_RSVP_SUBMITTED',
        data: payload
      }, '*');
    } catch (e) {}

    // 8. Show luxury confirmation card
    showLuxuryConfirmation(formEl, payload);
  }

  function setupRsvpInterception() {
    if (window.__wbg_rsvp_intercepted) return;
    window.__wbg_rsvp_intercepted = true;

    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (!form || !form.matches || (!form.matches('form') && !form.closest('form'))) return;
      var formEl = form.matches('form') ? form : form.closest('form');

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      handleRsvpSubmission(formEl);
    }, true);

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.t-submit, button[type="submit"], input[type="submit"], .t-btnflex_type_submit');
      if (!btn) return;
      var formEl = btn.closest('form');
      if (!formEl) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      handleRsvpSubmission(formEl);
    }, true);
  }

  function ensureGoogleFontsLoaded() {
    if (document.getElementById('wbg-google-fonts')) return;
    try {
      var link = document.createElement('link');
      link.id = 'wbg-google-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap';
      document.head.appendChild(link);
    } catch (e) {}
  }

  function init() {
    ensureGoogleFontsLoaded();
    discoverElements();
    loadSavedCustomization();
    setupInteractiveClicks();
    adjustDolceVitaDressCodeLayout();
    setupDolceVitaGalleryControls();
    setupRsvpInterception();

    [50, 150, 300, 600, 1200].forEach(function (delay) {
      setTimeout(function () {
        discoverElements();
        loadSavedCustomization();
        adjustDolceVitaDressCodeLayout();
        setupDolceVitaGalleryControls();
        setupRsvpInterception();
      }, delay);
    });

    try {
      window.parent.postMessage({ type: 'WBG_BRIDGE_READY' }, '*');
    } catch (e) {}
  }

  try {
    loadSavedCustomization();
  } catch (e) {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', function () {
    discoverElements();
    loadSavedCustomization();
    adjustDolceVitaDressCodeLayout();
    setupDolceVitaGalleryControls();
  });

  window.addEventListener('resize', function () {
    adjustDolceVitaDressCodeLayout();
  });

  // Forward pointer/mouse release events to parent so drag overlays never get stuck
  ['mouseup', 'pointerup', 'dragend'].forEach(function (evt) {
    window.addEventListener(evt, function () {
      try {
        window.parent.postMessage({ type: 'WBG_CANCEL_DRAG' }, '*');
      } catch (e) {}
    });
  });
})();