import { IProductRepo } from './IProductRepo';
import { Product } from './productModel';
import mysql from 'mysql2/promise';

export class MysqlProductRepo implements IProductRepo {
  private connection: mysql.Connection | null; // Replace with actual MySQL connection type

  private async createNewConnectio() {
    return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'nest_products',
    });
  }
  private async getConnection() {
    if (!this.connection) {
      this.connection = await this.createNewConnectio();
    }
    return this.connection;
  }
  /**
   *
   */
  constructor() {
    this.connection = null;
  }
  async getProducts(): Promise<Product[]> {
    //Tworzymy nowe połączenie do bazy danych
    await this.getConnection();
    //Jeśli połączenie nie zostało nawiązane, zwracamy pustą tablicę
    if (!this.connection) return [];
    //Wykonujemy zapytanie do bazy danych, aby pobrać wszystkie produkty
    const [rows] = await this.connection.execute('SELECT * FROM products');
    //Zamykamy połączenie z bazą danych
    await this.connection.end();
    //Zwracamy pobrane produkty jako tablicę obiektów typu Product
    return rows as Product[];
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
