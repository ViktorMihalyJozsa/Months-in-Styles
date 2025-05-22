/* ======================================================================== *\

    N A M E ' S  D A Y  J A V A S C R I P T  ( ES6 modul verzió )

    ------------------------------------------------------------------------

    A névnapok megjelenítése a böngésző nyelvének megfelelően.

    A névnapok tárolása hónapok szerint, ahol a hónapok tömbje tartalmazza
    a napokat és a hozzájuk tartozó neveket.

    A névnapok lekérdezése a havinev() függvény segítségével történik,
    amely visszaadja a megadott hónapban és napon található névnapot.

    A névnapok megjelenítése a setNamedayGreeting() függvény segítségével történik,
    amely a böngésző nyelvének megfelelő szöveget jeleníti meg.

    A névnapok szövegei több nyelven is elérhetők, és a böngésző nyelvének
    megfelelően jelennek meg.

    A névnapok szövegei a namedayTexts objektumban találhatók, ahol a kulcsok
    a nyelvek kódjai, és az értékek a megfelelő szövegek.

\* ======================================================================== */

// Böngésző nyelvének lekérdezése
function getUserLang() {
  return navigator.language.split('-')[0].toLowerCase();
}

// Névnapok tárolása hónapok szerint
const honapok = [
  [], // 0. hónap (nincs használatban)
  ["ÚJÉV, Fruzsina", "Ábel", "Genovéva, Benjámin", "Titusz, Leona", "Simon", "Boldizsár", "Attila, Ramóna", "Gyöngyvér", "Marcell", "Melánia", "Ágota", "ErnŐ", "Veronika", "Bódog", "Lóránt, Loránd", "Gusztáv", "Antal, Antónia", "Piroska", "Sára, Márió", "Fábián, Sebestyén", "Ágnes", "Vince, Artúr", "Zelma, Rajmund", "Timót", "Pál", "Vanda, Paula", "Angelika", "Károly, Karola", "Adél", "Martina, Gerda", "Marcella"],
  ["Ignác", "Karolina, Aida", "Balázs", "Ráhel, Csenge", "Ágota, Ingrid", "Dorottya, Dóra", "Tódor, Rómeó", "Aranka", "Abigél, Alex", "Elvira", "Bertold, Marietta", "Lívia, Lídia", "Ella, Linda", "Bálint, Valentin", "Kolos, Georgina", "Julianna, Lilla", "Donát", "Bernadett", "Zsuzsanna", "Aladár, Álmos", "Eleonóra", "Gerzson", "Alfréd", "Mátyás", "Géza", "Edina", "Ákos, Bátor", "Elemér"],
  ["Albin", "Lujza", "Kornélia", "Kázmér", "Adorján, Adrián", "Leonóra, Inez", "Tamás", "Zoltán", "Franciska, Fanni", "Ildikó", "Szilárd", "Gergely", "Krisztián, Ajtony", "Matild", "Kristóf", "Henrietta", "Gertrúd, Patrik", "Sándor, Ede", "József, Bánk", "Klaudia", "Benedek", "Beáta, Izolda", "Emőke", "Gábor, Karina", "Irén, Irisz", "Emánuel", "Hajnalka", "Gedeon, Johanna", "Auguszta", "Zalán", "Árpád"],
  ["Hugó", "Áron", "Buda, Richárd", "Izidor", "Vince", "Vilmos, Bíborka", "Herman", "Dénes", "Erhard", "Zsolt", "Leó, Szaniszló", "Gyula", "Ida", "Tibor", "Anasztázia, Tas", "Csongor", "Rudolf", "Andrea, Ilma", "Emma", "Tivadar", "Konrád", "Csilla, Noémi", "Béla", "György", "Márk", "Ervin", "Zita", "Valéria", "Péter", "Katalin, Kitti"],
  ["MUNKA ÜNNEPE, Fülöp, Jakab", "Zsigmond", "Tímea, Irma", "Mónika, Flórián", "Györgyi", "Ivett, Frida", "Gizella", "Mihály", "Gergely", "Ármin, Pálma", "Ferenc", "Pongrác", "Szervác, Imola", "Bonifác", "Zsófia, Szonja", "Mózes, Botond", "Paszkál", "Erik, Alexandra", "Ivó, Milán", "Bernát, Felícia", "Konstantin", "Júlia, Rita", "Dezső", "Eszter, Eliza", "Orbán", "Fülöp, Evelin", "Hella", "Emil, Csanád", "Magdolna", "Janka, Zsanett", "Angéla, Petronella"],
  ["Tünde", "Kármen, Anita", "Klotild", "Bulcsú", "Fatime", "Norbert, Cintia", "Róbert", "Medárd", "Félix", "Margit, Gréta", "Barnabás", "Villő", "Antal, Anett", "Vazul", "Jolán, Vid", "Jusztin", "Laura, Alida", "Arnold, Levente", "Gyárfás", "Rafael", "Alajos, Leila", "Paulina", "Zoltán", "Iván", "Vilmos", "János, Pál", "László", "Levente, Irén", "Péter, Pál"],
  ["Tihamér, Annamária", "Ottó", "Kornél, Soma", "Ulrik", "Emese, Sarolta", "Csaba", "Appolónia", "Ellák", "Lukrécia", "Amália", "Nóra, Lili", "Izabella, Dalma", "Jenő", "Őrs, Stella", "Henrik, Roland", "Valter", "Endre, Elek", "Frigyes", "Emília", "Illés", "Dániel, Daniella", "Magdolna", "Lenke", "Kinga, Kincső", "Kristóf, Jakab", "Anna, Anikó", "Olga, Liliána", "Szabolcs", "Márta, Flóra", "Judit, Xénia", "Oszkár"],
  ["Boglárka", "Lehel", "Hermina", "Domonkos, Dominika", "Krisztina", "Berta, Bettina", "Ibolya", "László", "Emőd", "Lőrinc", "Zsuzsanna, Tiborc", "Klára", "Ipoly", "Marcell", "Mária", "Ábrahám", "Jácint", "Ilona", "Huba", "István", "Sámuel, Hajna", "Menyhért, Mirjam", "Bence", "Bertalan", "Lajos, Patrícia", "Izsó", "Gáspár", "Ágoston", "Beatrix, Erna", "Rózsa", "Erika, Bella"],
  ["Egyed, Egon", "Rebeka, Dorina", "Hilda", "Rozália", "Viktor, Lőrinc", "Zakariás", "Regina", "Mária, Adrienn", "Ádám", "Nikolett, Hunor", "Teodóra", "Mária", "Kornél", "Szeréna, Roxána", "Enikő, Melitta", "Edit", "Zsófia", "Diána", "Vilhelmina", "Friderika", "Máté, Mirella", "Móric", "Tekla", "Gellért, Mercédesz", "Eufrozina, Kende", "Jusztina", "Adalbert", "Vencel", "Mihály", "Jeromos"],
  ["Malvin", "Petra", "Helga", "Ferenc", "Aurél", "Brúnó, Renáta", "Amália", "Koppány", "Dénes", "Gedeon", "Brigitta", "Miksa", "Kálmán, Ede", "Helén", "Teréz", "Gál", "Hedvig", "Lukács", "Nándor", "Vendel", "Orsolya", "Előd", "Gyöngyi", "Salamon", "Blanka, Bianka", "Dömötör", "Szabina", "Simon, Szimonetta", "Nárcisz", "Alfonz", "Farkas"],
  ["Marianna", "Achilles", "Győző", "Károly", "Imre", "Lénárd", "Rezső", "Zsombor", "Tivadar", "Réka", "Márton", "Jónás, Renátó", "Szilvia", "Aliz", "Albert, Lipót", "Ödön", "Hortenzia, Gergő", "Jenő", "Erzsébet", "Jolán", "Olivér", "Cecília", "Kelemen, Klementina", "Emma", "Katalin", "Virág", "Virgil", "Stefánia", "Taksony", "András, Andor"],
  ["Elza", "Melinda, Vivien", "Ferenc, Olívia", "Borbála, Barbara", "Vilma", "Miklós", "Ambrus", "Mária", "Natália", "Judit", "Árpád", "Gabriella", "Luca, Otília", "Szilárda", "Valér", "Etelka, Aletta", "Lázár, Olimpia", "Auguszta", "Viola", "Teofil", "Tamás", "Zéno", "Viktória", "Ádám, Éva", "KARÁCSONY, Eugénia", "KARÁCSONY, István", "János", "Kamilla", "Tamás, Tamara", "Dávid", "Szilveszter"]
];

