import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(username: string, password: string){
    const accessToken = await lastValueFrom(this.http.post<any>('http://localhost:3000/auth/login', {
      username,
      password
    }));
    console.log(accessToken);
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('role', accessToken.user)
    sessionStorage.setItem('accessToken', accessToken.jwt);
    sessionStorage.setItem('id', accessToken.id)
  }

  async signup(username: string, firstname: string, lastname: string, password: string){
    await lastValueFrom(this.http.post('http://localhost:3000/auth/signup',{
      username,
      firstname,
      lastname,
      password
    }));
  }

  public getToken() {
    return sessionStorage.getItem('accessToken');
  }

  public getId() {
    return sessionStorage.getItem('id');
  }

  public isSeller(): boolean {
    return sessionStorage.getItem('role') == 'seller'
  }

  public isLoggedIn() {
    return this.getToken() != null
  }

  public logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('currentRoom');
  }
}
