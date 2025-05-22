/* ======================================================================== *\
    M A I N . J S
   ------------------------------------------------------------------------
    A belépési pont, csak az itt található modulok kerülnek betöltésre.
\* ======================================================================== */

import { initStyleModify } from './modules/stylemodify.js';
import { initNameday } from './modules/nameday.js';
import { initWarning } from './modules/warning.js';

document.addEventListener('DOMContentLoaded', () => {
    initStyleModify();
    initNameday();
    initWarning();
});

/* ======================================================================== *\
    E N D   O F   M A I N . J S
\* ======================================================================== */