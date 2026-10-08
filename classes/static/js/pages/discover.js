/**
 * CinemaFlow — "What Should I Watch?" Immersive Discovery Controller
 * Progressive 3-step wizard, interactive state machine, deterministic
 * multi-attribute experience scoring, and dual-visual experience results.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDiscoveryWizard();
});

// User's Progressive Blueprint State
const discoveryState = {
  step: 1,
  city: { id: 'bengaluru', name: 'Bengaluru' },
  screens: ['IMAX with Laser', 'IMAX', 'Dolby Atmos'],
  comfort: 'Recliner',
  sound: 'Dolby Atmos',
  language: 'English',
  subtitles: 'With Subtitles',
  food: 'Food & Beverage',
  distance: 10,
  anyFormat: false
};

// Rich Theatrical Experiences Catalog with Dual-Visuals (Poster + Real Theatre Auditoriums)
const EXPERIENCES_DATABASE = [
  {
    id: 'exp-1',
    theatreName: 'PVR INOX IMAX — Forum Mall, Koramangala',
    theatreBrand: 'PVR IMAX Laser Arena',
    theatreImage: 'images/theatre_forum.jpg',
    cityId: 'bengaluru',
    movieTitle: 'Dune: Part Two',
    poster: 'images/poster_dune2.jpg',
    screens: ['IMAX with Laser', 'IMAX', 'Dolby Atmos'],
    sound: 'Dolby Atmos',
    comfort: 'Recliner',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Food & Beverage',
    distanceKm: 3.8,
    censor: 'UA 16+',
    duration: '2h 46m',
    showtimes: [
      { time: '03:30 PM', status: 'available', format: 'IMAX Laser 3D' },
      { time: '07:15 PM', status: 'filling', format: 'IMAX Laser 3D' },
      { time: '10:45 PM', status: 'available', format: 'IMAX Laser 2D' }
    ],
    highlightReason: 'Top match for IMAX with Laser, Dolby Atmos & Recliner in Bengaluru'
  },
  {
    id: 'exp-2',
    theatreName: 'CinemaFlow LUXE — Phoenix Marketcity, Whitefield',
    theatreBrand: 'Director\'s Cut Lounge',
    theatreImage: 'images/premium_auditorium.jpg',
    cityId: 'bengaluru',
    movieTitle: 'Oppenheimer: Final Cut',
    poster: 'images/poster_oppenheimer.jpg',
    screens: ['Premium / Luxury', 'IMAX', 'Dolby Atmos'],
    sound: 'Dolby Atmos',
    comfort: 'Luxury',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Premium F&B',
    distanceKm: 6.2,
    censor: 'A',
    duration: '3h 00m',
    showtimes: [
      { time: '04:00 PM', status: 'available', format: 'Atmos 70mm' },
      { time: '08:30 PM', status: 'filling', format: 'Atmos 70mm' }
    ],
    highlightReason: 'Ultra-luxury motorized leather recliners with in-cinema gourmet dining service'
  },
  {
    id: 'exp-3',
    theatreName: 'PVR 4DX — Orion Mall, Rajajinagar',
    theatreBrand: '4DX Experiential Theater',
    theatreImage: 'images/theatre_orion.jpg',
    cityId: 'bengaluru',
    movieTitle: 'Furiosa: A Mad Max Saga',
    poster: 'images/poster_furiosa.jpg',
    screens: ['4DX', '3D'],
    sound: 'Premium Sound',
    comfort: 'Premium',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Snacks',
    distanceKm: 5.1,
    censor: 'UA 16+',
    duration: '2h 28m',
    showtimes: [
      { time: '02:00 PM', status: 'available', format: '4DX 3D' },
      { time: '05:45 PM', status: 'filling', format: '4DX 3D' },
      { time: '09:15 PM', status: 'available', format: '4DX 3D' }
    ],
    highlightReason: 'Dynamic motion seats with wind, water mist, lightning, and synchronized scents'
  },
  {
    id: 'exp-4',
    theatreName: 'INOX Premiere — Garuda Mall, Magrath Road',
    theatreBrand: 'Dolby Cinema Premiere',
    theatreImage: 'images/theatre_garuda.jpg',
    cityId: 'bengaluru',
    movieTitle: 'Deadpool & Wolverine',
    poster: 'images/poster_deadpool.jpg',
    screens: ['IMAX', '2D', 'Dolby Atmos'],
    sound: 'Dolby Atmos',
    comfort: 'Recliner',
    language: 'English',
    subtitles: 'Without Subtitles',
    food: 'Food & Beverage',
    distanceKm: 4.5,
    censor: 'A',
    duration: '2h 07m',
    showtimes: [
      { time: '06:30 PM', status: 'available', format: 'Laser 2D' },
      { time: '10:00 PM', status: 'filling', format: 'Laser 2D' }
    ],
    highlightReason: 'Pristine 4K laser projection with immersive Dolby Atmos multi-channel sound'
  },
  {
    id: 'exp-5',
    theatreName: 'Cinepolis Giant Screen — Meenakshi Mall, Bannerghatta',
    theatreBrand: 'Macro XE Giant Screen',
    theatreImage: 'images/theatre_meenakshi.jpg',
    cityId: 'bengaluru',
    movieTitle: 'Interstellar: 10th Anniversary',
    poster: 'images/poster_interstellar.jpg',
    screens: ['IMAX with Laser', '2D', 'Dolby Atmos'],
    sound: 'Dolby Atmos',
    comfort: 'Standard',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Snacks',
    distanceKm: 8.4,
    censor: 'UA 16+',
    duration: '2h 49m',
    showtimes: [
      { time: '05:00 PM', status: 'available', format: 'Macro Laser' },
      { time: '09:30 PM', status: 'available', format: 'Macro Laser' }
    ],
    highlightReason: 'Extra-large 75ft wide silver screen with deep sub-bass acoustic dome'
  },
  {
    id: 'exp-6',
    theatreName: 'PVR Superplex — Phoenix Palladium, Lower Parel',
    theatreBrand: 'PVR IMAX Luxe Arena',
    theatreImage: 'images/premium_auditorium.jpg',
    cityId: 'mumbai',
    movieTitle: 'Dune: Part Two',
    poster: 'images/poster_dune2.jpg',
    screens: ['IMAX with Laser', 'Dolby Atmos', 'Premium / Luxury'],
    sound: 'Dolby Atmos',
    comfort: 'Recliner',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Premium F&B',
    distanceKm: 4.1,
    censor: 'UA 16+',
    duration: '2h 46m',
    showtimes: [
      { time: '04:15 PM', status: 'available', format: 'IMAX 3D' },
      { time: '08:00 PM', status: 'filling', format: 'IMAX 3D' }
    ],
    highlightReason: 'Top pick for South Mumbai: IMAX Laser with motorized plush recliners'
  },
  {
    id: 'exp-7',
    theatreName: 'PVR Director\'s Cut — Ambience Mall, Vasant Kunj',
    theatreBrand: 'Director\'s Cut Lounge',
    theatreImage: 'images/theatre_orion.jpg',
    cityId: 'delhi',
    movieTitle: 'Oppenheimer: Final Cut',
    poster: 'images/poster_oppenheimer.jpg',
    screens: ['IMAX', 'Dolby Atmos', 'Premium / Luxury'],
    sound: 'Dolby Atmos',
    comfort: 'Luxury',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Food & Beverage',
    distanceKm: 5.5,
    censor: 'A',
    duration: '3h 00m',
    showtimes: [
      { time: '06:00 PM', status: 'available', format: 'IMAX 70mm' },
      { time: '09:45 PM', status: 'filling', format: 'IMAX 70mm' }
    ],
    highlightReason: 'Iconic 70mm screening with signature audio dome and personal butler service'
  },
  {
    id: 'exp-8',
    theatreName: 'INOX Megaplex — Inorbit Mall, Malad',
    theatreBrand: 'INOX Insignia Arena',
    theatreImage: 'images/theatre_garuda.jpg',
    cityId: 'mumbai',
    movieTitle: 'The Batman',
    poster: 'images/poster_batman.jpg',
    screens: ['2D', 'Dolby Atmos', 'Premium / Luxury'],
    sound: 'Dolby Atmos',
    comfort: 'Luxury',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Premium F&B',
    distanceKm: 6.8,
    censor: 'UA 16+',
    duration: '2h 56m',
    showtimes: [
      { time: '05:30 PM', status: 'available', format: 'Insignia 2D' },
      { time: '09:15 PM', status: 'available', format: 'Insignia 2D' }
    ],
    highlightReason: 'High-contrast noir master screening in Insignia luxury recliner theatre'
  },
  {
    id: 'exp-9',
    theatreName: 'PVR Forum South — Kanakapura Road',
    theatreBrand: 'PVR P[XL] Atmosphere',
    theatreImage: 'images/theatre_forum.jpg',
    cityId: 'bengaluru',
    movieTitle: 'Inside Out 2',
    poster: 'images/poster_insideout2.jpg',
    screens: ['3D', '2D', 'Dolby Atmos'],
    sound: 'Dolby Atmos',
    comfort: 'Premium',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Food & Beverage',
    distanceKm: 5.8,
    censor: 'U',
    duration: '1h 36m',
    showtimes: [
      { time: '01:45 PM', status: 'available', format: 'RealD 3D' },
      { time: '04:30 PM', status: 'available', format: 'RealD 3D' }
    ],
    highlightReason: 'Vibrant color reproduction on premium high-gain silver screen with spatial sound'
  },
  {
    id: 'exp-10',
    theatreName: 'PVR Nexus — Koramangala, 7th Block',
    theatreBrand: 'PVR IMAX Arena',
    theatreImage: 'images/theatre_meenakshi.jpg',
    cityId: 'bengaluru',
    movieTitle: 'Gladiator II',
    poster: 'images/poster_gladiator2.jpg',
    screens: ['IMAX with Laser', 'IMAX', 'Dolby Atmos'],
    sound: 'Dolby Atmos',
    comfort: 'Recliner',
    language: 'English',
    subtitles: 'With Subtitles',
    food: 'Food & Beverage',
    distanceKm: 3.4,
    censor: 'A',
    duration: '2h 32m',
    showtimes: [
      { time: '04:00 PM', status: 'available', format: 'IMAX Laser' },
      { time: '07:30 PM', status: 'filling', format: 'IMAX Laser' },
      { time: '11:00 PM', status: 'available', format: 'IMAX Laser' }
    ],
    highlightReason: 'Uncompressed multi-channel sound and razor-sharp laser contrast'
  }
];

function initDiscoveryWizard() {
  checkIncomingHomepagePreferences();
  initStep1Location();
  initStep2Screen();
  initStep3Personalize();
  initToolbarActions();
  updateStepView(discoveryState.step);
}

/* ==========================================================================
   Bridge: Handle incoming preferences from Homepage
   ========================================================================== */
