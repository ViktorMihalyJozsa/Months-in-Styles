/*  ========================================================================  *\

     W A R N I N G  -  J a v a S c r i p t   ( ES6 modul verzió )

    ------------------------------------------------------------------------

     A figyelmeztető üzenet megjelenítése, ha a felhasználó vízszintes
     tájolásban használja az oldalt, és a képernyő szélessége kisebb mint 768px.

     A figyelmeztetés eltűnik, ha a felhasználó függőleges tájolásra vált.

        A figyelmeztető üzenet a következő szöveget tartalmazza:
        "Kérjük, állítsa a készülékét függőleges tájolásra a jobb élmény érdekében."
        "Please rotate your device to portrait mode for a better experience."

        A figyelmeztető üzenet megjelenítése és eltűnése animálva van.
        
        A figyelmeztető üzenet csak egyszer jelenik meg, amíg a felhasználó
        nem vált tájolást.

        A figyelmeztető üzenet eltűnése után eltávolítja az eseményfigyelőt,
        hogy ne halmozódjon fel.

\*  ========================================================================  */

export function initWarning() {
    checkOrientation();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkOrientation, 200); // Debounce a resize eseményekhez
    });

    window.addEventListener("orientationchange", checkOrientation);
}

function checkOrientation() {
    const warning = document.getElementById("warning");
    if (!warning) return;

    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const maxWidth = 768;

    if (isLandscape && window.innerWidth <= maxWidth) {
        warning.style.display = "flex";
        requestAnimationFrame(() => warning.classList.add("show")); // Sima animáció
    } else {
        warning.classList.remove("show");
        warning.addEventListener("transitionend", () => {
            if (!warning.classList.contains("show")) {
                warning.style.display = "none";
            }
        }, { once: true }); // Eltávolítja az event listenert, hogy ne halmozódjon
    }
}

/*  ========================================================================  *\
      E N D   O F   W A R N I N G - J a v a S c r i p t   F I L E
\*  ========================================================================  */