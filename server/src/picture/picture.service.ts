import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PicturesEntity } from './picture.entity';
import { Repository } from 'typeorm';
import {PictureDto} from "./dto/picture.dto";
import {Product} from "../product/product.entity";


@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(PicturesEntity)
    private picturesRepository: Repository<PicturesEntity>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async savePicture(picture: string, addPictDto: PictureDto): Promise<void> {
    const product = await this.productRepo.findOne({
      where: {
        id: addPictDto.product,
      },
    });
    const pictures = this.picturesRepository.create({
      picture,
      product,
    });
    try {
      await this.picturesRepository.save(pictures);
    } catch (e) {
      throw new InternalServerErrorException('server error');
    }
  }

  async deletePicture(delPictDto: PictureDto): Promise<void> {
    const product = await this.productRepo.findOne({
      where: {
        id: delPictDto.product,
      },
    });
    await this.picturesRepository.delete({
      picture: delPictDto.picture,
      product: product,
    });
  }

  async getPictures(id: string): Promise<PicturesEntity[]> {
    const product = await this.productRepo.findOne({
      where: {
        id: id,
      },
    });

    const pictures = await this.picturesRepository
        .createQueryBuilder('pictures')
        .where({
          product: product,
        }).getMany()

    return pictures;
  }
}