function checkIncomingHomepagePreferences() {
  const urlParams = new URLSearchParams(window.location.search);
  const fromHome = urlParams.get('fromHome');
  const storedPrefsStr = localStorage.getItem('cinemaflow_discovery_prefs');

  if (fromHome || storedPrefsStr) {
    try {
      const prefs = storedPrefsStr ? JSON.parse(storedPrefsStr) : null;
      if (prefs) {
        if (prefs.city) discoveryState.city = prefs.city;
        if (prefs.format) {
          if (prefs.format.includes('IMAX Laser')) {
            discoveryState.screens = ['IMAX with Laser', 'Dolby Atmos'];
          } else if (prefs.format.includes('4DX')) {
            discoveryState.screens = ['4DX'];
          } else if (prefs.format.includes('3D')) {
            discoveryState.screens = ['3D'];
          } else {
            discoveryState.screens = ['IMAX with Laser', 'IMAX', 'Dolby Atmos'];
          }
        }
        if (prefs.comfort) {
          if (prefs.comfort.includes('Recliner')) discoveryState.comfort = 'Recliner';
          else if (prefs.comfort.includes('Luxury')) discoveryState.comfort = 'Luxury';
          else discoveryState.comfort = 'Standard';
        }
        if (prefs.language) discoveryState.language = prefs.language;
        if (prefs.food) {
          if (prefs.food.includes('Luxury') || prefs.food.includes('Gourmet')) discoveryState.food = 'Premium F&B';
          else if (prefs.food.includes('Full') || prefs.food.includes('Drinks')) discoveryState.food = 'Food & Beverage';
          else discoveryState.food = 'Snacks';
        }
        if (prefs.distance) discoveryState.distance = parseInt(prefs.distance, 10) || 10;
      }
      // Start directly on Step 3 so the user sees their curated blueprint ready!
      discoveryState.step = 3;
      if (window.cfToast) {
        window.cfToast.info('Loaded your movie night preferences from the homepage!', 'Blueprint Ready');
      }
    } catch (e) {
      console.warn('Could not parse discovery preferences', e);
    }
  }
}

