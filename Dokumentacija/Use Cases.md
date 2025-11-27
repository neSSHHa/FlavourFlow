# Podrobni opisi primerov uporabe

### Dodaj recept (ID: 1)

| Primer uporabe | Dodaj recept (ID: 1)|
| --- | --- |
| Cilj | Uporabnik želi ustvariti in shraniti nov recept v sistem. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen in se nahaja na strani »Dodaj recept«. |
| Stanje sistema po PU | Recept je shranjen v bazo in povezan z uporabnikom. |
| Scenarij | 1. Uporabnik odpre stran »Dodaj recept«.<br>2. Sistem prikaže obrazec.<br>3. Uporabnik vnese ime, opis, sestavine, korake.<br>4. Uporabnik klikne »Shrani«.<br>5. Sistem preveri vnos.<br>6. Sistem shrani recept.<br>7. Sistem prikaže sporočilo o uspehu. |
| Alternativni tokovi | A1: Uporabnik prekliče dodajanje → recept se ne shrani.<br>A2: Recept je dodan brez slike → sistem uporabi privzeto sliko. |
| Izjeme | E1: Manjkajo obvezna polja → sistem označi napake.<br>E2: Napaka pri shranjevanju → sistem prikaže »Napaka pri shranjevanju recepta«. |

### Uredi recept (ID: 2)

| Primer uporabe | Uredi recept (ID: 2)|
| --- | --- |
| Cilj | Uporabnik želi urediti obstoječi recept. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen in je avtor recepta. |
| Stanje sistema po PU | Recept je posodobljen v bazi. |
| Scenarij | 1. Uporabnik odpre svoj recept.<br>2. Uporabnik klikne »Uredi«.<br>3. Sistem prikaže obrazec s trenutnimi podatki recepta.<br>4. Uporabnik uredi podatke.<br>5. Uporabnik klikne »Shrani«.<br>6. Sistem preveri vnos.<br>7. Sistem shrani spremembe.<br>8. Sistem prikaže sporočilo o uspešni posodobitvi. |
| Alternativni tokovi | A1: Uporabnik prekliče urejanje → recept ostane nespremenjen. A2: Uporabnik ne spremeni nič → sistem shrani brez sprememb. |
| Izjeme | E1: Manjkajo obvezna polja → sistem označi napake.<br>E2: Napaka pri shranjevanju → sistem prikaže »Napaka pri posodobitvi recepta«. |

### Urejanje svojega profila (ID: 3)

| Primer uporabe | Urejanje svojega profila (ID: 3)|
| --- | --- |
| Cilj | Uporabnik želi posodobiti svoje profilne podatke. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen v sistem. |
| Stanje sistema po PU | Profilne informacije so posodobljene v bazi podatkov. |
| Scenarij | 1. Uporabnik odpre stran »Profil«.<br>2. Uporabnik klikne »Uredi profil«.<br>3. Sistem prikaže obrazec s trenutnimi podatki.<br>4. Uporabnik spremeni potrebne podatke.<br>5. Uporabnik klikne »Shrani«.<br>6. Sistem preveri veljavnost podatkov.<br>7. Sistem shrani posodobljene podatke.<br>8. Sistem prikaže sporočilo o uspehu. |
| Alternativni tokovi | A1: Uporabnik prekliče urejanje → podatki ostanejo nespremenjeni. |
| Izjeme | E1: Neveljavni podatki → sistem označi polja.<br>E2: Napaka pri shranjevanju → sistem prikaže »Napaka pri posodobitvi profila«. |

### Pregled svojega profila (ID: 4)

| Primer uporabe | Pregled svojega profila (ID: 4)|
| --- | --- |
| Cilj | Uporabnik želi videti svoje profilne podatke. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen v sistem. |
| Stanje sistema po PU | Sistem ostane nespremenjen — podatki se samo prikažejo. |
| Scenarij | 1. Uporabnik odpre stran »Profil«.<br>2. Sistem pridobi podatke iz baze.<br>3. Sistem prikaže uporabnikove profilne podatke. |
| Alternativni tokovi | A1: Podatki profila niso popolni → sistem prikaže privzeto vrednost (npr. »Ni vneseno«). |
| Izjeme | E1: Napaka pri nalaganju podatkov → sistem prikaže »Napaka pri nalaganju profila«. |

