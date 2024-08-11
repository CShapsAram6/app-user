import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent {
  constructor(
    private form: FormBuilder,
    private userService : UserService
  ) { }
  submitted = false
  registerform = this.form.group({
    email : ['', [Validators.required, Validators.email]],  
  },{  });
  ForgetPassWord() {
    console.log(this.registerform.value.email);
    this.submitted = true
    if(this.registerform.invalid) return
    this.userService.ForgetPassWord(this.registerform.value.email ?? '').subscribe(async (res) => {
      if (res) {
        await alert(res.messsage)
      }
    })
  }
}
