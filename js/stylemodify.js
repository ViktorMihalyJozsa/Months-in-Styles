/* ======================================================================== *\

    S T Y L E M O D I F Y . J S

  -------------------------------------------------------------------------

    Ez a teljes kód tartalmazza:
      - A hónapokhoz tartozó stílusok kezelését.
      - A fejléc címének animációval történő frissítését.
      - Az aktív gomb stílusának frissítését.
      - A hibakezelést és a helyi tároló használatát.
      - A naplózás vezérelhető a debugMode segítségével.

\* ======================================================================== */

// --- Debug mód kapcsoló ---------------------------------------------------
const debugMode = true;

// --- Segédfüggvények naplózáshoz ------------------------------------------
function log(...args) { if (debugMode) console.log(...args); }
function warn(...args) { if (debugMode) console.warn(...args); }
function error(...args) { if (debugMode) console.error(...args); }

// --- Globális változók ----------------------------------------------------
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const monthToStyle = [
  'css/months/001-components-january.css',
  'css/months/002-components-february.css',
  'css/months/003-components-march.css',
  'css/months/004-components-april.css',
  'css/months/005-components-may.css',
  'css/months/006-components-june.css',
  'css/months/007-components-july.css',
  'css/months/008-components-august.css',
  'css/months/009-components-september.css',
  'css/months/010-components-october.css',
  'css/months/011-components-november.css',
  'css/months/012-components-december.css'
];

// --- Képek előtöltése ------------------------------------------------------
function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    log(`Kép előtöltése: ${url}`);
  });
}

const backgroundImages = [
  'images/000-background-first.webp',
  'images/001-background-january.webp',
  'images/002-background-february.webp',
  'images/003-background-march.webp',
  'images/004-background-april.webp',
  'images/005-background-may.webp',
  'images/006-background-june.webp',
  'images/007-background-july.webp',
  'images/008-background-august.webp',
  'images/009-background-september.webp',
  'images/010-background-october.webp',
  'images/011-background-november.webp',
  'images/012-background-december.webp'
];

// --- DOMContentLoaded esemény ------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  log('A DOM teljesen betöltődött.');
  preloadImages(backgroundImages);
  initTheme();
  setupEventListeners();
});

// --- CSS fájlok -------------------------------------------------------------
const defaultStyle = 'css/default-style.css';
const FADE_DURATION = 1000;

// --- Téma inicializálása ----------------------------------------------------
function initTheme() {
  const currentMonth = new Date().getMonth();
  const savedStyle = localStorage.getItem('selectedStyle');
  const valid = savedStyle && (monthToStyle.includes(savedStyle) || savedStyle === defaultStyle);
  const theme = valid ? savedStyle : (monthToStyle[currentMonth] || defaultStyle);
  loadTheme(theme);
}

// --- Téma betöltési segéd --------------------------------------------------
function loadTheme(href) {
  const linkEl = document.getElementById('theme-style');
  if (!linkEl) {
      console.error('A <link> elem nem található!');
      return;
  }

  // CSS fájl elérhetőségének ellenőrzése fetch() segítségével
  fetch(href, { method: 'HEAD', cache: 'no-cache' })
    .then(response => {
      if (!response.ok) {
          throw new Error(`Nem található a fájl: ${href}`);
      }

      // Betöltési események kezelése
      linkEl.onload = () => {
          console.log(`Betöltve: ${href}`);
          applyActiveAndTitle(href);
      };

      // Téma betöltése
      console.log(`Téma betöltése: ${href}`);
      linkEl.setAttribute('href', href);
      localStorage.setItem('selectedStyle', href);

      // Frissítjük a fejlécet és a cím animációját azonnal
      applyActiveAndTitle(href);
    })
    .catch(error => {
      console.warn(`Hiba történt: ${error.message}, visszatérés az alapértelmezett stílusra.`);
      linkEl.setAttribute('href', defaultStyle);
      localStorage.setItem('selectedStyle', defaultStyle);
      applyActiveAndTitle(defaultStyle);
    });
}

// --- Aktív téma és fejléc cím frissítése --------------------------------
function applyActiveAndTitle(sheet) {
  setActiveTheme(sheet);
  updateHeaderTitle(sheet);
}

// --- Eseménykezelők -----------------------------------------------------
function setupEventListeners() {
  const items = document.querySelectorAll('.style-selector-list button, .style-selector-default-theme button');

  if (!items.length) {
    warn('Nincs stílusválasztó elem!');
    return;
  }

  items.forEach(button => {
    button.addEventListener('click', () => {
      const path = button.dataset.style;
      if (!path) return;

      log(`Gomb megnyomva: ${path}`);
      loadTheme(path);
    });
  });
}

// --- Fejléc cím animáció ---------------------------------------------
function updateHeaderTitle(sheet) {
  log('updateHeaderTitle hívás:', sheet);

  // Fejléc elemek kiválasztása
  const headerElements = document.querySelectorAll('#header-title, #header-content');
  if (!headerElements.length) {
    error('A fejléc elemek nem találhatók!');
    return;
  }

  // Új cím meghatározása
  const monthIndex = monthToStyle.indexOf(sheet);
  const newTitle = monthIndex !== -1
    ? `${monthNames[monthIndex]} Style`
    : 'Months in Styles';

  log('Új cím:', newTitle);

  // Eltűnés animáció
  headerElements.forEach(element => element.classList.add('fade-out'));

  setTimeout(() => {
    // Fejléc cím frissítése
    const headerTitle = document.getElementById('header-title');
    const headerContent = document.getElementById('header-content');

    if (headerTitle) {
      headerTitle.textContent = newTitle;
    }

    if (headerContent) {
      headerContent.innerHTML = `
        <h3>Welcome to the:</h3>
        <h1>${newTitle}</h1>
      `; // HTML tartalom frissítése
    }

    // Megjelenés animáció
    headerElements.forEach(element => {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });

    setTimeout(() => {
      // Animáció osztály eltávolítása
      headerElements.forEach(element => element.classList.remove('fade-in'));
    }, FADE_DURATION);

  }, FADE_DURATION);
}

// --- Aktív téma felhasználói felület frissítése ----------------------------
function setActiveTheme(theme) {
  const items = document.querySelectorAll('.style-selector-list button, .style-selector-default-theme button');

  items.forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-selected', 'false');
  });

  const matches = document.querySelectorAll(
    `.style-selector-list button[data-style="${theme}"], .style-selector-default-theme button[data-style="${theme}"]`
  );

  if (matches.length > 0) {
    matches.forEach(match => {
      log(`Téma aktiválása: ${theme}`);
      match.classList.add('active');
      match.setAttribute('aria-selected', 'true');
    });
  } else {
    warn(`Nem található megfelelő elem a témához: ${theme}`);
  }
}

/* ======================================================================== *\
    E N D   O F   S T Y L E M O D I F Y . J S   F I L E
\* ======================================================================== */