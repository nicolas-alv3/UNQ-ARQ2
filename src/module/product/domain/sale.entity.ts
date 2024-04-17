import { Item } from './item.entity';
import { ValueObject } from '../../utils/ValueObject';

interface SaleProps {
  items: Item[];
  date: Date;
}

export class Sale extends ValueObject<SaleProps> {
  items: Item[];
  date: Date;

  constructor(items: Item[]) {
    const date = new Date();
    super({ date, items });
    this.date = date;
    this.items = items;
  }

  getPrice(): number {
    return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
  }

  process() {
    this.items.forEach((item) => {
      item.product.decreaseStock(1);
    });
  }
}
