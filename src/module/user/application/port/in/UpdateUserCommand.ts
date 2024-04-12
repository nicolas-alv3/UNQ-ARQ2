import { User } from '../../../domain/User';

export interface UpdateUserCommand {
  execute(user: User);
}
