import { Item } from './item.entity';
import { ItemRecord } from './item-record';

export class SaleRecord {
  items: ItemRecord[];
  date: Date;

  constructor(items: Item[]) {
    const date = new Date();
    const recordItems = items.map(
      (item) => new ItemRecord(item.getAmount(), item.getProduct().toRecord()),
    );
    //super({ date, items: recordItems });
    this.date = date;
    this.items = recordItems;
  }
}
