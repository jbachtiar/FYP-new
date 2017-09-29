import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFactoryManagerComponent } from './order-factory-manager.component';

describe('OrderFactoryManagerComponent', () => {
  let component: OrderFactoryManagerComponent;
  let fixture: ComponentFixture<OrderFactoryManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFactoryManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFactoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
