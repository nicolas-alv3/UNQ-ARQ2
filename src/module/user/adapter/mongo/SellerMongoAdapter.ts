import { BadRequestException, Injectable } from '@nestjs/common';
import { SellerRepository } from '../../application/port/out/SellerRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from '../../domain/Seller';

@Injectable()
export default class SellerMongoAdapter implements SellerRepository {
  constructor(
    @InjectModel(Seller.name) private readonly sellerModel: Model<Seller>,
  ) {}

  private mapSeller(doc: any): Seller {
    return {
      id: doc?.id as string,
      name: doc?.name,
      email: doc?.email,
    };
  }

  async save(seller: Seller): Promise<Seller> {
    const result = await this.sellerModel.create(seller);
    if (result?.errors) {
      throw new BadRequestException('Invalid seller data');
    }
    return this.mapSeller(result);
  }

  async update(seller: Partial<Seller>): Promise<Seller> {
    const result = await this.sellerModel.findByIdAndUpdate(seller.id, seller);
    if (result?.errors) {
      throw new BadRequestException('Invalid seller data');
    }
    return { ...this.mapSeller(result), ...seller };
  }

  async findAll(): Promise<Seller[]> {
    const response = await this.sellerModel.find();
    return response.map(this.mapSeller);
  }
}
