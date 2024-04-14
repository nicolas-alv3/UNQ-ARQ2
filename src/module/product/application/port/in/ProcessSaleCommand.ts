import { Sale } from '../../../domain/sale.entity';
import { ItemRequestDto } from '../../../adapter/controller/dto/REST-request/item-request.dto';

export interface ProcessSaleCommand {
  execute: (sale: ItemRequestDto[]) => Promise<Sale>;
}
