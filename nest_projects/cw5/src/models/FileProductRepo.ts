//import { fileURLToPath } from 'url';
import { IProductRepo } from './IProductRepo';
import { Product } from './productModel';
import path from 'path';

//const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('dirname', __dirname);
const pathToPublic = path.join(__dirname, '..', '..', 'public');

export class FileProductRepo implements IProductRepo {
  private readonly fileName: string;
  constructor(fileName: string = 'products.json') {
    this.fileName = path.join(pathToPublic, fileName);
  }
  getProducts(): Promise<Product[]> {
    //console.log('pathToPublic', pathToPublic);
    console.log('fileName', this.fileName);
    return Promise.resolve([]);
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
