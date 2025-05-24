/* ======================================================================== *\
    M A I N . J S
   ------------------------------------------------------------------------
    A belépési pont, csak az itt található modulok kerülnek betöltésre.
\* ======================================================================== */

import { initStyleModify } from './modules/stylemodify.js';
import { setupAsideDropDown } from './modules/asideDropdown.js';
import { initNameday } from './modules/nameday.js';
import { initWarning } from './modules/warning.js';

document.addEventListener('DOMContentLoaded', () => {
    initStyleModify();         // Stílusváltás, idézetek, háttérkép stb.
    setupAsideDropDown();      // Oldalsó stílusválasztó menü
    initNameday();             // Névnap kijelzés
    initWarning();             // Figyelmeztetés logika
});

/* ======================================================================== *\
    E N D   O F   M A I N . J S
\* ======================================================================== */