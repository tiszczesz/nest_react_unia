//import { fileURLToPath } from 'url';
import { IProductRepo } from './IProductRepo';
import { Product } from './productModel';
import path from 'path';
import fs from 'fs/promises';

//const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('dirname', __dirname);
const pathToPublic = path.join(__dirname, '..', '..', 'public');

export class FileProductRepo implements IProductRepo {
  private readonly fileName: string;
  constructor(fileName: string = 'products.json') {
    this.fileName = path.join(pathToPublic, fileName);
  }
  async getProducts(): Promise<Product[]> {
    //console.log('pathToPublic', pathToPublic);
    console.log('fileName', this.fileName);
    const products: Product[] = await this.GetFromFile();

    return products;
  }
  private async GetFromFile() {
    const productsJson = await fs.readFile(this.fileName, 'utf-8');
    const products: Product[] = JSON.parse(productsJson) as Product[];
    return products;
  }
  private async SaveToFile(products: Product[]) {
    const productsJson = JSON.stringify(products, null, 2);
    await fs.writeFile(this.fileName, productsJson, 'utf-8');
  }
  private getNextId(products: Product[]): number {
    if (products.length === 0) {
      return 1;
    }
    let lastId = 0;
    for (const product of products) {
      if (product.id > lastId) {
        lastId = product.id;
      }
    }
    return lastId + 1;
  }

  async getProductById(id: number): Promise<Product | null> {
    const products = await this.GetFromFile();
    console.log('products', products);
    return products.find((p) => p.id === id) || null;
  }
  async addProduct(product: Product): Promise<void> {
    const products = await this.GetFromFile();
    product.id = this.getNextId(products);
    products.push(product);
    await this.SaveToFile(products);
  }
  async deleteProductById(id: number): Promise<void> {
    const products = await this.GetFromFile();
    console.log('products', products);
    const filteredProducts = products.filter((p) => p.id !== id);
    console.log('filteredProducts', filteredProducts);
    await this.SaveToFile(filteredProducts);
  }
  async updateProduct(product: Product): Promise<void> {
    const products = await this.GetFromFile();
    //szukamy indeksu produktu o danym id aby go zaktualizować
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      //produkt o danym id istnieje, aktualizujemy go
      products[index] = product;
      await this.SaveToFile(products);
    }
  }
}
