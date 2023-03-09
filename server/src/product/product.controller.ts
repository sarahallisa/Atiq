import {
  Body,
  Controller,
  Delete,
  Get, Header,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { SearchProductDto } from './dto/search-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/add')
  @Roles('seller')
  @UseGuards(RolesGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() seller: User,
  ): Promise<SearchProductDto> {
    return this.productService.createProduct(createProductDto, seller);
  }

  @Roles('seller')
  @UseGuards(RolesGuard)
  @Delete('/delete')
  async deleteProduct(@Body() id: SearchProductDto, @GetUser() seller: User): Promise<void> {
    return this.productService.deleteProduct(id, seller);
  }
}
