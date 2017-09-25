import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsSuperuserComponent } from './order-details-superuser.component';

describe('OrderDetailsSuperuserComponent', () => {
  let component: OrderDetailsSuperuserComponent;
  let fixture: ComponentFixture<OrderDetailsSuperuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsSuperuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsSuperuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
