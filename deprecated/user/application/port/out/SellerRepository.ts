import { Seller } from '../../../domain/Seller';

export interface SellerRepository {
  save(seller: Seller): Promise<Seller>;

  update(seller: Seller): Promise<Seller>;

  findAll(): Promise<Seller[]>;
}
