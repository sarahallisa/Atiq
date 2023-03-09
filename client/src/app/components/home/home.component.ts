import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../objects/Product";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() searchInput: string;
  @Input() searchResults: string[];
  @Input() searchClicked: boolean;
  @Input() heartClicked: boolean;
  productList: Product[] = [];
  filter: string = 'All'

  constructor(public http: HttpClient, public productService: ProductService, public authService: AuthService) {
    this.searchInput = "";
    this.searchResults = [];
    this.searchClicked = false;
    this.heartClicked = false;
    this.updateProducts()
    console.log(productService.productList.length);
    console.log(this.productService.havenoidea);
  }

  ngOnInit(): void {
  }

  async updateProducts() {
    if(this.filter == "All") {
      this.productList = await this.productService.getProducts()
    }
    if(this.filter == "Favorite Products") {
      this.productList = await this.productService.getFavProducts()
    }
    if(this.filter == "Favorite Sellers") {
      this.productList = await this.productService.getFavSellerProducts()
    }
  }

  onSearch() {
    this.searchClicked = true;
  }

  async onStopSearch() {
    this.searchClicked = false;
  }

  onLike() {
    this.heartClicked = !this.heartClicked;
  }

  setFilter(filter: string) {
    this.filter = filter
    this.updateProducts()
  }
}
