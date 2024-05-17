import { ProductRecord } from './product-record';

export class Product {
  private name: string;
  private price: number;
  private id: string;
  private description: string;
  private stock: number;
  private sellerId: string;
  private category: string;
  constructor(
    name?: string,
    price?: number,
    description?: string,
    category?: string,
    stock?: number,
    sellerId?: string,
    id?: string,
  ) {
    this.name = name || '';
    this.price = price || 0;
    this.description = description || '';
    this.category = category || '';
    this.stock = stock || 0;
    this.sellerId = sellerId || '';
    this.id = id || '';
  }

  decreaseStock(number: number) {
    this.stock -= number;
  }

  getPrice() {
    return this.price;
  }

  getId() {
    return this.id;
  }

  getStock() {
    return this.stock;
  }

  getSellerId() {
    return this.sellerId;
  }

  copy(): ProductRecord {
    return new ProductRecord(
      this.name,
      this.price,
      this.description,
      this.category,
      this.sellerId,
    );
  }

  toRecord() {
    return new ProductRecord(
      this.name,
      this.price,
      this.description,
      this.category,
    );
  }
}
