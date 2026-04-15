# Delegacja zdarzen (poprzednie rozwiazanie)

Wczesniej obsluga usuwania dzialala przez delegacje zdarzen:

- Jeden listener `click` byl podpinany do calej tabeli.
- Kod sprawdzal, czy kliknieto przycisk z atrybutem `data-action="delete"`.
- Id produktu bylo pobierane z `data-product-id`.

Przyklad poprzedniego podejscia:

```ts
const bindDeleteHandler = (tableElement: HTMLTableElement) => {
  tableElement.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    const deleteButton = target.closest<HTMLButtonElement>(
      'button[data-action="delete"]',
    );

    if (!deleteButton) {
      return;
    }

    const productId = Number(deleteButton.dataset.productId);
    if (Number.isNaN(productId)) {
      return;
    }

    await deleteData(`${PRODUCTS_API_URL}/${productId}`);
  });
};
```

Znaczenie atrybutow z tabeli:

```html
<button data-action="delete" data-product-id="${product.id}">Usun</button>
```

- `data-action="delete"`: identyfikuje typ akcji.
- `data-product-id`: przenosi identyfikator produktu do JS (`dataset.productId`).

To podejscie zostalo zastapione listenerami podpietymi bezposrednio do przycisku `Usun` podczas renderowania tabeli.
