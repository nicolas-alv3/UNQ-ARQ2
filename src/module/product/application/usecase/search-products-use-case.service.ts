import { Inject, Injectable } from '@nestjs/common';
import { FindProductsQuery } from '../port/in/FindProductsQuery';
import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../port/out/ProductRepository';
import {
  SearchCriteria,
  SearchProductsQuery,
} from '../port/in/SearchProductsQuery';
import { Promise } from 'mongoose';

@Injectable()
export class SearchProductsUseCase implements SearchProductsQuery {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  execute(sc: SearchCriteria): Promise<Product[]> {
    return this.productRepository.search(sc);
  }
}
