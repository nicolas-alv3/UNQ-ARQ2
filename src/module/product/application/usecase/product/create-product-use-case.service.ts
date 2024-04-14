import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/product.entity';
import { CreateProductCommand } from '../../port/in/CreateProductCommand';
import { ProductRepository } from '../../port/out/ProductRepository';

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