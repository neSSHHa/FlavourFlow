# Kanban poročilo – Vaja: Razvoj z metodo Kanban

## Pregled Kanban metodologije

Kanban je agilna metodologija za upravljanje razvoja programske opreme, ki temelji na vizualizaciji dela in omejitvah dela v teku (Work In Progress - WIP). V tem projektu smo uporabili Kanban tablo na GitHubu za spremljanje razvoja funkcionalnosti za prikazovanje hranilnih vrednosti receptov.

---

## Struktura Kanban table

### Stolpci (Columns)

Naša Kanban tabla je organizirana v naslednje stolpce:

1. **To Do** - Naloge, ki so načrtovane, vendar še niso začete
2. **Doing** - Naloge, ki so trenutno v izvajanju
3. **Done** - Naloge, ki so zaključene

### Work In Progress (WIP) limit

**WIP limit za stolpec "Doing" = 2**

To pomeni, da lahko sočasno delamo največ **2 nalogi**. Ko je limit dosežen, mora ekipa dokončati eno od nalog v "Doing" stolpcu, preden lahko začne novo.

#### Razlogi za WIP limit:

- **Preprečevanje preobremenitve** - Ekipa se lahko osredotoči na manj nalog hkrati
- **Hitrejše dokončevanje** - Manj nalog v teku pomeni hitrejše zaključevanje posameznih nalog
- **Lahje odkrivanje ozkih grl** - Če naloge dolgo ostanejo v "Doing", je očiten problem
- **Izboljšana kvaliteta** - Več časa za vsako nalogo pomeni boljšo kvaliteto

#### Uporaba WIP limita v praksi:

Ko je limit dosežen (2 nalogi v "Doing"), mora ekipa:
1. Dokončati eno od nalog v "Doing" stolpcu
2. Premakniti dokončano nalogo v "Done"
3. Šele nato lahko premakne novo nalogo iz "To Do" v "Doing"

---

## Prioritetne oznake (Labels)

Za vsako nalogo uporabljamo prioritetne oznake, ki določajo njeno pomembnost:

### Vrste prioritet:

- **🔴 Visoka (High Priority)** - Naloge, ki so kritične za funkcionalnost in morajo biti dokončane najprej
- **🟡 Srednja (Medium Priority)** - Naloge, ki so pomembne, vendar niso nujno kritične
- **🟢 Nizka (Low Priority)** - Naloge, ki so opcijske ali lahko počakajo

### Uporaba prioritet v Kanban tabli:

1. **Označevanje nalog**: Vsaka naloga dobi ustrezen label glede na svojo pomembnost
2. **Izbira naslednje naloge**: Ko je prostor v "Doing" stolpcu, izberemo nalogo z najvišjo prioriteto iz "To Do"
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
- **Microsoft Teams** - primarni kanal za hitro komunikacijo
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

### Praktični primeri:

**Primer 1: Pregled stanja**
```
Asistent: "Kako napreduje razvoj funkcionalnosti za hranilne vrednosti?"
Product Owner: "Trenutno imamo 2 nalogi v 'Doing' stolpcu. Implementacija prikaza 
je skoraj dokončana, dokumentacija je v pripravi. Ocenjujem, da bo vse dokončano 
v naslednjih 2 dneh."
```

**Primer 2: Sprememba zahtev**
```
Asistent: "Dodajmo še prikaz vitaminskih vrednosti."
Product Owner: "Zabeleženo. To bom dodal kot novo nalogo v 'To Do' z srednjo 
prioriteto, saj trenutno delamo na osnovnih hranilnih vrednostih."
```

**Primer 3: Demonstracija**
```
Product Owner: "Lahko organiziramo kratko demo sejo, kjer pokažem trenutno 
implementacijo prikaza hranilnih vrednosti. Kdaj vam ustreza?"
```

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

1. **Začetek**: Vse naloge so bile v "To Do" stolpcu
2. **Začetek dela**: Ko je član ekipe začel delati na nalogi, jo je premaknil v "Doing"
3. **Upoštevanje WIP limita**: Ob premiku v "Doing" smo preverili, ali je limit dosežen
4. **Dokončanje**: Ko je naloga zaključena, jo premaknemo v "Done"

