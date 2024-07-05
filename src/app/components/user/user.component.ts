import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  isNav: boolean = false;
  items: any[] = [1, 2, 3, 4, 1, 1, 1, 1];
  isCart: boolean = false;
  ngOnInit(): void {}
}
