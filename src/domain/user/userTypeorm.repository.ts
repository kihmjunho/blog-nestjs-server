import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findUserByEmail(email: string) {
    console.log(this.userRepository);
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }
}
