import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserInfoDTO } from '../../../model/user.model';
import { singleResponse } from '../../../model/response.model';
import { CustomValidators } from './custom-validate';
import { FlowbiteService } from '../../../services/flowbite.service';
import { initCarousels } from 'flowbite';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Id: number = 3;
  profileForm: FormGroup;

  constructor(private service: UserService, private fb: FormBuilder, private fbService: FlowbiteService) {
    this.profileForm = this.fb.group({
      Id: this.Id,
      userName: ['', [Validators.required]],
      fullName: ['', [Validators.required, CustomValidators.fullNameValidator()]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      address: ['', [Validators.required]],
      linkAvatar: ['', [Validators.required]]
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
          const toast = document.createElement('div');
          toast.className = 'fixed top-4 right-4 p-4 ';
          toast.innerHTML = ` <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
           <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
           <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
           </svg>
            <span class="sr-only">Check icon</span>
           </div>
           <div class="ms-3 text-sm font-normal">Cập nhật thành công</div>
            </div>   `;
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.remove();
          }, 2000);

        },
        (error) => {
          const toast = document.createElement('div');
          toast.className = 'fixed top-4 right-4 p-4 ';
          toast.innerHTML =` <div id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span class="sr-only">Warning icon</span>
         </div>
          <div class="ms-3 text-sm font-normal">Cảnh báo</div>
          </div>`;
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.remove();
          }, 2000);
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
