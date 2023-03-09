import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public title: string = "";
  public description: string = "";
  public price: number = 0;
 public status = 'fixed';
  public selectedPicture: File[] = [];
  width = 200;
  height = 100;
  home: any

  newProductForm!: FormGroup;

  constructor(public http: HttpClient, private router: Router, public productService: ProductService) {
    //this.selectedPicture = ""
  }

  ngOnInit(): void {
    // this.newProductForm = new FormGroup( {
    //   title: new FormControl(null,[Validators.required,Validators.minLength(1)]),
    //   description: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    //   price: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    //   status: new FormControl(null,[Validators.required])
    // })
  }

  async onSubmit() {
    try {
      const data: any = await lastValueFrom(this.http.post("http://localhost:3000/product/add", {
        // title: this.newProductForm.value.title,
        // description: this.newProductForm.value.description,
        // price: this.newProductForm.value.price,
        // priceStatus: this.newProductForm.value.status
        title: this.title,
        description: this.description,
        price: this.price,
        priceStatus: this.status
      }));

      const id: string = data.search
      for(let file of this.selectedPicture) {
        let formData = new FormData()
        formData.append('file', file)
        formData.append('product', id)
        await lastValueFrom(this.http.post("http://localhost:3000/picture/upload", formData));
      }
    } catch(e) {
      console.log(e)
    }

    await this.router.navigateByUrl('/home')
  }

  selectPicture(event: any) {

    const file = event.target.files[0];
    this.selectedPicture.push(file)
    /*const reader = new FileReader();

    reader.onload = (e) => {
      //this.selectedPicture = reader.result;
    };

    reader.readAsDataURL(file);*/

  }

}
