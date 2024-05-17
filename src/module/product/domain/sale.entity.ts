import { Item } from './item.entity';
import { SaleRecord } from './sale-record';

export class Sale {
  private items: Item[];
  private date: Date;
  private userId: string;

  constructor(items: Item[], userId: string) {
    this.userId = userId;
    this.date = new Date();
    this.items = items;
  }

  getPrice(): number {
    return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
  }

  getItems(): Item[] {
    return this.items;
  }

  process(): SaleRecord {
    this.items.forEach((item) => {
      item.getProduct().decreaseStock(item.getAmount());
    });

    return new SaleRecord(this.items, this.userId);
  }
}
