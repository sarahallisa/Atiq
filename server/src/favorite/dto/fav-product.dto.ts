import { IsNotEmpty, IsString } from 'class-validator';


export class FavProductDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}