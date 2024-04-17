import { ProductRecord } from './product-record';

export class ItemRecord {
  private amount: number;
  private product: ProductRecord;

  constructor(amount: number, product: ProductRecord) {
    //super({ amount, product });
    this.amount = amount;
    this.product = product;
  }
}
