import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  async getProducts() {
    return this.productService.getProducts();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductById(@Param('id') id: string) {
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      throw new Error('Invalid product ID');
    }
    const product = await this.productService.getProductById(idNum);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  @Post()
  @ApiOperation({ summary: 'Add a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created',
  })
  async addProduct(@Body() product: { name: string; price: number }) {
    const newProduct = {
      id: -1,
      name: product.name,
      price: product.price,
      date: new Date(),
    };
    await this.productService.addProduct(newProduct);
  }
}
