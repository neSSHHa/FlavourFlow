# FlavourFlow

RIS projekt - Aplikacija za upravljanje receptov

## Pregled

FlavourFlow je aplikacija za upravljanje receptov, sestavljena iz Spring Boot backend-a in React frontend-a. Aplikacija omogoča prikazovanje, iskanje in upravljanje receptov.

## Dokumentacija za razvijalce

### Projektna struktura

```
FlavourFlow/
├── recepti/                    # Backend aplikacija (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │       ├── java/ris/recepti/
│   │       │   ├── dao/        # Podatkovni dostopni sloj (repositories)
│   │       │   ├── rest/       # REST kontrolerji
│   │       │   ├── vao/        # Vrednostni objekti (entity)
│   │       │   └── ReceptiApplication.java
│   │       └── resources/
│   │           └── application.properties
│   │   
│   ├── Dockerfile
│   └── pom.xml                 # Maven konfiguracija
│
├── recepti-frontend/           # Frontend aplikacija (React)
│   ├── src/
│   │   ├── components/         # React komponente
│   │   │   ├── RecipeList.js
│   │   │   ├── RecipeDetail.js
│   │   │   ├── RecipeForm.js
│   │   │   ├── SearchBox.js
│   │   │   └── css/
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Docker Compose konfiguracija
└── README.md
```

### Uporabljena orodja, frameworki in različice

#### Backend (recepti/)
- **Java**: 17
- **Spring Boot**: 3.5.6
- **Spring Data JPA**: Za dostop do podatkovne baze
- **MySQL Connector**: Za povezavo z MySQL bazo podatkov
- **Lombok**: Za zmanjšanje boilerplate kode
- **SpringDoc OpenAPI**: 2.6.0 (Swagger dokumentacija)
- **Maven**: Za upravljanje odvisnosti in gradnjo
- **Docker**: Multi-stage build z Maven in Eclipse Temurin JDK

#### Frontend (recepti-frontend/)
- **React**: 19.2.0
- **React DOM**: 19.2.0
- **React Router DOM**: 7.9.4 (za navigacijo)
- **React Scripts**: 5.0.1
- **Node.js**: 18 (za razvoj)
- **Docker**: Multi-stage build 

#### Podatkovna baza
- **MySQL**: 8.0
- **Port**: 3307 

#### Orodja za razvoj
- **Docker Compose**: 3.9
- **Git**: Za verzioniranje kode

### Standardi kodiranja

#### Java (Backend)
- Uporaba **camelCase** za spremenljivke in metode
- Paketi organizirani po funkcionalnosti (dao, rest, vao)
- Uporaba **Lombok** anotacij (`@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`) za zmanjšanje boilerplate kode
- **JPA** entitete z `@Entity`, `@Id`, `@GeneratedValue`
- REST kontrolerji z `@RestController` in `@RequestMapping`

#### JavaScript/React (Frontend)
- Uporaba **functional components** z React hooks
- Komponente organizirane v `components/` mapi
- CSS datoteke v `components/css/` mapi
- Uporaba **JSX** sintakse
- Komponente z veliko začetnico (PascalCase)
- Funkcije in spremenljivke v camelCase

## Navodila za nameščanje

### Predpogoji

Pred nameščanjem aplikacije morate imeti nameščeno:
- **Docker** (različica 20.10 ali novejša)
- **Docker Compose** (različica 1.29 ali novejša)
- **Git** (za kloniranje repozitorija)

### Koraki za nameščanje

1. **Kloniranje repozitorija**
   ```bash
   git clone https://github.com/neSSHHa/FlavourFlow
   cd FlavourFlow
   ```

2. **Zagon aplikacije z Docker Compose**
   
   V korenski mapi projekta zaženite:
   ```bash
   docker-compose up -d
   ```
   
   Ta ukaz bo:
   - Zgradil MySQL bazo podatkov (port 3307)
   - Zgradil in zagnal Spring Boot backend aplikacijo (port 8080)
   - Zgradil in zagnal React frontend aplikacijo (port 3000)

3. **Preverjanje, da aplikacija deluje**
   
   - **Frontend**: Odprite brskalnik in pojdite na `http://localhost:3000`
   - **Backend API**: Odprite `http://localhost:8080`
   - **Swagger dokumentacija**: Odprite `http://localhost:8080/swagger-ui.html` 

4. **Ustavitev aplikacije**
   ```bash
   docker-compose down
   ```
   
   Za odstranitev tudi podatkovnih volumnov:
   ```bash
   docker-compose down -v
   ```



## Navodila za razvijalce

### Kako prispevati k projektu

1. **Razvojna okolja**
   
   - Za backend uporabljajte Java IDE (IntelliJ IDEA, Eclipse, VS Code)
   - Za frontend uporabljajte VS Code ali podobno orodje

2. **Testiranje sprememb**
   
   - Pred commitom preverite, da aplikacija deluje lokalno
   - Preizkusite funkcionalnosti, ki ste jih dodali ali spremenili
   - Preverite, da ne obstajajo sintaktične napake

3. **Commit sporočila**
   
   Dodajte podrobno sporocilo o funckionalnosti
   ```bash
   git add .
   git commit -m "Dodana funkcionalnost za iskanje receptov"
   ```

4. **Push sprememb**
   ```bash
   git push origin main
   ```



### Struktura nove funkcionalnosti

Ko dodajate novo funkcionalnost:

1. **Backend**: 
   - Dodajte entiteto v `vao/` (če je potrebno)
   - Dodajte repository v `dao/`
   - Dodajte REST endpoint v `rest/`
   - Posodobite `application.properties` (če je potrebno)

2. **Frontend**:
   - Dodajte komponento v `components/`
   - Dodajte CSS stil v `components/css/`
   - Posodobite `App.js` za navigacijo (če je potrebno)

### Pregled kode

- Koda mora biti pregledna in dobro dokumentirana
- Upoštevajte standarde kodiranja, omenjene zgoraj
- Preverite, da ni očitnih napak ali opozoril
- Preizkusite, da aplikacija deluje po spremembah
