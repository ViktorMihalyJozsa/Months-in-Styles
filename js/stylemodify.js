/*  ========================================================================  *\

    S T Y L E M O D I F Y . J S
    
    Dinamikus stíluslapváltás, tárolás, visszatöltés, animációk + blur effekt.

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    Ez a JavaScript fájl a stíluslapok dinamikus betöltésére és 
    a felhasználói választások tárolására szolgál.

    A felhasználó kiválaszthatja a kívánt stílust, amelyet a böngésző helyi 
    tárolójában tárolunk. 
    
    A fájl automatikusan betölti a legutóbb használt stílust, vagy ha ez 
    nem található, akkor a hónapnak megfelelő stílust alkalmazza. 
    
    A stíluslapok közötti váltás animációval történik, 
    amely simább felhasználói élményt biztosít. 
    
    A fájl tartalmaz egy funkciót a fejléc címének frissítésére is, 
    amely a kiválasztott stílus alapján változik.

\*  ========================================================================  */

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
    'css/months/012-components-december.css'
];

const defaultStyle = 'css/default-style.css';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
});

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
}

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

function changeStyle(sheet, element) {
    const themeLink = document.getElementById('theme-style');
    if (!themeLink) return console.error('Theme link element not found!');

    // Fade indul
    document.body.classList.add('fade-out');

    setTimeout(() => {
        // Stílusváltás
        themeLink.setAttribute('href', sheet);
        localStorage.setItem('selectedStyle', sheet);
        setActiveTheme(sheet);
        updateHeaderTitle(sheet);

        // Visszafakulás
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');

        setTimeout(() => {
            document.body.classList.remove('fade-in');
        }, 1200); // hosszabb idő a cascade-hatásra
    }, 800); // fade-out idő
}

function setActiveTheme(theme) {
    if (!theme) return;

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

function updateHeaderTitle(sheet) {
    const headerTitle = document.getElementById('header-title');
    if (!headerTitle) return console.error('Header title element not found!');

    const monthIndex = monthToStyle.indexOf(sheet);
    headerTitle.textContent = monthIndex !== -1
        ? `${monthNames[monthIndex]} Style`
        : 'Months in Styles';
}

/*  ========================================================================  *\
    E N D   O F   S T Y L E M O D I F Y . J S
\*  ========================================================================  */
