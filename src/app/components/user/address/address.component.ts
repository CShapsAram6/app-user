import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { vietNameseDtos } from '../../../model/address.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  constructor(
    private addressService: AddressService,
    private form: FormBuilder
  ) {}
  ngOnInit(): void {
    this.LoadCity();
  }
  addressForm = this.form.group({
    address: [''],
    fullName: [''],
    phone: [''],
  });
  // get values City form assets/.json
  city: vietNameseDtos[] = [];
  district: vietNameseDtos[] = [];
  ward: vietNameseDtos[] = [];
  idCity: string = '';
  address: string = '';
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
    this.OnSelectCity(selectedValue);
    this.addressService.getDistrict(selectedValue).subscribe((response) => {
      this.district = response;
    });
  }

  // handle value when change district
  onDistrictChange(event: Event, idCity: string) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue: string = selectElement.value;
    this.addressService.GetWard(selectedValue, idCity).subscribe((response) => {
      this.ward = response;
    });
  }

  onWradChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue: string = selectElement.value;
    console.log(selectedValue);
  }

  OnSelectCity(id: string) {
    this.addressService.getCity().subscribe((data) => {
      this.addressForm.patchValue({
        address: data.filter((item) => item.Code === id)[0].FullName,
      });
    });
  }
}
