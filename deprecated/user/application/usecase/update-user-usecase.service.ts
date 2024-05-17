import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../port/out/UserRepository';
import { User } from '../../domain/User';
import { UpdateUserCommand } from '../port/in/UpdateUserCommand';

@Injectable()
export class UpdateUserUseCase implements UpdateUserCommand {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  execute(user: User) {
    return this.userRepository.update(user);
  }
}
