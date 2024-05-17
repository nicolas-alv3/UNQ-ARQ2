import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ItemRequestDto } from './dto/REST-request/item-request.dto';
import { ProcessSaleCommand } from '../../application/port/in/ProcessSaleCommand';
import { SaleRequestDto } from './dto/REST-request/sale-request.dto';

@Controller('sale')
export class SaleController {
  constructor(
    @Inject('ProcessSaleCommand')
    private processSaleCommand: ProcessSaleCommand,
  ) {}
  @Post()
  async processSale(@Body() data: SaleRequestDto) {
    return this.processSaleCommand.execute(data);
  }
}
