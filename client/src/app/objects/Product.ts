import {User} from "./User";

export interface Product {
  id: string;

  title: string;

  description: string;

  price: number;

  priceStatus: boolean;

  seller: User;
}
