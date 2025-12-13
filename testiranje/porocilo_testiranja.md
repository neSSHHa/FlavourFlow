# Poročilo o testiranju

## Opis testov

V projektu FlavourFlow smo razvili **6 unit testov**, ki so razdeljeni v **3 testne datoteke**. Vsak test preverja različno funkcionalnost aplikacije in pokriva tako pozitivne kot negativne scenarije.

### 1. Testi za REGISTRACIJO uporabnikov (AuthServiceTest.java)

**Lokacija:** `recepti/src/test/java/ris/recepti/testiranje/AuthServiceTest.java`

#### Test 1.1: Neuspešna registracija z praznim uporabniškim imenom (Negativen scenarij)
- **Metoda:** `register_fail_whenUsernameIsEmpty()`
- **Šta testira:**
  - Preverja, da se registracija NE izvede, če je uporabniško ime prazno
  - Preverja, da se vrne pravilna sporočilo o napaki ("Username is required")
  - Preverja, da se uporabnik NE shrani v bazo podatkov
  - Preverja, da se JWT token NE generira

- **Zakaj je pomemben:**
  - Zagotavlja validacijo vhodnih podatkov
  - Preprečuje shranjevanje neveljavnih podatkov
  - Zagotavlja, da se ne generirajo tokeni za neveljavne zahteve

#### Test 1.2: Uspešna registracija z veljavnimi podatki (Pozitiven scenarij)
- **Metoda:** `register_success_whenDataIsValid()`
- **Šta testira:**
  - Preverja, da se uporabnik uspešno registrira z veljavnimi podatki
  - Preverja, da se uporabnik shrani v bazo podatkov
  - Preverja, da se generira JWT token
  - Preverja, da se vrne pravilen AuthResponse z vsemi potrebnimi podatki (userId, username, role, token)

- **Zakaj je pomemben:**
  - To je osnovni pozitiven scenarij, ki mora delovati
  - Zagotavlja, da registracija uporabnikov deluje pravilno
  - Preverja integracijo med AuthService, UserRepository in JwtService

---

### 2. Testi za PRIJAVLJEVANJE uporabnikov (AuthServiceLoginTest.java)

**Lokacija:** `recepti/src/test/java/ris/recepti/testiranje/AuthServiceLoginTest.java`

#### Test 2.1: Uspešna prijava z veljavnimi podatki (Pozitiven scenarij)
- **Metoda:** `login_success_whenCredentialsAreValid()`
- **Šta testira:**
  - Preverja, da se uporabnik lahko uspešno prijavi z ispravnimi kredencialami (username in password)
  - Preverja, da se generira JWT token po uspešni prijavi
  - Preverja, da se vrne pravilen AuthResponse z vsemi potrebnimi podatki (userId, username, role, token)
  - Preverja, da so vse potrebne metode poklicane (findByUsername, generateToken)

- **Zakaj je pomemben:**
  - To je osnovni pozitiven scenarij za prijavljevanje uporabnikov
  - Zagotavlja, da avtentifikacija uporabnikov deluje pravilno
  - Preverja, da se tokeni pravilno generirajo

#### Test 2.2: Neuspešna prijava z napačnim geslom (Negativen scenarij)
- **Metoda:** `login_fail_whenPasswordIsIncorrect()`
- **Šta testira:**
  - Preverja, da prijava ne uspe, če uporabnik vnese napačno geslo (čeprav je username pravilen)
  - Preverja, da se JWT token NE generira, ko prijava ne uspe
  - Preverja, da se vrne pravilna sporočilo o napaki ("Invalid username or password")
  - Preverja, da so vsa polja v AuthResponse null, ko prijava ne uspe
  - Preverja, da se JWT token nikoli ne generira v primeru neuspešne prijave

- **Zakaj je pomemben:**
  - Zagotavlja varnost aplikacije - ne dovoljuje dostop z napačnimi kredencialami
  - Preverja, da se ne generirajo tokeni za nepooblaščene dostope
  - Preprečuje potencialne varnostne vrzeli

---

### 3. Testi za BRISANJE sestavin (IngredientControllerDeleteTest.java)

**Lokacija:** `recepti/src/test/java/ris/recepti/testiranje/IngredientControllerDeleteTest.java`

#### Test 3.1: Uspešno brisanje sestavine, ki obstaja (Pozitiven scenarij)
- **Metoda:** `deleteIngredient_whenExists_returns204()`
- **Šta testira:**
  - Preverja, da se sestavina uspešno izbriše, če obstaja
  - Preverja, da se vrne HTTP status 204 (No Content)
  - Preverja, da se izbrišejo tudi vse povezave (Recipeingredient), ki so povezane s to sestavino
  - Preverja, da so vse potrebne metode pravilno poklicane (findById, findByIngredient, deleteAll, deleteById)

- **Zakaj je pomemben:**
  - Zagotavlja, da brisanje sestavin deluje pravilno
  - Preverja referenčno integriteto - brisanje sestavine mora izbrisati tudi vse povezave
  - To je osnovna funkcionalnost za upravljanje sestavin

