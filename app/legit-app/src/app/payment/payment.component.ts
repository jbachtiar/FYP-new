import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  private carts: any = {};
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  postalCode: string;



  constructor(private storageService: StorageService, private cartService: CartService) { }

  ngOnInit() {
    this.firstName = this.storageService.getFirstName();
    this.lastName = this.storageService.getLastName();
    this.contact = this.storageService.getContact();
    this.postalCode = this.storageService.getPostCode();
    this.address = this.storageService.getAddress();

    this.cartService.getCartItemByCartId("C1").subscribe(
      carts => {

        console.log("Cart items retrieved successfully");
        this.carts = carts;


    })

  }


}
