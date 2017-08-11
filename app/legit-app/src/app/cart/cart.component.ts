import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "./model/shopping-cart.model";
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

  public constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    // this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    //   this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    // });
  }

}
