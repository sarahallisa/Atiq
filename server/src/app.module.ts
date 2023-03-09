import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { User } from './auth/user.entity';
import {FavoriteProduct} from "./favorite/favorite-product.entity";
import {FavoriteSeller} from "./favorite/favorite-seller.entity";
import {FavoriteModule} from "./favorite/favorite.module";
import {PicturesEntity} from "./picture/picture.entity";
import {PictureModule} from "./picture/picture.module";
import {ChatRoom} from "./messages/entities/chat-room.entity";
import { MessagesModule } from './messages/messages.module';
import {Message} from "./messages/entities/message.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/atiq.sqlite',
      entities: [
        User,
        Product,
        FavoriteProduct,
        FavoriteSeller,
        Message,
        ChatRoom,
        PicturesEntity,
      ],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    ProductModule,
    FavoriteModule,
    PictureModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
