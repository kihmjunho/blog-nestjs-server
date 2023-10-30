import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { ChangeInformationRequestDto } from './dto/changeInformation.request.dto';

@Injectable()
export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
  public async returnUserByEmail(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('not found user', 'NOT_FOUND_USER');
    }

    return user;
  }

  public async duplicateEmail(email: string): Promise<void> {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException(
        '중복된 이메일입니다',
        'THIS_EMAIL_IS_ALREADY_DUPLICATED',
      );
    }

    return;
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }

  async getAccessToken(user: User) {
    const accessToken = this.jwtService.sign({
      userId: user.id,
    });

    return { accessToken };
  }

  async changePassword(user: User) {
    return await this.userRepository.manager.transaction(async (manager) => {
      await manager.save(user);
    });
  }
  async changeUserInformation(
    email: string,
    changeInformationRequestDto: ChangeInformationRequestDto,
  ) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(changeInformationRequestDto)
      .where('email = :email', { email })
      .execute();
  }
}
