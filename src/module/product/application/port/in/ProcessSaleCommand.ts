import { ItemRequestDto } from '../../../adapter/controller/dto/REST-request/item-request.dto';
import { SaleRecord } from '../../../domain/sale-record';

export interface ProcessSaleCommand {
  execute: (sale: ItemRequestDto[]) => Promise<SaleRecord>;
}
