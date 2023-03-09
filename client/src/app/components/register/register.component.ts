import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";



class CustomValidators{
  static passwordMatch(password: string,confirmedPassword: string ){
    return (registerForm : AbstractControl):ValidationErrors | null =>{
      const passwordControl = registerForm.get('password')?.value;
      const confirmedPasswordControl = registerForm.get('confirmedPassword')?.value;
      let error = null;

      if ((!passwordControl || !confirmedPasswordControl) || (passwordControl === confirmedPasswordControl) ){
        return null;
      }

      if (passwordControl !== confirmedPasswordControl){
        registerForm.get('confirmedPassword')?.setErrors({ passwordsNotMatching: true })

        return {passwordsNotMatching: true};
      }
      else {
        confirmedPasswordControl?.setErrors(null);
        return null;
      }
    }
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      confirmedPassword: new FormControl(null, [Validators.required, Validators.minLength(4)])
    }, {
      validators: CustomValidators.passwordMatch('password','confirmedPassword')
    })
  }


  onSubmit(){
    if (this.registerForm.invalid){
      return;
    }
    this.authService.signup(this.registerForm.value.username, this.registerForm.value.firstname, this.registerForm.value.lastname, this.registerForm.value.password).then(data => {
      this.router.navigate(['/login'])
        .catch(error => {
        console.log('something went wrong. Please try again');
      })
      ;
    });
  }




}
