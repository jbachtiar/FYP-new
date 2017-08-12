import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "./model/shopping-cart.model";
import { CartItem } from "./model/cart-item.model";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ShoppingCartService]
})
export class CartComponent implements OnInit {
  public itemCount: number = 0;
  public cart: Observable<ShoppingCart>;
  private cartSubscription: Subscription;
  private shoppingCart: ShoppingCart;
  private cartItem : CartItem[]

  public constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart'))

  }

  ngOnInit() {
    this.itemCount = this.shoppingCart.noOfItems
    this.cartItem = this.shoppingCart.items
    // this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    // this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    // });
  }

}
