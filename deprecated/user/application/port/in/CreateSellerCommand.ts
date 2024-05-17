import { Seller } from '../../../domain/Seller';

export interface CreateSellerCommand {
  execute(seller: Seller): Promise<Seller>;
}
