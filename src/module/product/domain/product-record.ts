import { ValueObject } from '../../utils/ValueObject';

interface ProductCopyProps {
  name: string;
  price: number;
  description: string;
  sellerId: string;
  category: string;
}

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
    //super({ name, price, description, sellerId, category });
    this.name = name || '';
    this.price = price || 0;
    this.description = description || '';
    this.category = category || '';
    this.sellerId = sellerId || '';
  }
}
