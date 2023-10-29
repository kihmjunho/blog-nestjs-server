import { User } from '../entities/user.entity';

export class GetUserResponseDto {
  userId: string;

  constructor(user: User) {
    this.userId = user.id;
  }
}
