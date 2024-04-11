import { Product } from '../../../domain/product.entity';

export interface UpdateProductCommand {
  execute: (body: Partial<Product>) => Promise<Product>;
}
