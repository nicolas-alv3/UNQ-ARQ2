import { Product } from '../../../domain/product.entity';

export interface CreateProductCommand {
  execute: (body: Product) => Promise<Product>;
}
