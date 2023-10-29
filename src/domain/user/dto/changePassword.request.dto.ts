import { IsNotEmpty } from 'class-validator';

export class ChangePasswordRequestDto {
  @IsNotEmpty()
  password: string;
}
