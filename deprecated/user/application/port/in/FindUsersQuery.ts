import { User } from '../../../domain/User';

export interface FindUsersQuery {
  execute: () => Promise<User[]>;
}
