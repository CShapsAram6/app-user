import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { vietNameseDtos } from '../../../model/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  constructor(private addressService: AddressService) {}
  ngOnInit(): void {
    this.LoadCity();
  }
  // get values City form assets/.json
  city: vietNameseDtos[] = [];
  LoadCity() {
    this.addressService.getCity().subscribe((data) => {
      this.city = data;
    });
  }
}
