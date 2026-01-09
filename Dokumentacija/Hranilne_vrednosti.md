# Dokumentacija: Hranilne vrednosti receptov

## Pregled

Aplikacija FlavourFlow omogoča prikazovanje hranilnih vrednosti za vsak recept. Te vrednosti pomagajo uporabnikom pri načrtovanju obrokov in spremljanju njihovega prehranskega vnosa.

## Katere hranilne vrednosti prikazujemo

Za vsak recept prikazujemo naslednje hranilne vrednosti:

1. **Kalorije (kcal)** - Celotna energijska vrednost recepta
2. **Beljakovine (g)** - Vsebnost beljakovin v gramih
3. **Ogljikovi hidrati (g)** - Vsebnost ogljikovih hidratov v gramih
4. **Maščobe (g)** - Vsebnost maščob v gramih

### Tehnična implementacija

Vse hranilne vrednosti so shranjene kot celoštevilske vrednosti v entiteti `Recipe`:

```java
@Entity
public class Recipe {
    private Integer calorie;      // Kalorije v kcal
    private Integer proteinGram;  // Beljakovine v gramih
    private Integer fatGram;      // Maščobe v gramih
    private Integer carbsGram;    // Ogljikovi hidrati v gramih
}
```

## Shranjevanje hranilnih vrednosti

### Ročni vnos

Hranilne vrednosti se **shranjujejo ročno** ob ustvarjanju ali urejanju recepta. To pomeni, da uporabnik (ali administrator) ročno vnese vrednosti za vsak recept preko uporabniškega vmesnika.

### Postopek vnosa

1. Uporabnik odpre obrazec za ustvarjanje/urejanje recepta
2. V obrazcu izpolni naslednja polja:
   - **Kalorije (kcal)**: celoštevilska vrednost
   - **Beljakovine (g)**: celoštevilska vrednost
   - **Ogljikovi hidrati (g)**: celoštevilska vrednost
   - **Maščobe (g)**: celoštevilska vrednost
3. Ko shrani recept, se vrednosti shranijo v podatkovno bazo

### Validacija

- Vse vrednosti so **opcijske** (optional) - uporabnik jih ni obvezen vnesti
- Vrednosti morajo biti **celoštevilske** (Integer)
- Negativne vrednosti niso dovoljene (validacija na frontendu)

## Prikaz hranilnih vrednosti v uporabniškem vmesniku

### Lokacija prikaza

Hranilne vrednosti so prikazane na strani z detajli recepta (`RecipeDetail` komponenta).

### Format prikaza

Vrednosti so prikazane v **jasno označenih enotah**:

- **Kalorije**: `[vrednost] kcal`
- **Beljakovine**: `[vrednost] g`
- **Ogljikovi hidrati**: `[vrednost] g`
- **Maščobe**: `[vrednost] g`

### Obravnavanje manjkajočih vrednosti

Če hranilna vrednost **manjka** (ni vnesena), se prikaže:
- Simbol **"/"** namesto numerične vrednosti
- Enota se ne prikaže (ker ni vrednosti)

**Primer prikaza:**
```
Kalorije: 250 kcal
Beljakovine: 15 g
Ogljikovi hidrati: /
Maščobe: 10 g
```

### Vizualni prikaz

Hranilne vrednosti so prikazane v:
- **Omejenem okvirju** z obrobo v barvi aplikacije (#ff6f61)
- **Grid postavitvi** - vrednosti so razporejene v stolpcih
- **Beli okvirji** za vsako posamezno vrednost z zaokroženimi vogali
- **Jasno označenimi naslovi** v barvi aplikacije

### Preračun glede na število porcij

Če uporabnik spremeni število porcij za recept, se hranilne vrednosti **avtomatično preračunajo**:

- Formula: `Nova vrednost = Osnovna vrednost × (Nova števila porcij / 1)`
- Preračun se izvede na backend-u preko endpoint-a `/api/recipes/{id}/calculate`
- V uporabniškem vmesniku se prikaže: "Za [število] porcij:"

### Prikaz dnevnih vrednosti (DV%)

Aplikacija omogoča tudi prikaz **deleža dnevne hranilne vrednosti (DV%)**:

- **Kalorije**: Izračunano na podlagi uporabnikovega vnosa (če vnesen)
- **Beljakovine**: Standardna dnevna vrednost = 50 g/dan
- **Maščobe**: Standardna dnevna vrednost = 70 g/dan
- **Ogljikovi hidrati**: Standardna dnevna vrednost = 260 g/dan

DV% se prikaže samo, če je uporabnik vnesel svoj dnevni kalorijski vnos.

## Sprejemni kriteriji (Acceptance Criteria)

✅ **Prikazani so: kalorije (kcal), beljakovine (g), maščobe (g), ogljikovi hidrati (g)**
- Vsi štirje tipi hranilnih vrednosti so implementirani in prikazani

✅ **Vrednosti so numerične in jasno označene z enotami**
- Vse vrednosti so celoštevilske (Integer)
- Vsaka vrednost ima jasno označeno enoto (kcal ali g)

✅ **Če vrednost manjka, se prikaže "/" ali "Ni podatka"**
- Implementirano: prikazuje se "/" za manjkajoče vrednosti

## Sklepi

Hranilne vrednosti so implementirane v skladu z zahtevami. Sistem omogoča:
- Ročni vnos vrednosti pri ustvarjanju/urejanju recepta
- Jasen prikaz vseh štirih tipov hranilnih vrednosti
- Pravilno obravnavanje manjkajočih podatkov
- Avtomatični preračun glede na število porcij
- Opcijski prikaz dnevnih vrednosti
