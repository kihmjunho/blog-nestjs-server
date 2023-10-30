import { User } from './entities/user.entity';

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;

  save(user: User): Promise<User>;

  getAccessToken(user: User): Promise<{ accessToken: string }>;
}
