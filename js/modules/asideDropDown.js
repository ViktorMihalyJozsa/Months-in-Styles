/* ======================================================================== *\

    A S I D E D R O P D O W N . J a v a S c r i p t   ( ES6 modul, bővített )

    ------------------------------------------------------------------------

    Menü (aside) kezelése: újraindítható, lezárható, bővíthető modul.

\* ======================================================================== */

// --- Debug módok --------------------------------------------------------
// Debugging eszközök, hibakeresés, naplózás és fejlesztői segédletek.
import { log, warn, error } from './debug.js';

// --- Beállítások és változók --------------------------------------------
// Az aside menü és a kapcsolódó elemek.
let aside, toggle, styleButtons = [];
let handleToggleClick, handleOutsideClick, handleEscapeKey;

// --- Initializálás és eseménykezelők ------------------------------------
// Inicializálja az aside menüt, beállítja a szükséges eseménykezelőket.
// A menü megnyitása és bezárása, valamint a stílusválasztó gombok kezelése.
export function setupAsideDropDown() {
    aside = document.querySelector('aside');
    if (!aside) return;

    toggle = document.getElementById('style-selector-text-box');
    styleButtons = Array.from(aside.querySelectorAll('.style-selector-list-box button'));

    aside.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');

    const openAside = () => {
        aside.classList.add('open');
        toggle?.setAttribute('aria-expanded', 'true');
    };

    const closeAside = () => {
        aside.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
    };

    handleToggleClick = (e) => {
        e.stopPropagation();
        aside.classList.contains('open') ? closeAside() : openAside();
    };

    handleOutsideClick = (e) => {
        if (
            aside.classList.contains('open') &&
            !aside.contains(e.target) &&
            e.target !== toggle
        ) {
            closeAside();
        }
    };

    handleEscapeKey = (e) => {
        if (e.key === 'Escape' && aside.classList.contains('open')) {
            closeAside();
        }
    };

    // Események regisztrálása
    toggle?.addEventListener('click', handleToggleClick);
    styleButtons.forEach(btn => btn.addEventListener('click', closeAside));
    document.body.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
}

// --- Teardown funkciók ---------------------------------------------------
// Ez a funkció eltávolítja az aside menü eseménykezelőit és visszaállítja az állapotát.
export function teardownAsideDropDown() {
    if (!aside || !toggle) return;

    toggle.removeEventListener('click', handleToggleClick);
    styleButtons.forEach(btn => btn.removeEventListener('click', closeAside));
    document.body.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleEscapeKey);
}

/* ======================================================================== *\

    E N D   O F   A S I D E D R O P D O W N . J a v a S c r i p t

\* ======================================================================== */