import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { JwtAuthGuard } from '../../config/jwt/jwtAuth.guard';
import { OwnerAuthGuard } from '../../config/jwt/ownerAuth.guard';
import { ChangePasswordRequestDto } from './dto/changePassword.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  public async signupUser(@Body() signupUserRequestDto: SignupUserRequestDto) {
    return await this.userService.signup(signupUserRequestDto);
  }

  @Post('login')
  @HttpCode(200)
  public async loginUser(@Body() loginUserRequestSto: LoginUserRequestDto) {
    return await this.userService.login(loginUserRequestSto);
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async changePassword(
    @Request() req: any,
    @Body() changePasswordRequestDto: ChangePasswordRequestDto,
  ) {
    const { email } = req.user;
    return await this.userService.changePassword(
      email,
      changePasswordRequestDto,
    );
  }
}