### Faza 4: Spremljanje napredka

- **Dnevno pregledovanje**: Ekipa je vsak dan pregledala Kanban tablo
- **Ažuriranje statusa**: Naloge so bile posodobljene glede na napredek
- **Komunikacija**: Product Owner je redno obveščal ekipo o spremembah

---

## Uporaba Kanban table v praksi

### GitHub Projects

Za organizacijo dela smo uporabili **GitHub Projects** (integrated Kanban board):

#### Prednosti GitHub Projects:
- **Integracija z Issues**: Naloge so vezane na GitHub Issues
- **Avtomatično sledenje**: Commit-i in pull request-i se avtomatično povežejo z nalogami
- **Oznake (Labels)**: Enostavno dodeljevanje prioritet in kategorij
- **Filtri**: Možnost filtriranja nalog po različnih kriterijih

#### Struktura na GitHubu:

```
Project: FlavourFlow - Hranilne vrednosti
├── To Do (Backlog)
│   ├── [Backend, Visoka, 1 SP] Razširitev podatkovnega modela z hranilnimi vrednostmi
│   ├── [Backend, Srednja, 2 SP] Izračun deleža dnevne hranljive vrednosti
│   ├── [Backend, Nizka, 2 SP] API in logika za prenos hranilnih vrednosti
│   ├── [Frontend, Visoka, 2 SP] Vnos hranilnih vrednosti pri ustvarjanju in urejanju recepta
│   ├── [Frontend, Visoka, 2 SP] Prikaz hranilnih vrednosti na strani recepta
│   ├── [Frontend, Visoka, 2 SP] Izgled uporabniškega vmesnika za preračun hranilnih vrednosti in DV%
│   ├── [PO, Visoka, 1 SP] Definicija zahtev in sprejemni kriteriji za hranilne vrednosti
│   └── [Docs, Srednja, 1 SP] Opis Kanban procesa, WIP limita in vloge PO
├── Doing (WIP limit: 2)
│   └── (Največ 2 nalogi sočasno - izbira glede na prioriteto)
└── Done
    └── (Zaključene naloge)
```

**Razporeditev nalog po tipih:**
- **Backend**: 3 naloge (5 SP skupaj)
- **Frontend**: 3 naloge (6 SP skupaj)
- **PO**: 1 naloga (1 SP)
- **Docs**: 1 naloga (1 SP)

### Načela Kanbana v praksi

1. **Vizualizacija dela**: Vse naloge so vidne na enem mestu
2. **Omejevanje dela v teku**: WIP limit = 2 omogoča osredotočenost
3. **Upravljanje toka**: Sledenje, kako hitro se naloge premikajo
4. **Jasna pravila procesa**: Določena pravila za premikanje nalog
5. **Izboljšave procesa**: Redna refleksija o izboljšavah

---

## Sprejemni kriteriji

✅ **Dokument obstaja v repozitoriju**
- Dokument je shranjen v `Implementacija/porocilo_kanban.md`

✅ **Jasno je razvidno, kako je bil Kanban uporabljen v praksi**
- Dokument opisuje strukturo Kanban table
- Razložen je WIP limit in njegova uporaba
- Opisane so prioritetne oznake in njihova uporaba
- Podrobno je opisana vloga Product Ownerja
- Dokumentirana je praktična uporaba GitHub Projects

---

## Zaključek

Metoda Kanban je bila uspešno uporabljena za razvoj funkcionalnosti prikazovanja hranilnih vrednosti. WIP limit 2 je omogočil osredotočenost ekipe in hitrejše dokončevanje nalog. Prioritetne oznake so omogočile jasno razumevanje pomembnosti posameznih nalog. Vloga Product Ownerja je omogočila učinkovito komunikacijo z asistenti in spremljanje napredka razvoja.

Kanban metoda se je izkazala kot učinkovit način organizacije dela, še posebej zaradi:
- Vizualne predstavitve napredka
- Omejitev dela v teku, kar preprečuje preobremenitev
- Fleksibilnosti pri spreminjanju prioritet
- Enostavne integracije z GitHub orodji
