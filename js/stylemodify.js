/*  ========================================================================  *\
    S T Y L E M O D I F Y . J S
\*  ========================================================================  */

// Hónapok nevei
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// A hónapokhoz tartozó stíluslapok elérési útja
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
    'css/months/012-components-december.css'
];

const defaultStyle = 'css/default-style.css';

// Az oldal betöltésekor inicializáljuk a témát
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
});

// Téma inicializálása
function initTheme() {
    const currentMonth = new Date().getMonth();
    const savedStyle = localStorage.getItem('selectedStyle');
    const isValidStyle = savedStyle && (monthToStyle.includes(savedStyle) || savedStyle === defaultStyle);
    const themeToLoad = isValidStyle ? savedStyle : monthToStyle[currentMonth] || defaultStyle;

    const themeLink = document.getElementById('theme-style');
    if (!themeLink) return console.error('Theme link element not found!');

    themeLink.onload = () => {
        setActiveTheme(themeToLoad);
        updateHeaderTitle(themeToLoad);
    };

    themeLink.onerror = () => {
        console.warn(`Style not found: ${themeToLoad}. Loading default style.`);
        themeLink.setAttribute('href', defaultStyle);
        themeLink.onload = () => {
            setActiveTheme(defaultStyle);
            updateHeaderTitle(defaultStyle);
        };
    };

    themeLink.setAttribute('href', themeToLoad);
    setActiveTheme(themeToLoad);
}

// Eseménykezelők beállítása
function setupEventListeners() {
    const styleSelectorItems = document.querySelectorAll('.style-selector-list li');
    if (!styleSelectorItems.length) {
        console.warn('No style selector items found!');
        return;
    }

    styleSelectorItems.forEach(li => {
        li.addEventListener('click', function () {
            const stylePath = this.getAttribute('data-style');
            if (stylePath) {
                changeStyle(stylePath, this);
            }
        });
    });
}

// Stíluslap váltása
function changeStyle(sheet, element) {
    const themeLink = document.getElementById('theme-style');
    if (!themeLink) return console.error('Theme link element not found!');

    // Kiemeljük a kiválasztott elemet
    if (element) {
        const styleSelectorItems = document.querySelectorAll('.style-selector-list li');
        styleSelectorItems.forEach(li => li.classList.remove('active'));
        element.classList.add('active');
    }

    // Stíluslap váltása
    const newThemeLink = document.createElement('link');
    newThemeLink.rel = 'stylesheet';
    newThemeLink.href = sheet;

    newThemeLink.onload = () => {
        // Az új stíluslap betöltődött
        themeLink.href = sheet;

        // Frissítjük a fejléc címét
        updateHeaderTitle(sheet);
    };

    newThemeLink.onerror = () => {
        console.error(`Failed to load stylesheet: ${sheet}`);
    };

    // Hozzáadjuk az új stíluslapot a dokumentumhoz
    document.head.appendChild(newThemeLink);
}

// Fejléc címének frissítése
function updateHeaderTitle(sheet) {
    const headerTitle = document.getElementById('header-title');
    if (!headerTitle) return console.error('Header title element not found!');

    const monthIndex = monthToStyle.indexOf(sheet);
    const newTitle = monthIndex !== -1
        ? `${monthNames[monthIndex]} Style`
        : 'Months in Styles';

    // Fade-out animáció
    headerTitle.classList.add('fade-out');

    // Várunk, amíg a fade-out animáció lefut
    headerTitle.addEventListener('transitionend', () => {
        // Frissítjük a fejléc szövegét
        headerTitle.textContent = newTitle;

        // Fade-in animáció
        headerTitle.classList.remove('fade-out');
        headerTitle.classList.add('fade-in');
    }, { once: true });
}

// Aktív téma beállítása
function setActiveTheme(theme) {
    const styleSelectorItems = document.querySelectorAll('.style-selector-list li');
    styleSelectorItems.forEach(li => {
        li.classList.remove('active');
        li.setAttribute('aria-selected', 'false');
    });

    const activeLi = document.querySelector(`.style-selector-list li[data-style="${theme}"]`);
    if (activeLi) {
        activeLi.classList.add('active');
        activeLi.setAttribute('aria-selected', 'true');
    } else {
        console.warn(`No matching list item found for theme: ${theme}`);
    }
}

/*  ========================================================================  *\
    E N D   O F   S T Y L E M O D I F Y . J S
\*  ========================================================================  */
