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
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
    
        const monthToStyle = [
            'css/001-components-january.css',
            'css/002-components-february.css',
            'css/003-components-march.css',
            'css/004-components-april.css',
            'css/005-components-may.css',
            'css/006-components-june.css',
            'css/007-components-july.css',
            'css/008-components-august.css',
            'css/009-components-september.css',
            'css/010-components-october.css',
            'css/011-components-november.css',
            'css/012-components-december.css'
        ];
    
        function changeStyle(sheet, element) {
            const themeLink = document.getElementById('theme-style');
            themeLink.classList.add('fade-out');
            setTimeout(() => {
                themeLink.setAttribute('href', sheet);
                localStorage.setItem('selectedStyle', sheet);
                setActiveTheme(sheet);
                updateHeaderTitle(sheet);
                themeLink.classList.remove('fade-out');
            }, 500);  // 0.5 másodperces várakozás a fade-out osztály eltávolításához
        }
    
        function setActiveTheme(theme) {
            document.querySelectorAll('.style-selector-list li').forEach(li => {
                li.classList.toggle('active', theme.includes(li.textContent.trim().toLowerCase()));
            });
        }
    
        function updateHeaderTitle(sheet) {
            const headerTitle = document.getElementById('header-title');
            const monthIndex = monthToStyle.indexOf(sheet);
            if (monthIndex !== -1) {
                headerTitle.textContent = `${monthNames[monthIndex]} Style`;
            } else if (sheet === 'css/000-components-first.css') {
                headerTitle.textContent = 'Months in Styles';
            } else {
                headerTitle.textContent = 'Months in Styles';
            }
        }
    
        window.onload = function() {
            const currentMonth = new Date().getMonth();
            const savedStyle = localStorage.getItem('selectedStyle');
            const themeToLoad = savedStyle && monthToStyle.includes(savedStyle) ? savedStyle : monthToStyle[currentMonth];
    
            document.getElementById('theme-style').setAttribute('href', themeToLoad);
            setActiveTheme(themeToLoad);
            updateHeaderTitle(themeToLoad);
        }


/*  ========================================================================  *\
    E N D   O F   S T Y L E M O D I F Y . J S
\*  ========================================================================  */