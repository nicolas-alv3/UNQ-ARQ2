import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { SaleRepository } from '../../application/port/out/SaleRepository';
import { Sale } from '../../domain/sale.entity';
import { SaleRecord } from '../../domain/sale-record';
import { ItemRecord } from '../../domain/item-record';

@Injectable()
export default class SaleMongoAdapter implements SaleRepository {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
  ) {}

  private mapItem(itemDoc: any): ItemRecord {
    return new ItemRecord(itemDoc?.amount, itemDoc?.product);
  }

  private mapSale(doc: any): SaleRecord {
    return new SaleRecord(doc?.items.map(this.mapItem), doc?.userId);
  }

  async findAll(): Promise<SaleRecord[]> {
    const query = this.saleModel.find();
    const result = await query.exec();
    return result as unknown as SaleRecord[];
  }

  async save(s: SaleRecord): Promise<SaleRecord> {
    const result = await this.saleModel.create(s);
    return result as unknown as SaleRecord;
  }
}
