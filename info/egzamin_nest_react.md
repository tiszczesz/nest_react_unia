# Zadanie egzaminacyjne: NestJS + React 19 + SQLite

## Cel zadania
Wykonaj prostą aplikację typu **shop** składającą się z:
- części serwerowej w **NestJS**,
- części klienckiej w **React 19**,
- bazy danych **SQLite**.

Aplikacja ma umożliwiać zarządzanie produktami bez użycia ORM oraz bez logowania, autoryzacji, tokenów JWT i podobnych mechanizmów.

---

## Założenia ogólne
1. Projekt ma być podzielony na dwie części:
   - **backend** w NestJS,
   - **frontend** w React 19.
2. Dane mają być przechowywane w bazie **SQLite**.
3. **Nie wolno używać ORM**:
   - nie używaj TypeORM,
   - nie używaj Prisma,
   - nie używaj Sequelize,
   - nie używaj MikroORM.
4. Do komunikacji z bazą użyj bezpośrednich zapytań SQL.
5. **Nie wolno implementować**:
   - logowania,
   - rejestracji,
   - JWT,
   - refresh tokenów,
   - ról i uprawnień,
   - sesji użytkownika.
6. Aplikacja ma obsługiwać encję **produkt**.

---

## Model danych
Produkt ma zawierać pola:
- `id`
- `name`
- `price`
- `description`
- `prod_date`

### Wymagania dla pól
1. `id` – unikalny identyfikator produktu.
2. `name` – nazwa produktu.
3. `price` – cena produktu.
4. `description` – opis produktu.
5. `prod_date` – data produkcji produktu.

---

## Część serwerowa – NestJS

### 1. Przygotowanie projektu
1. Utwórz aplikację backendową w NestJS.
2. Skonfiguruj połączenie z bazą **SQLite**.
3. Przy pierwszym uruchomieniu aplikacji utwórz tabelę `products`, jeśli jeszcze nie istnieje.

### 2. Struktura tabeli `products`
Tabela powinna zawierać kolumny:
- `id` – integer, klucz główny, autoincrement,
- `name` – text, wymagane,
- `price` – real lub numeric, wymagane,
- `description` – text, wymagane,
- `prod_date` – text lub date, wymagane.

### 3. Implementacja modułu produktów
Należy przygotować:
1. moduł `products`,
2. kontroler `products`,
3. serwis `products`.

### 4. Endpointy REST API
Należy zaimplementować następujące endpointy:

#### GET /products
1. Zwraca listę wszystkich produktów.
2. Odpowiedź ma być w formacie JSON.

#### GET /products/:id
1. Zwraca pojedynczy produkt na podstawie `id`.
2. Jeśli produkt nie istnieje, serwer powinien zwrócić odpowiedni błąd.

#### POST /products
1. Dodaje nowy produkt.
2. Dane produktu przekazywane są w body żądania.
3. Należy zapisać rekord do bazy SQLite.
4. W odpowiedzi należy zwrócić utworzony produkt lub komunikat potwierdzający zapis.

#### PUT /products/:id
1. Aktualizuje istniejący produkt.
2. Można zmienić pola:
   - `name`,
   - `price`,
   - `description`,
   - `prod_date`.
3. Jeśli produkt nie istnieje, serwer powinien zwrócić odpowiedni błąd.

#### DELETE /products/:id
1. Usuwa produkt na podstawie `id`.
2. Jeśli produkt nie istnieje, serwer powinien zwrócić odpowiedni błąd.
3. W odpowiedzi należy zwrócić potwierdzenie usunięcia.

### 5. Walidacja danych
Należy zapewnić walidację danych wejściowych:
1. `name` nie może być pusty.
2. `price` musi być liczbą większą od 0.
3. `description` nie może być puste.
4. `prod_date` musi być poprawną datą.

### 6. Dodatkowe wymagania backendowe
1. Kod ma być podzielony zgodnie z dobrymi praktykami NestJS.
2. Zapytania SQL powinny być wydzielone do logiki serwisowej lub warstwy dostępu do danych.
3. Należy obsłużyć podstawowe błędy HTTP:
   - `400 Bad Request`,
   - `404 Not Found`.
4. Należy skonfigurować **CORS**, aby frontend mógł komunikować się z backendem.

---

## Część kliencka – React 19

