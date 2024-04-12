import { User } from '../../../domain/User';

export interface CreateUserCommand {
  execute(user: User);
}
