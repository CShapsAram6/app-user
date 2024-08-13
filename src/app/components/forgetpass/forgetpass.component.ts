import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent {
  constructor(
    private form: FormBuilder,
    private userService : UserService,
    private toastrServices: ToastrService
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
      if (res.code == 1) {
        await this.toastrServices.success(res.messsage)
      } else {
        await this.toastrServices.error(res.messsage)
      }
    })
  }
}
