import {ProductDto} from "./product.dto";

export class ProductListDto {
    public productList: ProductDto[];
    constructor(productList: ProductDto[]) {
        this.productList = productList;
    }
}