/* ==========================================================================
   Progressive Step View Controller
   ========================================================================== */
function updateStepView(stepNumber) {
  discoveryState.step = stepNumber;

  // Step visibility
  document.querySelectorAll('.cf-wizard-step').forEach(stepEl => {
    stepEl.classList.remove('is-active');
  });
  const currentStepEl = document.getElementById(`wizard-step-${stepNumber}`);
  if (currentStepEl) {
    currentStepEl.classList.add('is-active');
  }

  // Progress bar fill & labels
  const progressFill = document.getElementById('wizard-progress-fill');
  const stepLabels = document.querySelectorAll('.cf-progress-step-label');
  const badgeStep = document.getElementById('stepper-badge-step');

  const fillPercentages = { 1: '33.33%', 2: '66.66%', 3: '100%' };
  if (progressFill) progressFill.style.width = fillPercentages[stepNumber] || '33.33%';
  if (badgeStep) badgeStep.textContent = `Step ${stepNumber} of 3`;

  stepLabels.forEach((label, idx) => {
    const labelStep = idx + 1;
    label.classList.remove('is-active', 'is-complete');
    if (labelStep === stepNumber) {
      label.classList.add('is-active');
    } else if (labelStep < stepNumber) {
      label.classList.add('is-complete');
    }
  });

  // Dynamic Headline updates
  const headlines = {
    1: { title: "Where are you watching?", subtitle: "Select your metropolitan city or allow geolocation to discover screens closest to you." },
    2: { title: "What kind of screen are you craving?", subtitle: "Choose the visual & sound technologies you want to experience tonight." },
    3: { title: "Make it your perfect movie night.", subtitle: "Fine-tune seating comfort, sound acoustics, language, dining, and travel radius." }
  };
  const titleEl = document.getElementById('stepper-main-headline');
  const subtitleEl = document.getElementById('stepper-sub-headline');
  if (titleEl && headlines[stepNumber]) titleEl.textContent = headlines[stepNumber].title;
  if (subtitleEl && headlines[stepNumber]) subtitleEl.textContent = headlines[stepNumber].subtitle;

  // Synchronize UI active states in current step
  syncStepUI(stepNumber);

  // If step 3, populate the live summary card
  if (stepNumber === 3) {
    renderSummaryCard();
  }

  // Hide results section when navigating inside wizard
  const resultsSection = document.getElementById('discovery-results-section');
  if (resultsSection) resultsSection.classList.remove('is-active');

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function syncStepUI(stepNumber) {
  if (stepNumber === 1) {
    document.querySelectorAll('.cf-city-exp-card').forEach(card => {
      const cityId = card.getAttribute('data-city-id');
      card.classList.toggle('is-selected', cityId === discoveryState.city.id);
    });
  } else if (stepNumber === 2) {
    document.querySelectorAll('.cf-screen-card').forEach(card => {
      const format = card.getAttribute('data-screen-format');
      card.classList.toggle('is-selected', discoveryState.screens.includes(format));
    });
    updateScreenContinueBtn();
  } else if (stepNumber === 3) {
    syncPillGroupSelection('comfort-pills', discoveryState.comfort);
    syncPillGroupSelection('sound-pills', discoveryState.sound);
    syncPillGroupSelection('language-pills', discoveryState.language);
    syncPillGroupSelection('subtitles-pills', discoveryState.subtitles);
    syncPillGroupSelection('food-pills', discoveryState.food);

    const distanceSlider = document.getElementById('discover-distance-slider');
    const distanceBadge = document.getElementById('discover-distance-badge');
    if (distanceSlider && distanceBadge) {
      distanceSlider.value = discoveryState.distance;
      distanceBadge.textContent = `${discoveryState.distance} km`;
    }
  }
}

function syncPillGroupSelection(groupId, activeVal) {
  const container = document.getElementById(groupId);
  if (!container) return;
  container.querySelectorAll('.cf-choice-pill').forEach(pill => {
    pill.classList.toggle('is-selected', pill.getAttribute('data-val') === activeVal);
  });
}

/* ==========================================================================
   STEP 1: Location Handlers
   ========================================================================== */
function initStep1Location() {
  const cityCards = document.querySelectorAll('.cf-city-exp-card');
  const gpsBtn = document.getElementById('gps-detect-btn');
  const searchInput = document.getElementById('discover-city-search');
  const skipBtn = document.getElementById('step-1-skip-btn');
  const allMetrosBtn = document.getElementById('step-1-all-metros-btn');

  cityCards.forEach(card => {
    card.addEventListener('click', () => {
      cityCards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');

      const cityId = card.getAttribute('data-city-id');
      const cityName = card.getAttribute('data-city-name');
      discoveryState.city = { id: cityId, name: cityName };

      localStorage.setItem('cinemaflow_city', JSON.stringify({ id: cityId, name: cityName }));

      if (window.cfToast) {
        window.cfToast.success(`Location set: ${cityName}`, 'City Confirmed');
      }
    });
  });

  // GPS Current Location Simulation
  if (gpsBtn) {
    gpsBtn.addEventListener('click', () => {
      gpsBtn.classList.add('is-loading');
      setTimeout(() => {
        gpsBtn.classList.remove('is-loading');
        const blrCard = document.querySelector('.cf-city-exp-card[data-city-id="bengaluru"]');
        if (blrCard) blrCard.click();
        if (window.cfToast) {
          window.cfToast.success('GPS Location locked: Bengaluru Central (Koramangala)', 'Auto-Detected');
        }
      }, 600);
    });
  }

  // City Search filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      cityCards.forEach(card => {
        const name = (card.getAttribute('data-city-name') || '').toLowerCase();
        card.style.display = name.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // Skip / Default
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      discoveryState.city = { id: 'bengaluru', name: 'Bengaluru' };
      updateStepView(2);
    });
  }

  if (allMetrosBtn) {
    allMetrosBtn.addEventListener('click', () => {
      discoveryState.city = { id: 'all', name: 'All Metros' };
      if (window.cfToast) {
        window.cfToast.info('Searching across all metropolitan theatres', 'Region Expanded');
      }
      updateStepView(2);
    });
  }
}

