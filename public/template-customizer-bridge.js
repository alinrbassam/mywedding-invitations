/**
 * Webgency Invitations - Template Customizer Bridge
 * Enables instantaneous, on-the-spot 2-way visual personalization
 * across all 12 wedding templates.
 */

(function () {
  'use strict';

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

  // Specific atom selectors for guaranteed zero-miss targeting
  var SPECIFIC_SELECTORS = {
    // Timeless Grace
    timelessGraceP1: "[field='tn_text_1782990372985000002']",
    timelessGraceP2: "[field='tn_text_1782990570479000010']",
    timelessGraceConnector: "[field='tn_text_1782990549039000006']",

    // Blossom & Oud
    blossomOudCouple: "[field='tn_text_1779566247730000001']",
    blossomOudConnector: "[field='tn_text_1779566247730000004']",

    // The Sacred Garden & Vibrant Vows
    sacredVowsMultiline: "[field='tn_text_1763402147625']",
    sacredVowsConnector: "[field='tn_text_176340390975774690']",
    sacredVowsEnding: "[field='tn_text_1772813849329000001']",

    // Dolce Vita
    dolceVitaHeadline: "[field='tn_text_1776948176126']",
    dolceVitaEnding: "[field='tn_text_1710522265391']",

    // Destination Love
    destLovePass: "[field='tn_text_1739457970056']",
    destLoveFullName: "[field='tn_text_1741107633653']",
    destLoveEnding: "[field='tn_text_1705236303923']",

    // Eternal Romance
    eternalRomanceHeadline: "[field='tn_text_1730310670429']",
    eternalRomanceEnding: "[field='tn_text_1710522265391']",

    // Royal Gold
    royalGoldHeadline: "[field='tn_text_1709580515237']",
    royalGoldEnding: "[field='tn_text_1688726914364']",

    // Minimalist
    minimalistHeadline: "[field='tn_text_1690458811493']",
    minimalistEnding: "[field='tn_text_1692969909762']",

    // Save the Date interactive templates
    stdNames: ".std-names, .std-couple-names",
    polaroidNames: ".pl-cap-names",
    petalNames: ".pp-nm, .pp-hd"
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
    photoNodes: [],
    countdown: {}
  };

  var lastApplied = {
    partner1: '',
    partner2: '',
    fullName: '',
    dateText: '',
    venueName: '',
    venueAddress: ''
  };

  var countdownInterval = null;
  var targetDateObj = null;

  function safeText(str) {
    return str ? String(str).trim() : '';
  }

  // Tag an element with a customizer role for future instant lookups
  function tagRole(elem, role) {
    if (!elem) return;
    try {
      elem.setAttribute('data-wbg-role', role);
      elem.setAttribute('data-wbg-bound', 'true');
    } catch (e) {}
  }

  // Scan and discover all customizable elements in the current template
  function discoverElements() {
    // 1. Check known specific selectors
    var p1Elem = document.querySelector(SPECIFIC_SELECTORS.timelessGraceP1);
    if (p1Elem && tracked.partner1Nodes.indexOf(p1Elem) === -1) {
      tracked.partner1Nodes.push(p1Elem);
      tagRole(p1Elem, 'partner1');
    }

    var p2Elem = document.querySelector(SPECIFIC_SELECTORS.timelessGraceP2);
    if (p2Elem && tracked.partner2Nodes.indexOf(p2Elem) === -1) {
      tracked.partner2Nodes.push(p2Elem);
      tagRole(p2Elem, 'partner2');
    }

    var connElem = document.querySelector(SPECIFIC_SELECTORS.timelessGraceConnector);
    if (connElem && tracked.connectorNodes.indexOf(connElem) === -1) {
      tracked.connectorNodes.push(connElem);
      tagRole(connElem, 'connector');
    }

    var blossomElem = document.querySelector(SPECIFIC_SELECTORS.blossomOudCouple);
    if (blossomElem && tracked.multilineCoupleNodes.indexOf(blossomElem) === -1) {
      tracked.multilineCoupleNodes.push(blossomElem);
      tagRole(blossomElem, 'couple-multiline');
    }

    var sacredElem = document.querySelector(SPECIFIC_SELECTORS.sacredVowsMultiline);
    if (sacredElem && tracked.multilineCoupleNodes.indexOf(sacredElem) === -1) {
      tracked.multilineCoupleNodes.push(sacredElem);
      tagRole(sacredElem, 'couple-multiline');
    }

    // Couple single-line elements
    var singleLineSelectors = [
      SPECIFIC_SELECTORS.sacredVowsEnding,
      SPECIFIC_SELECTORS.dolceVitaHeadline,
      SPECIFIC_SELECTORS.dolceVitaEnding,
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
      try {
        var elems = document.querySelectorAll(sel);
        elems.forEach(function (el) {
          if (tracked.coupleNodes.indexOf(el) === -1) {
            tracked.coupleNodes.push(el);
            tagRole(el, 'couple-single');
          }
        });
      } catch (e) {}
    });

    // 2. Scan all .tn-atom and general heading/div nodes
    var allAtoms = Array.from(document.querySelectorAll('.tn-atom, h1, h2, h3, .std-names, .pl-cap-names, .pp-nm'));

    allAtoms.forEach(function (el) {
      var raw = (el.innerText || '').trim();
      if (!raw || raw.length < 2 || raw.length > 120) return;

      // Check partner 1 alone
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

      // Check partner 2 alone
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

      // Check couple combined
      for (var k = 0; k < KNOWN_COUPLES.length; k++) {
        var couple = KNOWN_COUPLES[k];
        if (raw.toLowerCase().includes(couple.toLowerCase())) {
          // Check if multi-line
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

      // Check Date
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

      // Check generic date patterns
      if (/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}/i.test(raw) || /\b\d{2}\.\d{2}\.\d{2,4}\b/.test(raw)) {
        if (!raw.includes('Countdown') && !raw.includes('Day') && tracked.dateNodes.indexOf(el) === -1) {
          tracked.dateNodes.push(el);
          tagRole(el, 'date');
        }
      }

      // Check Venue
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

      // Check Address
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

    // 3. Countdown timer elements
    var daysEl = document.getElementById('days') || document.querySelector('.tdr-num') || document.querySelector('#tb-days .number');
    var hoursEl = document.getElementById('hours') || document.querySelector('#tb-hours .number');
    var minEl = document.getElementById('minutes') || document.querySelector('#tb-minutes .number');
    var secEl = document.getElementById('seconds') || document.querySelector('#tb-seconds .number');

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
      var isIcon = src.includes('icon') || src.includes('seal') || src.includes('arrow') || src.includes('Group_269');
      return !isIcon && (width > 120 || height > 120 || img.closest('.t396__elem, .pl-img'));
    });
    tracked.photoNodes = coupleImgs;
  }

  // Format date helper: returns "DD.MM.YY" or "MM.DD.YY"
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

  // Update Hero Screen for Timeless Grace (Replaces static Screenshot_2026-08-0.png with live typography)
  function updateTimelessGraceHero(p1, p2, conn, eventTitle) {
    var heroElems = [
      document.querySelector("[data-elem-id='1785746425236'] .tn-atom"), // desktop
      document.querySelector("[data-elem-id='1785746843632'] .tn-atom")  // mobile
    ].filter(Boolean);

    if (heroElems.length === 0) return;

    var partner1 = p1 || 'Daanish';
    var partner2 = p2 || 'Adeena';
    var connector = conn || '&';
    var ceremony = eventTitle || 'Nikkah Ceremony';

    heroElems.forEach(function (container) {
      var origImg = container.querySelector('img.tn-atom__img');
      if (origImg) {
        origImg.style.display = 'none';
      }

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

  // Update Location Block for Timeless Grace (Replaces static Screenshot_2026-08-0.png in rec2684632903)
  function updateTimelessGraceLocation(venueName, venueAddress) {
    var locContainer = document.querySelector("[data-elem-id='1785747277552'] .tn-atom");
    if (!locContainer) return;

    var vName = venueName || 'Four Seasons Hotel in Jumeirah';
    var vAddr = venueAddress || 'Dana Ballroom, Dubai, UAE';

    var origImg = locContainer.querySelector('img.tn-atom__img');
    if (origImg) {
      origImg.style.display = 'none';
    }

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

    // If elements haven't been indexed or nodes were lost, rediscover
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

    // 1. UPDATE PARTNER 1 (Separate atom e.g. Timeless Grace)
    if (p1) {
      tracked.partner1Nodes.forEach(function (node) {
        try {
          node.innerText = p1;
        } catch (e) {}
      });

      // Also search any element that currently holds the last applied partner1
      if (lastApplied.partner1 && lastApplied.partner1 !== p1) {
        document.querySelectorAll('.tn-atom').forEach(function (atom) {
          if (atom.innerText.trim() === lastApplied.partner1) {
            atom.innerText = p1;
            if (tracked.partner1Nodes.indexOf(atom) === -1) tracked.partner1Nodes.push(atom);
          }
        });
      }
    }

    // 2. UPDATE PARTNER 2 (Separate atom e.g. Timeless Grace)
    if (p2) {
      tracked.partner2Nodes.forEach(function (node) {
        try {
          node.innerText = p2;
        } catch (e) {}
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

    // 3. UPDATE CONNECTOR (e.g. "With" or "&" in Timeless Grace)
    if (conn) {
      tracked.connectorNodes.forEach(function (node) {
        try {
          node.innerText = conn === '&' ? '&' : (conn === 'and' ? 'and' : conn);
        } catch (e) {}
      });
    }

    // 4. UPDATE MULTILINE COUPLE (e.g. Blossom & Oud, The Sacred Garden, Vibrant Vows)
    if (p1 || p2) {
      var multilineHtml = '';
      if (p1 && p2) {
        multilineHtml = p1 + '<br /><br />' + p2;
      } else {
        multilineHtml = p1 || p2;
      }

      tracked.multilineCoupleNodes.forEach(function (node) {
        try {
          node.innerHTML = multilineHtml;
        } catch (e) {}
      });

      // 5. UPDATE SINGLE-LINE COUPLE (e.g. Dolce Vita, Destination Love, Royal Gold, etc.)
      tracked.coupleNodes.forEach(function (node) {
        try {
          if (node.classList.contains('pl-cap-names') || node.classList.contains('pp-nm')) {
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

      // Also dynamically update any node matching previous applied fullName
      if (lastApplied.fullName && lastApplied.fullName !== fullName) {
        document.querySelectorAll('.tn-atom').forEach(function (atom) {
          if (atom.innerText.includes(lastApplied.fullName)) {
            atom.innerText = atom.innerText.replace(lastApplied.fullName, fullName);
          }
        });
      }

      // Update wax seal / monogram
      var sealInitials = data.initials || ((p1 ? p1[0] : '') + (p2 ? p2[0] : '')).toUpperCase();
      if (sealInitials) {
        document.querySelectorAll('.seal-monogram, [data-seal-initials]').forEach(function (elem) {
          elem.innerText = sealInitials;
        });
      }
    }

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

      var stdDateElem = document.querySelector('.std-date, .pl-date, .pp-dt');
      if (stdDateElem) {
        stdDateElem.innerText = data.dateText;
      }
    }

    // 7. RECALCULATE LIVE COUNTDOWN TIMER
    if (data.targetDate) {
      targetDateObj = new Date(data.targetDate);
      startCountdownTicker();
    }

    // 8. UPDATE VENUE & ADDRESS
    if (data.venueName) {
      tracked.venueNodes.forEach(function (node) {
        try {
          node.innerText = data.venueName;
        } catch (e) {}
      });
      document.querySelectorAll('.std-loc, .pl-loc, .pp-lc').forEach(function (el) {
        el.innerText = data.venueName;
      });
    }

    if (data.venueAddress) {
      tracked.addressNodes.forEach(function (node) {
        try {
          node.innerText = 'Address: ' + data.venueAddress;
        } catch (e) {}
      });
    }

    // Update Timeless Grace Location Block
    if (data.venueName || data.venueAddress) {
      updateTimelessGraceLocation(data.venueName, data.venueAddress);
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

      // Check background-images
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
      // 10a. Timeless Grace explicit body text element
      var tgWelcome = document.querySelector("[field='tn_text_1782990616505000011']");
      if (tgWelcome) {
        tgWelcome.innerText = data.welcomeMessage;
      }

      // 10b. Update body message across templates without colliding with salutation heading
      document.querySelectorAll('.tn-atom').forEach(function (atom) {
        // NEVER overwrite salutation headings
        if (atom.getAttribute('field') === 'tn_text_1782990740288000012') return;
        var raw = (atom.innerText || '').trim();
        if (raw === 'Dear Friends and Family' || raw === 'DEAR FAMILY AND FRIENDS') return;

        // Match known body paragraphs or previously applied message
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
      document.querySelectorAll('.tn-atom').forEach(function (atom) {
        if (atom.innerText && (atom.innerText.toLowerCase().includes('dress code') || atom.innerText.toLowerCase().includes('attire'))) {
          atom.innerText = data.dressCode;
        }
      });
    }

    // Save state for differential tracking
    lastApplied = {
      partner1: p1,
      partner2: p2,
      fullName: fullName,
      dateText: data.dateText || lastApplied.dateText,
      venueName: data.venueName || lastApplied.venueName,
      venueAddress: data.venueAddress || lastApplied.venueAddress,
      welcomeMessage: data.welcomeMessage || lastApplied.welcomeMessage
    };

    // Notify parent of successful application
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

  // Setup click-to-edit interactions
  function setupInteractiveClicks() {
    document.addEventListener('click', function (e) {
      var target = e.target;
      var atom = target.closest('.tn-atom') || target;
      var text = (atom.innerText || '').toLowerCase();

      if (tracked.partner1Nodes.includes(atom) || tracked.partner2Nodes.includes(atom) || tracked.coupleNodes.includes(atom) || tracked.multilineCoupleNodes.includes(atom)) {
        window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'names' }, '*');
      } else if (tracked.dateNodes.includes(atom) || text.includes('date') || text.includes('reveal')) {
        window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'date' }, '*');
      } else if (tracked.venueNodes.includes(atom) || text.includes('location') || text.includes('venue')) {
        window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'venue' }, '*');
      } else if (target.tagName === 'IMG' && tracked.photoNodes.includes(target)) {
        window.parent.postMessage({ type: 'WBG_FIELD_CLICKED', field: 'photo' }, '*');
      }
    }, true);
  }

  // Expose global function for zero-latency direct synchronous access by parent window
  window.__wbg_applyCustomization = applyCustomization;
  window.__wbg_rediscover = discoverElements;

  // Listen for parent postMessage
  window.addEventListener('message', function (event) {
    if (!event.data || typeof event.data !== 'object') return;

    if (event.data.type === 'WBG_UPDATE_CUSTOMIZATION') {
      applyCustomization(event.data.data);
    } else if (event.data.type === 'WBG_FORCE_REFRESH') {
      discoverElements();
      if (event.data.data) applyCustomization(event.data.data);
    }
  });

  // Initialization
  function init() {
    discoverElements();
    loadSavedCustomization();
    setupInteractiveClicks();

    // Re-verify at staggered delays to ensure dynamically loaded elements are personalized
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

  // Run immediate hydration as early as possible
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
