import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  public async signupUser(@Body() signupUserRequestDto: SignupUserRequestDto) {
    return await this.userService.signup(signupUserRequestDto);
  }
}