/* ==========================================================================
   STEP 2: Screen & Experience Handlers (7 Formats + Any Format)
   ========================================================================== */
function initStep2Screen() {
  const screenCards = document.querySelectorAll('.cf-screen-card');
  const anyFormatBtn = document.getElementById('step-2-any-format-btn');
  const skipFormatBtn = document.getElementById('step-2-skip-btn');

  screenCards.forEach(card => {
    card.addEventListener('click', () => {
      const format = card.getAttribute('data-screen-format');

      if (card.classList.contains('is-selected')) {
        card.classList.remove('is-selected');
        discoveryState.screens = discoveryState.screens.filter(s => s !== format);
      } else {
        card.classList.add('is-selected');
        if (!discoveryState.screens.includes(format)) {
          discoveryState.screens.push(format);
        }
      }
      discoveryState.anyFormat = false;
      updateScreenContinueBtn();
    });
  });

  // "Any Format / No Preference" handler
  if (anyFormatBtn) {
    anyFormatBtn.addEventListener('click', () => {
      discoveryState.anyFormat = true;
      discoveryState.screens = ['IMAX with Laser', 'IMAX', 'Dolby Atmos', '4DX', '3D', '2D', 'Premium / Luxury'];
      screenCards.forEach(c => c.classList.add('is-selected'));
      updateScreenContinueBtn();
      if (window.cfToast) {
        window.cfToast.info('Showing all screen technologies without format restriction', 'Any Format Selected');
      }
    });
  }

  if (skipFormatBtn) {
    skipFormatBtn.addEventListener('click', () => {
      discoveryState.anyFormat = true;
      updateStepView(3);
    });
  }
}

