/*  ========================================================================  *\
    N A M E'S  D A Y  J A V A S C R I P T
\*  ========================================================================  */

function initArray() { 
    this.length = initArray.arguments.length 
    for (var i = 0; i < this.length; i++) 
    this[i+1] = initArray.arguments[i] 
  } 
   
   
  /*  ========================================================================  *\
      N A M E S  p e r  M O N T H
  \*  ========================================================================  */
  
  function havinev(ev,ho,nap) { 
  if (ho==1) 
    { var napok = new initArray("ÚJÉV, Fruzsina","Ábel","Genovéva, Benjámin",
          "Titusz, Leona","Simon","Boldizsár","Attila, Ramóna","Gyöngyvér","Marcell", 
          "Melánia","Ágota","ErnÕ","Veronika","Bódog","Lóránt, Loránd", 
          "Gusztáv","Antal, Antónia","Piroska","Sára, Márió","Fábián, Sebestyén", 
          "Ágnes","Vince, Artúr","Zelma, Rajmund","Timót","Pál","Vanda, Paula", 
          "Angelika","Károly, Karola","Adél","Martina, Gerda","Marcella","") } 
  if (ho==2) 
    if ((ev!=2000) && (ev!=2004) && ev!=1996) 
      { var napok=new initArray("Ignác","Karolina, Aida","Balázs","Ráhel, Csenge",
          "Ágota, Ingrid","Dorottya, Dóra","Tódor, Rómeó","Aranka","Abigél, Alex","Elvira", 
          "Bertold, Marietta","Lívia, Lídia","Ella, Linda","Bálint, Valentin", 
          "Kolos, Georgina","Julianna, Lilla","Donát","Bernadett","Zsuzsanna", 
          "Aladár, Álmos","Eleonóra","Gerzson","Alfréd", 
          "Mátyás","Géza","Edina","Ákos, Bátor","Elemér","","")  } 
       else 
      { var napok=new initArray("Ignác","Karolina, Aida","Balázs","Ráhel, Csenge",
          "Ágota, Ingrid","Dorottya, Dóra","Tódor, Rómeó","Aranka","Abigél, Alex","Elvira", 
          "Bertold, Marietta","Lívia, Lídia","Ella, Linda","Bálint, Valentin", 
          "Kolos, Georgina","Julianna, Lilla","Donát","Bernadett","Zsuzsanna", 
          "Aladár, Álmos","Eleonóra","Gerzson","Alfréd", 
          "Szõkõnap","Mátyás","Géza","Edina","Ákos, Bátor","Elemér","","") } 
  if (ho==3) 
    { var napok=new initArray("Albin","Lujza","Kornélia","Kázmér","Adorján, Adrián",
          "Leonóra, Inez","Tamás","NEMZ.NÕNAP, Zoltán","Franciska, Fanni","Ildikó",
          "Szilárd","Gergely","Krisztián, Ajtony","Matild","NEMZETI ÜNNEP, Kristóf", 
          "Henrietta","Gertrúd, Patrik","Sándor, Ede","József, Bánk","Klaudia", 
          "Benedek","Beáta, Izolda","Emõke","Gábor, Karina","Irén, Irisz", 
          "Emánuel","Hajnalka","Gedeon, Johanna","Auguszta","Zalán","Árpád","" ) } 
  if (ho==4) 
    { var napok=new initArray("Hugó","Áron","Buda, Richárd","Izidor","Vince",
          "Vilmos, Bíborka","Herman","Dénes","Erhard","Zsolt","Leó, Szaniszló","Gyula",
          "Ida","Tibor","Anasztázia, Tas","Csongor","Rudolf","Andrea, Ilma","Emma", 
          "Tivadar","Konrád","Csilla, Noémi","Béla","György","Márk","Ervin", 
          "Zita","Valéria","Péter","Katalin, Kitti","" )} 
  if (ho==5) 
    { var napok=new initArray("MUNKA ÜNNEPE, Fülöp, Jakab","Zsigmond","Tímea, Irma",
          "Mónika, Flórián","Györgyi","Ivett, Frida","Gizella","Mihály","Gergely",
          "Ármin, Pálma","Ferenc","Pongrác","Szervác, Imola","Bonifác","Zsófia, Szonja", 
          "Mózes, Botond","Paszkál","Erik, Alexandra","Ivó, Milán", 
          "Bernát, Felícia","Konstantin","Júlia, Rita","Dezsõ","Eszter, Eliza", 
          "Orbán","Fülöp, Evelin","Hella","Emil, Csanád","Magdolna", 
          "Janka, Zsanett","Angéla, Petronella","" )} 
  if (ho==6) 
    { var napok=new initArray("Tünde","Kármen, Anita","Klotild","Bulcsú","Fatime",
          "Norbert, Cintia","Róbert","Medárd","Félix","Margit, Gréta","Barnabás",
          "Villõ","Antal, Anett","Vazul","Jolán, Vid","Jusztin","Laura, Alida", 
          "Arnold, Levente","Gyárfás","Rafael","Alajos, Leila","Paulina", 
          "Zoltán","Iván","Vilmos","János, Pál","László","Levente, Irén", 
          "Péter, Pál","Pál","" ) } 
  if (ho==7) 
    { var napok=new initArray("Tihamér, Annamária","Ottó","Kornél, Soma","Ulrik",
          "Emese, Sarolta","Csaba","Appolónia","Ellák","Lukrécia","Amália", 
          "Nóra, Lili","Izabella, Dalma","Jenõ","Õrs, Stella","Henrik, Roland","Valter", 
          "Endre, Elek","Frigyes","Emília","Illés","Dániel, Daniella", 
          "Magdolna","Lenke","Kinga, Kincsõ","Kristóf, Jakab","Anna, Anikó", 
          "Olga, Liliána","Szabolcs","Márta, Flóra","Judit, Xénia","Oszkár","" )} 
  if (ho==8) 
    { var napok=new initArray("Boglárka","Lehel","Hermina","Domonkos, Dominika",
          "Krisztina","Berta, Bettina","Ibolya","László","Emõd","Lörinc", 
          "Zsuzsanna, Tiborc","Klára","Ipoly","Marcell","Mária","Ábrahám", 
          "Jácint","Ilona","Huba","ALKOTMÁNY ÜNN., István","Sámuel, Hajna", 
          "Menyhért, Mirjam","Bence","Bertalan","Lajos, Patrícia","Izsó", 
          "Gáspár","Ágoston","Beatrix, Erna","Rózsa","Erika, Bella") } 
  if (ho==9) 
    { var napok= new initArray("Egyed, Egon","Rebeka, Dorina","Hilda","Rozália",
          "Viktor, Lõrinc","Zakariás","Regina","Mária, Adrienn","Ádám","Nikolett, Hunor", 
          "Teodóra","Mária","Kornél","Szeréna, Roxána","Enikõ, Melitta","Edit", 
          "Zsófia","Diána","Vilhelmina","Friderika","Máté, Mirella","Móric", 
          "Tekla","Gellért, Mercédesz","Eufrozina, Kende","Jusztina","Adalbert", 
          "Vencel","Mihály","Jeromos","" )} 
  if (ho==10) 
    { var napok= new initArray("Malvin","Petra","Helga","Ferenc","Aurél","Brúnó, Renáta",
         "Amália","Koppány","Dénes","Gedeon","Brigitta","Miksa","Kálmán, Ede","Helén", 
          "Teréz","Gál","Hedvig","Lukács","Nándor","Vendel","Orsolya","Elõd", 
          "KÖZT.KIKIÁLT., Gyöngyi","Salamon","Blanka, Bianka","Dömötör", 
          "Szabina","Simon, Szimonetta","Nárcisz","Alfonz","Farkas","" )} 
  if (ho==11) 
    { var napok=new initArray("Marianna","Achilles","Gyõzõ","Károly","Imre","Lénárd",
          "Rezsõ","Zsombor","Tivadar","Réka","Márton","Jónás, Renátó","Szilvia", 
          "Aliz","Albert, Lipót","Ödön","Hortenzia, Gergõ","Jenõ","Erzsébet", 
          "Jolán","Olivér","Cecília","Kelemen, Klementina","Emma","Katalin", 
          "Virág","Virgil","Stefánia","Taksony","András, Andor","" )} 
  if (ho==12) 
    { var napok=new initArray("Elza","Melinda, Vivien","Ferenc, Olívia","Borbála, Barbara",
          "Vilma","Miklós","Ambrus","Mária","Natália","Judit","Árpád","Gabriella", 
          "Luca, Otília","Szilárda","Valér","Etelka, Aletta","Lázár, Olimpia", 
          "Auguszta","Viola","Teofil","Tamás","Zéno","Viktória","Ádám, Éva", 
          "KARÁCSONY, Eugénia","KARÁCSONY, István","János","Kamilla", 
          "Tamás, Tamara","Dávid","Szilveszter","") } 
     return napok[nap]; 
  } 
   
  
    /*  ========================================================================  *\
        W R I T I N G  A  N E M E  D A Y  G R E E T I N G
    \*  ========================================================================  */
   
    var ido = new Date() 
    var ev = ido.getYear() 
    var ho = ido.getMonth()+1 
    var nap = ido.getDate() 
    ev+=((ev<97) ? 2000 : 1900) 
  
    document.writeln("<font>Today is </font>")
    document.writeln("<font color=#ffff00>"+havinev(ev,ho,nap)+"</font>")
    document.writeln("<font> day .</font><br>")
    document.writeln("<font> We wish you many happy name days !</font>")


/*  ========================================================================  *\
    E N D  O F  N A M E S  D A Y  J A V A S C R I P T
\*  ========================================================================  */