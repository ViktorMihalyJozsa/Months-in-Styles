/* ======================================================================== *\

    M A I N . J S

   ------------------------------------------------------------------------
    A belépési pont, csak az inicializálást végzi, importálja a modulokat.
\* ======================================================================== */

import { getUserLang, loadLanguageFile } from './modules/translation.js';
import { initTheme, loadTheme, monthToStyle } from './modules/themeManager.js';
import { setupAsideSlide } from './modules/asideHandler.js';
import { preloadImages } from './modules/utils.js';
import { setNamedayGreeting } from './modules/nameday.js';
import { setupWarning } from './modules/warning.js';

document.addEventListener('DOMContentLoaded', () => {
    const lang = getUserLang();
    loadLanguageFile(lang, () => {
        // applyTranslations(); // ha van ilyen
        setupAsideSlide();
        preloadImages(window.backgroundImages || []);
        initTheme();

        // --- Stílusváltó gombok eseménykezelői ---
        document.querySelectorAll('[data-style]').forEach(btn => {
            btn.addEventListener('click', () => {
                const style = btn.getAttribute('data-style');
                if (monthToStyle.includes(style) || style === 'css/default-style.css') {
                    loadTheme(style);
                }
            });
        });

        // setupEventListeners(); // ha van ilyen
        setNamedayGreeting();
        setupWarning();
    });
});

/* ======================================================================== *\
    E N D   O F   M A I N . J S
\* ======================================================================== */