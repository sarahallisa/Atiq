import { IsNotEmpty, IsString } from 'class-validator';


export class FavSellerDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}