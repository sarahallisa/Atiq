import {Body, Controller, Get, Param, Query} from '@nestjs/common';
import {SearchProductDto} from "./dto/search-product.dto";
import {Product} from "./product.entity";
import {ProductService} from "./product.service";
import {ProductListDto} from "./dto/product-list.dto";
import {ProductDto} from "./dto/product.dto";

@Controller('product')
export class ProductListController {
    constructor(private productService: ProductService) {}

    @Get('/all')
    async getProducts(
        @Query() searchProductDto: SearchProductDto,
    ): Promise<ProductListDto> {
        return this.productService.getProducts(searchProductDto);
    }

    @Get(':id')
    async productById(@Param('id') params): Promise<ProductDto> {
        return this.productService.productById(params);
    }
}
