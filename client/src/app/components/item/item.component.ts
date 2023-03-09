import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Picture} from "../../objects/picture";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public isProductLiked?: boolean
  @Input() product: any;
  public imageUrl: SafeUrl | undefined;
  constructor(private http: HttpClient, public authService: AuthService, private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.getThumbnail()
    if(this.authService.isLoggedIn()) {
      this.updateProductBool()
    }
  }

  async onLike() {
    if(this.isProductLiked) {
      await lastValueFrom(this.http.delete('http://localhost:3000/favorite/delfavproduct', {
        body: {
          id: this.product.id
        }
      }));
    } else {
      await lastValueFrom(this.http.post('http://localhost:3000/favorite/addfavproduct',
        {
          id: this.product.id
        }));
    }
    await this.updateProductBool()
  }

  async updateProductBool() {
    try {
      const bool: any = await lastValueFrom(this.http.get('http://localhost:3000/favorite/isfavproduct/' + this.product.id));
      this.isProductLiked = bool
    } catch(e) {
      console.log(e)
    }
    console.log(this.isProductLiked)
  }

  async getThumbnail(){
    const data: any = await lastValueFrom(this.http.get("http://localhost:3000/picture/get-pictures/"+ this.product.id));
    const imagePath: Picture[] = data;

    this.http.get("http://localhost:3000/picture/get-image/" + imagePath[0].picture, {
      responseType: 'blob'
    }).subscribe(data =>{
      console.log(data);
      const unsafeImageUrl = URL.createObjectURL(data);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    });
  }
}
