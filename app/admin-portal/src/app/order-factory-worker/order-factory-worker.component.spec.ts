import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFactoryWorkerComponent } from './order-factory-worker.component';

describe('OrderFactoryWorkerComponent', () => {
  let component: OrderFactoryWorkerComponent;
  let fixture: ComponentFixture<OrderFactoryWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFactoryWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFactoryWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
