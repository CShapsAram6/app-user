import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { FormBuilder } from '@angular/forms';
import { IAddressRepository } from '../../../interface/address.interfaces';
import {
  addressGetById,
  addressModel,
  addressRequest,
  districtDtos,
  proviceDtos,
  wardDtos,
} from '../../../model/address.model';
import { IAuth } from '../../../interface/auth.interface';
import { IUserToken } from '../../../model/user.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<addressModel>();
  constructor(
    private addressService: AddressService,
    private form: FormBuilder,
    @Inject('IAddressRepository')
    private iaddressRepository: IAddressRepository,
    @Inject('IAuth') private auth: IAuth
  ) {}
  ngOnInit(): void {
    this.Getprovince();
    this.LoadAddress();
  }
  addressForm = this.form.group({
    address: [''],
    fullName: [''],
    phone: [''],
    city: [''],
    district: [''],
    wrad: [''],
    detail: [''],
    idDistrict: [''],
    idWard: [''],
    id: [`${this.iaddressRepository.generateRandomString(5)}`],
  });
  // get values City form assets/.json
  isPopup: boolean = false;
  province: proviceDtos[] = [];
  district: districtDtos[] = [];
  ward: wardDtos[] = [];
  transForm = 'translateX(0px)';
  isHeight = '456px';
  arrAddress: addressModel[] = [];
  titleForm: string = '';
  Getprovince() {
    this.addressService.getprovince().subscribe((res) => {
      this.province = res.data;
    });
  }

  LoadAddress() {
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    this.addressService.getData(Number(user.Id)).subscribe((response) => {
      this.arrAddress = response.data;
    });
  }

  ChangeForm(type: string, id: string) {
    if (type === 'create') {
      this.transForm = 'translateX(-450px)';
      this.isHeight = '45px';
      if (id == '') {
        this.titleForm = 'Thêm địa chỉ mới';
        return;
      }
      this.generateForm(id);
      return;
    }
    this.transForm = 'translateX(0)';
    this.isHeight = '456px';
    this.addressForm.reset();
  }

  generateForm(id: string) {
    this.titleForm = 'Cập nhật địa chỉ';
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    let model: addressGetById = {
      id: id,
      user: Number(user.Id),
    };
    this.addressService.getDataById(model).subscribe((res) => {
      this.addressForm.patchValue({
        id: id,
        fullName: res.data.fullName,
        phone: res.data.phone,
        address: res.data.address,
        idDistrict: res.data.idDistrict,
        idWard: res.data.idWard,
      });
    });
  }

  Update() {
    let request: addressRequest = this.iaddressRepository.generateRequest(
      this.addressForm.value as addressModel
    );
    this.addressService.updateById(request).subscribe((res) => {
      if (res.success) {
        this.transForm = 'translateX(0)';
        this.isHeight = '456px';
        this.LoadAddress();
        this.addressForm.reset();
        return;
      }
    });
  }

  GetDistrict(id: number) {
    this.addressService.getDistrict({ province_id: id }).subscribe((res) => {
      this.district = res.data;
    });
  }

  GetWard(id: number) {
    this.addressService.getWard(id).subscribe((res) => {
      this.ward = res.data;
    });
  }
  onSelectChange(event: Event, type: string) {
    if (type === 'city') {
      this.SelectCity(event);
      return;
    } else if (type === 'district') {
      this.SelectDistrict(event);
      return;
    }
    this.SelectWard(event);
  }

  //#region select
  SelectCity(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.addressForm.patchValue({
      city: selectElement.options[selectElement.selectedIndex].text,
      address: `${selectElement.options[selectElement.selectedIndex].text}`,
    });
    this.GetDistrict(Number(selectElement.value));
  }

  SelectDistrict(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.addressForm.patchValue({
      district: selectElement.options[selectElement.selectedIndex].text,
      address: `${selectElement.options[selectElement.selectedIndex].text}, ${
        this.addressForm.value.city
      }`,
      idDistrict: selectElement.value,
    });
    this.GetWard(Number(selectElement.value));
  }

  SelectWard(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.addressForm.patchValue({
      wrad: selectElement.options[selectElement.selectedIndex].text,
      address: `${selectElement.options[selectElement.selectedIndex].text}, ${
        this.addressForm.value.district
      }, ${this.addressForm.value.city}`,
      idWard: selectElement.value,
    });
  }

  ChangeDetailAddress() {
    setTimeout(() => {
      this.addressForm.patchValue({
        address: `${this.addressForm.value.detail}, ${this.addressForm.value.wrad}, ${this.addressForm.value.district}, ${this.addressForm.value.city}`,
      });
    }, 200);
  }
  //#endregion

  SumbitFormm() {
    let request: addressRequest = this.iaddressRepository.generateRequest(
      this.addressForm.value as addressModel
    );
    request.address.isPrimary = !this.arrAddress;

    this.addressService.create(request).subscribe((res) => {
      if (res.success) {
        this.transForm = 'translateX(0)';
        this.isHeight = '456px';
        this.LoadAddress();
        this.addressForm.reset();
      }
    });
  }
  closePopup() {
    document.body.style.overflow = 'auto';
    this.isPopup = false;
  }
  RemoveItem(id: string) {
    this.titleForm = 'Cập nhật địa chỉ';
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    let model: addressGetById = {
      id: id,
      user: Number(user.Id),
    };
    this.addressService.deleteById(model).subscribe((res) => {
      if (res.success) {
        this.LoadAddress();
        return;
      }
    });
  }
  UsingAddress(item: addressModel) {
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);

    let model: addressGetById = {
      id: item.id,
      user: Number(user.Id),
    };
    this.addressService.changeIsPrimary(model).subscribe((res) => {
      if (res.success) {
        this.dataEvent.emit(item);
        this.closePopup();
      }
    });
  }
}
