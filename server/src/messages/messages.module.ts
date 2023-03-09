import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChatRoom} from "./entities/chat-room.entity";
import {User} from "../auth/user.entity";
import {Message} from "./entities/message.entity";
import {MessagesController} from "./messages.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Message, ChatRoom, User])],
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
