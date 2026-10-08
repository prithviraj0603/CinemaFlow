/**
 * CinemaFlow — Dashboard Homepage Interactive Controller
 * Manages City location, hero carousel, movie rail navigation,
 * right-panel progressive discovery widget, and micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLocationSelector();
  initHeroCarousel();
  initSideDiscoveryWidget();
  initMovieSearch();
  initRailArrows();
});

/* ==========================================================================
   1. Location & City Selector
   ========================================================================== */
const DEFAULT_CITY = { id: 'bengaluru', name: 'Bengaluru' };

function initLocationSelector() {
  const cityLabel = document.getElementById('current-city-label');
  const cityCards = document.querySelectorAll('.cf-city-card');
  const citySearchInput = document.getElementById('city-search-input');

  // Load saved city or default to Bengaluru
  const savedCityStr = localStorage.getItem('cinemaflow_city');
  let currentCity = DEFAULT_CITY;
  if (savedCityStr) {
    try { currentCity = JSON.parse(savedCityStr); } catch (e) { currentCity = DEFAULT_CITY; }
  }

  if (cityLabel) cityLabel.textContent = currentCity.name;
  highlightCityCard(currentCity.id);

  cityCards.forEach(card => {
    card.addEventListener('click', () => {
      const cityId = card.getAttribute('data-city-id');
      const cityName = card.getAttribute('data-city-name');
      const cityObj = { id: cityId, name: cityName };

      localStorage.setItem('cinemaflow_city', JSON.stringify(cityObj));
      if (cityLabel) cityLabel.textContent = cityName;
      highlightCityCard(cityId);

      if (window.cfModal) window.cfModal.close('city-modal');
      if (window.cfToast) window.cfToast.success(`Showing screens & theatres in ${cityName}`, 'Location Updated');
    });
  });

  if (citySearchInput) {
    citySearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      cityCards.forEach(card => {
        const name = (card.getAttribute('data-city-name') || '').toLowerCase();
        const state = (card.querySelector('.cf-city-card-state')?.textContent || '').toLowerCase();
        card.style.display = (name.includes(q) || state.includes(q)) ? 'flex' : 'none';
      });
    });
  }
}

function highlightCityCard(cityId) {
  document.querySelectorAll('.cf-city-card').forEach(c => {
    c.classList.toggle('is-active', c.getAttribute('data-city-id') === cityId);
  });
}

/* ==========================================================================
   2. Hero Spotlight Carousel
   ========================================================================== */
const HERO_MOVIES = [
  {
    title: 'D U N E',
    subtitle: 'PART TWO',
    rating: '8.9/10 (142K)',
    duration: '2h 46m',
    genres: 'Action • Adventure • Sci-Fi',
    languages: 'English, Hindi',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe...',
    backdrop: 'images/dune2_hero.jpg',
    formats: ['IMAX', 'Dolby Atmos', '4DX', 'ScreenX', '3D']
  },
  {
    title: 'DEADPOOL & WOLVERINE',
    subtitle: 'MARVEL STUDIOS',
    rating: '8.2/10 (98K)',
    duration: '2h 07m',
    genres: 'Action • Comedy • Sci-Fi',
    languages: 'English, Hindi',
    synopsis: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy in an irreverent multiverse collision.',
    backdrop: 'images/deadpool_hero.jpg',
    formats: ['IMAX', '3D', '4DX', 'Dolby Atmos']
  },
  {
    title: 'OPPENHEIMER',
    subtitle: 'THE FINAL CUT',
    rating: '8.7/10 (165K)',
    duration: '3h 00m',
    genres: 'Biography • Drama • History',
    languages: 'English',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during the Manhattan Project, filmed with IMAX 70mm cameras.',
    backdrop: 'images/oppenheimer_hero.jpg',
    formats: ['IMAX 70mm', 'Dolby Cinema', 'Laser 2D']
  }
];

let currentHeroIdx = 0;

