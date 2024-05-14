export class ProductRecord {
  private name: string;
  private price: number;
  private description: string;
  private sellerId: string;
  private category: string;
  constructor(
    name?: string,
    price?: number,
    description?: string,
    category?: string,
    sellerId?: string,
  ) {
    this.name = name || '';
    this.price = price || 0;
    this.description = description || '';
    this.category = category || '';
    this.sellerId = sellerId || '';
  }
}
