import type { Product } from '../models/productModel';

export const ProductsTable = (
  products: Product[],
  onDelete?: (productId: number) => void | Promise<void>
): HTMLTableElement => {
  const table = document.createElement('table');
  table.id = 'productsTable';
  table.classList.add('table', 'table-striped', 'w-50');
  const thead = document.createElement('thead');
  thead.innerHTML = `
        <tr>
            <th>Lp</th>
            <th>Nazwa</th>
            <th>Cena</th>
            <th>Data</th>
            <th>Akcje</th>
        </tr>
    `;
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  let index = 1;
  products.forEach((product) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${index++}</td>
        <td>${product.name}</td>
        <td>${new Number(product.price).toFixed(2)}</td>
        <td>${new Date(product.date).toLocaleDateString()}</td>
        `;

    const actionsCell = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-sm btn-primary';
    editButton.textContent = 'Edytuj';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger';
    deleteButton.textContent = 'Usuń';
    deleteButton.addEventListener('click', () => {
      onDelete?.(product.id);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(document.createTextNode(' '));
    actionsCell.appendChild(deleteButton);

    tr.appendChild(actionsCell);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table as HTMLTableElement;
};