function updateScreenContinueBtn() {
  const continueBtn = document.getElementById('step-2-continue-btn');
  if (!continueBtn) return;
  const count = discoveryState.screens.length;
  const label = discoveryState.anyFormat || count === 7 
    ? 'Continue (All formats)' 
    : count > 0 
      ? `Continue (${count} screen${count > 1 ? 's' : ''} selected)` 
      : 'Continue (Any format)';
  
  continueBtn.innerHTML = `<span>${label}</span> <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`;
}

/* ==========================================================================
   STEP 3: Personalize Handlers (Pills & Distance Slider)
   ========================================================================== */
function initStep3Personalize() {
  initPillGroup('comfort-pills', (val) => { discoveryState.comfort = val; renderSummaryCard(); });
  initPillGroup('sound-pills', (val) => { discoveryState.sound = val; renderSummaryCard(); });
  initPillGroup('language-pills', (val) => { discoveryState.language = val; renderSummaryCard(); });
  initPillGroup('subtitles-pills', (val) => { discoveryState.subtitles = val; renderSummaryCard(); });
  initPillGroup('food-pills', (val) => { discoveryState.food = val; renderSummaryCard(); });

  const distanceSlider = document.getElementById('discover-distance-slider');
  const distanceBadge = document.getElementById('discover-distance-badge');

  if (distanceSlider && distanceBadge) {
    distanceSlider.addEventListener('input', (e) => {
      const km = e.target.value;
      discoveryState.distance = parseInt(km, 10);
      distanceBadge.textContent = `${km} km`;
      renderSummaryCard();
    });
  }

  // Step 3 Skip action
  const skipBtn = document.getElementById('step-3-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      executeDiscovery();
    });
  }
}

