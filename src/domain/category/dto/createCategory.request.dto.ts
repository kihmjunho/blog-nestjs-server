import { IsNotEmpty } from 'class-validator';

export class CreateCategoryRequestDto {
  @IsNotEmpty()
  name: string;
}
