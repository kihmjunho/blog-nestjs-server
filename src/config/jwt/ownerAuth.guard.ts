import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../../domain/user/user.role';
import { jwtVerifier } from './jwtVerifier';

@Injectable()
export class OwnerAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    jwtVerifier(err, info);

    if (user.role !== UserRole.OWNER) {
      throw new ForbiddenException(
        '접근 권한이 없습니다.',
        'ONLY_USER_CAN_ACCESS',
      );
    }

    return user;
  }
}
