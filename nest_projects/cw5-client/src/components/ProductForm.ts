export const ProductForm = (): HTMLFormElement => {
  const form = document.createElement('form');
  form.id = 'productForm';
  form.classList.add('w-50');
  form.innerHTML = `
        <div class="mb-3">
            <label for="productName" class="form-label">Nazwa produktu</label>
            <input type="text" class="form-control" id="productName" name="productName" required>
        </div>
        <div class="mb-3">
            <label for="productPrice" class="form-label">Cena produktu</label>
            <input type="number" class="form-control" id="productPrice" name="productPrice" required>   
        </div>
        <div class="mb-3">
            <label for="productDate" class="form-label">Data</label>
            <input type="date" class="form-control" id="productDate" name="productDate" required>   
        </div>
        <button type="submit" class="btn btn-primary">Dodaj produkt</button>
    `;
  return form as HTMLFormElement;
};
