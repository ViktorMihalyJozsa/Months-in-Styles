/* ======================================================================== *\

    A S I D E D R O P D O W N . J a v a S c r i p t   ( ES6 modul, bővített )

    ------------------------------------------------------------------------

    Menü (aside) kezelése: újraindítható, lezárható, bővíthető modul.

\* ======================================================================== */

let aside, toggle, styleButtons = [];
let handleToggleClick, handleOutsideClick, handleEscapeKey;

// Inicializálja az aside legördülő menüt.
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

// Eltávolítja az eseménykezelőket – például ha újrainicializálásra van szükség.
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