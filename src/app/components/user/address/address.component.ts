import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  constructor(private addressService: AddressService) {}
  ngOnInit(): void {
    this.addressService.getData().subscribe((response) => {
      const newItem: any = response.find((a) => a.Code == '01');
      console.log(newItem.District);
    });
  }
}
