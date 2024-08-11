import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { IAuth } from '../../../interface/auth.interface';
import { IUserToken } from '../../../model/user.model';
import { addressGetById, addressModel } from '../../../model/address.model';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrl: './manage-address.component.scss',
})
export class ManageAddressComponent implements OnInit {
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;
  constructor(
    private addressService: AddressService,
    @Inject('IAuth') private auth: IAuth
  ) {}

  public address: addressModel[] = [];
  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    this.addressService.getData(Number(user.Id)).subscribe((response) => {
      this.address = response.data;
    });
  }

  ChangeAddress(id: string) {
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    let model: addressGetById = {
      id: id,
      user: Number(user.Id),
    };

    this.addressService.changeIsPrimary(model).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
      }
    });
  }

  OpenPopup() {
    this.addressComponent.isPopup = true;
    document.body.style.overflow = 'hidden';
    this.addressComponent.Getprovince();
  }

  async UpdateAddress(id: string) {
    this.addressComponent.isPopup = true;
    document.body.style.overflow = 'hidden';

    await this.addressComponent.Getprovince();

    this.addressComponent.ChangeForm('create', id);
  }
  LoadAddress(data: addressModel) {
    if (data.address) {
      this.LoadPage();
    }
  }
}
