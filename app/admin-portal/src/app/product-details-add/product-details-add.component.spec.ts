import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsAddComponent } from './product-details-add.component';

describe('ProductDetailsAddComponent', () => {
  let component: ProductDetailsAddComponent;
  let fixture: ComponentFixture<ProductDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