function initHeroCarousel() {
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');

  if (prevBtn) prevBtn.addEventListener('click', () => switchHero(currentHeroIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => switchHero(currentHeroIdx + 1));
}

function switchHero(newIdx) {
  if (newIdx < 0) newIdx = HERO_MOVIES.length - 1;
  if (newIdx >= HERO_MOVIES.length) newIdx = 0;
  currentHeroIdx = newIdx;

  const data = HERO_MOVIES[currentHeroIdx];
  const bgImg = document.getElementById('hero-bg-img');
  const titleEl = document.getElementById('hero-film-title');
  const subEl = document.getElementById('hero-film-subtitle');
  const ratingEl = document.getElementById('hero-rating-val');
  const metaEl = document.getElementById('hero-meta-txt');
  const synEl = document.getElementById('hero-synopsis-txt');
  const fmtContainer = document.getElementById('hero-formats-container');

  if (bgImg) bgImg.src = data.backdrop;
  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;
  if (ratingEl) ratingEl.textContent = data.rating;
  if (metaEl) metaEl.textContent = `${data.duration} • ${data.genres} • ${data.languages}`;
  if (synEl) synEl.textContent = data.synopsis;
  if (fmtContainer && data.formats) {
    fmtContainer.innerHTML = data.formats.map(f => `<span class="cf-tag-format-pill">${f}</span>`).join('');
  }

  if (window.cfToast) {
    window.cfToast.info(`Spotlight: ${data.title}`, 'Featured Movie');
  }
}

/* ==========================================================================
   3. Right-Panel Interactive Discovery Widget
   ========================================================================== */
function initSideDiscoveryWidget() {
  // Mood Chips
  const moodChips = document.querySelectorAll('.cf-mood-chip');
  moodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      moodChips.forEach(c => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
      const mood = chip.getAttribute('data-mood');
      if (window.cfToast) {
        window.cfToast.info(`Mood selected: ${mood}`, 'Discovery Preference');
      }
    });
  });

  // Preference Cycle Boxes (Genre, Language, Format)
  const genres = ['All Genres', 'Sci-Fi', 'Action', 'Thriller', 'Drama', 'Comedy'];
  const languages = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu'];
  const formats = ['IMAX | 3D | 2D', 'IMAX Laser', '4DX Motion', 'Dolby Atmos'];

  initCycleBox('box-genre', genres);
  initCycleBox('box-lang', languages);
  initCycleBox('box-format', formats);

  // Theatre Experience Cycle Boxes
  const theatreTypes = ['PVR / INOX / Others', 'PVR LUXE', 'INOX Insignia', 'Cinepolis VIP'];
  const comforts = ['Standard', 'Plush Recliner', 'VIP Luxury Lounge'];
  const foods = ['Popcorn + Drinks', 'Full Food & Beverage', 'Gourmet Luxury Dining'];

  initCycleBox('box-theatre-type', theatreTypes);
  initCycleBox('box-comfort', comforts);
  initCycleBox('box-food', foods);

  // Distance Slider
  const distanceSlider = document.getElementById('side-distance-slider');
  const distanceVal = document.getElementById('side-distance-val');
  if (distanceSlider && distanceVal) {
    distanceSlider.addEventListener('input', (e) => {
      distanceVal.textContent = `${e.target.value} km`;
    });
  }

  // Date Selector button
  const dateBtn = document.getElementById('side-date-btn');
  const dates = ['📅 Today, Any Time', '📅 Tonight (After 7 PM)', '📅 Tomorrow, Any Time', '📅 This Weekend'];
  if (dateBtn) {
    let dateIdx = 0;
    dateBtn.addEventListener('click', () => {
      dateIdx = (dateIdx + 1) % dates.length;
      dateBtn.querySelector('span').textContent = dates[dateIdx];
    });
  }

  // Find My Movie CTA Button -> Seamlessly bridge to discover.html
  const findBtn = document.getElementById('side-find-btn');
  if (findBtn) {
    findBtn.addEventListener('click', (e) => {
      e.preventDefault();
      findBtn.classList.add('is-loading');

      // Collect user's sidebar discovery choices
      const selectedMood = document.querySelector('.cf-mood-chip.is-selected')?.getAttribute('data-mood') || 'Action';
      const selectedGenre = document.querySelector('#box-genre .cf-pref-box-val')?.textContent || 'All Genres';
      const selectedLang = document.querySelector('#box-lang .cf-pref-box-val')?.textContent || 'English';
      const selectedFmt = document.querySelector('#box-format .cf-pref-box-val')?.textContent || 'IMAX | 3D | 2D';
      const selectedComfort = document.querySelector('#box-comfort .cf-pref-box-val')?.textContent || 'Standard';
      const selectedFood = document.querySelector('#box-food .cf-pref-box-val')?.textContent || 'Popcorn + Drinks';
      const selectedDist = document.getElementById('side-distance-slider')?.value || '10';

      const savedCityStr = localStorage.getItem('cinemaflow_city');
      let cityObj = { id: 'bengaluru', name: 'Bengaluru' };
      if (savedCityStr) {
        try { cityObj = JSON.parse(savedCityStr); } catch (err) {}
      }

      const discoveryPrefs = {
        city: cityObj,
        mood: selectedMood,
        genre: selectedGenre,
        language: selectedLang,
        format: selectedFmt,
        comfort: selectedComfort,
        food: selectedFood,
        distance: selectedDist
      };

      localStorage.setItem('cinemaflow_discovery_prefs', JSON.stringify(discoveryPrefs));

      if (window.cfToast) {
        window.cfToast.success(`Transferring your preferences to CinemaFlow Discovery...`, 'Finding Experiences');
      }

      setTimeout(() => {
        window.location.href = 'discover.html?fromHome=true';
      }, 400);
    });
  }
}

function initCycleBox(boxId, options) {
  const box = document.getElementById(boxId);
  if (!box) return;

  let currentIdx = 0;
  const valEl = box.querySelector('.cf-pref-box-val');

  box.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % options.length;
    if (valEl) valEl.textContent = options[currentIdx];
    box.classList.add('is-selected');
    setTimeout(() => box.classList.remove('is-selected'), 300);
  });
}

/* ==========================================================================
   4. Movie Search Filtering
   ========================================================================== */
function initMovieSearch() {
  const searchInput = document.getElementById('header-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const movieCards = document.querySelectorAll('.cf-compact-movie-card');

    movieCards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const genres = (card.getAttribute('data-genres') || '').toLowerCase();
      if (title.includes(query) || genres.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = query === '' ? 'flex' : 'none';
      }
    });
  });
}

/* ==========================================================================
   5. Carousel Rail Arrows
   ========================================================================== */
function initRailArrows() {
  document.querySelectorAll('.cf-carousel-arrow-btn[data-rail]').forEach(btn => {
    btn.addEventListener('click', () => {
      const railId = btn.getAttribute('data-rail');
      const rail = document.getElementById(railId);
      if (rail) {
        rail.scrollBy({ left: 300, behavior: 'smooth' });
      }
    });
  });
}
