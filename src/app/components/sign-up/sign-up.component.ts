import { Component, isSignal, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ISignUp } from '../../model/user.model';
import { error } from 'console';
import { Router } from '@angular/router';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {


  if (control.get('password')?.value != control.get('confirmPassword')?.value) {
    return { passwordMismatch: true };
  }
  return null;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})

export class SignUpComponent implements OnInit {


  constructor(private form: FormBuilder,private user:AuthService, private Router:Router ){}
  ngOnInit(): void {
    this.registerform;
  }
  
  registerform = this.form.group({
    userName: ['',[Validators.required]],
    name:['',[Validators.required , Validators.maxLength(35)]],
    email:['',[Validators.required,Validators.email]],
    password: ['',[Validators.required, Validators.maxLength(30)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    confirmPassword: ['',[Validators.required]]   
  },{ validators: passwordMatchValidator });
  
  registersubmit(){
    if(this.registerform.invalid){
      console.log(this.registerform);
      console.log(this.registerform.errors?.['passwordMismatch'] + "????");
      this.registerform.markAllAsTouched();
      return;
    }else{
  //check tk email sdt
  const{userName , phone,email} = this.registerform.value;
    if(userName != null && phone != null && email != null){
      this.user.CheckUserSignUp(userName, phone,email).subscribe(
        (res) => {
          console.log("API response:", res);

          if (res.userNameEx) {
            this.registerform.get('userName')?.setErrors({ UserNameEx: true });
            return;
          }else
          if (res.emailEx) {
            this.registerform.get('email')?.setErrors({ EmailEx: true });
            return;
          }else
          if (res.phoneEx) {
            this.registerform.get('phone')?.setErrors({ PhoneEx: true });
            return;
          }else{
            console.log("qua if")
            let request:ISignUp = this.registerform.value as ISignUp;
            this.user.signUp(request).subscribe(
              (da) =>{
                this.Router.navigate(['/sign-in']);
                console.log(da)
              },
              (error) => {console.log(error)}
            )
            }
          },
          (error) => (console.log(error))
        )}
    }


  }
}
