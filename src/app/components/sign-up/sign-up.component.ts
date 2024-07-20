import { Component, isSignal, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ISignUp } from '../../model/user.model';
import { error } from 'console';

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


  constructor(private form: FormBuilder,private user:AuthService ){}
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
    }
    console.log("qua if")
    let request:ISignUp = this.registerform.value as ISignUp;
    this.user.signUp(request).subscribe(
      (da) =>{
        console.log(da)
      },
      (error) => {console.log(error)}
    )
  }
}
