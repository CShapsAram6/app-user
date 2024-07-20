import { Component, Inject, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { vietNameseDtos } from '../../../model/address.model';
import { FormBuilder } from '@angular/forms';
import { IAddressRepository } from '../../../interface/address.interfaces';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  constructor(
    private addressService: AddressService,
    private form: FormBuilder,
    @Inject('IAddressRepository') private iaddressRepository: IAddressRepository
  ) {}
  ngOnInit(): void {
    this.LoadCity();
    this.Getprovince();
  }
  addressForm = this.form.group({
    address: [''],
    fullName: [''],
    phone: [''],
    city: [''],
    district: [''],
    wrad: [''],
    detail: [''],
  });
  // get values City form assets/.json
  city: vietNameseDtos[] = [];
  district: vietNameseDtos[] = [];
  ward: vietNameseDtos[] = [];
  idCity: string = '';
  address: string = '';
  isPopup: boolean = false;
  LoadCity() {
    this.addressService.getCity().subscribe((data) => {
      this.city = data;
    });
  }

  // handle value when change city
  onSelectChange(event: Event) {
    this.ward = [];
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue: string = selectElement.value;
    this.idCity = selectedValue;
    const nameCity: string =
      selectElement.options[selectElement.selectedIndex].text;
    this.addressForm.patchValue({
      city: nameCity,
      address: nameCity,
    });
    this.addressService.getDistrict(selectedValue).subscribe((response) => {
      this.district = response;
    });
  }

  // handle value when change district
  onDistrictChange(event: Event, idCity: string) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue: string = selectElement.value;
    const nameDistrict: string =
      selectElement.options[selectElement.selectedIndex].text;
    this.addressForm.patchValue({
      district: nameDistrict,
      address: `${nameDistrict}, ${this.addressForm.value.city}`,
    });
    this.addressService.GetWard(selectedValue, idCity).subscribe((response) => {
      this.ward = response;
    });
  }

  onWradChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const nameWrad: string =
      selectElement.options[selectElement.selectedIndex].text;
    this.addressForm.patchValue({
      wrad: nameWrad,
      address: `${nameWrad}, ${this.addressForm.value.district}, ${this.addressForm.value.city}`,
    });
  }

  SumbitFormm() {
    let address: string = this.addressForm.value.address as string;
    this.iaddressRepository.setAddressComplate(address);
  }

  ChangeDetailAddress() {
    setTimeout(() => {
      this.addressForm.patchValue({
        address: `${this.addressForm.value.detail}, ${this.addressForm.value.wrad}, ${this.addressForm.value.district}, ${this.addressForm.value.city}`,
      });
    }, 200);
  }

  Getprovince() {
    this.addressService.getprovince().subscribe((res) => {
      console.log(res);
    });
  }
  closePopup() {
    document.body.style.overflow = 'auto';
  }
}
