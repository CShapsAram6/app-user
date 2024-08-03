import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserInfoDTO } from '../../../model/user.model';
import { singleResponse } from '../../../model/response.model';
import { CustomValidators } from './custom-validate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Id: number = 3;
  profileForm: FormGroup;

  constructor(private service: UserService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      Id: this.Id,
      userName: ['',[Validators.required]],
      fullName: ['',[Validators.required, CustomValidators.fullNameValidator()]],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',[Validators.required,Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      address:['',[Validators.required]],
      linkAvatar : ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.LoadUserInfo(this.Id);
    console.log(this.profileForm);

  }

  LoadUserInfo(Id: number): void {
    this.service.getInfoUser(Id).subscribe((res: singleResponse<UserInfoDTO>) => {
      if (res && res.data) {
        const user = res.data;
        this.profileForm.patchValue(user);
        if (user.linkAvatar) {
          this.profileForm.get('linkAvatar')?.setValue(user.linkAvatar);
        }
      } else {
        console.warn('No user data received');
      }
    }, error => {
      console.error('Error loading user info', error);
    });
  }
  onSave(): void {
    
    if (this.profileForm.valid) {
      this.service.UpdateUserInfo(this.profileForm.value).subscribe(
        (res) => {
          console.log('User info updated successfully', res);
        },
        (error) => {
          console.error('Error updating user info', error);
        }
      );
    } else {
      this.profileForm.markAllAsTouched();
      console.warn('Profile form is invalid');
    }
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.get('linkAvatar')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
