import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import {FavoriteService} from "./favorite.service";
import {User} from "../auth/user.entity";
import {FavProductDto} from "./dto/fav-product.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {FavSellerDto} from "./dto/fav-seller.dto";
import {ProductListDto} from "../product/dto/product-list.dto";
import {Product} from "../product/product.entity";
import {ProductListController} from "../product/product-list.controller";
import {BoolDto} from "./dto/BoolDto";

@Controller('favorite')
@UseGuards(AuthGuard('jwt'))
export class FavoriteController {
    constructor(private favoriteService: FavoriteService) {}

    @Post('/addfavseller')
    async addFavoriteSeller(@Body() seller: FavSellerDto, @GetUser() user: User): Promise<void> {
        return await this.favoriteService.addFavoriteSeller(seller, user);
    }

    @Delete('/delfavseller')
    async deleteFavoriteSeller(@Body() seller: FavSellerDto, @GetUser() user: User): Promise<void> {
        return await this.favoriteService.deleteFavoriteSeller(seller, user);
    }

    @Get('/isfavseller/:id')
    async isFavoriteSeller(@Param('id') param, @GetUser() user: User): Promise<boolean> {
        return this.favoriteService.isFavoriteSeller(param, user);
    }

    @Get('/favsellerproductlist')
    async favSellerProductList(@GetUser() user: User): Promise<ProductListDto> {
        return this.favoriteService.getFavSellerProductList(user);
    }


    @Post('/addfavproduct')
    async addFavoriteProduct(@Body() product: FavProductDto, @GetUser() user: User): Promise<void> {
        return this.favoriteService.addFavoriteProduct(product, user);
    }

    @Delete('/delfavproduct')
    async deleteFavoriteProduct(@Body() product: FavProductDto, @GetUser() user: User): Promise<void> {
        return this.favoriteService.deleteFavoriteProduct(product, user);
    }

    @Get('/isfavproduct/:id')
    async isFavoriteProduct(@Param('id') param, @GetUser() user: User): Promise<boolean> {
        return this.favoriteService.isFavoriteProduct(param, user);
    }

    @Get('/productlist')
    async getFavProductList(@GetUser() user: User): Promise<ProductListDto> {
        return this.favoriteService.getFavProductList(user);
    }
}