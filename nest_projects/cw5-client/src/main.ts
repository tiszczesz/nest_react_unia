import 'bootstrap/dist/css/bootstrap.min.css';
import { SectionResult } from './components/SectionResult';
import { loadData } from './loadData';
const app = document.querySelector<HTMLDivElement>('#app');
const buttonLoad = document.createElement('button');
buttonLoad.classList.add('btn', 'btn-outline-primary');
buttonLoad.textContent = 'Załaduj dane';
const sectionResult = SectionResult();
buttonLoad.addEventListener('click', async () => {
  console.log('Ładowanie danych...');
    sectionResult.textContent = 'Ładowanie danych...';
  
  try {
    const products = await loadData('http://localhost:3000/product');
    console.log('Dane załadowane:', products);
  } catch (error) {
    console.error('Błąd podczas ładowania danych:', error);
    sectionResult.textContent = 'Błąd podczas ładowania danych.';
  }
});
if(app) {
  app.classList.add('container');
  app.innerHTML = `
    <h1>Hello Vite + TypeScript!</h1>`;
  app.appendChild(buttonLoad);
  app.appendChild(sectionResult);
}