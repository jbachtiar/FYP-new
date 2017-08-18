import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:app/legit-app/src/app/payment/payment.component.spec.ts
import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
=======
import { CartComponent } from './cart.component';
//cart componentn spec
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
>>>>>>> add-cart:app/legit-app/src/app/cart/cart.component.spec.ts

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
