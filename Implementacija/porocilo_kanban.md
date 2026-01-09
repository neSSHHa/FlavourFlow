# Kanban poročilo – Vaja: Razvoj z metodo Kanban

## Pregled Kanban metodologije

Kanban je agilna metodologija za upravljanje razvoja programske opreme, ki temelji na vizualizaciji dela in omejitvah dela v teku (Work In Progress - WIP). V tem projektu smo uporabili Kanban tablo na GitHubu za spremljanje razvoja funkcionalnosti za prikazovanje hranilnih vrednosti receptov.

---

## Struktura Kanban table

### Stolpci (Columns)

Naša Kanban tabla je organizirana v naslednje stolpce:

1. **Backlog** - Naloge, ki so načrtovane in definirane, vendar še niso pripravljene za delo
2. **Ready** - Naloge, ki so pripravljene za začetek dela (zahteve so jasne, odvisnosti so rešene, naloge so prioritizirane)
3. **In Progress** - Naloge, ki so trenutno v izvajanju (člani ekipe aktivno delajo na njih)
4. **In Review** - Naloge, ki so dokončane in čakajo na pregled (code review, testiranje, pregled dokumentacije)
5. **Done** - Naloge, ki so zaključene, pregledane in odobrene

### Work In Progress (WIP) limit

**WIP limit za stolpec "In Progress" = 2**

To pomeni, da lahko sočasno delamo največ **2 nalogi** v stolpcu "In Progress". Ko je limit dosežen, mora ekipa dokončati eno od nalog v "In Progress" stolpcu in jo premakniti v "In Review", preden lahko začne novo nalogo iz "Ready" stolpca.

#### Razlogi za WIP limit:

- **Preprečevanje preobremenitve** - Ekipa se lahko osredotoči na manj nalog hkrati
- **Hitrejše dokončevanje** - Manj nalog v teku pomeni hitrejše zaključevanje posameznih nalog
- **Lahko odkrivanje ozkih grl** - Če naloge dolgo ostanejo v "In Progress", je očiten problem
- **Izboljšana kvaliteta** - Več časa za vsako nalogo pomeni boljšo kvaliteto
- **Učinkovitejši tok dela** - Preprečuje kopičenje nalog in omogoča kontinuirano izvajanje

#### Določitev WIP limita:

WIP limit 2 smo določili glede na:
- **Velikost ekipe** - število članov, ki sočasno delajo na projektu
- **Vrsto nalog** - kompleksnost in trajanje posameznih nalog (večina nalog je ocenjena na 1-2 SP, kar pomeni pol ure do eno uro dela)
- **Kapacitete ekipe** - realna ocena, koliko nalog lahko ekipa sočasno kvalitetno izvede
- **Optimizacijo toka** - želja po kontinuiranem toku dela brez preobremenitve in s hitrim zaključevanjem nalog

V našem primeru smo se odločili za limit 2, ker:
- Omogoča dovolj fleksibilnosti za vzporedno delo več članov ekipe
- Preprečuje preobremenitev posameznih članov ekipe
- Zagotavlja, da se naloge redno dokončujejo in ne kopičijo v "In Progress"
- Omogoča hitro dokončevanje in premikanje nalog skozi tok dela

#### Uporaba WIP limita v praksi:

Ko je limit dosežen (2 nalogi v "In Progress"), mora ekipa:
1. Dokončati eno od nalog v "In Progress" stolpcu
2. Premakniti dokončano nalogo v "In Review" (za pregled/testiranje)
3. Šele nato lahko premakne novo nalogo iz "Ready" v "In Progress"

Naloge se premikajo skozi tok dela:
- **Backlog → Ready**: Ko so zahteve jasne in naloga je pripravljena
- **Ready → In Progress**: Ko je član ekipe pripravljen začeti (ob upoštevanju WIP limita)
- **In Progress → In Review**: Ko je naloga dokončana
- **In Review → Done**: Ko je naloga pregledana in odobrena

---

## Prioritetne oznake (Labels)

Za vsako nalogo uporabljamo prioritetne oznake, ki določajo njeno pomembnost:

### Vrste prioritet:

- **🔴 Visoka (High Priority)** - Naloge, ki so kritične za funkcionalnost in morajo biti dokončane najprej
- **🟡 Srednja (Medium Priority)** - Naloge, ki so pomembne, vendar niso nujno kritične
- **🟢 Nizka (Low Priority)** - Naloge, ki so opcijske ali lahko počakajo

### Uporaba prioritet v Kanban tabli:

1. **Označevanje nalog**: Vsaka naloga dobi ustrezen label glede na svojo pomembnost
2. **Izbira naslednje naloge**: Ko je prostor v "In Progress" stolpcu (WIP limit ni dosežen), izberemo nalogo z najvišjo prioriteto iz "Ready"
3. **Replaniranje**: V primeru sprememb zahtev ali odkritih napak, lahko prioriteto naloge spremenimo