### Dodaj med priljubljene (ID: 5)

| Primer uporabe | Dodaj med priljubljene (ID: 5)|
| --- | --- |
| Cilj | Uporabnik želi shraniti recept med svoje priljubljene. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen in recept obstaja. |
| Stanje sistema po PU | Recept je dodan v seznam priljubljenih in povezan z uporabnikom. |
| Scenarij | 1. Uporabnik odpre izbran recept.<br>2. Uporabnik klikne ikono srčka / »Dodaj med priljubljene«.<br>3. Sistem shrani povezavo med uporabnikom in receptom.<br>4. Sistem prikaže potrditev o uspehu. |
| Alternativni tokovi | A1: Recept je že med priljubljenimi → sistem prikaže »Recept je že dodan med priljubljene«. |
| Izjeme | E1: Napaka pri shranjevanju → sistem prikaže »Napaka pri dodajanju med priljubljene«. |

### Odstrani iz priljubljenih (ID: 6)

| Primer uporabe | Odstrani iz priljubljenih (ID: 6)|
| --- | --- |
| Cilj | Uporabnik želi odstraniti recept iz priljubljenih. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Recept je že označen kot priljubljen (srček obarvan). |
| Stanje sistema po PU | Recept je odstranjen iz seznama priljubljenih. |
| Scenarij | 1. Uporabnik odpre recept. 2. Ikona srčka je obarvana. 3. Uporabnik klikne na srček. 4. Sistem odstrani povezavo uporabnik–recept. 5. Srček postane neobarvan. |
| Alternativni tokovi | A1: Uporabnik klikne pomotoma → klikne ponovno → srček se spet obarva. |
| Izjeme | E1: Napaka pri shranjevanju → sistem prikaže »Napaka pri odstranitvi iz priljubljenih«. |

### Ogled priljubljenih (ID: 7)

| Primer uporabe | Ogled priljubljenih (ID: 7)|
| --- | --- |
| Cilj | Uporabnik želi videti seznam svojih priljubljenih receptov. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen v sistem in ima lahko že shranjene priljubljene recepte. |
| Stanje sistema po PU | Sistem ostane nespremenjen — samo prikaže shranjene podatke. |
| Scenarij | 1. Uporabnik odpre meni »Priljubljeni recepti«.<br>2. Sistem pridobi seznam priljubljenih receptov iz baze.<br>3. Sistem prikaže seznam priljubljenih receptov uporabniku. |
| Alternativni tokovi | A1: Uporabnik nima priljubljenih receptov → sistem prikaže sporočilo »Ni priljubljenih receptov«. |
| Izjeme | E1: Napaka pri nalaganju → sistem prikaže »Napaka pri pridobivanju podatkov«. |

### Oceni recept (ID: 8)

| Primer uporabe | Oceni recept (ID: 8)|
| --- | --- |
| Cilj | Uporabnik želi oddati oceno na recept. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Recept obstaja in uporabnik je prijavljen. |
| Stanje sistema po PU | Ocena je trajno shranjena v bazi in prikazana pod receptom. |
| Scenarij | 1. Uporabnik odpre recept.<br>2. Uporabnik izbere oceno (1–5).<br>3. Klikne »Oddaj«.<br>4. Sistem shrani oceno. |
| Alternativni tokovi | — |
| Izjeme | E1: Ocena ni izbrana → sistem prikaže »Prosimo, izberite oceno«. |

### Dodaj komentar (ID: 9)

