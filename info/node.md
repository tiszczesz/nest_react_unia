## Inicjowanie npm i node

```console
npm init //-y

npm list //lista zainstalowanych lokalnie pakietów
npm list -g //lista zainstalowanych globalnie pakietów
npm install nazwa_pakietu   zamiast install samo i
npm uninstall nazwa_pakietu
```

## uruchomienie skryptu w node

```console
node nazwa_skryptu.js
```

## uruchomienie "kompilatora typescript"

```console
npx tsc nazwa_skryptu.ts
```

## zainicjowanie typescript w projekcie

```console
  npx tsc -init // utworzy sie plik tsconfig.json
```

## instalowanie typów typescript dla node

```console
npm i @types/node -D
```
## operacje na plikach w node fs i TypeScript

Modul `fs` sluzy do pracy z plikami i katalogami. W aplikacjach TypeScript najwygodniej uzywac wersji opartej o `Promise`, czyli `fs/promises`.

## import modulu

```ts
import fs from 'fs/promises';
import path from 'path';
```

`fs/promises` pozwala uzywac `await`, a `path` pomaga bezpiecznie skladac sciezki plikow.

## najczesciej uzywane metody

- `fs.readFile()` - odczyt pliku
- `fs.writeFile()` - zapis pliku
- `fs.appendFile()` - dopisanie danych na koniec pliku
- `fs.readdir()` - odczyt listy plikow w katalogu
- `fs.mkdir()` - tworzenie katalogu
- `fs.unlink()` - usuwanie pliku
- `fs.stat()` - informacje o pliku lub katalogu

## odczyt pliku tekstowego

```ts
import fs from 'fs/promises';

const readTextFile = async (): Promise<void> => {
  const content = await fs.readFile('plik.txt', 'utf-8');
  console.log(content);
};
```

Drugi argument `'utf-8'` powoduje, ze wynik bedzie tekstem typu `string`. Bez tego Node zwroci `Buffer`.

## zapis do pliku

```ts
import fs from 'fs/promises';

const saveTextFile = async (): Promise<void> => {
  await fs.writeFile('plik.txt', 'Przykladowa tresc', 'utf-8');
};
```

Jesli plik nie istnieje, zostanie utworzony. Jesli istnieje, jego zawartosc zostanie nadpisana.

## dopisywanie do pliku

```ts
import fs from 'fs/promises';

const appendToFile = async (): Promise<void> => {
  await fs.appendFile('log.txt', '\nNowy wpis', 'utf-8');
};
```

## odczyt i zapis pliku JSON

To bardzo czesty przypadek w Node.js. Najpierw czytamy plik jako tekst, potem zamieniamy go na obiekt przez `JSON.parse()`. Przy zapisie robimy odwrotnie przez `JSON.stringify()`.

```ts
import fs from 'fs/promises';

type Student = {
  id: number;
  firstname: string;
  lastname: string;
};

const readStudents = async (): Promise<Student[]> => {
  const data = await fs.readFile('students.json', 'utf-8');
  return JSON.parse(data);
};

const saveStudents = async (students: Student[]): Promise<void> => {
  const data = JSON.stringify(students, null, 2);
  await fs.writeFile('students.json', data, 'utf-8');
};
```

`JSON.stringify(students, null, 2)` zapisuje dane w czytelnym formacie z wcieciami.

## przyklad z projektu cw3

W projekcie `cw3` plik [cw3/src/FileRepo.ts](e:/tools/GitHub/nest_react_unia/cw3/src/FileRepo.ts) realizuje repozytorium oparte o plik `students.json`.

```ts
getAllStudents = async (): Promise<Student[]> => {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
}

saveStudents = async (students: Student[]): Promise<void> => {
    const data = JSON.stringify(students, null, 2);
    await fs.writeFile(this.filePath, data, 'utf-8');
}
```

W pliku [cw3/src/router.ts](e:/tools/GitHub/nest_react_unia/cw3/src/router.ts) jest tez odczyt pliku HTML:

```ts
const context = await fs.readFile(path.join(pathToPublic, 'index.html'), 'utf-8');
res.status(200).send(context);
```

## obsluga bledow

Operacje na plikach moga zakonczyc sie bledem, na przyklad gdy plik nie istnieje. Dlatego warto uzywac `try/catch`.

```ts
const readSafe = async (): Promise<void> => {
  try {
    const content = await fs.readFile('brak.txt', 'utf-8');
    console.log(content);
  } catch (error) {
    console.error('Blad odczytu pliku:', error);
  }
};
```

## uwagi praktyczne

- w nowym kodzie Node lepiej wybierac `fs/promises` zamiast starszych callbackow
- do skladania sciezek uzywac `path.join()` zamiast recznego wpisywania `/`
- przy pracy z JSON zawsze pamietac o `JSON.parse()` i `JSON.stringify()`
- operacje asynchroniczne najlepiej wykonywac przez `async/await`

