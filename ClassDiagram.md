# Razredni Diagram

![Class Diagram](images/classDiagram.png)

# Pregled domenskega modela

## Vloga in namen posameznih razredov

### KategorijaRecepta (enum)
Določa kategorijo recepta (predjed, glavna jed, sladica, pijača, drugo). Uporablja se kot tip atributa v razredu `Recept` in omogoča filtriranje ter prikaz receptov po kategorijah.

### Uporabnik
Predstavlja registriranega uporabnika aplikacije. Hrani osnovne podatke (ime, email, geslo, avatar, datum registracije) in omogoča vse uporabniške funkcionalnosti: ustvarjanje in urejanje receptov, ocenjevanje in komentiranje, upravljanje s priljubljenimi recepti ter delo z nakupovalnim seznamom.

### Administrator
Predstavlja administratorski račun, ki ima lastne prijavne podatke (uporabniško ime, email, geslo) in dostop do administrativnih operacij: pregled uporabnikov, brisanje uporabnikov, receptov, komentarjev ter posredno tudi ocen (prek interne metode).

### Recept
Glavni domenski razred, ki predstavlja recept (naslov, opis, čas priprave, slika, povprečna ocena, kategorija). Povezan je z avtorjem (`Uporabnik`), sestavinami, koraki priprave, ocenami, komentarji, priljubljenimi zapisi in nakupovalnimi seznami.

### Sestavina
Predstavlja osnovno sestavino (npr. »moka«, »sladkor«). Ne vsebuje količine, ampak služi kot “master” seznam sestavin.

### ReceptSestavina
Vmesni razred med `Recept` in `Sestavina`, ki poleg povezave hrani še količino (v enotah, ki jih določi besedilo/kontekst). Uporablja se za modeliranje več-na-več relacije med recepti in sestavinami.

### KorakPriprave
Predstavlja posamezen korak priprave recepta (besedilo, zaporedna številka). Z `Recept` je povezan s kompozicijo, kar pomeni, da koraki obstajajo samo v okviru recepta.

### Ocena
Predstavlja oceno recepta (vrednost 1–5 in datum). Povezana je z `Uporabnik` (kdo je ocenil) in `Recept` (kateri recept je ocenjen). Ocena lahko obstaja samostojno ali skupaj s komentarjem.

### Komentar
Predstavlja besedilni komentar k receptu (besedilo, datum). Povezan je z uporabnikom in receptom ter je v razmerju kompozicije z `Ocena` – komentar je del ocene in brez ocene ne more obstajati.

### Priljubljen
Vmesni razred, ki povezuje uporabnika in recept, ki ga je označil za priljubljenega. Hrani datum dodajanja v priljubljene. Uporablja se za modeliranje seznama priljubljenih receptov posameznega uporabnika.

### NakupovalniSeznam
Predstavlja nakupovalni seznam, ki pripada enemu uporabniku. Vsebuje združene sestavine iz več receptov (za prikaz se filtrirane/združene sestavine modelirajo preko povezave s `Sestavina` in vmesnim razredom `SeznamRecept`).

### SeznamRecept
Vmesni razred med `NakupovalniSeznam` in `Recept`. Hrani informacijo, kateri recept je bil dodan na nakupovalni seznam in kdaj (datum dodajanja). Na tej osnovi lahko sistem zbere in združi sestavine iz vseh dodanih receptov.

### PdfGenerator <<Entity>>
Predstavlja entiteto, odgovorno za generiranje PDF dokumenta iz nakupovalnega seznama (`NakupovalniSeznam`). Odraža tehnični del sistema, ki skrbi za izvoz podatkov v PDF format.

## Ključne metode in njihove naloge

### Uporabnik
- `urediProfil()` / `pridobiProfil()` – omogočata primer uporabe urejanje in pregled svojega profila.
- `ustvarjanjeRecepta(...)` – ustvari nov recept in ga poveže z uporabnikom (Dodaj recept).
- `urediRecept(r: Recept)` – spremeni obstoječi recept, če je uporabnik njegov avtor (Uredi recept).
- `oceniRecept(r, vrednost, komentar)` – doda oceno in po potrebi komentar k receptu (Oceni recept, Dodaj komentar).
- `dodajMedPriljubljene(...)` / `odstraniIzPriljubljenih(...)` / `pridobiPriljubljene()` – izvajajo dodajanje, odstranjevanje in pregled priljubljenih receptov.
- `dodajVSeznam(r)` / `ogledNakupovalnegaSeznama()` / `izvozNakupovalnegaSeznamaPDF()` – omogočajo dodajanje receptov na nakupovalni seznam, ogled združenih sestavin in izvoz seznama v PDF (Dodaj recept v nakupovalni seznam, Ogled nakupovalnega seznama, Izvoz v PDF).

