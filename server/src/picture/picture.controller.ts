import {
  Body,
  Controller, Get, Param,
  Post, Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { multerOptions } from './config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';
import {PicturesEntity} from "./picture.entity";
import {PictureDto} from "./dto/picture.dto";

@Controller('picture')
export class PictureController {
  constructor(private pictureService: PictureService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async uploadFile(@UploadedFiles() file, @Body() addPictDto: PictureDto) {
    const fileValue = file[0];
    return this.pictureService.savePicture(fileValue.filename, addPictDto);
  }

  @Post('/delete')
  async deleteFavoriteSeller(@Body() delPictDto: PictureDto): Promise<void> {
    return await this.pictureService.deletePicture(delPictDto);
  }

  @Get('/get-pictures/:id')
  async getPictures(@Param('id') id): Promise<PicturesEntity[]> {
    return this.pictureService.getPictures(id);
  }

  @Get('/get-image/:imgpath')
  async getImage(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads' });
  }
}