| Primer uporabe | Dodaj komentar (ID: 9)|
| --- | --- |
| Cilj | Uporabnik želi ob oddaji ocene dodati komentar za recept. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik izvaja primer uporabe »Oceni recept«. |
| Stanje sistema po PU | Komentar je shranjen in prikazan skupaj z oceno. |
| Scenarij | 1. Uporabnik ob izpolnjevanju ocene vnese komentar v polje.<br>2. Klikne »Oddaj«.<br>3. Sistem shrani komentar skupaj z oceno. |
| Alternativni tokovi | A1: Uporabnik oceni brez komentarja → komentar ostane prazen. |
| Izjeme | E1: Komentar je prazen ali samo presledki → sistem shrani oceno brez komentarja. |

### Ogled podrobnosti recepta (ID: 10)

| Primer uporabe | Ogled podrobnosti recepta (ID: 10)|
| --- | --- |
| Cilj | Uporabnik želi videti vse podrobne informacije o receptu. |
| Akterji | Registrirani uporabnik, Gost, Sistem |
| Predpogoji | Recept obstaja v sistemu. |
| Stanje sistema po PU | Sistem ostane nespremenjen — podatki se samo prikažejo. |
| Scenarij | 1. Uporabnik odpre recept iz seznama.<br>2. Sistem pridobi podatke o receptu iz baze.<br>3. Sistem prikaže ime recepta, avtorja, čas priprave, opis priprave, sestavine, oceno (če obstaja), komentarje (če obstajajo). |
| Alternativni tokovi | A1: Recept ni več na voljo → sistem prikaže »Recept ni več dostopen«. |
| Izjeme | E1: Napaka pri nalaganju recepta → sistem prikaže »Napaka pri prikazu recepta«. |

### Dodaj recept v nakupovalni seznam (ID: 11)

| Primer uporabe | Dodaj recept v nakupovalni seznam (ID: 11)|
| --- | --- |
| Cilj | Uporabnik želi dodati recept v svoj nakupovalni seznam. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen in recept obstaja. |
| Stanje sistema po PU | Recept je dodan v nakupovalni seznam uporabnika. |
| Scenarij | 1. Uporabnik odpre recept.<br>2. Uporabnik klikne »Dodaj v nakupovalni seznam«.<br>3. Sistem doda sestavine recepta na uporabnikov nakupovalni seznam.<br>4. Sistem prikaže potrditev o uspehu. |
| Alternativni tokovi | A1: Recept je že dodan v seznam → sistem prikaže sporočilo »Recept je že v nakupovalnem seznamu«. |
| Izjeme | E1: Napaka pri shranjevanju → sistem prikaže »Napaka pri dodajanju v nakupovalni seznam«. |

### Ogled nakupovalnega seznama (ID: 12)

| Primer uporabe | Ogled nakupovalnega seznama (ID: 12)|
| --- | --- |
| Cilj | Uporabnik želi videti svoj celoten nakupovalni seznam sestavin. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Uporabnik je prijavljen in na seznamu je lahko vsaj en dodan recept. |
| Stanje sistema po PU | Sistem ostane nespremenjen — samo prikaže zbrane podatke. |
| Scenarij | 1. Uporabnik odpre »Nakupovalni seznam«.<br>2. Sistem pridobi vse sestavine iz dodanih receptov.<br>3. Sistem združi iste sestavine (npr. 200 g + 100 g sladkorja → 300 g).<br>4. Sistem prikaže organiziran seznam sestavin. |
| Alternativni tokovi | A1: Uporabnik še nima dodanih receptov → sistem prikaže »Nakupovalni seznam je prazen«. |
| Izjeme | E1: Napaka pri nalaganju → sistem prikaže »Napaka pri prikazu nakupovalnega seznama«. |

### Izvoz nakupovalnega seznama v PDF (ID: 13)

