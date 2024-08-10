import { WishListService } from './wishlist.service';
import { ForgetPasswordComponent } from './../components/user/forget-password/forget-password.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';
import { UserInfoDTO } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private wishListService: WishListService
  ) { }

  getInfoUser(Id: number): Observable<singleResponse<UserInfoDTO>> {
    return this.http.get<singleResponse<UserInfoDTO>>(
      `${environment.api}/User/get-user-info?id=${Id}`
    );
  }
  UpdateUserInfo(data: any) {
    return this.http.put(`${environment.api}/User/update-user-info`, data);
  }

  ForgetPassword(data: any): Observable<any> {
    data.token = this.wishListService.getToken();
    data.currentPassword = data.currentPassword;
    data.newPassword = data.newPassword;
    data.confirmPassword = data.confirmPassword;
    return this.http.put(`${environment.api}/User/change-password`, data);
  }
}
