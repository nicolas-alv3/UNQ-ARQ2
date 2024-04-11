import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindProductsQuery } from '../../application/port/in/FindProductsQuery';
import { ProductRestResponseDto } from './dto/REST-response/product-rest-response.dto';
import GenericMapper from '../../../utils/GenericMapper';
import { Product } from '../../domain/product.entity';
import { ProductRequestDto } from './dto/REST-request/product-request.dto';
import { CreateProductCommand } from '../../application/port/in/CreateProductCommand';
import { UpdateProductCommand } from '../../application/port/in/UpdateProductCommand';
import { DeleteProductCommand } from '../../application/port/in/DeleteProductCommand';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('FindProductsQuery') private findProductsQuery: FindProductsQuery,
    @Inject('CreateProductCommand')
    private createProductCommand: CreateProductCommand,
    @Inject('UpdateProductCommand')
    private updateProductCommand: UpdateProductCommand,
    @Inject('DeleteProductCommand')
    private deleteProductCommand: DeleteProductCommand,
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

  @Patch()
  async update(
    @Body() data: Partial<ProductRequestDto>,
  ): Promise<ProductRestResponseDto> {
    if (!data) {
      throw new BadRequestException('Invalid product data');
    }
    const response = await this.updateProductCommand.execute(
      GenericMapper.toClass<Partial<ProductRequestDto>, Partial<Product>>(
        data,
        new Product(),
      ),
    );
    return GenericMapper.toClass<Product, ProductRestResponseDto>(
      response,
      new ProductRestResponseDto(),
    );
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    if (!id) {
      throw new BadRequestException('Invalid product id');
    }
    const response = await this.deleteProductCommand.execute(id);
    if (!response) {
      throw new BadRequestException('Invalid product ID');
    }
    return 'Successfull delete of ' + id;
  }
}
