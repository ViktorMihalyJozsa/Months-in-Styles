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

// Hónapok nevei
// A hónapok nevei angolul vannak megadva, de a felhasználói felületen
// magyarul jelennek meg
// A hónapok nevei a hónapokhoz tartozó stíluslapok elérési útján alapulnak
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

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
});

// Betöltéskor ellenőrizzük a helyi tárolót és a hónapokhoz tartozó stílusokat
// Ha a helyi tárolóban van mentett stílus, azt használjuk
// Ha nincs, akkor a hónapnak megfelelő stílust alkalmazzuk
// A hónapokhoz tartozó stílusokat a monthToStyle tömb tartalmazza
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


// Eseménykezelők beállítása
// Ez a funkció beállítja az eseménykezelőket a stílusválasztó listában
// A lista elemeinek kattintására váltja a stílust
// és frissíti a fejléc címét
// A stílusválasztó lista elemeit a HTML-ben kell definiálni
// és a CSS-ben kell stílusozni
// A lista elemeinek a data-style attribútumot kell tartalmazniuk
// amely a stíluslap elérési útját tartalmazza
// A lista elemeinek a class attribútumot kell tartalmazniuk
// amely a stíluslap elérési útját tartalmazza
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


// Betöltésjelző (opcionális)
// A betöltésjelző megjelenítése és elrejtése a stíluslap váltásakor
// A betöltésjelzőt a CSS fájlban kell definiálni, és a HTML-ben elhelyezni
function changeStyle(sheet, element) {
    const themeLink = document.getElementById('theme-style');
    const loadingIndicator = document.getElementById('loading-indicator'); // Opcionális betöltésjelző
    if (!themeLink) return console.error('Theme link element not found!');

    // Megjelenítjük a betöltésvezérlőt (opcionális)
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');

    // Fade-out animáció
    document.body.classList.add('fade-out');

    // Stíluslap váltása
    themeLink.setAttribute('href', sheet);
    localStorage.setItem('selectedStyle', sheet);

    // Várunk, amíg az összes kép betöltődik
    waitForImagesToLoad(() => {
        // Stílusváltás után frissítjük az aktív témát és a fejlécet
        setActiveTheme(sheet);
        updateHeaderTitle(sheet);

        // Elrejtjük a betöltésvezérlőt (opcionális)
        if (loadingIndicator) loadingIndicator.classList.add('hidden');

        // Fade-in animáció
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');

        setTimeout(() => {
            document.body.classList.remove('fade-in');
        }, 1200); // hosszabb idő a cascade-hatásra
    });
}


// Aktív téma beállítása
// Ez a funkció beállítja az aktív témát a stílusválasztó listában
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

// Frissíti a fejléc címét a kiválasztott stílus alapján
function updateHeaderTitle(sheet) {
    const headerTitle = document.getElementById('header-title');
    if (!headerTitle) return console.error('Header title element not found!');

    const monthIndex = monthToStyle.indexOf(sheet);
    headerTitle.textContent = monthIndex !== -1
        ? `${monthNames[monthIndex]} Style`
        : 'Months in Styles';
}

// Várakozás a képek betöltésére
// Ez a funkció várakozik, amíg az összes kép betöltődik az oldalon
// Ez hasznos lehet, ha a stíluslap váltásakor a képek is frissülnek
function waitForImagesToLoad(callback) {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    if (images.length === 0) {
        // Ha nincs kép az oldalon, azonnal hívjuk a callback-et
        callback();
        return;
    }

    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    callback();
                }
            });
            img.addEventListener('error', () => {
                console.warn(`Image failed to load: ${img.src}`);
                loadedImages++;
                if (loadedImages === images.length) {
                    callback();
                }
            });
        }
    });

    if (loadedImages === images.length) {
        callback();
    }
}

/*  ========================================================================  *\
    E N D   O F   S T Y L E M O D I F Y . J S
\*  ========================================================================  */
