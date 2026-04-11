import 'bootstrap/dist/css/bootstrap.min.css';
import { SectionResult } from './components/SectionResult';
import { loadData, saveData } from './loadData';
import { ButtonLoad } from './components/ButtonLoad';
import { ProductsTable } from './components/ProductsTable';
import { ProductForm } from './components/ProductForm';
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
  const products = await loadData('http://localhost:3000/product');
  console.log('Dane załadowane:', products);
  sectionResult.textContent = '';
  const table = ProductsTable(products);
  //table.className = 'w-50';
  const productForm = ProductForm();
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const name = formData.get('productName') as string;
    const price = parseFloat(formData.get('productPrice') as string);
    const date = new Date(formData.get('productDate') as string);
    const newProduct = { id: -1, name, price, date };
    console.log('Dane z formularza:', { name, price, date });
    saveData('http://localhost:3000/product', newProduct);
  });
  sectionResult.appendChild(productForm);
  sectionResult.appendChild(table);
}
