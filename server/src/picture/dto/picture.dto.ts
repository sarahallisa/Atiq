import { IsNotEmpty, IsString } from 'class-validator';

export class PictureDto {
  @IsString()
  picture: string;

  @IsString()
  @IsNotEmpty()
  product: string;
}
