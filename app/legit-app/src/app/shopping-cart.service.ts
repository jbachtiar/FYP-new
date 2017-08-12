import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/map'
import { CartItem } from "./cart/model/cart-item.model";
import { ShoppingCart } from "./cart/model/shopping-cart.model";
import { CONFIG } from './config/config.component'
import { Http, Headers, Response } from '@angular/http';

const CART_KEY = "cart";

@Injectable()
export class ShoppingCartService {
  //private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private item: CartItem;
  private cart: ShoppingCart;

  public constructor(private _http: Http) {
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(productId: string, quantity: number, eachPrice: number): void {
    this.cart = this.retrieve();
    console.log("Cart Item")
    console.log('product Id : ' + productId)
    console.log('quantity : ' + quantity)
    console.log('each price : ' + eachPrice)


    
    this.item = this.cart.items.find((p) => p.productId === productId);
    //console.log('retrieved id: ' + this.item.productId);
    if (this.item === undefined) {
      
      this.item = new CartItem();
      this.item.productId = productId;
      this.item.quantity = quantity;

      console.log('productId : ' + this.item.productId)
      console.log('quantity: ' + this.item.quantity)

      var totalPrice: number = 0;
      console.log('price before: ' + totalPrice)
      
      this.item.eachPrice = eachPrice
      console.log(JSON.stringify(this.item))
      console.log('price: ' + this.item.eachPrice);

      this.cart.items.push(this.item);


    }else{
        this.item.quantity += quantity;
    }

    this.cart.items = this.cart.items.filter((cartItem) => cartItem.quantity > 0);
    console.log('retrieved: '+ JSON.stringify(this.cart));

    this.calculateCart(this.cart);
    this.save(this.cart);
    this.dispatch(this.cart);
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  private calculateCart(cart: ShoppingCart): void {
    let totalPrice:number = 0;

    for(let item of cart.items){
        let price = item.quantity * item.eachPrice;
        totalPrice += price;
    }
    cart.noOfItems = cart.items.length
    cart.totalPrice = totalPrice;
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: ShoppingCart): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }

}