| Primer uporabe | Izvoz nakupovalnega seznama v PDF (ID: 13)|
| --- | --- |
| Cilj | Uporabnik želi svoj nakupovalni seznam izvoziti kot PDF dokument. |
| Akterji | Registrirani uporabnik, Sistem |
| Predpogoji | Nakupovalni seznam obstaja in uporabnik je prijavljen. |
| Stanje sistema po PU | PDF dokument s seznamom sestavin je ustvarjen in na voljo za prenos. |
| Scenarij | 1. Uporabnik odpre svoj nakupovalni seznam.<br>2. Uporabnik klikne »Izvoz v PDF«.<br>3. Sistem generira PDF dokument s seznamom sestavin.<br>4. Sistem ponudi uporabniku prenos datoteke. |
| Alternativni tokovi | A1: Uporabnik prekliče prenos PDF → dokument ni shranjen na napravi. |
| Izjeme | E1: Napaka pri generiranju PDF → sistem prikaže »Napaka pri ustvarjanju PDF dokumenta«. |

### Ogled seznama receptov (ID: 14)

| Primer uporabe | Ogled seznama receptov (ID: 14)|
| --- | --- |
| Cilj | Uporabnik želi videti seznam vseh receptov v aplikaciji. |
| Akterji | Registrirani uporabnik, Gost, Sistem |
| Predpogoji | Aplikacija je dostopna in recepti obstajajo v sistemu. |
| Stanje sistema po PU | Sistem ostane nespremenjen — podatki se samo prikažejo. |
| Scenarij | 1. Uporabnik odpre stran »Vsi recepti«.<br>2. Sistem pridobi seznam receptov iz baze.<br>3. Sistem prikaže vse recepte (slika, ime, kratek opis). |
| Alternativni tokovi | A1: Ni obstoječih receptov → sistem prikaže »Ni razpoložljivih receptov«. |
| Izjeme | E1: Napaka pri nalaganju seznama → sistem prikaže »Napaka pri pridobivanju receptov«. |

### Filtriranje receptov (ID: 15)

| Primer uporabe | Filtriranje receptov (ID: 15)|
| --- | --- |
| Cilj | Uporabnik želi poiskati recepte po določenih kriterijih (npr. kategorija, trajanje, ocena). |
| Akterji | Registrirani uporabnik, Gost, Sistem |
| Predpogoji | Uporabnik se nahaja na seznamu vseh receptov. |
| Stanje sistema po PU | Prikazan je filtriran seznam receptov glede na izbrane kriterije. |
| Scenarij | 1. Uporabnik odpre »Vsi recepti«.<br>2. Uporabnik izbere enega ali več filtrov (npr. kategorija: sladice).<br>3. Uporabnik klikne »Filtriraj«.<br>4. Sistem poišče recepte, ki ustrezajo kriterijem.<br>5. Sistem prikaže filtriran seznam receptov. |
| Alternativni tokovi | A1: Ni rezultatov → sistem prikaže »Ni receptov, ki ustrezajo filtriranju«. |
| Izjeme | E1: Težava pri iskanju → sistem prikaže »Napaka pri filtriranju receptov«. |

### Pregled uporabnikov (ID: 16)

| Primer uporabe | Pregled uporabnikov (ID: 16)|
| --- | --- |
| Cilj | Administrator želi pregledati seznam vseh registriranih uporabnikov. |
| Akterji | Administrator, Sistem |
| Predpogoji | Administrator je prijavljen v administratorski račun. |
| Stanje sistema po PU | Sistem ostane nespremenjen — podatki se samo prikažejo. |
| Scenarij | 1. Administrator odpre administratorski panel.<br>2. Administrator izbere »Uporabniki«.<br>3. Sistem pridobi seznam vseh uporabnikov iz baze.<br>4. Sistem prikaže seznam uporabnikov (ime, email, registracija, status). |
| Alternativni tokovi | A1: Ni registriranih uporabnikov → sistem prikaže »Ni uporabnikov v sistemu«. |
| Izjeme | E1: Napaka pri nalaganju podatkov → sistem prikaže »Napaka pri pridobivanju uporabnikov«. |

### Odstrani uporabnika (ID: 17)

