import {UserDto} from "../../auth/dto/user.dto";
import {User} from "../../auth/user.entity";

export class ProductDto {
    public id: string;

    public title: string;

    public description: string;

    public price: number;

    public priceStatus: string;

    public seller: UserDto;

    constructor(id: string, title: string, description: string, price: number, priceStatus: string, seller: UserDto) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.priceStatus = priceStatus
        this.seller = seller
    }
}