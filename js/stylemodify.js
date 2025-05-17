/* ======================================================================== *\

    S T Y L E M O D I F Y . J S

  -------------------------------------------------------------------------
    Ez a teljes kód tartalmazza:
    - Többnyelvű szövegek betöltése
    - Debug ONE és TWO mód kapcsoló
    - Segédfüggvények naplózáshoz
    - Globális változók
    - Idézet fájlok
    - Idézet betöltése
    - Képek előtöltése
    - Háttérkép váltás elmosódással
    - Aside slide-in/slide-out logika
    - DOMContentLoaded esemény
    - Függőleges felirat szétbontása
    - CSS fájlok
    - Téma inicializálása
    - Téma betöltési segéd
    - Aktív téma és fejléc cím frissítése
    - Eseménykezelők
    - Fejléc cím animáció
    - Aktív téma felhasználói felület frissítése
    - Stílusválasztó gombok
    - Stílusválasztó lista
    - Stílusválasztó lista gombok
    - Stílusválasztó lista gombok eseménykezelők

\* ======================================================================== */

// --- Többnyelvű szövegek betöltése --------------------------------------
function getUserLang() {
    return navigator.language.split('-')[0].toLowerCase();
}

function loadLanguageFile(lang, callback) {
    const langMap = {
        en: "text/eng/text-eng.js",
        hu: "text/hun/text-hun.js"
        // további nyelvek...
    };
    const file = langMap[lang] || langMap["en"];
    const script = document.createElement('script');
    script.src = file;
    script.onload = callback;
    document.head.appendChild(script);
}

// --- Debug ONE mód kapcsoló ---------------------------------------------
// debugModeOne: true - hibakeresés engedélyezve, false - kikapcsolva
const debugModeOne = true;
// --- Segédfüggvények naplózáshoz ----------------------------------------
function log(...args) { if (debugModeOne) console.log(...args); }

// --- Debug mód TWO kapcsoló ---------------------------------------------
// debugModeTwo: true - hibakeresés engedélyezve, false - kikapcsolva
const debugModeTwo = true; 
// --- Segédfüggvények naplózáshoz ----------------------------------------
function warn(...args) { if (debugModeTwo) console.warn(...args); }
function error(...args) { if (debugModeTwo) console.error(...args); }

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
  'css/default-style.css' // Alapértelmezett stílus
];

// --- Idézetfájl kiválasztása nyelv szerint ------------------------------
function getQuoteFile(monthIndex, lang) {
  if (lang === 'hu') {
    if (monthIndex >= 0 && monthIndex < 12) {
      // magyar: text/hun/quotes-hun/001-january-quotes-hun.html stb.
      return `text/hun/quotes-hun/${String(monthIndex + 1).padStart(3, '0')}-${monthNames[monthIndex].toLowerCase()}-quotes-hun.html`;
    } else {
      return "text/hun/quotes-hun/default-quotes-hun.html";
    }
  } else {
    if (monthIndex >= 0 && monthIndex < 12) {
      // angol: text/eng/quotes-eng/001-january-quotes-eng.html stb.
      return `text/eng/quotes-eng/${String(monthIndex + 1).padStart(3, '0')}-${monthNames[monthIndex].toLowerCase()}-quotes-eng.html`;
    } else {
      return "text/eng/quotes-eng/default-quotes-eng.html";
    }
  }
}

// --- Idézet betöltése ---------------------------------------------------
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

// --- Képek előtöltése ---------------------------------------------------
function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    log(`Kép előtöltése: ${url}`);
  });
}

const backgroundImages = [
  'images/background-images/000-background-default.webp',
  'images/background-images/001-background-january.webp',
  'images/background-images/002-background-february.webp',
  'images/background-images/003-background-march.webp',
  'images/background-images/004-background-april.webp',
  'images/background-images/005-background-may.webp',
  'images/background-images/006-background-june.webp',
  'images/background-images/007-background-july.webp',
  'images/background-images/008-background-august.webp',
  'images/background-images/009-background-september.webp',
  'images/background-images/010-background-october.webp',
  'images/background-images/011-background-november.webp',
  'images/background-images/012-background-december.webp'
];

