import 'bootstrap/dist/css/bootstrap.min.css';
import { SectionResult } from './components/SectionResult';
import { deleteData, loadData, saveData } from './loadData';
import { ButtonLoad } from './components/ButtonLoad';
import { ProductsTable } from './components/ProductsTable';
import { ProductForm } from './components/ProductForm';
import type { Product } from './models/productModel';

const PRODUCTS_API_URL = 'http://localhost:3000/product';
const app = document.querySelector<HTMLDivElement>('#app');
const buttonLoad = ButtonLoad();

const sectionResult = SectionResult();
buttonLoad.addEventListener('click', async () => {
  console.log('Ładowanie danych...');
  sectionResult.textContent = 'Ładowanie danych...';
  try {
    await LoadDada();
  } catch (error) {
    console.error('Błąd podczas ładowania danych:', error);
    sectionResult.textContent = 'Błąd podczas ładowania danych.';
  }
});
if (app) {
  app.classList.add('container');
  app.innerHTML = `
    <h1>Hello Vite + TypeScript!</h1>`;
  app.appendChild(buttonLoad);
  app.appendChild(sectionResult);
}
async function LoadDada() {
  const products = await loadData(PRODUCTS_API_URL);
  console.log('Dane załadowane:', products);
  sectionResult.textContent = '';
  const handleDelete = async (productId: number) => {
    try {
      await deleteData(`${PRODUCTS_API_URL}/${productId}`);
      const productIndex = products.findIndex((product) => product.id === productId);
      if (productIndex !== -1) {
        products.splice(productIndex, 1);
      }
      currentTable = refreshProductsTable(products, currentTable, handleDelete);
    } catch (error) {
      console.error('Błąd podczas usuwania danych:', error);
      sectionResult.textContent = 'Błąd podczas usuwania danych.';
    }
  };

  const table = ProductsTable(products, handleDelete);
  //table.className = 'w-50';
  const productForm = ProductForm();
  let currentTable = table;

  productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const name = formData.get('productName') as string;
    const price = parseFloat(formData.get('productPrice') as string);
    const date = new Date(formData.get('productDate') as string);
    const newProduct = { id: -1, name, price, date };
    console.log('Dane z formularza:', { name, price, date });

    try {
      const savedProduct = await saveData(PRODUCTS_API_URL, newProduct);
      products.push(savedProduct ?? newProduct);
      currentTable = refreshProductsTable(products, currentTable, handleDelete);
      productForm.reset();
    } catch (error) {
      console.error('Błąd podczas zapisywania danych:', error);
      sectionResult.textContent = 'Błąd podczas zapisywania danych.';
    }
  });
  sectionResult.appendChild(productForm);
  sectionResult.appendChild(table);
}

function refreshProductsTable(
  products: Product[],
  currentTable: HTMLTableElement,
  onDelete: (productId: number) => void | Promise<void>
): HTMLTableElement {
  const refreshedTable = ProductsTable(products, onDelete);
  currentTable.replaceWith(refreshedTable);
  return refreshedTable;
}


