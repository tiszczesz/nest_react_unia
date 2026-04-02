import { fileURLToPath } from 'url';
import { IProductRepo } from './IProductRepo';
import { Product } from './productModel';
import path from 'path';

//const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class FileProductRepo implements IProductRepo {
  getProducts(): Promise<Product[]> {
    throw new Error('Method not implemented.');
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
