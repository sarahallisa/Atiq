import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from "../auth/user.entity";
import {Exclude} from "class-transformer";
import {Product} from "../product/product.entity";

@Entity()
export class FavoriteSeller {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne((type) => User, (user) => user.followingUser, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User;

    @ManyToOne((type) => User, (user) => user.followedUser, { eager: false })
    @Exclude({ toPlainOnly: true })
    seller: User;
}