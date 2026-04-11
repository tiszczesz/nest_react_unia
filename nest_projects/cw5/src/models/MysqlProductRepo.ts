import { IProductRepo } from './IProductRepo';
import { Product } from './productModel';
import mysql from 'mysql2/promise';

class MysqlProductRepo implements IProductRepo {
  private connection: any; // Replace with actual MySQL connection type

  private async createNewConnectio() {
    return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'nest_products',
    });
  }
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
