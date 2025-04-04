/*  ========================================================================  *\
    
    S T Y L E M O D I F Y . J S
    
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

const defaultStyle = 'css/default-style.css'; // Alapértelmezett stílus

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
});

function initTheme() {
    const currentMonth = new Date().getMonth();
    const themeToLoad = monthToStyle[currentMonth];

    const themeLink = document.getElementById('theme-style');
    if (!themeLink) {
        console.error('Theme link element not found!');
        return;
    }

    // Próbáljuk meg betölteni a hónap stílusát
    fetch(themeToLoad)
        .then(response => {
            if (response.ok) {
                // Ha elérhető, betöltjük a hónap stílust
                themeLink.setAttribute('href', themeToLoad);
                setActiveTheme(themeToLoad);
                updateHeaderTitle(themeToLoad);
            } else {
                // Ha nem elérhető, betöltjük a default stílust
                themeLink.setAttribute('href', defaultStyle);
                setActiveTheme(defaultStyle);
                updateHeaderTitle(defaultStyle);
            }
        })
        .catch(() => {
            // Ha hiba van a kérésben (pl. nem elérhető a fájl), betöltjük a default stílust
            themeLink.setAttribute('href', defaultStyle);
            setActiveTheme(defaultStyle);
            updateHeaderTitle(defaultStyle);
        });
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
    if (!themeLink) {
        console.error('Theme link element not found!');
        return;
    }

    themeLink.classList.add('fade-out');
    setTimeout(() => {
        themeLink.setAttribute('href', sheet);
        localStorage.setItem('selectedStyle', sheet);
        setActiveTheme(sheet);
        updateHeaderTitle(sheet);

        themeLink.classList.remove('fade-out');
        themeLink.classList.add('fade-in');

        themeLink.addEventListener('transitionend', () => {
            themeLink.classList.remove('fade-in');
        }, { once: true });
    }, 500);
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
    if (!headerTitle) {
        console.error('Header title element not found!');
        return;
    }

    const monthIndex = monthToStyle.indexOf(sheet);
    headerTitle.textContent = monthIndex !== -1 
        ? `${monthNames[monthIndex]} Style` 
        : 'Months in Styles';
}

/*  ========================================================================  *\
    E N D   O F   S T Y L E M O D I F Y . J S
\*  ========================================================================  */