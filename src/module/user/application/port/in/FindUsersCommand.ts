import { User } from '../../../domain/User';

export interface FindUsersCommand {
  execute: () => Promise<User[]>;
}
