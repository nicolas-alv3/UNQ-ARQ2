import { Inject, Injectable } from '@nestjs/common';
import { ProductRequestDto } from '../../adapter/controller/dto/REST-request/product-request.dto';
import { UpdateProductDto } from '../../adapter/controller/dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../domain/product.entity';
import { Model } from 'mongoose';
import { CreateProductCommand } from '../port/in/CreateProductCommand';
import { ProductRepository } from '../port/out/ProductRepository';

@Injectable()
export class CreateProductUseCase implements CreateProductCommand {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}
  execute(product: Product) {
    return this.productRepository.save(product);
  }
}
