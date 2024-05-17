import { Item } from './item.entity';
import { ItemRecord } from './item-record';

export class SaleRecord {
  items: ItemRecord[];
  date: Date;
  private userId: string;

  constructor(items: Item[], userId: string) {
    this.userId = userId;
    const date = new Date();
    const recordItems = items.map(
      (item) => new ItemRecord(item.getAmount(), item.getProduct().toRecord()),
    );
    this.date = date;
    this.items = recordItems;
  }
}
