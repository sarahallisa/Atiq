import {Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {MessagesService} from "./messages.service";
import {ChatRoomDto} from "./dto/chatroom.dto";
import {SendMessageDto} from "./dto/send-message.dto";
import {MessageBody, SubscribeMessage} from "@nestjs/websockets";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Get('/getAllChatroom')
    async getAllChatRoom(@GetUser() user: User): Promise<ChatRoomDto[]> {
        return this.messagesService.getAllChatRoom(user);
    }

    @Get('/getAllMessage/:id')
    async getAllMessage(@Param('id') id: string): Promise<SendMessageDto[]> {
        return this.messagesService.getMessages(id);
    }

    @Get('/open/:id')
    async openRoom(@Param('id') sellerId: string, @GetUser() buyer: User): Promise<ChatRoomDto> {
        return this.messagesService.openRoom(buyer, sellerId);
    }
}