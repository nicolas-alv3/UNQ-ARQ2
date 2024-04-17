import { ProductRepository } from '../../application/port/out/ProductRepository';
import { Product } from '../../domain/product.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Promise } from 'mongoose';
import { SearchCriteria } from '../../application/port/in/SearchProductsQuery';

@Injectable()
export default class ProductMongoAdapter implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  private mapProduct(doc: any): Product {
    return new Product(
      doc?.name,
      doc?.price,
      doc?.description,
      doc?.category,
      doc?.stock,
      doc?.sellerId,
      doc?.id,
    );
  }

  async findAll(): Promise<Product[]> {
    const query = this.productModel.find();
    const result = await query.exec();
    return result?.map(this.mapProduct);
  }

  async search(sc: SearchCriteria): Promise<Product[]> {
    const query = this.productModel.find({
      $and: [
        // Filter by name or description
        {
          $or: [
            sc.name ? { name: { $regex: sc.name, $options: 'i' } } : {},
            sc.name ? { description: { $regex: sc.name, $options: 'i' } } : {},
          ],
        },
        // Filter by category
        sc.category ? { category: { $regex: sc.category, $options: 'i' } } : {},
        // Filter by price
        sc.priceLT ? { price: { $lt: sc.priceLT } } : {},
        sc.priceGT ? { price: { $gt: sc.priceGT } } : {},
      ],
    });
    const result = await query.exec();
    return result?.map(this.mapProduct);
  }

  async save(product: Product): Promise<Product> {
    const result = await this.productModel.create(product);
    /*if (result?.errors) {
      throw new BadRequestException('Invalid product data');
    }*/
    return this.mapProduct(result);
  }

  async update(product: Product): Promise<Product> {
    await this.productModel.findByIdAndUpdate(product.getId(), product);
    /*if (result?.errors) {
      throw new BadRequestException('Invalid product data');
    }*/
    return product;
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

  async findByIds(ids: string[]): Promise<Product[]> {
    const query = this.productModel.find().where('_id').in(ids);
    const result = await query.exec();
    return result?.map(this.mapProduct);
  }

  async updateBatch(products: Product[]): Promise<Product[]> {
    const updateOperations = products.map((product) => ({
      updateOne: {
        filter: { _id: product.getId() },
        update: { $set: product },
      },
    }));

    const result = await this.productModel.bulkWrite(updateOperations);

    if (result && result.errors) {
      throw new BadRequestException('Invalid product data');
    }

    return products;
  }
}
