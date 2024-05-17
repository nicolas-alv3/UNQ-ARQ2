import { Seller } from '../../../domain/Seller';

export interface FindSellersQuery {
  execute: () => Promise<Seller[]>;
}
