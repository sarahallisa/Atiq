import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from '../product/product.entity';
import {IsOptional} from "class-validator";
import {FavoriteProduct} from "../favorite/favorite-product.entity";
import {FavoriteSeller} from "../favorite/favorite-seller.entity";
import {ChatRoom} from "../messages/entities/chat-room.entity";
import {Message} from "../messages/entities/message.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany((type) => Product, (product) => product.seller, { eager: true })
  product: Product[];

  @OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.user, {eager: true})
  followingProduct: User[];

  @OneToMany(() => FavoriteSeller, (favSeller) => favSeller.user, {eager: true})
  followingUser: User[];

  @OneToMany(() => FavoriteSeller, (favSeller) => favSeller.seller, {eager: true})
  followedUser: User[];

  @OneToMany(() => Message, (message) => message.sender, { eager: true } )
  messages: Message[];

  @OneToMany(() => ChatRoom, (connection) => connection.buyer, { eager: true })
  asBuyer: ChatRoom[];

  @OneToMany(() => ChatRoom, (connection) => connection.seller, { eager: true })
  asSeller: ChatRoom[];
}
