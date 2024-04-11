import { Inject, Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../port/in/CreateUserCommand';
import { UserRepository } from '../port/out/UserRepository';
import { User } from '../../domain/User';

@Injectable()
export class CreateUserUseCase implements CreateUserCommand {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  execute(user: User) {
    return this.userRepository.save(user);
  }
}
