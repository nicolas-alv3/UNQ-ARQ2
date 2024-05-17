import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Product } from '../../../domain/product.entity';
import { CreateProductCommand } from '../../port/in/CreateProductCommand';
import { ProductRepository } from '../../port/out/ProductRepository';
import { ExternalSellerRepository } from '../../port/out/ExternalSellerRepository';

@Injectable()
export class CreateProductUseCase implements CreateProductCommand {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('ExternalSellerRepository')
    private readonly externalSellerRepository: ExternalSellerRepository,
  ) {}
  async execute(product: Product) {
    try {
      const sellerExist = await this.externalSellerRepository.existSellerById(
        product['sellerId'],
      );
      if (sellerExist) {
        return this.productRepository.save(product);
      } else {
        throw new BadRequestException();
      }
    } catch (e) {
      throw new ServiceUnavailableException();
    }
  }
}
