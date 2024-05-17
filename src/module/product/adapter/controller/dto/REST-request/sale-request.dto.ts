import { ItemRequestDto } from './item-request.dto';

export class SaleRequestDto {
  userId: string;
  items: ItemRequestDto[];
  constructor() {
    this.userId = '';
    this.items = [];
  }
}
