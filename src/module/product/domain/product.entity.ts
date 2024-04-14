export class Product {
  private name: string;
  private price: number;
  private id: string;
  private description: string;
  private sku: number;
  private sellerId: string;
  private category: string;
  constructor(
    name?: string,
    price?: number,
    description?: string,
    category?: string,
    sku?: number,
    sellerId?: string,
    id?: string,
  ) {
    this.name = name || '';
    this.price = price || 0;
    this.description = description || '';
    this.category = category || '';
    this.sku = sku || 0;
    this.sellerId = sellerId || '';
    this.id = id || '';
  }

  decreaseSku(number: number) {
    this.sku -= number;
  }

  getPrice() {
    return this.price;
  }

  getId() {
    return this.id;
  }
}
