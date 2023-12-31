import { IsNotEmpty } from 'class-validator';

export class ChangeInformationRequestDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  phoneNumber: string;
}
