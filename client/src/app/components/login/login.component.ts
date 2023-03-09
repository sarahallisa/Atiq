import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string='' ;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null,[Validators.required, Validators.minLength(4)]),
      password: new FormControl(null,[Validators.required, Validators.minLength(4)])
    })
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return
    }
    this.authService.login(this.loginForm.value.username,this.loginForm.value.password)
      .then(jwt => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.loginError = 'please check your credentials again.';
        console.error(error);
      });
  }
}