### Administrator
- `pregledUporabnikov()` – omogoča pregled vseh registriranih uporabnikov (Pregled uporabnikov).
- `odstraniUporabnika(u)` – izbriše uporabnika iz sistema (Odstrani uporabnika).
- `odstraniRecept(r)` – odstrani neprimeren ali podvojen recept (Odstrani recept).
- `odstraniKomentar(k)` – izbriše neprimeren komentar; interno pri tem pokliče zasebno metodo `odstraniOceno(o)`, če je komentar povezan z oceno (Odstrani komentar, Odstrani oceno).

### Recept
- `pridobiPodrobnosti()` – vrne vse podrobnosti o receptu (Ogled podrobnosti recepta).
- `uredi()` – posodobi obstoječi recept (Uredi recept).
- `dodajOceno(o)` / `dodajKomentar(k)` – povežeta ocene in komentarje z receptom.
- `izracunajPovprecnoOceno()` – ponovno izračuna povprečno oceno recepta na podlagi vseh ocen.
- `pridobiSeznam(kategorija, maxCas, minOcena)` – javna metoda, ki uporablja zasebni metodi `pridobiVse()` in `filtriraj(...)` za pridobivanje in filtriranje seznama receptov (Ogled seznama receptov in Filtriranje receptov).

### NakupovalniSeznam
- `pristejSestavine(r: Recept)` – doda sestavine iz podanega recepta v nakupovalni seznam (če sestavine že obstajajo, se njihove količine seštejejo).
- `pridobiSestavine()` – vrne končen, združen seznam sestavin, ki ga vidi uporabnik (Ogled nakupovalnega seznama).
- `getPDF()` – pripravi podatke za generiranje PDF dokumenta.

### PdfGenerator <<Entity>>
- `generirajPDF(seznam: NakupovalniSeznam)` – na podlagi nakupovalnega seznama ustvari PDF dokument, ki ga uporabnik lahko prenese (Izvoz nakupovalnega seznama v PDF).

---

Ostali razredi (`Sestavina`, `ReceptSestavina`, `KorakPriprave`, `Ocena`, `Komentar`, `Priljubljen`, `SeznamRecept`) so predvsem podatkovni gradniki, ki podpirajo zgornje funkcionalnosti in pravilno modelirajo relacije (1:N, M:N, kompozicije) v domeni.

# Vloga razredov in ključne metode

## Razredi

#### KategorijaRecepta (enum)
Določa kategorijo recepta (predjed, glavna jed, sladica, pijača, drugo). Uporablja se kot tip atributa v razredu `Recept` in omogoča filtriranje ter prikaz receptov po kategorijah.

#### Uporabnik
Predstavlja registriranega uporabnika aplikacije. Hrani osnovne podatke (ime, email, geslo, avatar, datum registracije) in omogoča vse uporabniške funkcionalnosti: ustvarjanje in urejanje receptov, ocenjevanje in komentiranje, upravljanje s priljubljenimi recepti ter delo z nakupovalnim seznamom.

#### Administrator
Predstavlja administratorski račun, ki ima lastne prijavne podatke (uporabniško ime, email, geslo) in dostop do administrativnih operacij: pregled uporabnikov, brisanje uporabnikov, receptov, komentarjev ter posredno tudi ocen (prek interne metode).

#### Recept
Glavni domenski razred, ki predstavlja recept (naslov, opis, čas priprave, slika, povprečna ocena, kategorija). Povezan je z avtorjem (`Uporabnik`), sestavinami, koraki priprave, ocenami, komentarji, priljubljenimi zapisi in nakupovalnimi seznami.

#### Sestavina
Predstavlja osnovno sestavino (npr. »moka«, »sladkor«). Ne vsebuje količine, ampak služi kot “master” seznam sestavin.

#### ReceptSestavina
Vmesni razred med `Recept` in `Sestavina`, ki poleg povezave hrani še količino (v enotah, ki jih določi besedilo/kontekst). Uporablja se za modeliranje več-na-več relacije med recepti in sestavinami.

#### KorakPriprave
Predstavlja posamezen korak priprave recepta (besedilo, zaporedna številka). Z `Recept` je povezan s kompozicijo, kar pomeni, da koraki obstajajo samo v okviru recepta.

#### Ocena
Predstavlja oceno recepta (vrednost 1–5 in datum). Povezana je z `Uporabnik` (kdo je ocenil) in `Recept` (kateri recept je ocenjen). Ocena lahko obstaja samostojno ali skupaj s komentarjem.

#### Komentar
Predstavlja besedilni komentar k receptu (besedilo, datum). Povezan je z uporabnikom in receptom ter je v razmerju kompozicije z `Ocena` – komentar je del ocene in brez ocene ne more obstajati.

