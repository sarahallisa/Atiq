import {Column} from "typeorm";
import {IsNotEmpty, IsString} from "class-validator";
import {User} from "../../auth/user.entity";
import {UserDto} from "../../auth/dto/user.dto";

export class SendMessageDto {
    sender: UserDto

    message: string

    createdAt: Date

    constructor(sender: UserDto, message: string, createdAt: Date) {
        this.sender = sender;
        this.message = message;
        this.createdAt = createdAt
    }
}