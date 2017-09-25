import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementSuperuserComponent } from './order-management-superuser.component';

describe('OrderManagementSuperuserComponent', () => {
  let component: OrderManagementSuperuserComponent;
  let fixture: ComponentFixture<OrderManagementSuperuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderManagementSuperuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagementSuperuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
