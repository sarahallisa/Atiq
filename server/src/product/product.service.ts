import {Injectable, Res} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Product} from './product.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProductDto} from './dto/create-product.dto';
import {SearchProductDto} from './dto/search-product.dto';
import {User} from '../auth/user.entity';
import {ProductDto} from "./dto/product.dto";
import {ProductListDto} from "./dto/product-list.dto";
import {UserDto} from "../auth/dto/user.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    seller: User,
  ): Promise<SearchProductDto> {
    const { title, description, price, priceStatus } = createProductDto;

    const product = this.productRepository.create({
      title,
      description,
      price,
      priceStatus,
      seller,
    });

    await this.productRepository.save(product);
    return new SearchProductDto(await this.productRepository.getId(product));
  }

  async getProducts(
    searchProductDto: SearchProductDto,
  ): Promise<ProductListDto> {
    const { search } = searchProductDto;

    const query = this.productRepository
      .createQueryBuilder('product')
        .leftJoinAndSelect('product.seller', 'seller');

    if (search) {
      // query.andWhere('product.title LIKE :search ', {search : `%${search}%`});
      query.andWhere('product.title = :search', { search });
    }

    const products: Product[] = await query.getMany();

    const sendProducts: ProductDto[] = products.map((product: Product) => {
          const seller = product.seller;
          return new ProductDto(
              product.id,
              product.title,
              product.description,
              product.price,
              product.priceStatus,
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

  async deleteProduct(id: SearchProductDto, seller: User): Promise<void> {
    await this.productRepository.delete({
      id: id.search,
      seller: seller,
    });
  }

  async productById(id: string): Promise<ProductDto> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.seller', 'seller')
        .where({
          id: id
        })
      .getOne();

    return new ProductDto(
        product.id,
        product.title,
        product.description,
        product.price,
        product.priceStatus,
        new UserDto(
            product.seller.id,
            product.seller.username,
            product.seller.firstname,
            product.seller.lastname,
            product.seller.role
        )
    )
  }
}
