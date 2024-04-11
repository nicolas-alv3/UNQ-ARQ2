import { Product } from '../../../domain/product.entity';

export interface SearchCriteria {
  name: string;
  category: string;
  priceGT: number;
  priceLT: number;
}

export interface SearchProductsQuery {
  execute: (sc: SearchCriteria) => Promise<Product[]>;
}
