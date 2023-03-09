import {IsNotEmpty, IsString} from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    room: string

    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    @IsNotEmpty()
    sender: string

    constructor(room: string, message: string, sender: string) {
        this.room = room;
        this.message = message;
        this.sender = sender;
    }
}
