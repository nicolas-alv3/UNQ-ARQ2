import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../port/out/ProductRepository';
import { ProcessSaleCommand } from '../../port/in/ProcessSaleCommand';
import { Sale } from '../../../domain/sale.entity';
import { Item } from '../../../domain/item.entity';
import { Product } from '../../../domain/product.entity';
import { ItemRequestDto } from '../../../adapter/controller/dto/REST-request/item-request.dto';

@Injectable()
export class ProcessSaleUseCase implements ProcessSaleCommand {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(items: ItemRequestDto[]): Promise<Sale> {
    let products: Product[];
    try {
      products = await this.productRepository.findByIds(
        items.map((i) => i.productId),
      );
    } catch (e) {
      throw new HttpException(
        { message: 'There was an error processing products item' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const sale = new Sale(
      items.map(
        (i) =>
          new Item(
            i.amount,
            products.find((p) => p.getId() === i.productId),
          ),
      ),
    );

    sale.process();

    products = await this.productRepository.updateBatch(
      sale.items.map((i) => i.product),
    );
    return sale;
  }
}
