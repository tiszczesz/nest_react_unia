## Zadanie 1

1. Utwórz projekt react w vite
2. Dodaj komponent Circle
3. Stwórz w katalogu src katalog data
4. W katalogu data utwórz plik colors.ts zawierajacy tablicę obiektów items

```ts
type Item = {
  color: string;
  radius: number;
};
const items: Item = [
  //10 elemntów
];
```

5. W komponencie App.tsx wygeneruj zestaw kółek o określonym kolorze i rozmiarza
