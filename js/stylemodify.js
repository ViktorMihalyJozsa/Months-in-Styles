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

// --- Debug ONE mód kapcsoló ---------------------------------------------------
const debugModeOne = true; // true: hibakeresés engedélyezve, false: kikapcsolva
// --- Segédfüggvények naplózáshoz ------------------------------------------
function log(...args) { if (debugModeOne) console.log(...args); }

// --- Debug mód TWO kapcsoló ---------------------------------------------------
const debugModeTwo = true; // true: hibakeresés engedélyezve, false: kikapcsolva
// --- Segédfüggvények naplózáshoz ------------------------------------------
function warn(...args) { if (debugModeTwo) console.warn(...args); }
function error(...args) { if (debugModeTwo) console.error(...args); }

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
  'css/months/012-components-december.css',
  'css/default-style.css' // Alapértelmezett stílus
];

// --- Idézet fájlok ---------------------------------------------------------
const monthFiles = [
  'quotes/001-january.html',
  'quotes/002-february.html',
  'quotes/003-march.html',
  'quotes/004-april.html',
  'quotes/005-may.html',
  'quotes/006-june.html',
  'quotes/007-july.html',
  'quotes/008-august.html',
  'quotes/009-september.html',
  'quotes/010-october.html',
  'quotes/011-november.html',
  'quotes/012-december.html',
  'quotes/default.html' // Alapértelmezett idézet fájl
];

// --- Idézet betöltése ------------------------------------------------------
function loadQuoteFile(filename) {
  const quoteEl = document.getElementById('month-quote');
  if (!quoteEl) return;

  // Fade out
  quoteEl.classList.remove('fade-in');
  quoteEl.classList.add('fade-out');

  setTimeout(() => {
    fetch(filename)
      .then(response => response.text())
      .then(text => {
        quoteEl.innerHTML = text;
        // Fade in
        quoteEl.classList.remove('fade-out');
        quoteEl.classList.add('fade-in');
      })
      .catch(err => {
        quoteEl.textContent = 'Idézet nem elérhető.';
        quoteEl.classList.remove('fade-out');
        quoteEl.classList.add('fade-in');
        console.error(err);
      });
  }, 1000); // 1 másodperc fade-out után töltjük be az új szöveget
}

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

// --- Aside slide-in/slide-out logika ----------------------------------------
function setupAsideSlide() {
    const aside = document.querySelector('aside');
    const toggle = document.getElementById('style-selector-text-box');
    const styleButtons = aside ? aside.querySelectorAll('.style-selector-list-box button') : [];

    if (aside && toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            aside.classList.toggle('open');
        });
    }

    styleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            aside.classList.remove('open');
        });
    });

    document.body.addEventListener('click', (e) => {
        if (
            aside.classList.contains('open') &&
            !aside.contains(e.target)
        ) {
            aside.classList.remove('open');
        }
    });
}

// --- Függőleges felirat szétbontása DOMContentLoaded után -------------------
function splitVerticalLabel() {
    const label = document.getElementById('vertical-label');
    if (label) {
        // Az aktuális (akár fordított) szöveget vesszük alapul
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

// --- DOMContentLoaded esemény ------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    splitVerticalLabel();
    setupAsideSlide();
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
      log(`Téma betöltése: ${href}`);
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

  // Ha a default stílus aktív, akkor a default.html-t töltsük be
  if (sheet === defaultStyle) {
    loadQuoteFile('quotes/default.html');
    return;
  }

  // Egyébként a hónaphoz tartozó idézetet
  const monthIndex = monthToStyle.indexOf(sheet);
  if (monthIndex >= 0) {
    loadQuoteFile(monthFiles[monthIndex]);
  }
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

// --- Fejléc cím animáció ---------------------------------------------------
function updateHeaderTitle(sheet) { 
  log('updateHeaderTitle hívás:', sheet);

  const headerWelcomeText = document.getElementById('header-welcome-text');
  const headerTitle = document.getElementById('header-title');
  if (!headerWelcomeText || !headerTitle) {
    error('A fejléc szövegelemek nem találhatók!');
    return;
  }

  const monthIndex = monthToStyle.indexOf(sheet);
  let newTitle;

  if (monthIndex >= 0 && monthIndex < monthNames.length) {
    newTitle = `${monthNames[monthIndex]} Style`;
  } else {
    newTitle = 'Monthly Styles';
  }

  log('Új cím:', newTitle);

  // Animációs rész változatlan...
  headerWelcomeText.classList.add('fade-out');
  headerTitle.classList.add('fade-out');

  setTimeout(() => {
    headerWelcomeText.textContent = 'Welcome';
    headerTitle.textContent = newTitle;

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

// --- Aktív téma felhasználói felület frissítése ----------------------------
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

/* ======================================================================== *\
    E N D   O F   S T Y L E M O D I F Y . J S   F I L E
\* ======================================================================== */