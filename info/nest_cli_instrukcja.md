# Nest CLI – Instrukcja instalacji i użycia

## 1. Wymagania wstępne

Przed instalacją Nest CLI upewnij się, że masz zainstalowane:

- **Node.js** (wersja 16 lub nowsza) – [https://nodejs.org](https://nodejs.org)
- **npm** (instalowany razem z Node.js) lub **yarn** / **pnpm**

Sprawdź wersje:

```bash
node -v
npm -v
```

---

## 2. Instalacja Nest CLI

Zainstaluj Nest CLI globalnie za pomocą npm:

```bash
npm install -g @nestjs/cli
```

Zweryfikuj poprawność instalacji:

```bash
nest --version
```

Powinieneś zobaczyć numer zainstalowanej wersji, np. `10.x.x`.

---

## 3. Tworzenie nowego projektu

```bash
nest new nazwa-projektu
```

CLI zapyta o preferowany menedżer pakietów (npm / yarn / pnpm). Po wyborze automatycznie wygeneruje strukturę projektu i zainstaluje zależności.

Przejdź do katalogu projektu:

```bash
cd nazwa-projektu
```

Uruchom aplikację w trybie deweloperskim:

```bash
npm run start:dev
```

Aplikacja domyślnie działa pod adresem `http://localhost:3000`.

---

## 4. Generowanie elementów aplikacji

Nest CLI udostępnia komendę `generate` (skrót: `g`) do automatycznego tworzenia plików.

### 4.1 Moduł (module)

```bash
nest generate module nazwa-modulu
# lub krócej:
nest g mo nazwa-modulu
```

Tworzy plik `nazwa-modulu/nazwa-modulu.module.ts`.

---

### 4.2 Kontroler (controller)

```bash
nest generate controller nazwa-kontrolera
# lub krócej:
nest g co nazwa-kontrolera
```

Tworzy pliki:
- `nazwa-kontrolera/nazwa-kontrolera.controller.ts`
- `nazwa-kontrolera/nazwa-kontrolera.controller.spec.ts` (test jednostkowy)

---

### 4.3 Serwis (service)

```bash
nest generate service nazwa-serwisu
# lub krócej:
nest g s nazwa-serwisu
```

Tworzy pliki:
- `nazwa-serwisu/nazwa-serwisu.service.ts`
- `nazwa-serwisu/nazwa-serwisu.service.spec.ts` (test jednostkowy)

---

### 4.4 Zasób (resource)

Komenda `resource` generuje kompletny zestaw CRUD (moduł + kontroler + serwis + DTO):

```bash
nest generate resource nazwa-zasobu
# lub krócej:
nest g res nazwa-zasobu
```

CLI zapyta o transport (REST API, GraphQL, WebSockets, Microservice) oraz czy generować operacje CRUD. Po potwierdzeniu tworzy pełną strukturę katalogów wraz z plikami DTO i encji.

---

### 4.5 Middleware

```bash
nest generate middleware nazwa-middleware
# lub krócej:
nest g mi nazwa-middleware
```

---

### 4.6 Guard

```bash
nest generate guard nazwa-guard
# lub krócej:
nest g gu nazwa-guard
```

---

### 4.7 Interceptor

```bash
nest generate interceptor nazwa-interceptora
# lub krócej:
nest g in nazwa-interceptora
```

---

### 4.8 Pipe

```bash
nest generate pipe nazwa-pipe
# lub krócej:
nest g pi nazwa-pipe
```

---

### 4.9 Filter (filtr wyjątków)

```bash
nest generate filter nazwa-filtra
# lub krócej:
nest g f nazwa-filtra
```

---

### 4.10 Dekorator

```bash
nest generate decorator nazwa-dekoratora
# lub krócej:
nest g d nazwa-dekoratora
```

---

### 4.11 Gateway (WebSockets)

```bash
nest generate gateway nazwa-gateway
# lub krócej:
nest g ga nazwa-gateway
```

---

## 5. Przydatne flagi komend `generate`

| Flaga | Opis |
|-------|------|
| `--no-spec` | Pomija generowanie pliku testowego (`.spec.ts`) |
| `--flat` | Nie tworzy podkatalogu, umieszcza pliki w bieżącym katalogu |
| `--dry-run` | Wyświetla listę plików, które zostałyby utworzone, bez ich faktycznego tworzenia |

Przykład:

```bash
nest g co users --no-spec --flat
```

---

## 6. Inne przydatne komendy CLI

| Komenda | Opis |
|---------|------|
| `nest build` | Buduje projekt (kompiluje TypeScript do JavaScript w katalogu `dist/`) |
| `nest start` | Uruchamia skompilowaną aplikację |
| `nest start --watch` | Uruchamia aplikację w trybie watch (restart przy zmianach) |
| `nest info` | Wyświetla informacje o środowisku i zainstalowanych paczkach NestJS |
| `nest --help` | Wyświetla pomoc ogólną |
| `nest generate --help` | Wyświetla dostępne schematy do generowania |

---

## 7. Struktura projektu po `nest new`

```
nazwa-projektu/
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── nest-cli.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

- **`main.ts`** – punkt wejścia aplikacji, tworzy instancję NestJS i nasłuchuje na porcie
- **`app.module.ts`** – główny moduł aplikacji
- **`app.controller.ts`** – przykładowy kontroler obsługujący żądania HTTP
- **`app.service.ts`** – przykładowy serwis z logiką biznesową
- **`nest-cli.json`** – konfiguracja Nest CLI

---

## 8. Aktualizacja Nest CLI

```bash
npm update -g @nestjs/cli
```

---

## Zasoby

- Oficjalna dokumentacja: [https://docs.nestjs.com](https://docs.nestjs.com)
- CLI na npm: [https://www.npmjs.com/package/@nestjs/cli](https://www.npmjs.com/package/@nestjs/cli)
- Repozytorium GitHub: [https://github.com/nestjs/nest](https://github.com/nestjs/nest)
