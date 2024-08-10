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

  registerform = this.form.group({
    token : [''],
    currentPassword: [''],
    newPassword: [''],
    confirmPassword: ['']   
  },{ validators: passwordMatchValidator });


  async ChangePassWord()  {
    console.log(this.registerform.value);
    this.userService.ForgetPassword(this.registerform.value).subscribe(async (res) => {
      if (res) {
        console.log(res.messsage);
        await alert(res.messsage)
      }
    })
  }
}
