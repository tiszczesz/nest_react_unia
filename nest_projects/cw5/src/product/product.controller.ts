import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductDto } from 'src/models/ProductDto';

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
    type: ProductDto,
  })
  async addProduct(@Body() product: ProductDto) {
    const newProduct = {
      id: -1,
      name: product.name,
      price: product.price,
      date: new Date(),
    };
    await this.productService.addProduct(newProduct);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProductById(@Param('id') id: string) {
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      throw new NotFoundException('Invalid product ID');
    }
    await this.productService.deleteProductById(idNum);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product updated',
    type: ProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      throw new NotFoundException('Invalid product ID');
    }
    const productToUpdate = { ...product, id: idNum, date: new Date() };
    await this.productService.updateProduct(productToUpdate);
  }
}
