import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesEntity } from './picture.entity';
import {Product} from "../product/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PicturesEntity, Product])],
  providers: [PictureService],
  controllers: [PictureController],
})
export class PictureModule {}
