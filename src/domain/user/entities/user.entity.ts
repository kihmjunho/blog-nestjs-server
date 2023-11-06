import { Column, Entity } from 'typeorm';
import { IdAndDate } from '../../../common/entities/idAndDate.entity';

import * as bcrypt from 'bcrypt';

import { UserRole } from '../user.role';

@Entity()
export class User extends IdAndDate {
  @Column({ length: 48 })
  email: string;

  @Column()
  password: string;

  async convertToHashedPassword(): Promise<void> {
    const saltRepeatCount = 10;
    const salt = await bcrypt.genSalt(saltRepeatCount);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async changePassword(password: string) {
    this.password = password;
    await this.convertToHashedPassword();
  }

  @Column()
  nickname: string;

  @Column()
  phoneNumber: string;

  @Column()
  role: UserRole;

  constructor(params: {
    email: string;
    password: string;
    nickname: string;
    phoneNumber: string;
    role: UserRole;
  }) {
    super();
    if (params) {
      this.email = params.email;
      this.password = params.password;
      this.nickname = params.nickname;
      this.phoneNumber = params.phoneNumber;
      this.role = params.role;
    }
  }

  public static async createNormalUser(params: {
    email: string;
    password: string;
    nickname: string;
    phoneNumber: string;
  }) {
    const { email, password, nickname, phoneNumber } = params;
    const user = new User({
      email,
      password,
      nickname,
      phoneNumber,
      role: UserRole.NORMAL,
    });
    await user.convertToHashedPassword();
    return user;
  }
}
