import { Component, Input, OnInit } from '@angular/core';
import { productsDtos } from '../../../model/product.model';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent implements OnInit {
  @Input() product: productsDtos = {} as productsDtos;
  ngOnInit(): void {}
}
