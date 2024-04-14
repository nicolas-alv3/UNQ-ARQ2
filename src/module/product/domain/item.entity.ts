import { Product } from './product.entity';

export class Item {
  get product(): Product {
    return this._product;
  }
  private _amount: number;
  private _product: Product;

  constructor(amount: number, product: Product) {
    this._amount = amount;
    this._product = product;
  }

  getPrice(): number {
    return this._amount * this._product.getPrice();
  }
}