#### Test 3.2: Neuspešno brisanje sestavine, ki ne obstaja (Negativen scenarij)
- **Metoda:** `deleteIngredient_whenMissing_returns404()`
- **Šta testira:**
  - Preverja, da se vrne HTTP status 404 (Not Found), če sestavina ne obstaja
  - Preverja, da se NE izvede nobeno brisanje, če sestavina ne obstaja
  - Preverja, da se metode za iskanje povezav ne pokličejo, če sestavina ne obstaja
  - Preverja, da se ne poskusi izbrisati nečesa, kar ne obstaja

- **Zakaj je pomemben:**
  - Zagotavlja pravilno obravnavanje napak
  - Preprečuje poskuse brisanja neobstoječih entitet
  - Zagotavlja, da aplikacija pravilno obravnava robne primere

---

## Uporabljene anotacije

V testih uporabljamo naslednje anotacije:

- **`@ExtendWith(MockitoExtension.class)`** - omogoča uporabo Mockito frameworka za kreiranje mock objektov
- **`@Mock`** - kreira mock objekte za odvisnosti (npr. UserRepository, JwtService, SestavinaRepository)
- **`@InjectMocks`** - avtomatično injektira mock objekte v testirani razred
- **`@BeforeEach`** - setup metoda, ki se izvede pred vsakim testom
- **`@Test`** - označuje testne metode
- **`@DisplayName`** - daje opisno ime testu, ki se prikaže v testnih izveščilih
- **`@Tag`** - kategorizira teste kot "positive" ali "negative" scenarije

---

## Člani skupine in odgovornosti

- **[Kristina Radeva]** - Razvil teste za REGISTRACIJO uporabnikov (`AuthServiceTest.java`)
  - Test 1.1: Neuspešna registracija z praznim username-om
  - Test 1.2: Uspešna registracija z veljavnimi podatki

- **[Lola Novakovic]** - Razvil teste za PRIJAVLJEVANJE uporabnikov (`AuthServiceLoginTest.java`)
  - Test 2.1: Uspešna prijava z veljavnimi kredencialami
  - Test 2.2: Neuspešna prijava z napačnim geslom

- **[Nenad Jocic]** - Razvil teste za BRISANJE sestavin (`IngredientControllerDeleteTest.java`)
  - Test 3.1: Uspešno brisanje obstoječe sestavine
  - Test 3.2: Neuspešno brisanje neobstoječe sestavine
---

## Analiza uspešnosti testov

### Uspešno izvedeni testi

Vsi testi so uspešno prestali in preverjajo pravilnost delovanja aplikacije:

1. **Testi registracije** - Preverjajo:
   - Validacijo vhodnih podatkov
   - Pravilno shranjevanje uporabnikov
   - Generiranje JWT tokenov

2. **Testi prijave** - Preverjajo:
   - Pravilno preverjanje kredencialov
   - Generiranje tokenov le pri uspešni prijavi
   - Pravilno obravnavanje napak

3. **Testi brisanja sestavin** - Preverjajo:
   - Pravilno brisanje sestavin
   - Obvladovanje referenčne integritete
   - Pravilno obravnavanje napak (404)

### Odkrite napake in odpravljanje

**Odkrite napake:**
Med testiranjem nismo odkrili pomembnih napak v funkcionalnosti. Testi potrjujejo, da:
- Kodiranje in dekodiranje gesel deluje pravilno
- Preverjanje kredencialov deluje kot je treba
- Generiranje JWT tokenov deluje
- Obvladovanje napak je pravilno
- Brisanje entitet z referenčno integriteto deluje pravilno

**Možne izboljšave za prihodnost:**
- Dodatni testi za robne primere (npr. neuspešna prijava, ko uporabnik ne obstaja)
- Testi za prazne vrednosti ali null vrednosti
- Testi za integracijo z bazo podatkov (integracijski testi)

*Opomba: Testi so osredotočeni na osnovne scenarije. Dodatni testi lahko bodo dodani v prihodnosti za popolnejšo pokritost.*

### Metrike pokritosti

- **Število testov:** 6
- **Pozitivni scenariji:** 3
- **Negativni scenariji:** 3
- **Pokritost koda:**
  - `AuthService.register()` metoda
  - `AuthService.login()` metoda
  - `ingredientController.deleteIngredient()` metoda

### Zaključek

Unit testi so uspešno implementirani in preverjajo ključne vidike funkcionalnosti aplikacije. Testi pokrivajo tako pozitivne kot negativne scenarije, kar zagotavlja zanesljivost in varnost aplikacije. Implementacija uporablja Mockito framework za izolacijo testiranih komponent, kar naredi teste hitrejše in neodvisne od zunanjih odvisnosti.

Testi so jasni, dobro strukturirani in enostavno razumljivi. Vsak test ima opisno ime in komentarje, ki pojasnijo, kaj test preverja. Uporaba različnih anotacij omogoča jasno organizacijo in kategorizacijo testov.
