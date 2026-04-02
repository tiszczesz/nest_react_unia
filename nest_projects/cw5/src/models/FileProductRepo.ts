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
    const productsJson = await fs.readFile(this.fileName, 'utf-8');
    const products: Product[] = JSON.parse(productsJson) as Product[];

    return products;
  }
  getProductById(id: number): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }
  addProduct(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteProductById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateProduct(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
