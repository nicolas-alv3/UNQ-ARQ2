export class ProductRestResponseDto {
  name: string;
  price: number;
  description: string;
  stock: number;
  sellerId: string;
  category: string;
  id: string;

  constructor() {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.stock = 0;
    this.sellerId = '';
    this.id = '';
    this.category = '';
  }
}
