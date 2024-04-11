import { Product } from '../../../domain/product.entity';

export interface FindProductsQuery {
  execute: () => Promise<Product[]>;
}
