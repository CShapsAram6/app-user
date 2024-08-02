import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelateToProductsComponent } from './relate-to-products.component';

describe('RelateToProductsComponent', () => {
  let component: RelateToProductsComponent;
  let fixture: ComponentFixture<RelateToProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelateToProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelateToProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