function initPillGroup(groupId, onChangeCallback) {
  const container = document.getElementById(groupId);
  if (!container) return;

  const pills = container.querySelectorAll('.cf-choice-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('is-selected'));
      pill.classList.add('is-selected');
      const val = pill.getAttribute('data-val');
      if (onChangeCallback) onChangeCallback(val);
    });
  });
}

/* ==========================================================================
   Toolbar Navigation Actions (Back / Continue / Find / Restart)
   ========================================================================== */
function initToolbarActions() {
  // Step 1 -> Step 2
  const step1Btn = document.getElementById('step-1-continue-btn');
  if (step1Btn) {
    step1Btn.addEventListener('click', () => updateStepView(2));
  }

  // Step 2 -> Back or Step 3
  const step2Back = document.getElementById('step-2-back-btn');
  const step2Btn = document.getElementById('step-2-continue-btn');
  if (step2Back) step2Back.addEventListener('click', () => updateStepView(1));
  if (step2Btn) step2Btn.addEventListener('click', () => updateStepView(3));

  // Step 3 -> Back or Search
  const step3Back = document.getElementById('step-3-back-btn');
  const findExpBtn = document.getElementById('find-experience-btn');
  const summaryFindBtn = document.getElementById('summary-find-btn');
  const modifyBtn = document.getElementById('modify-blueprint-btn');
  const restartBtn = document.getElementById('restart-wizard-btn');

  if (step3Back) step3Back.addEventListener('click', () => updateStepView(2));
  if (findExpBtn) findExpBtn.addEventListener('click', executeDiscovery);
  if (summaryFindBtn) summaryFindBtn.addEventListener('click', executeDiscovery);
  if (modifyBtn) modifyBtn.addEventListener('click', () => updateStepView(3));

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      localStorage.removeItem('cinemaflow_discovery_prefs');
      updateStepView(1);
    });
  }

  // Quick edit links from summary matrix
  document.querySelectorAll('[data-edit-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-edit-step'), 10);
      updateStepView(targetStep);
    });
  });
}

/* ==========================================================================
   Summary Card Rendering ("Your Movie Night" Blueprint)
   ========================================================================== */
