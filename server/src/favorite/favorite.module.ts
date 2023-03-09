import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FavoriteController} from "./favorite.controller";
import {FavoriteService} from "./favorite.service";
import {FavoriteProduct} from "./favorite-product.entity";
import {FavoriteSeller} from "./favorite-seller.entity";
import {AuthModule} from "../auth/auth.module";
import {User} from "../auth/user.entity";
import {Product} from "../product/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteSeller, FavoriteProduct, User, Product]), AuthModule],
    controllers: [FavoriteController],
    providers: [FavoriteService],
})
export class FavoriteModule {}
