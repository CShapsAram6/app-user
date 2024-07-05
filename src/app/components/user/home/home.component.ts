import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  list: any[] = [1, 2, 3, 4];
  items: any[] = [1, 2, 3, 4, 1, 1, 1, 1];
  blog: any[] = [1, 1, 1];
  ngOnInit(): void {}
}
