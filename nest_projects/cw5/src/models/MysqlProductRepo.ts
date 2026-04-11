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
    this.connection = null;
    //Zwracamy pobrane produkty jako tablicę obiektów typu Product
    return rows as Product[];
  }
  async getProductById(id: number): Promise<Product | null> {
    await this.getConnection();
    if (!this.connection) return null;
    const [rows] = await this.connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [id],
    );
    await this.connection.end();
    this.connection = null;
    const products = rows as Product[];
    return products.length > 0 ? products[0] : null;
  }
  async addProduct(product: Product): Promise<void> {
    await this.getConnection();
    if (!this.connection) return;
    await this.connection.execute(
      'INSERT INTO products (name, price, date) VALUES (?, ?, ?)',
      [product.name, product.price, product.date],
    );
    await this.connection.end();
    this.connection = null;
  }
  async deleteProductById(id: number): Promise<void> {
    await this.getConnection();
    if (!this.connection) return;
    await this.connection.execute('DELETE FROM products WHERE id = ?', [id]);
    await this.connection.end();
    this.connection = null;
  }
  async updateProduct(product: Product): Promise<void> {
    await this.getConnection();
    if (!this.connection) return;
    await this.connection.execute(
      'UPDATE products SET name = ?, price = ?, date = ? WHERE id = ?',
      [product.name, product.price, product.date, product.id],
    );
    await this.connection.end();
    this.connection = null;
  }
}
