import { Item } from './item.entity';
import { SaleRecord } from './sale-record';

export class Sale {
  items: Item[];
  date: Date;

  constructor(items: Item[]) {
    this.date = new Date();
    this.items = items;
  }

  getPrice(): number {
    return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
  }

  process(): SaleRecord {
    this.items.forEach((item) => {
      item.getProduct().decreaseStock(item.getAmount());
    });

    return new SaleRecord(this.items);
  }
}
