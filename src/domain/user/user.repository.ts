import { User } from './entities/user.entity';
import { ChangeInformationRequestDto } from './dto/changeInformation.request.dto';

export interface UserRepository {
  findByEmail(email: string): Promise<User>;

  duplicateEmail(email: string): Promise<void>;

  save(user: User): Promise<User>;

  getAccessToken(user: User): Promise<{ accessToken: string }>;

  changeUserInformation(
    email: string,
    changeInformationRequestDto: ChangeInformationRequestDto,
  ): Promise<void>;
}