function renderSummaryCard() {
  const locationVal = document.getElementById('sum-location');
  const screenVal = document.getElementById('sum-screen');
  const soundVal = document.getElementById('sum-sound');
  const comfortVal = document.getElementById('sum-comfort');
  const langVal = document.getElementById('sum-language');
  const subsVal = document.getElementById('sum-subtitles');
  const foodVal = document.getElementById('sum-food');
  const distVal = document.getElementById('sum-distance');

  if (locationVal) locationVal.textContent = discoveryState.city.name;
  if (screenVal) {
    if (discoveryState.anyFormat || discoveryState.screens.length === 7) {
      screenVal.textContent = 'Any Screen Format';
    } else if (discoveryState.screens.length > 0) {
      screenVal.textContent = discoveryState.screens.join(' + ');
    } else {
      screenVal.textContent = 'Any Screen Format';
    }
  }
  if (soundVal) soundVal.textContent = discoveryState.sound;
  if (comfortVal) comfortVal.textContent = discoveryState.comfort;
  if (langVal) langVal.textContent = discoveryState.language;
  if (subsVal) subsVal.textContent = discoveryState.subtitles;
  if (foodVal) foodVal.textContent = discoveryState.food;
  if (distVal) distVal.textContent = `Within ${discoveryState.distance} km`;
}

/* ==========================================================================
   Deterministic Experience Ranking & Results Execution (Dual Visuals)
   ========================================================================== */
