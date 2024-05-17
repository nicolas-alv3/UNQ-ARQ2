import { Seller } from '../../../domain/Seller';

export interface UpdateSellerCommand {
  execute(seller: Seller): Promise<Seller>;
}
