import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../interface/customer';
import { ProfileService } from '../profile.service';
import { CartService } from '../cart.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],


})
export class CheckoutComponent implements OnInit {
  private user: any = {};
  private carts: any = {};

  private numOfItem: 0;
  private itemPrice: number[] = new Array();
  private sameAddre: boolean = false;
  customer: Customer;
  token: string;
  quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];



  constructor(private profileService: ProfileService, private cartService: CartService, private storageService: StorageService, private route: ActivatedRoute,
    private router: Router) {
    this.token = localStorage.getItem('token');

  }

  ngOnInit() {
    this.cartService.getCartItemByCartId("C1").subscribe(
      carts => {

        console.log("Cart items retrieved successfully");
        this.carts = carts;


      })
  }


  sameAddress() {
    if (this.user.sameAddress) {
      console.log(this.token);
      this.sameAddre = true;
      this.profileService.displayProfile(this.token).subscribe(
        res => {
          if (res.status === '200') {
            console.log("Retrieve successful");
            this.customer = this.profileService.getCustomer();
            this.user.firstName = this.customer.firstName;
            this.user.lastName = this.customer.lastName;
            this.user.contact = this.customer.contact;
            this.user.address = this.customer.address;
            this.user.postCode = this.customer.postalCode;
          } else {
            console.log("Retrieve failed");

          }
        }
      )

    } else {
      this.user.sameAddre = false;
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.contact = "";
      this.user.address = "";
      this.user.postCode = "";

    }
  }

  delete(index, cart) {

    this.carts.splice(index, 1);
    this.itemPrice.splice(index, 1);
    this.cartService.deleteCartItem("C1", cart.SKU, cart.quantity).subscribe(
      res => {
        if (res.status === '200') {
          console.log("Deleted");
        } else {
          console.log("Unable to delete")
        }
      }
    );

  }
  onQtyChange(c) {

    this.cartService.updateCarts("C1", c.SKU, c.quantity).subscribe(
      res => {
        if (res.status === '200') {
          console.log("Updated");
        } else {
          console.log("Unable to update");
        }
      }
    );


  }

  submit() {

    this.storageService.setShippingAddress(this.user.firstName, this.user.lastName, this.user.contact, this.user.address, this.user.postCode);
    this.router.navigateByUrl('/checkout/payment');



  }

  addPrice(index, price) {
    this.itemPrice[index] = price;

  }

  showTotalPrice() {
    let totalPrice = 0;
    for (var i = 0; i < this.itemPrice.length; i++) {
      totalPrice += this.itemPrice[i];

    }
    return totalPrice+"";

  }
}

