import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  public async duplicateEmail(email: string): Promise<void> {
    const existingUser = await this.findByEmail(email);

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

  // async changePassword(user: User) {
  //   async;
  // }
}
