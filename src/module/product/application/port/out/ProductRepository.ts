import { Product } from '../../../domain/product.entity';

export interface ProductRepository {
  findAll(): Promise<Product[]>;

  save(product: Product): Promise<Product>;
}
