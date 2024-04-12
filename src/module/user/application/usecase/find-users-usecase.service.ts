import { Inject, Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../port/in/CreateUserCommand';
import { UserRepository } from '../port/out/UserRepository';
import { User } from '../../domain/User';
import { FindUsersCommand } from '../port/in/FindUsersCommand';

@Injectable()
export class FindUsersUsecase implements FindUsersCommand {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
