import { Inject, Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../port/in/CreateUserCommand';
import { SellerRepository } from '../port/out/SellerRepository';
import { Seller } from '../../domain/Seller';

@Injectable()
export class CreateSellerUseCase implements CreateUserCommand {
  constructor(
    @Inject('SellerRepository')
    private readonly sellerRepository: SellerRepository,
  ) {}

  execute(seller: Seller) {
    return this.sellerRepository.save(seller);
  }
}
