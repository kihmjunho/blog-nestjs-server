import { IsNotEmpty } from 'class-validator';

export class CreateContentRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  hashtagNames: string[];
}
