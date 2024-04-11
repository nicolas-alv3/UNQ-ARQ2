import { Inject, Injectable } from '@nestjs/common';
import { FindProductsQuery } from '../port/in/FindProductsQuery';
import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../port/out/ProductRepository';

@Injectable()
export class FindAllProductsUseCase implements FindProductsQuery {
  constructor(@Inject('ProductRepository')private readonly productRepository: ProductRepository) {
  }

  execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