| Primer uporabe | Odstrani uporabnika (ID: 17)|
| --- | --- |
| Cilj | Administrator želi odstraniti uporabnika iz sistema. |
| Akterji | Administrator, Sistem |
| Predpogoji | Administrator je prijavljen in ima pravice za odstranjevanje uporabnikov. |
| Stanje sistema po PU | Uporabnik je izbrisan iz baze in nima več dostopa do aplikacije. |
| Scenarij | 1. Administrator odpre seznam uporabnikov.<br>2. Administrator izbere uporabnika.<br>3. Administrator klikne »Odstrani«.<br>4. Sistem zahteva potrditev dejavnosti.<br>5. Administrator potrdi brisanje.<br>6. Sistem trajno izbriše uporabnika. |
| Alternativni tokovi | A1: Administrator prekliče brisanje → uporabnik ostane v sistemu. |
| Izjeme | E1: Uporabnik ne obstaja več → sistem prikaže »Uporabnik ni najden«.<br>E2: Napaka pri brisanju → sistem prikaže »Napaka pri odstranjevanju uporabnika«. |

### Odstrani recept (ID: 18)

| Primer uporabe | Odstrani recept (ID: 18)|
| --- | --- |
| Cilj | Administrator želi izbrisati neprimeren, podvojen ali napačen recept. |
| Akterji | Administrator, Sistem |
| Predpogoji | Administrator je prijavljen in ima pravice za brisanje receptov. |
| Stanje sistema po PU | Recept je trajno odstranjen iz baze in ni več prikazan uporabnikom. |
| Scenarij | 1. Administrator odpre seznam receptov.<br>2. Administrator izbere recept, ki ga želi izbrisati.<br>3. Administrator klikne »Odstrani«.<br>4. Sistem zahteva potrditev brisanja.<br>5. Administrator potrdi brisanje.<br>6. Sistem trajno odstrani recept. |
| Alternativni tokovi | A1: Administrator prekliče brisanje → recept ostane v sistemu. |
| Izjeme | E1: Recept ne obstaja več → sistem prikaže »Recept ni najden«.<br>E2: Napaka pri brisanju → sistem prikaže »Napaka pri odstranjevanju recepta«. |

### Odstrani komentar (ID: 19)

| Primer uporabe | Odstrani komentar (ID: 19)|
| --- | --- |
| Cilj | Administrator želi izbrisati neprimeren ali neželen komentar pod receptom. |
| Akterji | Administrator, Sistem |
| Predpogoji | Administrator je prijavljen; komentar obstaja. |
| Stanje sistema po PU | Komentar je trajno odstranjen; če je bil komentar oddan skupaj z oceno, je tudi ocena odstranjena. |
| Scenarij | 1. Administrator odpre recept in vidi seznam komentarjev.<br>2. Administrator izbere komentar.<br>3. Administrator klikne »Odstrani komentar«.<br>4. Sistem zahteva potrditev.<br>5. Administrator potrdi.<br>6. Sistem izbriše komentar.<br>7. Sistem sproži <> Odstrani oceno (če je bila ocena prisotna). |
| Alternativni tokovi | A1: Administrator prekliče brisanje → komentar ostane nespremenjen. |
| Izjeme | E1: Komentar ne obstaja → sistem prikaže »Komentar ni najden«.<br>E2: Napaka pri odstranjevanju → sistem prikaže »Napaka pri brisanju komentarja«. |

### Odstrani oceno (ID: 20)

| Primer uporabe | Odstrani oceno (ID: 20)|
| --- | --- |
| Cilj | Sistem odstrani oceno, ki je bila povezana s komentarjem, ko administrator izbriše komentar. |
| Akterji | Sistem (samodejno), Administrator (posredno) |
| Predpogoji | Izvaja se PU »Odstrani komentar«; komentar, ki se briše, vsebuje tudi oceno. |
| Stanje sistema po PU | Ocena je odstranjena iz sistema; povprečna ocena recepta se ponovno izračuna. |
| Scenarij | 1. Sistem zazna, da se briše komentar z oceno.<br>2. Sistem izbriše oceno uporabnika.<br>3. Sistem osveži prikaz povprečne ocene recepta. |
| Alternativni tokovi | — |
| Izjeme | E1: Napaka pri brisanju → sistem prikaže »Napaka pri odstranjevanju ocene«. |
