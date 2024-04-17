import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { SaleRepository } from '../../application/port/out/SaleRepository';
import { Sale } from '../../domain/sale.entity';
import { Item } from '../../domain/item.entity';

@Injectable()
export default class SaleMongoAdapter implements SaleRepository {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
  ) {}

  private mapItem(itemDoc: any): Item {
    return new Item(itemDoc?.amount, itemDoc?.product);
  }

  private mapSale(doc: any): Sale {
    return new Sale(doc?.items.map(this.mapItem));
  }

  async findAll(): Promise<Sale[]> {
    const query = this.saleModel.find();
    const result = await query.exec();
    return result?.map(this.mapSale);
  }

  async save(s: Sale): Promise<Sale> {
    const result = await this.saleModel.create(s);
    return this.mapSale(result);
  }
}
