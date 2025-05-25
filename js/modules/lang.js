/* ======================================================================== *\

    L A N G . J a v a S c r i p t   ( ES6 modul verzió )

   ------------------------------------------------------------------------

    Nyelvi fájlok, szövegek és idézetek betöltése, alkalmazása, 
    böngésző nyelv lekérése.
    A modul célja, hogy a felhasználói felület szövegeit és idézeteit
    dinamikusan kezelje a böngésző nyelvi beállításai szerint.

\* ======================================================================== */

// --- Debug módok --------------------------------------------------------
import { log, warn, error } from './debug.js';

// --- Visszaadja a böngésző nyelvi kódját (pl. 'hu', 'en') ---------------
export function getUserLang() {
    return navigator.language.split('-')[0].toLowerCase();
}

// --- Nyelvi JS fájl betöltése -------------------------------------------
export function loadLanguageFile(lang, callback) {
    const langMap = {
        en: "text/eng/text-eng.js",
        hu: "text/hun/text-hun.js"
        // Bővíthető további nyelvekkel
    };
    const file = langMap[lang] || langMap["en"];
    const script = document.createElement('script');
    script.src = file;
    script.onload = callback;
    document.head.appendChild(script);
}

// --- Szövegek alkalmazása a DOM-ra --------------------------------------
export function applyTranslations() {
    if (!window.translations) return;
    for (const [id, text] of Object.entries(window.translations)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
}

// --- Hónapnevek a getQuoteFile-hoz --------------------------------------
const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

// --- Idézetfájl kiválasztása nyelv szerint ------------------------------
export function getQuoteFile(monthIndex, lang) {
    if (lang === 'hu') {
        if (monthIndex >= 0 && monthIndex < 12) {
            return `text/hun/quotes-hun/${String(monthIndex + 1).padStart(3, '0')}-${monthNames[monthIndex]}-quotes-hun.html`;
        } else {
            return "text/hun/quotes-hun/default-quotes-hun.html";
        }
    } else {
        if (monthIndex >= 0 && monthIndex < 12) {
            return `text/eng/quotes-eng/${String(monthIndex + 1).padStart(3, '0')}-${monthNames[monthIndex]}-quotes-eng.html`;
        } else {
            return "text/eng/quotes-eng/default-quotes-eng.html";
        }
    }
}

// --- Idézet betöltése ---------------------------------------------------
export function loadQuoteFile(filename, callback) {
    const quoteEl = document.getElementById('month-quote');
    if (!quoteEl) {
        if (callback) callback();
        return;
    }

    quoteEl.classList.remove('fade-in');
    quoteEl.classList.add('fade-out');

    setTimeout(() => {
        fetch(filename)
            .then(response => response.text())
            .then(text => {
                quoteEl.innerHTML = text;
                quoteEl.classList.remove('fade-out');
                quoteEl.classList.add('fade-in');
                if (callback) callback();
            })
            .catch(err => {
                quoteEl.textContent = 'Idézet nem elérhető.';
                quoteEl.classList.remove('fade-out');
                quoteEl.classList.add('fade-in');
                error(err);
                if (callback) callback();
            });
    }, 1000);
}

/* ======================================================================== *\

    E N D   O F   L A N G . J a v a S c r i p t

\* ======================================================================== */