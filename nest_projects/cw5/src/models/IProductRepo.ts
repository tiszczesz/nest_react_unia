import { Product } from './productModel';
export interface IProductRepo {
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  addProduct(product: Product): Promise<void>;
  deleteProductById(id: number): Promise<void>;
  updateProduct(product: Product): Promise<void>;
}
