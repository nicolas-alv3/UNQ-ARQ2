import { ProductRepository } from '../../application/port/out/ProductRepository';
import { Product } from '../../domain/product.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import GenericMapper from '../../../utils/GenericMapper';

@Injectable()
export default class ProductMongoAdapter implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  private mapProduct(doc: any): Product {
    return {
      id: doc?.id,
      name: doc?.name,
      price: doc?.price,
      sellerId: doc?.sellerId,
      sku: doc?.sku,
      description: doc?.description,
    };
  }

  async findAll(): Promise<Product[]> {
    const query = this.productModel.find();
    const result = await query.exec();
    return result.map(this.mapProduct);
  }

  async save(product: Product): Promise<Product> {
    const result = await this.productModel.create(product);
    if (result.errors) {
      throw new BadRequestException('Invalid product data');
    }
    return this.mapProduct(result);
  }
}
