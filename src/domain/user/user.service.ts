import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    console.log('hh');
    const { email, password, nickname, phoneNumber } = signupUserRequestDto;
    const foundUser = await this.userRepository.findUserByEmail(email);

    if (foundUser) {
      throw new ConflictException(
        '중복된 이메일입니다',
        'THIS_EMAIL_IS_ALREADY_DUPLICATED',
      );
    }

    // const user = new User({
    //   email,
    //   password,
    //   nickname,
    //   phoneNumber,
    //   role: UserRole.NORMAL,
    // });
    // await user.convertToHashedPassword();
    const user = await User.createNormalUser({
      email,
      password,
      nickname,
      phoneNumber,
    });

    return await this.userRepository.save(user);
  }

  async login(loginUserRequestDto: LoginUserRequestDto) {
    const { email, password } = loginUserRequestDto;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('not found user', 'NOT_FOUND_USER');
    }

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
    const user = await this.userRepository.findUserByEmail(email);

    this.validateExistingUser(user);

    const { password } = changePasswordRequestDto;
    user!.changePassword(password);

    await this.userRepository.save(user!);
  }

  async changeUserInformation(
    email: string,
    changeInformationRequestDto: ChangeInformationRequestDto,
  ) {
    const { phoneNumber, nickname } = changeInformationRequestDto;
    const user = await this.userRepository.findUserByEmail(email);

    this.validateExistingUser(user);

    user!.nickname = nickname;
    user!.phoneNumber = phoneNumber;
    return await this.userRepository.save(user!);
  }

  private validateExistingUser(user: User | null) {
    if (!user) {
      throw new NotFoundException('not found user', 'NOT_FOUND_USER');
    }
  }
}
