import {
  // ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/user/entities/user.entity';
import { Repository } from 'typeorm';
// import { UserRole } from '../../user/userRole';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        '입력한 토큰에 해당하는 사용자는 존재하지 않습니다.',
        'NOT_EXISTING_USER_IN_TOKEN',
      );
    }

    return user;
  }
}
