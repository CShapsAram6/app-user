import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent {
  constructor(
    private form: FormBuilder,
    private userService : UserService,
    private toastrServices: ToastrService,
    private Router: Router,
  ) { }
  submitted = false
  registerform = this.form.group({
    email : ['', [Validators.required, Validators.email]],  
  },{  });
  isLoading = false;
  ForgetPassWord() {
    this.isLoading = true;
    console.log(this.registerform.value.email);
    this.submitted = true
    if(this.registerform.invalid) return
    this.userService.ForgetPassWord(this.registerform.value.email ?? '').subscribe(async (res) => {
      if (res.code == 1) {
        this.isLoading = false
        await this.toastrServices.success(res.messsage)
        this.Router.navigate(['/sign-in'])
      } else {
        this.isLoading = false
        await this.toastrServices.error(res.messsage)
      }
    })
  }
}
