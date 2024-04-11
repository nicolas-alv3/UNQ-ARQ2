export class ProductRestResponseDto {
  name: string;
  price: number;
  description: string;
  sku: string;
  sellerId: string;
  category: string;
  id: string;

  constructor() {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.sku = '';
    this.sellerId = '';
    this.id = '';
    this.category = '';
  }
}
