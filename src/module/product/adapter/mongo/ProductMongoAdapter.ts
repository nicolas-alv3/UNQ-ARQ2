import { ProductRepository } from '../../application/port/out/ProductRepository';
import { Product } from '../../domain/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export default class ProductMongoAdapter implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
  }

  async findAll(): Promise<Product[]> {
    const query = this.productModel.find();
    const result = await query.exec();
    return result.map((doc) => ({
      id: doc.id,
      name: doc.name,
      price: doc.price,
    }));
  }
}