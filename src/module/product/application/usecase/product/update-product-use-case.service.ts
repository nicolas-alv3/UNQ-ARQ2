import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/product.entity';
import { ProductRepository } from '../../port/out/ProductRepository';
import { UpdateProductCommand } from '../../port/in/UpdateProductCommand';

@Injectable()
export class UpdateProductUseCase implements UpdateProductCommand {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}
  execute(product: Product) {
    return this.productRepository.update(product);
  }
}
