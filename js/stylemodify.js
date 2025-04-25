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
        setActiveTheme(themeToLoad); // Beállítjuk az aktív témát
        updateHeaderTitle(themeToLoad); // Frissítjük a fejléc címét

        // Fade-in animáció az oldal betöltésekor
        document.body.classList.add('fade-in');
        setTimeout(() => {
            document.body.classList.remove('fade-in');
        }, 500); // 0.5 másodperc az animáció időtartama
    };

    themeLink.onerror = () => {
        console.warn(`Style not found: ${themeToLoad}. Loading default style.`);

        themeLink.setAttribute('href', defaultStyle);
        themeLink.onload = () => {
            setActiveTheme(defaultStyle);
            updateHeaderTitle(defaultStyle);

            // Fade-in animáció az oldal betöltésekor
            document.body.classList.add('fade-in');
            setTimeout(() => {
                document.body.classList.remove('fade-in');
            }, 500); // 0.5 másodperc az animáció időtartama
        };
    };

    themeLink.setAttribute('href', themeToLoad);

    // Beállítjuk az aktív `li` elemet az aktuális hónaphoz
    setActiveTheme(themeToLoad);
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
                changeStyle(stylePath, this); // Az aktuális elem átadása
            }
        });
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
    const newTitle = monthIndex !== -1
        ? `${monthNames[monthIndex]} Style`
        : 'Months in Styles';

    // Fade-out animáció
    headerTitle.classList.add('fade-out');

    // Várunk, amíg a fade-out animáció lefut
    setTimeout(() => {
        // Frissítjük a fejléc szövegét
        headerTitle.textContent = newTitle;

        // Fade-in animáció
        headerTitle.classList.remove('fade-out');
        headerTitle.classList.add('fade-in');

        // Töröljük a fade-in osztályt az animáció után
        setTimeout(() => {
            headerTitle.classList.remove('fade-in');
        }, 500); // 0.5 másodperc az animáció időtartama
    }, 500); // 0.5 másodperc a fade-out animáció időtartama
}

// Stílusváltás animációval
// Ez a funkció váltja a stíluslapot animációval
// A stíluslap váltásakor a régi stíluslap fade-out animációval eltűnik
// és az új stíluslap fade-in animációval jelenik meg
// A stíluslap váltásakor a betöltésvezérlő is megjelenik
// és eltűnik a stíluslap váltásakor
function changeStyle(sheet, element) {
    const themeLink = document.getElementById('theme-style');
    const loadingIndicator = document.getElementById('loading-indicator');
    if (!themeLink) return console.error('Theme link element not found!');
    if (!loadingIndicator) return console.error('Loading indicator not found!');

    // Megjelenítjük a betöltésvezérlőt
    loadingIndicator.classList.remove('hidden');
    loadingIndicator.classList.add('visible');

    // Fade-out animáció
    document.body.classList.add('fade-out');

    // Kiemeljük a kiválasztott elemet
    if (element) {
        const styleSelectorItems = document.querySelectorAll('.style-selector-list li');
        styleSelectorItems.forEach(li => li.classList.remove('active')); // Eltávolítjuk az aktív osztályt
        element.classList.add('active'); // Hozzáadjuk az aktív osztályt a kiválasztott elemhez
    }

    // Stíluslap váltása
    const newThemeLink = document.createElement('link');
    newThemeLink.rel = 'stylesheet';
    newThemeLink.href = sheet;

    const startTime = Date.now(); // Rögzítjük a kezdési időt

    // Maximum 3 másodperc várakozás
    const timeout = setTimeout(() => {
        const elapsedTime = Date.now() - startTime; // Eltelt idő
        const remainingTime = Math.max(3000 - elapsedTime, 0); // Minimum 3 másodperc biztosítása

        setTimeout(() => {
            loadingIndicator.classList.remove('visible');
            loadingIndicator.classList.add('hidden');
            document.body.classList.remove('fade-out');
            document.body.classList.add('fade-in');

            // Töröljük a fade-in osztályt az animáció után
            setTimeout(() => {
                document.body.classList.remove('fade-in');
            }, 1000); // 1 másodperc az animáció időtartama
        }, remainingTime);
    }, 3000); // 3 másodperc

    newThemeLink.onload = () => {
        // Az új stíluslap betöltődött
        clearTimeout(timeout); // Töröljük a maximum várakozási időt
        themeLink.href = sheet;

        // Frissítjük a fejléc címét
        updateHeaderTitle(sheet);

        const elapsedTime = Date.now() - startTime; // Eltelt idő
        const remainingTime = Math.max(3000 - elapsedTime, 0); // Minimum 3 másodperc biztosítása

        setTimeout(() => {
            loadingIndicator.classList.remove('visible');
            loadingIndicator.classList.add('hidden');
            document.body.classList.remove('fade-out');
            document.body.classList.add('fade-in');

            // Töröljük a fade-in osztályt az animáció után
            setTimeout(() => {
                document.body.classList.remove('fade-in');
            }, 1000); // 1 másodperc az animáció időtartama
        }, remainingTime);
    };

    newThemeLink.onerror = () => {
        console.error(`Failed to load stylesheet: ${sheet}`);
        clearTimeout(timeout); // Töröljük a maximum várakozási időt
        loadingIndicator.classList.remove('visible');
        loadingIndicator.classList.add('hidden');
        document.body.classList.remove('fade-out'); // Töröljük a fade-out osztályt hiba esetén
    };

    // Hozzáadjuk az új stíluslapot a dokumentumhoz
    document.head.appendChild(newThemeLink);
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
