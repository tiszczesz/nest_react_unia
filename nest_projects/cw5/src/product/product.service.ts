import { Injectable } from '@nestjs/common';
import { FileProductRepo } from 'src/models/FileProductRepo';
import { type IProductRepo } from 'src/models/IProductRepo';
import { Product } from 'src/models/productModel';

@Injectable()
export class ProductService {
  private readonly productRepo: IProductRepo;
  constructor() {
    this.productRepo = new FileProductRepo();
  }
  async getProducts() {
    return this.productRepo.getProducts();
  }
  async getProductById(id: number) {
    return this.productRepo.getProductById(id);
  }
  async addProduct(product: Product) {
    return this.productRepo.addProduct(product);
  }
}
