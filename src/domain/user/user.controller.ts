import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { UserService } from './user.service';

import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { ChangePasswordRequestDto } from './dto/changePassword.request.dto';
import { ChangeInformationRequestDto } from './dto/changeInformation.request.dto';
import { GetUserResponseDto } from './dto/getUser.response.dto';

import { User } from './entities/user.entity';

import { JwtAuthGuard } from '../../common/config/jwt/jwtAuth.guard';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getUser(@Request() req: ExpressRequest & { user: User }) {
    const { user } = req;
    return new GetUserResponseDto(user);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async changePassword(
    @Request() req: ExpressRequest & { user: User },
    @Body() changePasswordRequestDto: ChangePasswordRequestDto,
  ) {
    const { email } = req.user;
    return await this.userService.changePassword(
      email,
      changePasswordRequestDto,
    );
  }

  @Patch('information')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async changeUserInformation(
    @Request() req: ExpressRequest & { user: User },
    @Body() changeInformationRequestDto: ChangeInformationRequestDto,
  ) {
    const { email } = req.user;
    return await this.userService.changeUserInformation(
      email,
      changeInformationRequestDto,
    );
  }
}
