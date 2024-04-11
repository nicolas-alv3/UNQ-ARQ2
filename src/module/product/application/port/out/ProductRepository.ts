import { Product } from '../../../domain/product.entity';
import { SearchCriteria } from '../in/SearchProductsQuery';

export interface ProductRepository {
  findAll(): Promise<Product[]>;

  save(product: Product): Promise<Product>;

  update(product: Partial<Product>): Promise<Product>;

  delete(id: string): Promise<boolean>;

  search(sc: SearchCriteria): Promise<Product[]>;
}
