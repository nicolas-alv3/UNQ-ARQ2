import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../port/out/UserRepository';
import { User } from '../../domain/User';
import { UpdateSellerCommand } from '../port/in/UpdateSellerCommand';
import { SellerRepository } from '../port/out/SellerRepository';

@Injectable()
export class UpdateSellerUseCase implements UpdateSellerCommand {
  constructor(
    @Inject('SellerRepository')
    private readonly sellerRepository: SellerRepository,
  ) {}

  execute(user: User) {
    return this.sellerRepository.update(user);
  }
}
