import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDetailsPopupComponent } from './shipping-details-popup.component';

describe('ShippingDetailsPopupComponent', () => {
  let component: ShippingDetailsPopupComponent;
  let fixture: ComponentFixture<ShippingDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
