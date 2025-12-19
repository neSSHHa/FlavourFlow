# Scrum poročilo – Vaja 9: Planiranje razvoja (SCRUM)

## Izbrana uporabniška zgodba

Kot uporabnik želim možnost prilagoditve količin sestavin glede na število porcij,
da lahko skuham točno toliko, kot potrebujem.

---

## Cilj sprinta

Cilj sprinta je implementirati funkcionalnost, ki uporabniku omogoča vnos
želenega števila porcij za izbrani recept, sistem pa na podlagi tega
samodejno preračuna in prikaže ustrezne količine sestavin.

---

## Razdelitev uporabniške zgodbe na manjše naloge

Po prejemu uporabniške zgodbe smo v skladu s Scrum metodologijo zgodbo
razdelili na manjše, specifične, merljive in kratkotrajne naloge,
ki jih je bilo mogoče izvesti v kratkem času in v okviru enega sprinta:

1. Analiza preračuna količin glede na število porcij  
2. Implementacija controller metode za preračun količin sestavin  
3. UI vnos in prikaz preračunanih količin  
4. Priprava Scrum dokumentacije  

---

## Ocenjevanje časa izvedbe nalog (Planning Poker)

Za **vsako posamezno nalogo** smo ocenili, koliko časa bo potrebnega
za njeno izvedbo. Ocenjevanje je potekalo z uporabo metode **planning poker**,
kjer so člani ekipe podali svoje ocene, nato pa smo se uskladili o končni oceni.

Kot mersko enoto za ocenjevanje časa smo uporabili **story pointe (SP)**.
Na začetku planiranja smo se v ekipi dogovorili, da 1 story point (SP)
približno ustreza **pol ura dela**.

### Ocene nalog:

- Analiza preračuna porcij – **1 SP** (pol ure)
- Implementacija controller metode – **3 SP** (ura pa pol)
- UI vnos in prikaz preračunanih količin – **3 SP** (ura pa pol)
- Scrum dokumentacija – **1 SP** (pol ure)

---

## Organizacija ekipe in razdelitev dela

Ekipo smo razdelili na vloge, kar je omogočilo vzporedno izvajanje nalog:

- **Scrum proces in dokumentacija:** skrb za Kanban tablo in poročilo
- **Backend:** implementacija controller metode za preračun količin
- **Frontend:** uporabniški vmesnik za vnos porcij in prikaz količin

Vsak član ekipe je bil odgovoren za izvedbo svojih nalog.

---

## Izvajanje razvoja po Scrum metodologiji

Po planiranju smo naloge začeli postopoma izvajati. Vsaka naloga je bila
najprej uvrščena v stolpec *To Do*, nato premaknjena v *Doing* ob začetku dela
in v *Done* po zaključeni izvedbi. Na ta način smo sledili iterativnemu razvoju
v skladu s Scrum pristopom.

---

## Spremljanje napredka na GitHubu

Za spremljanje napredka smo na GitHubu ustvarili projekt in agilno Kanban tablo.
Stanje nalog smo sproti posodabljali in jih premikali med stolpci
**To Do**, **Doing** in **Done**, kar jasno prikazuje potek dela
in napredek skozi faze razvoja.

---

## Zaključek

Uporabniško zgodbo smo implementirali v skladu z zahtevami naloge in
Scrum metodologijo. Poseben poudarek smo namenili razdelitvi uporabniške zgodbe,
ocenjevanju časa izvedbe nalog z metodo planning poker ter sprotnemu
spremljanju napredka, kar je razvidno iz Kanban table in tega poročila.
