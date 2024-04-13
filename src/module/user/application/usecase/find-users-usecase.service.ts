import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../port/out/UserRepository';
import { User } from '../../domain/User';
import { FindUsersQuery } from '../port/in/FindUsersQuery';

@Injectable()
export class FindUsersUsecase implements FindUsersQuery {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
