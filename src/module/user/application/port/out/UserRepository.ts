import { User } from '../../../domain/User';

export interface UserRepository {
  save(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
