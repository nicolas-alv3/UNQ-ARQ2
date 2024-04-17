import { Sale } from '../../../domain/sale.entity';

export interface SaleRepository {
  findAll(): Promise<Sale[]>;

  save(s: Sale): Promise<Sale>;
}
