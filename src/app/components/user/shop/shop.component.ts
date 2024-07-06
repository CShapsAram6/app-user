import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  ngOnInit(): void {}
  items: any[] = [1, 2, 3, 4, 1, 1, 1, 1, 1, 1];
  dropdownOpen: boolean = false;
}
