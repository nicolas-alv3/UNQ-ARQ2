import { Inject, Injectable } from '@nestjs/common';
import { FindSellersQuery } from '../port/in/FindSellersQuery';
import { SellerRepository } from '../port/out/SellerRepository';
import { Seller } from '../../domain/Seller';

@Injectable()
export class FindSellersUsecase implements FindSellersQuery {
  constructor(
    @Inject('SellerRepository')
    private readonly sellerRepository: SellerRepository,
  ) {}

  execute(): Promise<Seller[]> {
    return this.sellerRepository.findAll();
  }
}
