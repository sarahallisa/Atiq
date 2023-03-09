import {Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import { IsString } from 'class-validator';
import {Product} from "../product/product.entity";

@Entity()
export class PicturesEntity {
  @IsString()
  @PrimaryColumn()
  picture: string;

  @ManyToOne(() => Product, (product) => product.pictures, { eager: false })
  product: Product;
}
