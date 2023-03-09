import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {FormComponent} from "./components/form/form.component";
import {ChatComponent} from "./components/chat/chat.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProductComponent} from "./components/product/product.component";

const routes: Routes = [
  {
    path: 'form', component: FormComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'chat', component: ChatComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'product/:productId', component: ProductComponent
  },
  {
    path:'**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
