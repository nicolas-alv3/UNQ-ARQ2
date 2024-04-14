export class ItemRequestDto {
  amount: number;
  productId: string;
  constructor() {
    this.amount = 0;
    this.productId = '';
  }
}
