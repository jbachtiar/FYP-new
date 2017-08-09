import { Component, OnInit } from '@angular/core';
import { Customer } from '../interface/customer';
import { ProfileService } from '../profile.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private user: any = {};
  private carts: any = {};
  private numOfItem: 0;
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  postalCode: string;
  password: string;
  customer: Customer;
  token: string;
  quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];



  constructor(private profileService: ProfileService, private cartService: CartService) {
    this.token = localStorage.getItem('token');

  }

  ngOnInit() {
    this.cartService.getCartItemByCartId("C1").subscribe(
      carts => {

        console.log("Cart items retrieved successfully");
        this.carts = carts;
        console.log(this.carts);

      })



  }


  sameAddress() {
    if (this.user.sameAddress) {
      console.log(this.token);
      this.profileService.displayProfile(this.token).subscribe(
        res => {
          if (res.status === '200') {
            console.log("Retrieve successful");
            this.customer = this.profileService.getCustomer();
            this.firstName = this.customer.firstName;
            this.lastName = this.customer.lastName;
            this.contact = this.customer.contact;
            this.address = this.customer.address;
            this.postalCode = this.customer.postalCode;


          } else {
            console.log("Retrieve failed");

          }
        }
      )

    } else {
      this.firstName = "";
      this.lastName = "";
      this.contact = "";
      this.address = "";
      this.postalCode = "";

    }
  }

  delete(index) {
    this.carts.splice(index, 1);

  }

  updateCarts() {
    console.log(this.carts);
    this.cartService.clearCarts().subscribe(
       res => {
          if (res.status === '200') {
            console.log("Clear cart successfully");
          } else {
            console.log("Clear cart failed");
          }
       }
    );
       
    for (let c of this.carts) {
      console.log(c.SKU);
      this.cartService.updateCarts("C1", c.SKU, c.quantity).subscribe(
        res => {
          if (res.status === '200') {
            console.log("Update cart successfully");
          } else {
            console.log("Update cart failed");
          }
        }
      );
    }   



  }
}
