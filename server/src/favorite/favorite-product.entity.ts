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
import {Product} from "../product/product.entity";
import {User} from "../auth/user.entity";
import {Exclude} from "class-transformer";

@Entity()
export class FavoriteProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne((type) => User, (user) => user.followingProduct, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User;

    @ManyToOne((type) => Product, (product) => product.favored, { eager: false })
    @Exclude({ toPlainOnly: true })
    product: Product;
}