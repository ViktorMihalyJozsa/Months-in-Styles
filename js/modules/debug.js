/* ======================================================================== *\

    D E B U G . J a v a S c r i p t   ( ES6 modul, bővített )

    ------------------------------------------------------------------------

    Debugging eszközök, hibakeresés, naplózás és fejlesztői segédletek.
    A modul célja, hogy egyszerűsíti a hibakeresést és a naplózást
    a JavaScript kódokban, lehetővé téve a fejlesztők számára, hogy
    könnyen nyomon követhessék a kód működését és hibáit.

    A modul két különböző debug módot kínál, amelyek különböző
    naplózási szinteket biztosítanak:
    - debugModeOne: Alapértelmezett debug mód, amely a console.log
        függvényt használja a naplózáshoz.
    - debugModeTwo: Fejlettebb debug mód, amely a console.warn és
        console.error függvényeket használja a figyelmeztetések és
        hibák naplózásához.

    A debug módok engedélyezése vagy letiltása a debugModeOne és
    debugModeTwo változók értékének módosításával történik.
    A debug módok állapota:
        true  = Debug mód engedélyezve;
        false = Debug mód letiltva;

\* ======================================================================== */

// --- A debug.js modul bővítése, hogy ES6 modul formátumban is használható legyen.
export const debugModeOne = false;  // Itt állítható be az alapértelmezett debug mód
export function log(...args) { if (debugModeOne) console.log(...args); }

export const debugModeTwo = false;  // Itt állítható be a fejlettebb debug mód
export function warn(...args) { if (debugModeTwo) console.warn(...args); }
export function error(...args) { if (debugModeTwo) console.error(...args); }

/* ======================================================================== *\

    E N D   O F   D E B U G . J a v a S c r i p t

\* ======================================================================== */