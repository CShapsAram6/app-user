import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Component } from '@angular/core';
import { passwordMatchValidator } from '../../sign-up/sign-up.component';
import { log } from 'console';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  constructor(
    private userService: UserService,
    private form: FormBuilder
  ) { }

  submitted = false;

  registerform = this.form.group({
    token : [''],
    currentPassword: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.maxLength(15)]],
    confirmPassword: ['', [Validators.required]]   
  },{ validators: passwordMatchValidator });


  async ChangePassWord() {
    try {
      console.log(this.registerform.value);
      this.submitted = true;
  if (this.registerform.invalid) {
    console.log("invalid");
    console.log(this.registerform.errors?.['passwordMismatch'] + "????");
    this.registerform.markAllAsTouched();
    Object.keys(this.registerform.controls).forEach(key => {
      const control = this.registerform.get(key);
      if (control?.invalid) {
        console.log(`Lỗi tại trường ${key}:`);
        Object.keys(control.errors || {}).forEach(errorKey => {
          console.log(`${errorKey}: ${control.errors?.[errorKey]}`);
        });
      }
    });
    return;
  }
      this.userService.ChangePassWord(this.registerform.value).subscribe(
        async (res) => {
          if (res) {
            console.log(res.messsage);
            await alert(res.messsage);
          }
        },
        async (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
