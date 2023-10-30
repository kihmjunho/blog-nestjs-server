import { User } from './entities/user.entity';
import { ChangeInformationRequestDto } from './dto/changeInformation.request.dto';

export interface UserRepository {
  returnUserByEmail(email: string): Promise<User>;

  duplicateEmail(email: string): Promise<void>;

  save(user: User): Promise<User>;

  getAccessToken(user: User): Promise<{ accessToken: string }>;

  changePassword(user: User): Promise<void>;

  changeUserInformation(
    email: string,
    changeInformationRequestDto: ChangeInformationRequestDto,
  ): Promise<void>;
}
