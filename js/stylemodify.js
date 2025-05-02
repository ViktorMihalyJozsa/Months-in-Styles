/* ======================================================================== *\

    S T Y L E M O D I F Y . J S

  -------------------------------------------------------------------------

    Ez a teljes kód tartalmazza:
      - A hónapokhoz tartozó stílusok kezelését.
      - A fejléc címének animációval történő frissítését.
      - Az aktív gomb stílusának frissítését.
      - A hibakezelést és a helyi tároló használatát.

\* ======================================================================== */

// --- Globális változók -----------------------------------------------------
// Hónapok nevei és stílusok
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Hónapokhoz tartozó stílusok
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
// Képek előtöltése
function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      console.log(`Kép előtöltése: ${url}`);
  });
}

// Az összes háttérkép URL-je
const backgroundImages = [
  'images/000-background-first.webp',  // Alapértelmezett háttérkép
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
// Az esemény akkor aktiválódik, amikor a DOM teljesen betöltődött
document.addEventListener('DOMContentLoaded', () => {
  console.log('A DOM teljesen betöltődött.');
  preloadImages(backgroundImages); // Képek előtöltése
  initTheme(); // Téma inicializálása
  setupEventListeners(); // Eseménykezelők beállítása
});

// --- CSS fájlok -------------------------------------------------------------
// Ez a stílus akkor kerül alkalmazásra, ha a hónaphoz nem tartozik stílus
const defaultStyle = 'css/default-style.css';  // Alapértelmezett stílus
const FADE_DURATION = 1000;                    // 1 másodperc fade-out animációhoz

// --- Téma inicializálása ----------------------------------------------------
// Ellenőrzi a helyi tárolót és beállítja a témát az aktuális hónap alapján
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

  // Betöltési események kezelése
  linkEl.onload = () => {
      console.log(`Betöltve: ${href}`);
      applyActiveAndTitle(href);
  };

  // Hibakezelés
  linkEl.onerror = () => {
      console.warn(`Nem sikerült betölteni: ${href}, visszatérés az alapértelmezett stílusra.`);
      linkEl.setAttribute('href', defaultStyle);
      localStorage.setItem('selectedStyle', defaultStyle);
      applyActiveAndTitle(defaultStyle);
  };

  // Téma betöltése
  console.log(`Téma betöltése: ${href}`);
  linkEl.setAttribute('href', href);
  localStorage.setItem('selectedStyle', href);

  // Frissítjük a fejlécet és a cím animációját azonnal
  applyActiveAndTitle(href);
}

// --- Aktív téma és fejléc cím frissítése --------------------------------
// Frissíti a felhasználói felületet és a fejléc címét
function applyActiveAndTitle(sheet) {
  setActiveTheme(sheet); // Aktív gomb frissítése
  updateHeaderTitle(sheet); // Fejléc cím frissítése
}

// --- Eseménykezelők -----------------------------------------------------
function setupEventListeners() {
  const items = document.querySelectorAll('.style-selector-list button, .style-selector-default-theme button');

  if (!items.length) {
      console.warn('Nincs stílusválasztó elem!');
      return;
  }

  items.forEach(button => {
      button.addEventListener('click', () => {
          const path = button.dataset.style;
          if (!path) return;

          console.log(`Gomb megnyomva: ${path}`);
          loadTheme(path); // Téma betöltése
      });
  });
}

// --- Fejléc cím animáció ---------------------------------------------
function updateHeaderTitle(sheet) {
  console.log('updateHeaderTitle hívás:', sheet);

  // Kiválasztjuk a header-title és header-content elemeket
  const headerElements = document.querySelectorAll('#header-title, #header-content');
  if (!headerElements.length) {
      console.error('A fejléc elemek nem találhatók!');
      return;
  }

  // Ellenőrizzük, hogy a sheet érvényes hónap stílus-e
  const monthIndex = monthToStyle.indexOf(sheet);
  const newTitle = monthIndex !== -1
      ? `${monthNames[monthIndex]} Style`
      : 'Months in Styles';

  console.log('Új cím:', newTitle);

  // Eltűnés animáció (fade-out)
  headerElements.forEach(element => element.classList.add('fade-out'));

  // Várunk az eltűnés animáció végére (1 másodperc)
  setTimeout(() => {
      // Szöveg frissítése csak a header-title elemnél
      const headerTitle = document.getElementById('header-title');
      if (headerTitle) {
          headerTitle.textContent = newTitle;
      }

      // Eltávolítjuk a fade-out osztályt, és hozzáadjuk a fade-in osztályt
      headerElements.forEach(element => {
          element.classList.remove('fade-out');
          element.classList.add('fade-in');
      });

      // A fade-in animáció végén eltávolítjuk a fade-in osztályt
      setTimeout(() => {
          headerElements.forEach(element => element.classList.remove('fade-in'));
      }, 1000); // 1 másodperc fade-in idő
  }, 1000); // 1 másodperc fade-out idő
}

// --- Aktív téma felhasználói felület frissítése ---------------------------------------------
function setActiveTheme(theme) {
  const items = document.querySelectorAll('.style-selector-list button, .style-selector-default-theme button');

  // Alapállapotba állítás
  items.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
  });

  // Kiválasztott elem kezelése
  const matches = document.querySelectorAll(
      `.style-selector-list button[data-style="${theme}"], .style-selector-default-theme button[data-style="${theme}"]`
  );

  if (matches.length > 0) {
      matches.forEach(match => {
          console.log(`Téma aktiválása: ${theme}`);
          match.classList.add('active');
          match.setAttribute('aria-selected', 'true');
      });
  } 
  else {
      console.warn(`Nem található megfelelő elem a témához: ${theme}`);
  }
}