### 1. Przygotowanie projektu
1. Utwórz aplikację frontendową w **React 19**.
2. Skonfiguruj połączenie z backendem przez HTTP.
3. Interfejs może być prosty, ale czytelny.

### 2. Widoki i funkcjonalności
Frontend ma umożliwiać:
1. wyświetlenie listy wszystkich produktów,
2. dodanie nowego produktu,
3. edycję istniejącego produktu,
4. usunięcie produktu.

### 3. Lista produktów
Na stronie głównej należy wyświetlić tabelę lub listę produktów zawierającą:
- `id`,
- `name`,
- `price`,
- `description`,
- `prod_date`.

Przy każdym produkcie mają znajdować się przyciski:
- **Edytuj**,
- **Usuń**.

### 4. Formularz dodawania produktu
Formularz ma zawierać pola:
- `name`,
- `price`,
- `description`,
- `prod_date`.

Wymagania:
1. Po wysłaniu formularza ma zostać wykonane żądanie `POST` do backendu.
2. Po poprawnym dodaniu produktu lista ma się odświeżyć.
3. Należy wyświetlić komunikat o sukcesie lub błędzie.

### 5. Formularz edycji produktu
1. Formularz może być osobnym widokiem, modalem lub sekcją na stronie.
2. Po zapisaniu zmian ma zostać wykonane żądanie `PUT` do backendu.
3. Po poprawnej aktualizacji lista ma się odświeżyć.
4. Należy wyświetlić komunikat o sukcesie lub błędzie.

### 6. Usuwanie produktu
1. Po kliknięciu przycisku **Usuń** ma zostać wykonane żądanie `DELETE` do backendu.
2. Po poprawnym usunięciu lista ma się odświeżyć.
3. Należy wyświetlić komunikat o sukcesie lub błędzie.

### 7. Wymagania frontendowe
1. Należy użyć komponentów funkcyjnych.
2. Należy użyć hooków React.
3. Stan aplikacji ma być zarządzany lokalnie.
4. Nie używaj rozbudowanych bibliotek do zarządzania stanem.
5. Nie używaj logowania ani zabezpieczeń użytkowników.

---

## Zakres do wykonania – lista punktów

### Backend
1. Utworzyć projekt NestJS.
2. Skonfigurować SQLite.
3. Utworzyć tabelę `products`.
4. Przygotować strukturę modułu `products`.
5. Zaimplementować model danych produktu.
6. Dodać walidację danych wejściowych.
7. Zaimplementować endpoint `GET /products`.
8. Zaimplementować endpoint `GET /products/:id`.
9. Zaimplementować endpoint `POST /products`.
10. Zaimplementować endpoint `PUT /products/:id`.
11. Zaimplementować endpoint `DELETE /products/:id`.
12. Obsłużyć błędy `400` i `404`.
13. Włączyć CORS.
14. Przetestować endpointy.

### Frontend
1. Utworzyć projekt w React 19.
2. Przygotować widok listy produktów.
3. Pobrać dane z backendu metodą `GET`.
4. Wyświetlić produkty w tabeli lub liście.
5. Przygotować formularz dodawania produktu.
6. Wysłać dane metodą `POST`.
7. Przygotować formularz edycji produktu.
8. Wysłać dane metodą `PUT`.
9. Dodać usuwanie produktu metodą `DELETE`.
10. Obsłużyć odświeżanie listy po każdej operacji.
11. Wyświetlać komunikaty o sukcesie i błędach.

---

## Czego nie wolno używać
1. ORM.
2. Systemu logowania.
3. Tokenów JWT.
4. Refresh tokenów.
5. Rejestracji użytkowników.
6. Ról i autoryzacji.
7. Zewnętrznych usług bazodanowych zamiast SQLite.

---

## Kryteria oceny
1. Poprawność działania backendu.
2. Poprawność działania CRUD dla produktów.
3. Poprawność zapytań SQL i współpracy z SQLite.
4. Poprawność komunikacji frontend–backend.
5. Czytelność kodu.
6. Poprawna obsługa błędów.
7. Zgodność z wymaganiami zadania.
8. Brak użycia ORM i mechanizmów logowania.

---

## Wymaganie końcowe
Efektem końcowym ma być działająca aplikacja składająca się z:
- backendu w NestJS,
- frontendu w React 19,
- bazy SQLite,
umożliwiająca pełne zarządzanie produktami poprzez operacje **GET, POST, PUT, DELETE**.