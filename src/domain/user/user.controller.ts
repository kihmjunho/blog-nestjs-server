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

import { ChangePasswordRequestDto } from './dto/changePassword.request.dto';
import { ChangeInformationRequestDto } from './dto/changeInformation.request.dto';
import { GetUserResponseDto } from './dto/getUser.response.dto';

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

  @Get('get-user')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getUser(@Request() req: any) {
    const { user } = req;
    return new GetUserResponseDto(user);
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

  @Put('change-user-information')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async changeUserInformation(
    @Request() req: any,
    @Body() changeInformationRequestDto: ChangeInformationRequestDto,
  ) {
    const { email } = req.user;
    return await this.userService.changeUserInformation(
      email,
      changeInformationRequestDto,
    );
  }
}
