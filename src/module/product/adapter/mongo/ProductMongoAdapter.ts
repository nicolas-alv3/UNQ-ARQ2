import { ProductRepository } from '../../application/port/out/ProductRepository';
import { Product } from '../../domain/product.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { query } from 'express';

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
    return result?.map(this.mapProduct);
  }

  async save(product: Product): Promise<Product> {
    const result = await this.productModel.create(product);
    if (result?.errors) {
      throw new BadRequestException('Invalid product data');
    }
    return this.mapProduct(result);
  }

  async update(product: Partial<Product>): Promise<Product> {
    const result = await this.productModel.findByIdAndUpdate(
      product.id,
      product,
    );
    if (result?.errors) {
      throw new BadRequestException('Invalid product data');
    }
    return { ...this.mapProduct(result), ...product };
  }

  async delete(id: string): Promise<boolean> {
    let result;
    try {
      result = await this.productModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException('Invalid product ID');
    }
    if (result?.errors) {
      throw new BadRequestException('Invalid product ID');
    }
    return Boolean(result?.name);
  }
}
