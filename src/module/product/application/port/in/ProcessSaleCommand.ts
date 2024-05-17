import { SaleRecord } from '../../../domain/sale-record';
import { SaleRequestDto } from '../../../adapter/controller/dto/REST-request/sale-request.dto';

export interface ProcessSaleCommand {
  execute: (sale: SaleRequestDto) => Promise<SaleRecord>;
}
