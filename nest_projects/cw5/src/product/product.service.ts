import { Injectable } from '@nestjs/common';
import { FileProductRepo } from 'src/models/FileProductRepo';
import { type IProductRepo } from 'src/models/IProductRepo';

@Injectable()
export class ProductService {
  private readonly productRepo: IProductRepo;
  constructor() {
    this.productRepo = new FileProductRepo();
  }
  async getProducts() {
    return this.productRepo.getProducts();
  }
}
