import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { WishListService } from './../../../services/wishlist.service';
import { Component } from '@angular/core';
import { passwordMatchValidator } from '../../sign-up/sign-up.component';

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
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    confirmPassword: ['', [Validators.required]]   
  },{ validators: passwordMatchValidator });


  async ChangePassWord()  {
    console.log(this.registerform.value);
    this.submitted = true
    if(this.registerform.invalid) return
    this.userService.ForgetPassword(this.registerform.value).subscribe(async (res) => {
      if (res) {
        console.log(res.messsage);
        await alert(res.messsage)
      }
    })
  }
}
