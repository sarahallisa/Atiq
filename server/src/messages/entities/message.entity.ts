import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../auth/user.entity";
import {ChatRoom} from "./chat-room.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ChatRoom, (room) => room.messages, {eager: false})
    room: ChatRoom

    @ManyToOne(() => User, (user) => user.messages, {eager: false})
    sender: User;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;
}
