# Tutorial: Jak stworzyć projekt React 19 za pomocą Vite

W tym przewodniku pokażemy Ci, jak stworzyć projekt React 19 przy użyciu Vite.

## Krok 1: Instalacja Vite

Najpierw musisz zainstalować Vite. Możesz to zrobić za pomocą npm:
```bash
npm create vite@latest nazwa-projektu
```
To polecenie utworzy nowy folder o nazwie `nazwa-projektu` i skonfiguruje podstawowy projekt Vite.

## Krok 2: Wybór szablonu

Podczas instalacji zostaniesz poproszony o wybranie szablonu. Wybierz `React` z listy opcji.

## Krok 3: Instalacja zależności

Po utworzeniu projektu przejdź do folderu projektu:
```bash
cd nazwa-projektu
```

Następnie zainstaluj wszystkie potrzebne zależności:
```bash
npm install
```

## Krok 4: Uruchomienie projektu

Teraz możesz uruchomić swój projekt:
```bash
npm run dev
```
To polecenie uruchomi serwer deweloperski i otworzy Twoją aplikację w przeglądarce.

## Wyjaśnienie katalogów w wygenerowanym projekcie
- **node_modules**: Katalog, w którym przechowywane są wszystkie zależności projektu, które zostały zainstalowane.
- **public**: Katalog, w którym znajdują się wszystkie statyczne pliki, które są serwowane przez serwer
e.g. ikony, obrazy.
- **src**: Główny katalog, w którym znajdują się wszystkie pliki źródłowe aplikacji. Wewnątrz znajdziesz plik `main.jsx`,
który jest punktem wejścia aplikacji oraz plik `App.jsx`, który jest głównym komponentem.
- **index.html**: Plik HTML, który jest szablonem dla aplikacji. Vite automatycznie wstrzykuje skrypty i style do tego dokumentu.

## Podsumowanie

Gratulacje! Stworzyłeś swój pierwszy projekt React 19 przy użyciu Vite.