import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ChatRoom} from "./entities/chat-room.entity";
import {User} from "../auth/user.entity";
import {ChatRoomDto} from "./dto/chatroom.dto";
import {SendMessageDto} from "./dto/send-message.dto";
import {CreateMessageDto} from "./dto/create-message.dto";
import {Message} from "./entities/message.entity";
import {UserDto} from "../auth/dto/user.dto";
import {find} from "rxjs";

@Injectable()
export class MessagesService {
  constructor(
      @InjectRepository(Message) private messageRepo: Repository<Message>,
      @InjectRepository(ChatRoom) private chatRoomRepository: Repository<ChatRoom>,
      @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async createMessage(
    messageDto: CreateMessageDto,
  ): Promise<Message> {
    const room = await this.chatRoomRepository.findOne({
      where: {
        id: messageDto.room,
      },
    });
    const sender = await this.userRepo.findOne({
      where: {
        id: messageDto.sender,
      },
    });
    const message = await this.messageRepo.create({
      room: room,
      sender: sender,
      text: messageDto.message,
    });

    return await this.messageRepo.save(message);
  }

  async openRoom(buyer: User, sellerId: string): Promise<ChatRoomDto> {
    const seller = await this.userRepo.findOne({
      where: {
        id: sellerId,
      },
    });
    const findRoom: ChatRoom = await this.chatRoomRepository
        .createQueryBuilder('rooms')
        .leftJoinAndSelect('rooms.buyer', 'buyer')
        .leftJoinAndSelect('rooms.seller', 'seller')
        .where({
          buyer: buyer,
          seller: seller,
        }).orWhere({
          buyer: seller,
          seller: buyer,
        }).getOne()

    const newRoom = await this.chatRoomRepository.create({
      buyer: buyer,
      seller: seller,
    });

    if (findRoom == null) {
      await this.chatRoomRepository.save(newRoom);
      return newRoom;
    } else {
      return findRoom;
    }
  }

  async getMessages(id: string): Promise<SendMessageDto[]> {
    const room = await this.chatRoomRepository.findOne({
      where: {
        id: id,
      },
    });
    const messages: Message[] = await this.messageRepo
      .createQueryBuilder('message')
        .leftJoinAndSelect('message.sender', 'sender')
        .where({
          room: room
        }).orderBy('message.createdAt', 'ASC').getMany()
    const messagesDto: SendMessageDto[] = messages.map((message) => {
      const sender = message.sender;
      return new SendMessageDto(
        new UserDto(
            sender.id,
            sender.username,
            sender.firstname,
            sender.lastname,
            sender.role
        ),
        message.text,
        message.createdAt,
      );
    });
    return messagesDto;
  }

  async getAllChatRoom(user: User): Promise<ChatRoomDto[]> {
    const rooms: ChatRoom[] = await this.chatRoomRepository
      .createQueryBuilder('rooms')
        .leftJoinAndSelect('rooms.buyer', 'buyer')
        .leftJoinAndSelect('rooms.seller', 'seller')
        .where({
          buyer: user
        }).orWhere({
          seller: user
        }).getMany()

    const roomDto: ChatRoomDto[] = rooms.map((room) => {
      const buyer = room.buyer;
      const seller = room.seller;
      return new ChatRoomDto(
          room.id,
          new UserDto(
              buyer.id,
              buyer.username,
              buyer.firstname,
              buyer.lastname,
              buyer.role
          ),
          new UserDto(
              seller.id,
              seller.username,
              seller.firstname,
              seller.lastname,
              seller.role
          ),
      );
    });

    return roomDto;
  }
}
