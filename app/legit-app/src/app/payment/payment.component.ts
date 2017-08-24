import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { CartService } from '../cart.service';
import { ShoppingCart } from "../cart/model/shopping-cart.model";
import { CartItem } from "../cart/model/cart-item.model";
import { ShoppingCartService } from '../shopping-cart.service'


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ShoppingCartService]
})
export class PaymentComponent implements OnInit {
  private carts: any = {};
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  postalCode: string;
  totalPrice: string;
  private shoppingCart: ShoppingCart;
  private cartItem: CartItem[];



  constructor(
    private storageService: StorageService,
    private cartService: CartService,
    private shoppingCartService: ShoppingCartService) {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart'));
  }

  ngOnInit() {
    this.firstName = this.storageService.getFirstName();
    this.lastName = this.storageService.getLastName();
    this.contact = this.storageService.getContact();
    this.postalCode = this.storageService.getPostCode();
    this.address = this.storageService.getAddress();

    this.cartItem = this.shoppingCart.items;


    this.cartService.getCartItemByCartId("C1").subscribe(
      carts => {

        console.log("Cart items retrieved");
        this.carts = carts;


      })

    this.cartService.getCartTotalPrice("C1").subscribe(
      total_price => {
        this.totalPrice = total_price;
        console.log(this.totalPrice);


      })
  }

  openCheckout() {
    console.log("CHECKOUT")
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_PcfRcpvH8lJ8P7GtXdwbTl9D',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.shoppingCartService.chargeStripe(token.id).subscribe(
          res=>{
            console.log(res)
        })
      }
    });
    console.log("TOTAL PRICE :" + this.shoppingCart.totalPrice)
    handler.open({
      name: 'Highlander',
      description: 'Secured Payment',
      amount: this.shoppingCart.totalPrice * 100
    });

  }


}
