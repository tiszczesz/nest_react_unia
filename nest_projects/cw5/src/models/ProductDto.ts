import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  //   constructor(name: string, price: number) {
  //     this.name = name;
  //     this.price = price;
  //   }
  @ApiProperty()
  name: string = '';
  @ApiProperty()
  price: number = 0;
}
