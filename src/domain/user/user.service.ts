import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../common/constants/token.constant';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UserRole } from './user.role';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { ChangePasswordRequestDto } from './dto/changePassword.request.dto';
import { ChangeInformationRequestDto } from './dto/changeInformation.request.dto';

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

  async login(loginUserRequestDto: LoginUserRequestDto) {
    const { email, password } = loginUserRequestDto;
    const user = await this.userRepository.findByEmail(email);

    const passwordsMatch = await user.comparePassword(password);
    if (!passwordsMatch) {
      throw new UnauthorizedException(
        'password dose not match',
        'PASSWORD_DOSE_NOT_MATCH',
      );
    }

    return await this.userRepository.getAccessToken(user);
  }

  async changePassword(
    email: string,
    changePasswordRequestDto: ChangePasswordRequestDto,
  ) {
    const user = await this.userRepository.findByEmail(email);

    const { password } = changePasswordRequestDto;
    user.password = password;

    return this.userRepository.save(user);
  }

  async changeUserInformation(
    email: string,
    changeInformationRequestDto: ChangeInformationRequestDto,
  ) {
    await this.userRepository.findByEmail(email);

    return this.userRepository.changeUserInformation(
      email,
      changeInformationRequestDto,
    );
  }
}
