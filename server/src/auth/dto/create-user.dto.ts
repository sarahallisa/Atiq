import { IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    role: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}