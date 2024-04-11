import { Controller, Get, Inject } from '@nestjs/common';
import { FindProductsQuery } from '../../application/port/in/FindProductsQuery';
import { ProductRestResponseDto } from './dto/REST-response/product-rest-response.dto';
import GenericMapper from '../../../utils/GenericMapper';
import { Product } from '../../domain/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('FindProductsQuery') private findProductsQuery: FindProductsQuery,
  ) {
  }

  @Get()
  async findAll(): Promise<ProductRestResponseDto[]> {
    const response = await this.findProductsQuery.execute();
    return response.map((p) => {
      return GenericMapper.toClass<Product, ProductRestResponseDto>(
        p,
        new ProductRestResponseDto(),
      );
    });
  }
}
