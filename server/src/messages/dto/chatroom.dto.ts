import {UserDto} from "../../auth/dto/user.dto";

export class ChatRoomDto {
    id: string;

    buyer: UserDto;

    seller: UserDto;

    constructor(id: string, user1: UserDto, user2: UserDto) {
        this.id = id;
        this.buyer = user1;
        this.seller = user2;
    }
}