import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../common/constants/token.constant';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UserRole } from './user.role';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async signup(signupUserRequestDto: SignupUserRequestDto) {
    const { email, password, nickname } = signupUserRequestDto;
    await this.userRepository.duplicateEmail(email);

    const user = new User({
      email,
      password,
      nickname,
      role: UserRole.NORMAL,
    });

    return await this.userRepository.save(user);
  }
}