function executeDiscovery() {
  const resultsSection = document.getElementById('discovery-results-section');
  const resultsList = document.getElementById('experience-cards-list');
  const countBadge = document.getElementById('results-count-badge');

  if (!resultsSection || !resultsList) return;

  // Calculate scores for each theatrical experience
  const scoredExperiences = EXPERIENCES_DATABASE.map(exp => {
    let score = 55; // Calibrated baseline score

    // 1. City Match (+20 for exact match; neutral for 'all')
    if (discoveryState.city.id === 'all' || exp.cityId === discoveryState.city.id) {
      score += 20;
    } else {
      score -= 30;
    }

    // 2. Screen & Format Match (+15)
    if (discoveryState.anyFormat || discoveryState.screens.length === 0) {
      score += 15;
    } else {
      const matchCount = discoveryState.screens.filter(s => exp.screens.includes(s)).length;
      if (matchCount > 0) {
        score += Math.min(18, 10 + (matchCount * 4));
      } else {
        score -= 10;
      }
    }

    // 3. Sound Match (+5)
    if (discoveryState.sound === 'No preference' || discoveryState.sound === 'Standard') {
      score += 5;
    } else if (exp.sound.toLowerCase().includes(discoveryState.sound.toLowerCase())) {
      score += 5;
    }

    // 4. Seating Comfort Match (+5)
    if (discoveryState.comfort === 'No preference' || discoveryState.comfort === 'Standard') {
      score += 5;
    } else if (exp.comfort.toLowerCase() === discoveryState.comfort.toLowerCase()) {
      score += 5;
    }

    // 5. Audio Language (+4)
    if (exp.language.toLowerCase() === discoveryState.language.toLowerCase()) {
      score += 4;
    }

    // 6. Subtitles (+2)
    if (discoveryState.subtitles === 'No preference' || exp.subtitles === discoveryState.subtitles) {
      score += 2;
    }

    // 7. Food & Beverage (+2)
    if (discoveryState.food === 'No preference' || exp.food.toLowerCase().includes(discoveryState.food.toLowerCase())) {
      score += 2;
    }

    // 8. Distance Adjustment
    if (exp.distanceKm <= discoveryState.distance) {
      score += 4;
    } else {
      const penalty = Math.min(18, Math.round((exp.distanceKm - discoveryState.distance) * 2));
      score -= penalty;
    }

    // Clamp score to high-confidence 72% – 98%
    score = Math.max(72, Math.min(98, score));

    return {
      ...exp,
      matchPercentage: score
    };
  });

  // Sort descending by match percentage
  scoredExperiences.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Render Dual-Visual Experience Cards (Movie Poster + Real Theatre Auditorium)
  resultsList.innerHTML = scoredExperiences.map(exp => `
    <div class="cf-experience-card">
      
      <!-- Visual 1: Movie Poster -->
      <div class="cf-exp-poster-wrap">
        <img src="${exp.poster}" alt="${exp.movieTitle}" class="cf-exp-poster-img" loading="lazy">
        <div class="cf-poster-rating-bar">
          <span class="cf-censor-chip">${exp.censor}</span>
          <span class="caption text-muted font-medium">${exp.duration}</span>
        </div>
      </div>

      <!-- Visual 2: Real Theatre Auditorium Venue Photo -->
      <div class="cf-exp-theatre-visual">
        <img src="${exp.theatreImage}" alt="${exp.theatreName}" class="cf-exp-theatre-img" loading="lazy">
        <div class="cf-theatre-overlay-gradient"></div>
        <div class="cf-theatre-badge-pill">${exp.screens[0]}</div>
        <div class="cf-theatre-loc-pill">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
          <span>${exp.distanceKm} km away</span>
        </div>
      </div>

      <!-- Content & Booking Deck -->
      <div class="cf-exp-content">
        <div>
          <div class="cf-exp-top-bar">
            <div>
              <div class="cf-exp-theatre-brand">${exp.theatreBrand} · ${exp.theatreName.split('—')[1] ? exp.theatreName.split('—')[1].trim() : exp.theatreName}</div>
              <h3 class="cf-exp-movie-title">${exp.movieTitle}</h3>
              <div class="cf-exp-theatre-address">
                <span class="font-semibold text-primary">${exp.screens.join(' · ')}</span>
                <span>•</span>
                <span class="text-secondary">${exp.comfort} · ${exp.language} · ${exp.subtitles}</span>
                <span>•</span>
                <span class="text-vermilion font-semibold">${exp.distanceKm} km</span>
              </div>
            </div>

            <!-- PROMINENT MATCH PERCENTAGE BADGE -->
            <div class="cf-match-box-prominent" title="${exp.highlightReason}">
              <div class="cf-match-pct">${exp.matchPercentage}%</div>
              <div class="cf-match-lbl">MATCH</div>
            </div>
          </div>

          <!-- Feature & Amenity Badges Cluster -->
          <div class="cf-exp-badges-cluster">
            ${exp.screens.map(s => `<span class="cf-badge cf-badge-imax">${s}</span>`).join('')}
            <span class="cf-badge cf-badge-atmos">🔊 ${exp.sound}</span>
            <span class="cf-amenity-tag">💺 ${exp.comfort}</span>
            <span class="cf-amenity-tag">🍿 ${exp.food}</span>
            <span class="cf-amenity-tag">🌐 ${exp.language}</span>
          </div>

          <p class="cf-exp-highlight-quote">
            "${exp.highlightReason}"
          </p>
        </div>

        <!-- Available Showtimes Strip & Primary CTA Button -->
        <div class="cf-exp-showtimes-row">
          <div class="cf-exp-showtimes-pills">
            <span class="caption uppercase font-semibold text-muted" style="margin-right: 4px;">Today:</span>
            ${exp.showtimes.map(st => `
              <a href="design-system.html#seat-section" class="cf-showtime-btn" style="min-width: 86px; padding: 0.42rem 0.75rem;">
                <span class="cf-showtime-time">${st.time}</span>
                <span class="cf-showtime-format">${st.format}</span>
                <span class="cf-status-dot ${st.status}" style="margin-top: 2px;"></span>
              </a>
            `).join('')}
          </div>

          <a href="design-system.html#seat-section" class="cf-btn cf-btn-md cf-btn-primary cf-view-exp-btn">
            <span>View Experience →</span>
          </a>
        </div>

      </div>
    </div>
  `).join('');

  if (countBadge) {
    countBadge.textContent = `${scoredExperiences.length} Experiences Ranked`;
  }

  // Reveal results section smoothly
  resultsSection.classList.add('is-active');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (window.cfToast) {
    window.cfToast.success(`Found ${scoredExperiences.length} curated cinema experiences matching your blueprint in ${discoveryState.city.name}!`, 'Experiences Ranked');
  }
}
