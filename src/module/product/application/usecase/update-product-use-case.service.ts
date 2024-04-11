import { Inject, Injectable } from '@nestjs/common';
import { ProductRequestDto } from '../../adapter/controller/dto/REST-request/product-request.dto';
import { UpdateProductDto } from '../../adapter/controller/dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../domain/product.entity';
import { Model } from 'mongoose';
import { CreateProductCommand } from '../port/in/CreateProductCommand';
import { ProductRepository } from '../port/out/ProductRepository';
import { UpdateProductCommand } from '../port/in/UpdateProductCommand';

@Injectable()
export class UpdateProductUseCase implements UpdateProductCommand {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}
  execute(product: Partial<Product>) {
    return this.productRepository.update(product);
  }
}
