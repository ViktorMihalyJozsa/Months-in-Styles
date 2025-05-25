/* ======================================================================== *\

    M A I N . J a v a S c r i p t   ( ES6 modul verzió )

   ------------------------------------------------------------------------

    A belépési pont, csak az itt található modulok kerülnek betöltésre.

\* ======================================================================== */

import { initStyleModify } from './modules/stylemodify.js';
import { setupAsideDropDown } from './modules/asideDropDown.js';
import { initNameday } from './modules/nameday.js';
import { initWarning } from './modules/warning.js';
import { getUserLang, loadLanguageFile, applyTranslations, getQuoteFile, loadQuoteFile } from './modules/lang.js';

document.addEventListener('DOMContentLoaded', () => {
    const lang = getUserLang();
    loadLanguageFile(lang, () => {
        applyTranslations();

        // Hónaphoz tartozó idézetfájl betöltése
        const monthIndex = new Date().getMonth();
        const quoteFile = getQuoteFile(monthIndex, lang);
        loadQuoteFile(quoteFile, () => {
            initStyleModify();         // Stílusváltás, háttérkép stb.
            setupAsideDropDown();      // Oldalsó stílusválasztó menü
            initNameday();             // Névnap kijelzés
            initWarning();             // Figyelmeztetés logika
        });
    });
});

/* ======================================================================== *\

    E N D   O F   M A I N . J a v a S c r i p t

\* ======================================================================== */