// --- Háttérkép váltás elmosódással --------------------------------------
function changeBackgroundImageWithBlur(newImageUrl) {
    const body = document.body;
    // Blur rá
    body.classList.add('bg-blur');
    setTimeout(() => {
        // Háttérkép csere, amikor már elmosódott
        body.style.backgroundImage = `url('${newImageUrl}')`;
        // Blur vissza
        setTimeout(() => {
            body.classList.remove('bg-blur');
        }, 2000);  // Ez legyen kb. a background-image transition ideje
    }, 2000);      // Ez legyen kb. a blur transition ideje
}

// --- Aside slide-in/slide-out logika ------------------------------------
function setupAsideSlide() {
    const aside = document.querySelector('aside');
    const toggle = document.getElementById('style-selector-text-box');
    const styleButtons = aside ? aside.querySelectorAll('.style-selector-list-box button') : [];

    // Állítsd be az aside alap translateX értékét (80%-ban rejtve)
    if (aside) {
        aside.style.transition = 'transform 1s cubic-bezier(.77,0,.18,1)';
        aside.style.transform = 'translateX(80%)';
    }

    function openAside() {
        aside.classList.add('open');
        aside.style.transform = 'translateX(0)';
    }
    function closeAside() {
        aside.classList.remove('open');
        aside.style.transform = 'translateX(80%)';
    }
    if (aside && toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (aside.classList.contains('open')) {
                closeAside();
            } else {
                openAside();
            }
        });
    }

    styleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAside();
        });
    });

    document.body.addEventListener('click', (e) => {
        if (
            aside.classList.contains('open') &&
            !aside.contains(e.target)
        ) {
            closeAside();
        }
    });

    // Touch/swipe támogatás mobilra
    let startX = null;
    if (aside) {
        aside.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        aside.addEventListener('touchend', (e) => {
            if (startX !== null) {
                const endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) { // balra swipe - zár
                    closeAside();
                }
                if (endX - startX > 50) { // jobbra swipe - nyit
                    openAside();
                }
                startX = null;
            }
        });
    }
}

// --- DOMContentLoaded esemény -------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const lang = getUserLang();
    loadLanguageFile(lang, () => {
        // Szövegek beírása id alapján
        for (const [id, text] of Object.entries(window.translations)) {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        }
        // Függőleges felirat tördelése csak a szöveg beírása után!
        splitVerticalLabel();
        // További inicializálás
        setupAsideSlide();
        preloadImages(backgroundImages);
        initTheme();
        setupEventListeners();
    });
});

// --- Függőleges felirat szétbontása DOMContentLoaded után ---------------
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

// --- CSS fájlok ---------------------------------------------------------
const defaultStyle = 'css/default-style.css';
const FADE_DURATION = 1000;

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

  const lang = getUserLang();
  const monthIndex = monthToStyle.indexOf(sheet);

  if (sheet === defaultStyle) {
    loadQuoteFile(lang === 'hu'
      ? 'text/hun/quotes-hun/default-quotes-hun.html'
      : 'text/eng/quotes-eng/default-quotes-eng.html');
    return;
  }

  loadQuoteFile(getQuoteFile(monthIndex, lang));
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
    headerWelcomeText.textContent = window.translations["header-welcome-text"] || 'Welcome';

    // Ha hónaphoz tartozó cím, akkor a fordítási kulcsot keresd:
    if (monthIndex >= 0 && monthIndex < monthNames.length) {
        // Például: "header-title-january", "header-title-february", stb.
        const monthKey = `header-title-${monthNames[monthIndex].toLowerCase()}`;
        headerTitle.textContent = window.translations[monthKey] || `${monthNames[monthIndex]} Style`;
    } else {
        headerTitle.textContent = window.translations["header-title"] || 'Monthly Styles';
    }

    // Animaciós osztályok kezelése
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

/* ======================================================================== *\
    E N D   O F   S T Y L E M O D I F Y . J S   F I L E
\* ======================================================================== */