import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import {Server, Socket} from "socket.io";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";
import {Body} from "@nestjs/common";
import {ChatRoomDto} from "./dto/chatroom.dto";
import {SendMessageDto} from "./dto/send-message.dto";
import {Message} from "./entities/message.entity";
import {CreateMessageDto} from "./dto/create-message.dto";
import {AuthService} from "../auth/auth.service";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}
  @SubscribeMessage('sendMessage')
  async createMessage(
      @MessageBody() message: CreateMessageDto,
  ): Promise<Message> {
    this.server.emit('message', message);
    return this.messagesService.createMessage(message);
  }
}
