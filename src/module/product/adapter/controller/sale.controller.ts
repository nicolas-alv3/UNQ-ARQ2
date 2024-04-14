import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ItemRequestDto } from './dto/REST-request/item-request.dto';
import { ProcessSaleCommand } from '../../application/port/in/ProcessSaleCommand';

@Controller('sale')
export class SaleController {
  constructor(
    @Inject('ProcessSaleCommand')
    private processSaleCommand: ProcessSaleCommand,
  ) {}
  @Post()
  async processSale(@Body() data: ItemRequestDto[]) {
    return this.processSaleCommand.execute(data);
  }
}
