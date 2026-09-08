/**
 * Webgency Invitations - Template Customizer Bridge
 * Enables instantaneous, on-the-spot 2-way visual personalization
 * across all 12 wedding templates.
 */

(function () {
  'use strict';

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
    sacredGardenMultiline: "[data-artboard-recid='2487446043'] [field='tn_text_1763402147625']",
    sacredGardenConnector: "[data-artboard-recid='2487446043'] [field='tn_text_176340390975774690']",
    sacredGardenDate: "[data-artboard-recid='2487446043'] [field='tn_text_176340401720454780']",
    sacredGardenVenue: "[data-artboard-recid='2487446153'] [field='tn_text_1772804808869']",
    sacredGardenAddress: "[data-artboard-recid='2487446153'] [field='tn_text_1772813480591000001']",
    sacredGardenDressCode: "[data-artboard-recid='2487446183'] [field='tn_text_1778524751695000001']",
    sacredGardenGift: "[data-artboard-recid='2487446183'] [field='tn_text_1772813849329000001']",
    sacredGardenAttendance: "[data-artboard-recid='2487446223'] [field='tn_text_1772813849329000001']",
    sacredGardenEnding: "[data-artboard-recid='2487446253'] [field='tn_text_1772813849329000001']",

    // 2. Blossom & Oud
    blossomOudCouple: "[data-artboard-recid='2443433723'] [field='tn_text_1779566247730000001']",
    blossomOudConnector: "[data-artboard-recid='2443433723'] [field='tn_text_1779566247730000004']",
    blossomOudDate: "[data-artboard-recid='2443433723'] [field='tn_text_1779566247730000003']",
    blossomOudSubtitle: "[field='tn_text_1779626065755000001']",
    blossomOudEnvelopeBtn: "[field='tn_text_1777183175514000001']",
    blossomOudArabicText: "[data-artboard-recid='2443433743'] [field='tn_text_1779624381838000001']",
    blossomOudCountdownHeader: "[data-artboard-recid='2443433763'] [field='tn_text_1771277026942000001']",
    blossomOudTimelineHeader: "[data-artboard-recid='2443433773'] [field='tn_text_1771277026942000001']",
    blossomOudVenue: "[data-artboard-recid='2443433783'] [field='tn_text_1779544773135']",
    blossomOudCity: "[data-artboard-recid='2443433783'] [field='tn_text_1779545032699000001']",
    blossomOudLocationHeader: "[data-artboard-recid='2443433783'] [field='tn_text_1771277026942000001']",
    blossomOudDressCode: "[data-artboard-recid='2443433793'] [field='tn_text_1779544773135']",
    blossomOudDressHeader: "[data-artboard-recid='2443433793'] [field='tn_text_1771277026942000001']",
    blossomOudMapHeader: "[data-artboard-recid='2443433823'] [field='tn_text_1771277026942000001']",
    blossomOudRsvpHeader: "[data-artboard-recid='2443433803'] [field='tn_text_1771277026942000001']",
    blossomOudRsvpForm: "[data-elem-id='1779545532876']",
    blossomOudClosingText: "[field='tn_text_1763405219328']",

    // 3. Dolce Vita
    dolceVitaHeadline: "[data-artboard-recid='2442650993'] [field='tn_text_1776948176126']",
    dolceVitaEnding: "[data-artboard-recid='2442651163'] [field='tn_text_1710522265391']",
    dolceVitaVenue: "[data-artboard-recid='2442651083'] [field='tn_text_1776866271348000003']",
    dolceVitaDressCode: "[data-artboard-recid='2442651093'] [field='tn_text_1741427070967']",
    dolceVitaTileDay: "#tdr-tile-day .tdr-num",
    dolceVitaTileMonth: "#tdr-tile-month .tdr-num",
    dolceVitaTileYear: "#tdr-tile-year .tdr-num",

    // 4. Timeless Grace
    timelessGraceP1: "[field='tn_text_1782990372985000002']",
    timelessGraceP2: "[field='tn_text_1782990570479000010']",
    timelessGraceConnector: "[field='tn_text_1782990549039000006']",

    // 5. Vibrant Vows
    vibrantVowsMultiline: "[data-artboard-recid='2049114373'] [field='tn_text_1763402147625']",
    vibrantVowsConnector: "[data-artboard-recid='2049114373'] [field='tn_text_176340390975774690']",
    vibrantVowsDate: "[data-artboard-recid='2049114373'] [field='tn_text_176340401720454780']",
    vibrantVowsVenue: "[data-artboard-recid='2002802231'] [field='tn_text_1772804808869']",
    vibrantVowsDressCode: "[data-artboard-recid='2003451831'] [field='tn_text_1772813849329000001']",
    vibrantVowsAttendance: "[data-artboard-recid='2003860951'] [field='tn_text_1772813849329000001']",
    vibrantVowsEnding: "[data-artboard-recid='2003869491'] [field='tn_text_1772813849329000001']",

    // 6. Destination Love
    destLovePass: "[data-artboard-recid='1141006106'] [field='tn_text_1739457970056']",
    destLoveFlightBadge: "[data-artboard-recid='1141006106'] [field='tn_text_1739457970065']",
    destLoveCity: "[data-artboard-recid='1141006106'] [field='tn_text_1739457970068']",
    destLoveFullName: "[data-artboard-recid='1141006111'] [field='tn_text_1741107633653']",
    destLoveDate: "[data-artboard-recid='1141006111'] [field='tn_text_1741107633658']",
    destLoveDressCode: "[data-artboard-recid='1141006136'] [field='tn_text_1741427070967']",
    destLoveEnding: "[data-artboard-recid='1141006181'] [field='tn_text_1705236303923']",

    // 7. Eternal Romance
    eternalRomanceHeadline: "[data-artboard-recid='1875002761'] [field='tn_text_1730310670429']",
    eternalRomanceDate: "[data-artboard-recid='1875002761'] [field='tn_text_1730310670422']",
    eternalRomanceMidDate: "[data-artboard-recid='1960320961'] [field='tn_text_1705235414658']",
    eternalRomanceDressCode: "[data-artboard-recid='1875002791'] [field='tn_text_1730375467556']",
    eternalRomanceEnding: "[data-artboard-recid='1875002821'] [field='tn_text_1710522265391']",

    // 8. Royal Gold
    royalGoldHeadline: "[data-artboard-recid='2225136913'] [field='tn_text_1709580515237']",
    royalGoldDate: "[data-artboard-recid='2225136913'] [field='tn_text_1709580515218']",
    royalGoldTimeline1: "[data-artboard-recid='2225136953'] [field='tn_text_1709506567892']",
    royalGoldTimeline2: "[data-artboard-recid='2225136953'] [field='tn_text_1709506567893']",
    royalGoldDressCode: "[data-artboard-recid='2225136963'] [field='tn_text_1709507064325']",
    royalGoldEnding: "[data-artboard-recid='2225137003'] [field='tn_text_1688726914364']",

    // 9. Minimalist
    minimalistHeadline: "[data-artboard-recid='1037605266'] [field='tn_text_1690458811493']",
    minimalistDate: "[data-artboard-recid='1037605266'] [field='tn_text_1690458811484']",
    minimalistCity: "[data-artboard-recid='1037605266'] [field='tn_text_1690458811491']",
    minimalistBigDate: "[data-artboard-recid='621270577'] [field='tn_text_1690458966885']",
    minimalistVenue: "[data-artboard-recid='1037618816'] [field='tn_text_1746701376970']",
    minimalistEnding: "[data-artboard-recid='632297248'] [field='tn_text_1692969909762']",

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
      SPECIFIC_SELECTORS.blossomOudConnector,
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
    var allImgs = Array.from(document.querySelectorAll('img'));
    var coupleImgs = allImgs.filter(function (img) {
      var src = img.getAttribute('src') || img.getAttribute('data-original') || '';
      var width = img.naturalWidth || img.clientWidth || parseInt(img.getAttribute('width') || '0', 10);
      var height = img.naturalHeight || img.clientHeight || parseInt(img.getAttribute('height') || '0', 10);
      var isIcon = src.includes('icon') || src.includes('seal') || src.includes('arrow') || src.includes('Group_269') || src.includes('Screenshot_2026');
      return !isIcon && (width > 120 || height > 120 || img.closest('.t396__elem, .pl-img'));
    });
    tracked.photoNodes = coupleImgs;
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
              '<div style="line-height: 1.12; margin-bottom: 6px; font-size: inherit; font-family: inherit;">' + p1 + '</div>' +
              (conn && conn !== '&' ? '<div style="font-size: 24px; line-height: 1; margin: 2px 0 6px 0; opacity: 0.85;">' + conn + '</div>' : '') +
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
    var mapQuery = data.venueAddress || data.venueName || '';
    var rawMapUrl = data.mapUrl || '';
    var embedSrc = '';

    if (rawMapUrl && rawMapUrl.includes('google.com/maps/embed')) {
      embedSrc = rawMapUrl;
    } else if (mapQuery) {
      embedSrc = 'https://maps.google.com/maps?q=' + encodeURIComponent(mapQuery) + '&output=embed';
    } else if (rawMapUrl) {
      embedSrc = 'https://maps.google.com/maps?q=' + encodeURIComponent(rawMapUrl) + '&output=embed';
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
    var directionsLink = rawMapUrl || (mapQuery ? ('https://maps.google.com/?q=' + encodeURIComponent(mapQuery)) : '');
    if (directionsLink) {
      var mapHeaders = [
        document.querySelector(SPECIFIC_SELECTORS.blossomOudMapHeader),
        document.querySelector("[data-elem-id='1710614957366']")
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

    // 9. UPDATE PHOTO
    if (data.photoUrl) {
      tracked.photoNodes.forEach(function (img) {
        try {
          img.src = data.photoUrl;
          img.setAttribute('data-original', data.photoUrl);
          img.style.opacity = '1';
          img.style.visibility = 'visible';
          img.style.objectFit = 'cover';
        } catch (e) {}
      });

      var plImg = document.getElementById('plImg');
      if (plImg) plImg.src = data.photoUrl;

      document.querySelectorAll('[style*="background-image"]').forEach(function (bgElem) {
        var style = bgElem.getAttribute('style') || '';
        if (style.includes('tild') && (bgElem.clientWidth > 150 || bgElem.clientHeight > 150)) {
          bgElem.style.backgroundImage = 'url("' + data.photoUrl + '")';
          bgElem.style.backgroundSize = 'cover';
          bgElem.style.backgroundPosition = 'center';
        }
      });
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

    try {
      window.parent.postMessage({ type: 'WBG_CUSTOMIZATION_APPLIED', timestamp: Date.now() }, '*');
    } catch (e) {}
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
    if (window.self !== window.top && !document.getElementById('wbg-edit-styles')) {
      var style = document.createElement('style');
      style.id = 'wbg-edit-styles';
      style.textContent = 
        '.wbg-editable-hover { position: relative; cursor: pointer !important; transition: outline 0.15s ease, background 0.15s ease !important; }' +
        '.wbg-editable-hover:hover { outline: 2px dashed #cebb78 !important; outline-offset: 3px !important; background-color: rgba(206, 187, 120, 0.12) !important; border-radius: 4px !important; }' +
        '.wbg-editing-active { outline: 2px solid #10b981 !important; outline-offset: 3px !important; background-color: rgba(16, 185, 129, 0.15) !important; border-radius: 4px !important; }';
      document.head.appendChild(style);
    }

    // Attach hover effects to editable elements
    if (window.self !== window.top) {
      var markEditable = function () {
        document.querySelectorAll('.tn-atom, h1, h2, h3, p, .std-names, .pl-cap-names, .pp-nm').forEach(function (el) {
          if (el.closest('.popup-enter, #audio-control, .t-submit, button, a, #wbg-preview-bar, .seal-monogram, [data-animate-sbs-event="click"]')) {
            return;
          }
          if (!el.querySelector('img, svg, iframe') && (el.innerText || '').trim().length > 1) {
            el.classList.add('wbg-editable-hover');
          }
        });
      };
      markEditable();
      setTimeout(markEditable, 1000);
    }

    document.addEventListener('click', function (e) {
      var target = e.target;

      // Do NOT intercept or modify buttons, wax seals, audio controls, or links!
      if (target.closest('.popup-enter, #audio-control, .t-submit, button, a, #wbg-preview-bar, .seal-monogram, [data-animate-sbs-event="click"]')) {
        return;
      }

      var atom = target.closest('.tn-atom') || target;
      var text = (atom.innerText || '').toLowerCase();
      var role = atom.getAttribute('data-wbg-role') || '';

      var field = 'wording';
      if (tracked.partner1Nodes.includes(atom) || tracked.partner2Nodes.includes(atom) || tracked.coupleNodes.includes(atom) || tracked.multilineCoupleNodes.includes(atom) || role.includes('partner') || role.includes('couple')) {
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

      // If user clicked inside the studio iframe on a text atom, allow direct inline editing
      var isTextAtom = !atom.querySelector('img, svg, iframe') && (atom.innerText || '').trim().length > 0;
      if (window.self !== window.top && isTextAtom && atom.isContentEditable === false && atom.tagName !== 'IMG' && atom.tagName !== 'IFRAME') {
        atom.contentEditable = 'true';
        atom.classList.add('wbg-editing-active');
        atom.focus();

        var onBlur = function () {
          atom.contentEditable = 'false';
          atom.classList.remove('wbg-editing-active');
          atom.removeEventListener('blur', onBlur);
          try {
            window.parent.postMessage({
              type: 'WBG_INLINE_EDIT',
              field: field,
              role: role,
              text: atom.innerText
            }, '*');
          } catch (err) {}
        };
        atom.addEventListener('blur', onBlur);
      }
    }, true);
  }

  window.__wbg_applyCustomization = applyCustomization;
  window.__wbg_rediscover = discoverElements;

  window.addEventListener('message', function (event) {
    if (!event.data || typeof event.data !== 'object') return;

    if (event.data.type === 'WBG_UPDATE_CUSTOMIZATION') {
      applyCustomization(event.data.data);
    } else if (event.data.type === 'WBG_FORCE_REFRESH') {
      discoverElements();
      if (event.data.data) applyCustomization(event.data.data);
    }
  });

  function init() {
    discoverElements();
    loadSavedCustomization();
    setupInteractiveClicks();

    [50, 150, 300, 600, 1200].forEach(function (delay) {
      setTimeout(function () {
        discoverElements();
        loadSavedCustomization();
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
  });
})();