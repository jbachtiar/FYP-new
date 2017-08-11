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
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private item: CartItem;

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

  public addItem(productId: string, quantity: number): void {
    const cart = this.retrieve();
    
    this.item = cart.items.find((p) => p.productId === productId);
    //console.log('retrieved id: ' + this.item.productId);
    if (this.item === undefined) {
      
      this.item = new CartItem();
      this.item.productId = productId;
      this.item.quantity = quantity;
     
      console.log('productId : ' + this.item.productId)
      console.log('quantity: ' + this.item.quantity)
      
      this.getPriceById(productId)
      .subscribe(totalPrice => {
        console.log('price before: ' + totalPrice)
        this.item.eachPrice = totalPrice
        
        console.log('price: ' + this.item.eachPrice);

      });
      
      
      cart.items.push(this.item);
    }else{
        this.item.quantity += quantity;
    }

    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    console.log('retrieved: '+ JSON.stringify(cart));

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
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

  private getPriceById(productId: string) {
    //get price by product Id from DB.
    var totalPrice: number = 0
    let params: URLSearchParams = new URLSearchParams();
    //let headers = new Headers();
    let url = CONFIG.cartBackendUrl + '/productPrice?productId=' + productId;

    //params.set('productId', productId);
    return this._http.get(url)
      .map(res => {
        console.log('get price: ' + res.json().totalPrice)
        return res.json().totalPrice
      });
    //return 0;

  }
}