// Névnap lekérdezése
function havinev(ev, ho, nap) {
  if (ho < 1 || ho > 12) {
      console.error("Érvénytelen hónap:", ho);
      return "Nincs névnap";
  }
  if (nap < 1 || nap > honapok[ho].length) {
      console.error("Érvénytelen nap:", nap);
      return "Nincs névnap";
  }
  return honapok[ho][nap - 1];
}

// Többnyelvű szövegek
const namedayTexts = {
  hu: {
    none: "Ma nincs névnap.",
    today: "A mai névnap : <i>{name}</i>",
    wish: "Boldog névnapot kívánunk!"
  },
  en: {
    none: "Unfortunately, there is no name day today.",
    today: "Today is: <i>{name}</i>'s day.",
    wish: "We wish you many happy name days!"
  },
  // További nyelvek itt...
};

// Névnap köszöntő beállítása
function setNamedayGreeting() {
  const ido = new Date();
  const ev = ido.getFullYear();
  const ho = ido.getMonth() + 1;
  const nap = ido.getDate();

  const lang = getUserLang();
  const texts = namedayTexts[lang] || namedayTexts['en'];
  const greetingContainer = document.getElementById('nameday-greeting');
  if (!greetingContainer) {
    console.error('A névnap köszöntő konténer nem található!');
    return;
  }
  const todayNameDay = havinev(ev, ho, nap);
  if (todayNameDay === "Nincs névnap") {
    greetingContainer.innerHTML = `<p>${texts.none}</p>`;
  } else {
    greetingContainer.innerHTML = `
      <p>${texts.today.replace('{name}', todayNameDay)}</p>
      <p>${texts.wish}</p>
    `;
  }
}

// Fő inicializáló függvény exportálása
export function initNameday() {
  setNamedayGreeting();
}

/* ======================================================================== *\
    E N D  O F  N A M E ' S  D A Y  J A V A S C R I P T
\* ======================================================================== */