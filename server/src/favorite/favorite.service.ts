import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import {FavoriteSeller} from "./favorite-seller.entity";
import {FavoriteProduct} from "./favorite-product.entity";
import {FavProductDto} from "./dto/fav-product.dto";
import {FavSellerDto} from "./dto/fav-seller.dto";
import {Product} from "../product/product.entity";
import {ProductDto} from "../product/dto/product.dto";
import {UserDto} from "../auth/dto/user.dto";
import {ProductListDto} from "../product/dto/product-list.dto";
import {ProductListController} from "../product/product-list.controller";
import {BoolDto} from "./dto/BoolDto";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteSeller)
        private favoriteSeller: Repository<FavoriteSeller>,
        @InjectRepository(FavoriteProduct)
        private favoriteProduct: Repository<FavoriteProduct>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Product)
        private productRepo: Repository<Product>
    ) {
    }

    async addFavoriteSeller(seller: FavSellerDto, user: User): Promise<void> {
        const favSeller = await this.userRepo.findOne({
            where: {
                id: seller.id
            }
        })
        const favoriteUser = this.favoriteSeller.create({
            user: user,
            seller: favSeller
        });
        try {
            await this.favoriteSeller.save(favoriteUser);
        } catch (e) {
            throw new InternalServerErrorException(
                'server error',
            );
        }

    }
    async deleteFavoriteSeller(seller: FavSellerDto, user: User): Promise<void> {
        const getSeller = await this.userRepo.findOne({
            where: {
                id: seller.id
            }
        })
        await this.favoriteSeller.delete({
            user: user,
            seller: getSeller
        })
    }

    async isFavoriteSeller(id: string, user: User): Promise<boolean> {
        const favSeller = await this.userRepo.findOne({
            where: {
                id: id
            }
        })
        const isFavorite = await this.favoriteSeller.createQueryBuilder('favProduct')
            .leftJoinAndSelect('favProduct.seller', 'seller')
            .leftJoinAndSelect('favProduct.user', 'user')
            .where({
                user: user,
                seller: favSeller
            }).getOne()

        return isFavorite != null
    }

    async getFavSellerProductList(user: User): Promise<ProductListDto> {
        const query = this.favoriteSeller
            .createQueryBuilder('favSeller')
            .leftJoinAndSelect('favSeller.user', 'user')
            .leftJoinAndSelect('favSeller.seller', 'seller')
            .leftJoinAndSelect('seller.product', 'product')
            .leftJoinAndSelect('product.seller', 'productseller')
            .where({
                user: user
            });

        const sellers: FavoriteSeller[] = await query.getMany();

        const products: Product[] = sellers.flatMap((fav: FavoriteSeller) => fav.seller.product)

        const sendProducts: ProductDto[] = products.map((fav: Product) => {
                const seller = fav.seller;
                return new ProductDto(
                    fav.id,
                    fav.title,
                    fav.description,
                    fav.price,
                    fav.priceStatus,
                    new UserDto(
                        seller.id,
                        seller.username,
                        seller.firstname,
                        seller.lastname,
                        seller.role
                    )
                );
            }
        )

        return new ProductListDto(sendProducts);
    }

    async addFavoriteProduct(product: FavProductDto, user: User): Promise<void> {
        const favProduct = await this.productRepo.findOne({
            where: {
                id: product.id
            }
        })
        const favoriteProduct = this.favoriteProduct.create({
            user: user,
            product: favProduct
        });
        try {
            await this.favoriteProduct.save(favoriteProduct);
        } catch (e) {
            throw new InternalServerErrorException(
                'server error',
            );
        }
    }

    async deleteFavoriteProduct(product: FavProductDto, user: User): Promise<void> {
        const favProduct = await this.productRepo.findOne({
            where: {
                id: product.id
            }
        })
        await this.favoriteProduct.delete({
            user: user,
            product: favProduct
        });
    }

    async isFavoriteProduct(id: string, user: User): Promise<boolean> {
        const favProduct = await this.productRepo.findOne({
            where: {
                id: id
            }
        })
        const isFavorite = await this.favoriteProduct.createQueryBuilder('favProduct')
            .leftJoinAndSelect('favProduct.product', 'product')
            .leftJoinAndSelect('favProduct.user', 'user')
            .where({
                user: user,
                product: favProduct
            }).getOne()

        return isFavorite != null
    }

    async getFavProductList(user: User) {
        const query = this.favoriteProduct
            .createQueryBuilder('favProduct')
            .leftJoinAndSelect('favProduct.user', 'user')
            .leftJoinAndSelect('favProduct.product', 'product')
            .leftJoinAndSelect('product.seller', 'seller')
            .where({
                user: user
            });

        const products: FavoriteProduct[] = await query.getMany();

        const sendProducts: ProductDto[] = products.map((fav: FavoriteProduct) => {
                const favProduct = fav.product
                const seller = favProduct.seller;
                return new ProductDto(
                    favProduct.id,
                    favProduct.title,
                    favProduct.description,
                    favProduct.price,
                    favProduct.priceStatus,
                    new UserDto(
                        seller.id,
                        seller.username,
                        seller.firstname,
                        seller.lastname,
                        seller.role
                    )
                );
            }
        )

        return new ProductListDto(sendProducts);
    }
}