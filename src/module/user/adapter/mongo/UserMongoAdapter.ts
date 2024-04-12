import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/port/out/UserRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { User } from '../../domain/User';

@Injectable()
export default class UserMongoAdapter implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private mapUser(doc: any): User {
    return {
      id: doc?.id as string,
      lastname: doc?.lastname,
      name: doc?.name,
      email: doc?.email,
    };
  }

  /*async findAll(): Promise<Product[]> {
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
*/
  async save(user: User): Promise<User> {
    const result = await this.userModel.create(user);
    if (result?.errors) {
      throw new BadRequestException('Invalid user data');
    }
    return this.mapUser(result);
  }

  async update(user: Partial<User>): Promise<User> {
    const result = await this.userModel.findByIdAndUpdate(user.id, user);
    if (result?.errors) {
      throw new BadRequestException('Invalid user data');
    }
    return { ...this.mapUser(result), ...user };
  }

  /*async update(product: Partial<Product>): Promise<Product> {
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
  }*/
}