### Primeri prioritet iz našega projekta:

- **Visoka prioriteta**: 
  - Razširitev podatkovnega modela z hranilnimi vrednostmi (Backend, 1 SP)
  - Vnos hranilnih vrednosti pri ustvarjanju in urejanju recepta (Frontend, 2 SP)
  - Prikaz hranilnih vrednosti na strani recepta (Frontend, 2 SP)
  - Izgled uporabniškega vmesnika za preračun hranilnih vrednosti in DV% (Frontend, 2 SP)
  - Definicija zahtev in sprejemni kriteriji za hranilne vrednosti (PO, 1 SP)
  
- **Srednja prioriteta**:
  - Izračun deleža dnevne hranljive vrednosti (Backend, 2 SP)
  - Opis Kanban procesa, WIP limita in vloge PO (Docs, 1 SP)
  
- **Nizka prioriteta**:
  - API in logika za prenos hranilnih vrednosti (Backend, 2 SP)

---

## Vloga Product Ownerja

### Opis vloge

Product Owner (PO) je član ekipe, ki poleg razvojnega dela opravlja tudi vlogo komunikacijske točke med ekipo in asistenti (stranke). Product Owner je odgovoren za:

1. **Komunikacijo z asistenti** - Product Owner je glavna kontaktna oseba, ki jo asistenti kontaktirajo
2. **Pregled trenutnega stanja** - PO mora imeti pregled nad trenutnim stanjem razvoja
3. **Posodabljanje zahtev** - Spremlja spremembe zahtev in jih posreduje ekipi
4. **Demonstracije** - Ob potrebi demonstrira trenutno funkcionalnost asistentom

### Komunikacija z asistenti

#### Kanal komunikacije:
- **E-mail** - za formalnejša sporočila in dokumentacijo

#### Vrste komunikacije:

1. **Pregled stanja** - Asistenti lahko v vsakem trenutku kontaktirajo PO za pregled napredka
2. **Spremembe zahtev** - Asistenti lahko sporočijo spremembe zahtev, PO jih dokumentira in posreduje ekipi
3. **Popravki** - Če so odkrite napake ali izboljšave, PO jih zabeleži in doda kot naloge v Kanban tablo
4. **Demonstracije** - PO lahko organizira demo sejo za prikaz trenutne funkcionalnosti

### Odgovornosti Product Ownerja v Kanban procesu:

1. **Ažuriranje Kanban table** - PO posodablja naloge na tabli glede na spremembe zahtev
2. **Prioritizacija** - PO dodeljuje prioritete nalogam na podlagi komunikacije z asistenti
3. **Klarifikacija zahtev** - PO pojasni nejasnosti v zahtevah pred začetkom dela
4. **Spremljanje napredka** - PO spremlja napredek in obvešča asistenti o statusu

---

## Razvoj funkcionalnosti po Kanban metodologiji

### Faza 1: Razdelitev funkcionalnosti na naloge

Funkcionalnost "Prikazovanje hranilnih vrednosti receptov" smo razdelili na naslednje naloge:

#### Backend naloge:

1. **Razširitev podatkovnega modela z hranilnimi vrednostmi** (Backend, Visoka prioriteta, 1 točka)
   - Dodati nova polja (kalorije, beljakovine, maščobe, ogljikovi hidrati) v Recipe model/entiteto
   - Zagotoviti, da so polja pravilno shranjena v podatkovno bazo
   - Sprejemni kriteriji: Recipe model vsebuje nova polja za hranilne vrednosti, aplikacija se zažene brez napak, podatki se lahko shranjujejo in pridobivajo iz baze

2. **Izračun deleža dnevne hranljive vrednosti** (Backend, Srednja prioriteta, 2 točki)
   - Implementirati izračun deleža dnevne hranilne vrednosti (DV%) za hranilne vrednosti recepta glede na število porcij (uporaba istega faktorja kot pri `calculate` funkciji)
   - Izračunati DV% na podlagi vnaprej določenih referenčnih dnevnih vrednosti (npr. kcal, beljakovine, maščobe, ogljikovi hidrati)
   - Razširiti odzivni DTO (npr. `RecipeCalculateResponseDTO` ali podoben) za vračanje DV% poleg hranilnih vrednosti

3. **API in logika za prenos hranilnih vrednosti** (Backend, Nizka prioriteta, 2 točki)
   - Razširiti `CalculatedIngredientDTO` z hranilnimi vrednostmi
   - Posodobiti `calculateIngredient` in update metode v `RecipeController`
   - Zagotoviti, da API vrača hranilne vrednosti za izbrano število porcij
   - Sprejemni kriteriji: API odziv za recept vsebuje hranilne vrednosti, hranilne vrednosti so pravilno preslikane iz entitete v DTO, `calculateIngredient` endpoint vrača ustrezne vrednosti glede na porcije

#### Frontend naloge:

4. **Vnos hranilnih vrednosti pri ustvarjanju in urejanju recepta** (Frontend, Visoka prioriteta, 2 točki)
   - Razširiti obrazec za ustvarjanje in urejanje receptov
   - Dodati polja za vnos: kalorije, beljakovine, maščobe, ogljikovi hidrati
   - Sprejemni kriteriji: Uporabnik lahko vnese hranilne vrednosti za recept, podatki so uspešno poslani na backend, obrazec deluje brez napak

5. **Prikaz hranilnih vrednosti na strani recepta** (Frontend, Visoka prioriteta, 2 točki)
   - Dodati sekcijo "Hranilne vrednosti" na stran `recipeDetails`
   - Prikazati kcal, beljakovine, maščobe, ogljikove hidrate z enotami
   - Prikazati hranilne vrednosti na porcijo
   - Sprejemni kriteriji: Vse hranilne vrednosti so vidne v uporabniškem vmesniku, enote (kcal, g) so jasno prikazane, če vrednost manjka, se prikaže "/" ali "Ni podatka"

6. **Izgled uporabniškega vmesnika za preračun hranilnih vrednosti in DV% glede na število porcij** (Frontend, Visoka prioriteta, 2 točki)
   - Implementirati uporabniški vmesnik, ki omogoča:
     * Vnos števila porcij
     * Opcijski vnos dnevnih kalorij
     * Prikaz: preračunanih sestavin, skupnih hranilnih vrednosti (kcal, beljakovine, maščobe, OH), DV% za vsako hranilno vrednost
   - Frontend mora uporabljati obstoječi backend endpoint `GET /api/recipes/{id}/ingredients/calculate`

#### Product Owner in dokumentacijske naloge:

7. **Definicija zahtev in sprejemni kriteriji za hranilne vrednosti** (PO, Visoka prioriteta, 1 točka)
   - Določiti, katere hranilne vrednosti prikazujemo za vsak recept
   - Dogovoriti se, da se vrednosti shranjujejo ročno na recept
   - Opredeliti način prikaza hranilnih vrednosti v uporabniškem vmesniku
   - Sprejemni kriteriji: Prikazani so kalorije (kcal), beljakovine (g), maščobe (g), ogljikovi hidrati (g); vrednosti so numerične in jasno označene z enotami; če vrednost manjka, se prikaže "/" ali "Ni podatka"

8. **Opis Kanban procesa, WIP limita in vloge PO** (Docs, Srednja prioriteta, 1 točka)
   - Opisati strukturo Kanban table in WIP limit (Doing = 2)
   - Navesti uporabo prioritetnih oznak (Visoka / Srednja / Nizka)
   - Opisati vlogo Product Ownerja in komunikacijo z asistenti
   - Sprejemni kriteriji: Dokument obstaja v repozitoriju, jasno je razvidno, kako je bil Kanban uporabljen v praksi

### Faza 2: Ocenjevanje nalog

Naloge smo ocenili z **story pointi (SP)**, kjer 1 SP približno ustreza **pol ure dela**.

- Dokumentacijske naloge in načrtovanje: **1 SP** (2 nalogi)
- Implementacijske naloge: **2 SP** (5 nalog)
- **Skupaj: 13 story pointov**

### Faza 3: Premikanje nalog med stolpci

1. **Začetek**: Vse naloge so bile v "Backlog" stolpcu
2. **Priprava**: Ko so zahteve jasne, se naloge premaknejo v "Ready"
3. **Začetek dela**: Ko je član ekipe začel delati na nalogi, jo je premaknil v "In Progress" (ob upoštevanju WIP limita 2)
4. **Pregled**: Ko je naloga zaključena, jo premaknemo v "In Review" za pregled/testiranje
5. **Dokončanje**: Ko je naloga pregledana in odobrena, jo premaknemo v "Done"

### Faza 4: Spremljanje napredka

- **Dnevno pregledovanje**: Ekipa je vsak dan pregledala Kanban tablo
- **Ažuriranje statusa**: Naloge so bile posodobljene glede na napredek
- **Komunikacija**: Product Owner je redno obveščal ekipo o spremembah

---

## Zaključek

Metoda Kanban je bila uspešno uporabljena za razvoj funkcionalnosti prikazovanja hranilnih vrednosti. WIP limit 2 je omogočil osredotočenost ekipe in hitrejše dokončevanje nalog. Prioritetne oznake so omogočile jasno razumevanje pomembnosti posameznih nalog. Vloga Product Ownerja je omogočila učinkovito komunikacijo z asistenti in spremljanje napredka razvoja.

Kanban metoda se je izkazala kot učinkovit način organizacije dela, še posebej zaradi:
- Vizualne predstavitve napredka
- Omejitev dela v teku, kar preprečuje preobremenitev
- Fleksibilnosti pri spreminjanju prioritet
- Enostavne integracije z GitHub orodji
