import { User } from './entities/user.entity';

export interface UserRepository {
  // findByEmail(email: string): Promise<User | null>;

  duplicateEmail(email: string): Promise<void>;

  save(user: User): Promise<User>;
}
