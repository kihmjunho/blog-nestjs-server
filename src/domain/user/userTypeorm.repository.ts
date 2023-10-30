import { Injectable } from '@nestjs/common';
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

  public async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  public async duplicateEmail(email: string): Promise<boolean> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      return true;
    }
    return false;
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
}
