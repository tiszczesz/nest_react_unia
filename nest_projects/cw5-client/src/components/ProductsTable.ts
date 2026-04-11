import type { Product } from '../models/productModel';

export const ProductsTable = (products: Product[]): HTMLTableElement => {
  const table = document.createElement('table');
  table.id = 'productsTable';
  table.classList.add('table', 'table-striped');
  const thead = document.createElement('thead');
  thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Cena</th>
            <th>Data</th>
            <th>Akcje</th>
        </tr>
    `;
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  let lp = 1;
  products.forEach((product) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${lp++}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.date.toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-primary">Edytuj</button>
                <button class="btn btn-sm btn-danger">Usuń</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table as HTMLTableElement;
};