#### Priljubljen
Vmesni razred, ki povezuje uporabnika in recept, ki ga je označil za priljubljenega. Hrani datum dodajanja v priljubljene. Uporablja se za modeliranje seznama priljubljenih receptov posameznega uporabnika.

#### NakupovalniSeznam
Predstavlja nakupovalni seznam, ki pripada enemu uporabniku. Vsebuje združene sestavine iz več receptov (za prikaz se filtrirane/združene sestavine modelirajo preko povezave s `Sestavina` in vmesnim razredom `SeznamRecept`).

#### SeznamRecept
Vmesni razred med `NakupovalniSeznam` in `Recept`. Hrani informacijo, kateri recept je bil dodan na nakupovalni seznam in kdaj (datum dodajanja). Na tej osnovi lahko sistem zbere in združi sestavine iz vseh dodanih receptov.

#### PdfGenerator <<Entity>>
Predstavlja entiteto, odgovorno za generiranje PDF dokumenta iz nakupovalnega seznama (`NakupovalniSeznam`). Odraža tehnični del sistema, ki skrbi za izvoz podatkov v PDF format.

## Ključne metode

#### Uporabnik
- `urediProfil()` / `pridobiProfil()` – omogočata primer uporabe urejanje in pregled svojega profila.
- `ustvarjanjeRecepta(...)` – ustvari nov recept in ga poveže z uporabnikom (Dodaj recept).
- `urediRecept(r: Recept)` – spremeni obstoječi recept, če je uporabnik njegov avtor (Uredi recept).
- `oceniRecept(r, vrednost, komentar)` – doda oceno in po potrebi komentar k receptu (Oceni recept, Dodaj komentar).
- `dodajMedPriljubljene(...)` / `odstraniIzPriljubljenih(...)` / `pridobiPriljubljene()` – izvajajo dodajanje, odstranjevanje in pregled priljubljenih receptov.
- `dodajVSeznam(r)` / `ogledNakupovalnegaSeznama()` / `izvozNakupovalnegaSeznamaPDF()` – omogočajo dodajanje receptov na nakupovalni seznam, ogled združenih sestavin in izvoz seznama v PDF (Dodaj recept v nakupovalni seznam, Ogled nakupovalnega seznama, Izvoz v PDF).

#### Administrator
- `pregledUporabnikov()` – omogoča pregled vseh registriranih uporabnikov (Pregled uporabnikov).
- `odstraniUporabnika(u)` – izbriše uporabnika iz sistema (Odstrani uporabnika).
- `odstraniRecept(r)` – odstrani neprimeren ali podvojen recept (Odstrani recept).
- `odstraniKomentar(k)` – izbriše neprimeren komentar; interno pri tem pokliče zasebno metodo `odstraniOceno(o)`, če je komentar povezan z oceno (Odstrani komentar, Odstrani oceno).

#### Recept
- `pridobiPodrobnosti()` – vrne vse podrobnosti o receptu (Ogled podrobnosti recepta).
- `uredi()` – posodobi obstoječi recept (Uredi recept).
- `dodajOceno(o)` / `dodajKomentar(k)` – povežeta ocene in komentarje z receptom.
- `izracunajPovprecnoOceno()` – ponovno izračuna povprečno oceno recepta na podlagi vseh ocen.
- `pridobiSeznam(kategorija, maxCas, minOcena)` – javna metoda, ki uporablja zasebni metodi `pridobiVse()` in `filtriraj(...)` za pridobivanje in filtriranje seznama receptov (Ogled seznama receptov in Filtriranje receptov).

#### NakupovalniSeznam
- `pristejSestavine(r: Recept)` – doda sestavine iz podanega recepta v nakupovalni seznam (če sestavine že obstajajo, se njihove količine seštejejo).
- `pridobiSestavine()` – vrne končen, združen seznam sestavin, ki ga vidi uporabnik (Ogled nakupovalnega seznama).
- `getPDF()` – pripravi podatke za generiranje PDF dokumenta.

#### PdfGenerator <<Entity>>
- `generirajPDF(seznam: NakupovalniSeznam)` – na podlagi nakupovalnega seznama ustvari PDF dokument, ki ga uporabnik lahko prenese (Izvoz nakupovalnega seznama v PDF).

---

Ostali razredi (`Sestavina`, `ReceptSestavina`, `KorakPriprave`, `Ocena`, `Komentar`, `Priljubljen`, `SeznamRecept`) so predvsem podatkovni gradniki, ki podpirajo zgornje funkcionalnosti in pravilno modelirajo relacije (1:N, M:N, kompozicije) v domeni.



