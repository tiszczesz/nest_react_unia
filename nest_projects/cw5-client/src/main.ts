import 'bootstrap/dist/css/bootstrap.min.css';
const app = document.querySelector<HTMLDivElement>('#app');
const buttonLoad = document.createElement('button');
buttonLoad.classList.add('btn', 'btn-outline-primary');
buttonLoad.textContent = 'Załaduj dane';
if(app) {
  app.classList.add('container');
  app.innerHTML = `
    <h1>Hello Vite + TypeScript!</h1>`;
  app.appendChild(buttonLoad);
}