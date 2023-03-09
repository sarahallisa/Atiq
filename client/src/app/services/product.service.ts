import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Product} from "../objects/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Product[] = [];
  havenoidea: any;

  constructor(private http: HttpClient) {
  }

  async getProducts(){
      const product: any = await lastValueFrom(this.http.get('http://localhost:3000/product/all'));
      this.productList = product.productList;
      return this.productList
  }

  async getFavProducts(){
    const product: any = await lastValueFrom(this.http.get('http://localhost:3000/favorite/productlist'));
    this.productList = product.productList
    return this.productList
  }

  async getFavSellerProducts(){
    const product: any = await lastValueFrom(this.http.get('http://localhost:3000/favorite/favsellerproductlist'));
    this.productList = product.productList
    return this.productList
  }
}
