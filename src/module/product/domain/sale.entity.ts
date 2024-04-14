import { Item } from './item.entity';

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

  process() {
    this.items.forEach((item) => {
      item.product.decreaseSku(1);
    });
  }
}
