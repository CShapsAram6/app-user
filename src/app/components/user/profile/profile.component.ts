import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserInfoDTO } from '../../../model/user.model';
import { singleResponse } from '../../../model/response.model';

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
      userName: [''],
      fullName: [''],
      email: [''],
      phone: [''],
      linkAvatar : ['']
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
