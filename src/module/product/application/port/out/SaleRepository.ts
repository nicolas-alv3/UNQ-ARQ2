import { SaleRecord } from '../../../domain/sale-record';

export interface SaleRepository {
  findAll(): Promise<SaleRecord[]>;

  save(s: SaleRecord): Promise<SaleRecord>;
}
