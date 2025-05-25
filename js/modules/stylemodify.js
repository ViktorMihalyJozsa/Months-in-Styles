/* ======================================================================== *\

    S T Y L E M O D I F Y . J S  (ES6 modul verzió)

    ------------------------------------------------------------------------

    A stílusválasztó modul, amely lehetővé teszi a felhasználók számára,
    hogy különböző hónapokhoz tartozó stílusokat válasszanak.

    A modul betölti a megfelelő CSS fájlokat, háttérképeket,
    valamint kezeli a felhasználói felület eseményeit.

    A modul célja, hogy a felhasználók számára egyedi és vonzó élményt nyújtson
    a hónapok stílusainak megváltoztatásával.

    A modul a következő funkciókat tartalmazza:
    - Debug módok: log, warn, error
    - Hónapok nevei és stílusok
    - Háttérképek előtöltése
    - Háttérkép váltás elmosódással
    - Téma inicializálása és betöltése
    - Aktív téma és fejléc cím frissítése
    - Eseménykezelők a stílusválasztó gombokhoz
    - Függőleges felirat szétbontása
    - Fő inicializáló függvény

\* ======================================================================== */

// --- Debug módok --------------------------------------------------------
import { log, warn, error } from './debug.js';
import { getUserLang, getQuoteFile, loadQuoteFile } from './lang.js';

// --- Globális változók --------------------------------------------------
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
  'css/months/012-components-december.css',
  'css/default.css'
];

const backgroundImages = [
  'images/background/000-default.webp',
  'images/background/001-january.webp',
  'images/background/002-february.webp',
  'images/background/003-march.webp',
  'images/background/004-april.webp',
  'images/background/005-may.webp',
  'images/background/006-june.webp',
  'images/background/007-july.webp',
  'images/background/008-august.webp',
  'images/background/009-september.webp',
  'images/background/010-october.webp',
  'images/background/011-november.webp',
  'images/background/012-december.webp',
];

const defaultStyle = 'css/default.css';
const FADE_DURATION = 1000;

// --- Képek előtöltése ---------------------------------------------------
function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    log(`Kép előtöltése: ${url}`);
  });
}

// --- Háttérkép váltás elmosódással --------------------------------------
function changeBackgroundImageWithBlur(newImageUrl) {
  const body = document.body;
  body.classList.add('bg-blur');
  setTimeout(() => {
    body.style.backgroundImage = `url('${newImageUrl}')`;
    setTimeout(() => {
      body.classList.remove('bg-blur');
    }, 800);
  }, 800);
}

// --- Téma inicializálása ------------------------------------------------
function initTheme() {
  const currentMonth = new Date().getMonth();
  const savedStyle = localStorage.getItem('selectedStyle');
  const valid = savedStyle && (monthToStyle.includes(savedStyle) || savedStyle === defaultStyle);
  const theme = valid ? savedStyle : (monthToStyle[currentMonth] || defaultStyle);
  loadTheme(theme);
}

// --- Téma betöltési segéd -----------------------------------------------
function loadTheme(href) {
  const linkEl = document.getElementById('theme-style');
  if (!linkEl) {
    error('A <link> elem nem található!');
    return;
  }

  fetch(href, { method: 'HEAD', cache: 'no-cache' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Nem található a fájl: ${href}`);
      }

      linkEl.onload = () => {
        log(`Betöltve: ${href}`);
        applyActiveAndTitle(href);
      };

      log(`Téma betöltése: ${href}`);
      linkEl.setAttribute('href', href);
      localStorage.setItem('selectedStyle', href);

      applyActiveAndTitle(href);
    })
    .catch(error => {
      warn(`Hiba történt: ${error.message}, visszatérés az alapértelmezett stílusra.`);
      linkEl.setAttribute('href', defaultStyle);
      localStorage.setItem('selectedStyle', defaultStyle);
      applyActiveAndTitle(defaultStyle);
    });
}

// --- Aktív téma és fejléc cím frissítése --------------------------------
function applyActiveAndTitle(sheet) {
  setActiveTheme(sheet);
  updateHeaderTitle(sheet);

  // --- Idézet frissítése stílusváltáskor ---
  const lang = getUserLang();
  const monthIndex = monthToStyle.indexOf(sheet);
  let quoteFile;
  if (monthIndex >= 0 && monthIndex < 12) {
    quoteFile = getQuoteFile(monthIndex, lang);
    // Háttérkép váltás blur-rel
    changeBackgroundImageWithBlur(backgroundImages[monthIndex + 1]);
  } else {
    quoteFile = getQuoteFile(-1, lang);
    // Default háttérkép blur-rel
    changeBackgroundImageWithBlur(backgroundImages[0]);
  }
  loadQuoteFile(quoteFile);
}

// --- Eseménykezelők -----------------------------------------------------
function setupEventListeners() {
  const items = document.querySelectorAll('.style-selector-list-one button, .style-selector-list-two button');

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

// --- Fejléc cím animáció ------------------------------------------------
function updateHeaderTitle(sheet) {
  log('updateHeaderTitle hívás:', sheet);

  const headerWelcomeText = document.getElementById('header-welcome-text');
  const headerTitle = document.getElementById('header-title');
  if (!headerWelcomeText || !headerTitle) {
    error('A fejléc szövegelemek nem találhatók!');
    return;
  }

  const monthIndex = monthToStyle.indexOf(sheet);
  let titleKey = "header-title";
  if (monthIndex >= 0 && monthIndex < monthNames.length) {
    titleKey = `header-title-${monthNames[monthIndex].toLowerCase()}`;
  }

  headerWelcomeText.classList.add('fade-out');
  headerTitle.classList.add('fade-out');

  setTimeout(() => {
    // Fordítási objektum használata
    headerWelcomeText.textContent = window.translations?.["header-welcome-text"] || "Üdvözlet";
    headerTitle.textContent = window.translations?.[titleKey] || "Stílusos Hónapok";

    headerWelcomeText.classList.remove('fade-out');
    headerWelcomeText.classList.add('fade-in');
    headerTitle.classList.remove('fade-out');
    headerTitle.classList.add('fade-in');

    setTimeout(() => {
      headerWelcomeText.classList.remove('fade-in');
      headerTitle.classList.remove('fade-in');
    }, FADE_DURATION);

  }, FADE_DURATION);
}

// --- Aktív téma felhasználói felület frissítése -------------------------
function setActiveTheme(theme) {
  const items = document.querySelectorAll('.style-selector-list-one button, .style-selector-list-two button');

  items.forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-selected', 'false');
  });

  const matches = document.querySelectorAll(
    `.style-selector-list-one button[data-style="${theme}"], .style-selector-list-two button[data-style="${theme}"]`
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

// --- Függőleges felirat szétbontása -------------------------------------
function splitVerticalLabel() {
  log('splitVerticalLabel fut');
  const label = document.getElementById('vertical-label');
  if (label) {
    const labelText = label.textContent.trim();
    label.innerHTML = '';
    for (const char of labelText) {
      if (char === ' ') {
        label.appendChild(document.createElement('br'));
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        label.appendChild(span);
      }
    }
    label.setAttribute('aria-label', labelText);
  }
}

// --- Fő inicializáló függvény exportálása -------------------------------
export function initStyleModify() {
  splitVerticalLabel();
  preloadImages(backgroundImages);
  initTheme();
  setupEventListeners();
}

/* ======================================================================== *\

    E N D   O F   S T Y L E M O D I F Y . J S   F I L E
    
\* ======================================================================== */