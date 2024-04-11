import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { FindProductsQuery } from '../../application/port/in/FindProductsQuery';
import { ProductRestResponseDto } from './dto/REST-response/product-rest-response.dto';
import GenericMapper from '../../../utils/GenericMapper';
import { Product } from '../../domain/product.entity';
import { ProductRequestDto } from './dto/REST-request/product-request.dto';
import { CreateProductCommand } from '../../application/port/in/CreateProductCommand';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('FindProductsQuery') private findProductsQuery: FindProductsQuery,
    @Inject('CreateProductCommand')
    private createProductCommand: CreateProductCommand,
  ) {}

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

  @Post()
  async create(
    @Body() data: ProductRequestDto,
  ): Promise<ProductRestResponseDto> {
    if (!data) {
      throw new BadRequestException('Invalid product data');
    }
    const response = await this.createProductCommand.execute(
      GenericMapper.toClass<ProductRequestDto, Product>(data, new Product()),
    );
    return GenericMapper.toClass<Product, ProductRestResponseDto>(
      response,
      new ProductRestResponseDto(),
    );
  }
}
