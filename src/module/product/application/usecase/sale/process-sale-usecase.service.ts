import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../port/out/ProductRepository';
import { ProcessSaleCommand } from '../../port/in/ProcessSaleCommand';
import { Sale } from '../../../domain/sale.entity';
import { Item } from '../../../domain/item.entity';
import { Product } from '../../../domain/product.entity';
import { ItemRequestDto } from '../../../adapter/controller/dto/REST-request/item-request.dto';
import { SaleRepository } from '../../port/out/SaleRepository';
import { SaleRecord } from '../../../domain/sale-record';
import { SaleRequestDto } from '../../../adapter/controller/dto/REST-request/sale-request.dto';
import { ExternalUserRepository } from '../../port/out/ExternalUserRepository';

@Injectable()
export class ProcessSaleUseCase implements ProcessSaleCommand {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('SaleRepository')
    private readonly saleRepository: SaleRepository,
    @Inject('ExternalUserRepository')
    private readonly userRepository: ExternalUserRepository,
  ) {}

  async execute(s: SaleRequestDto): Promise<SaleRecord> {
    let products: Product[];
    products = await this.getProducts(s);
    await this.checkIfUserExists(s.userId);
    const sale = new Sale(
      s.items.map(
        (i) =>
          new Item(
            i.amount,
            products.find((p) => p.getId() === i.productId),
          ),
      ),
      s.userId,
    );

    const record = sale.process();

    products = await this.productRepository.updateBatch(
      sale.getItems().map((i) => i.getProduct()),
    );

    await this.saleRepository.save(record);
    return record;
  }

  private async getProducts(s: SaleRequestDto) {
    try {
      return await this.productRepository.findByIds(
        s.items.map((i) => i.productId),
      );
    } catch (e) {
      throw new HttpException(
        { message: 'There was an error processing product items' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async checkIfUserExists(userId: string) {
    try {
      const exist = await this.userRepository.existUserById(userId);
      if (!exist) {
        throw new HttpException(
          { message: 'User does not exist' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      throw new HttpException(
        { message: 'User does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
