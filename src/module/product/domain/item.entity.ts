import { Product } from './product.entity';

export class Item {
  private amount: number;
  private product: Product;

  constructor(amount: number, product: Product) {
    this.amount = amount;
    this.product = product;
  }

  getPrice(): number {
    return this.amount * this.product.getPrice();
  }

  getAmount(): number {
    return this.amount;
  }

  getProduct() {
    return this.product;
  }
}
