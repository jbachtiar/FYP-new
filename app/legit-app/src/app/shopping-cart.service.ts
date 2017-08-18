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
  private token: string;

  public constructor(private _http: Http) {
    this.token = localStorage.getItem('token');
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

  //Add Item to Cart
  public addItem(cartItem: CartItem): void {
    this.cart = this.retrieve();
    console.log("Cart Item")
    console.log('product Id : ' + cartItem.productId)
    console.log('quantity : ' + cartItem.quantity)
    console.log('each price : ' + cartItem.eachPrice)


    
    this.item = this.cart.items.find((p) => p.productId === cartItem.productId);
    //console.log('retrieved id: ' + this.item.productId);
    if (this.item === undefined) {
      
      this.item = new CartItem();
      this.item.productId = cartItem.productId;
      this.item.quantity = cartItem.quantity;
      this.item.patternName = cartItem.patternName;
      this.item.url = cartItem.url;


      console.log(cartItem.url)


      console.log('productId : ' + this.item.productId)
      console.log('quantity: ' + this.item.quantity)

      var totalPrice: number = 0;
      console.log('price before: ' + totalPrice)
      
      this.item.eachPrice = cartItem.eachPrice
      console.log(JSON.stringify(this.item))
      console.log('price: ' + this.item.eachPrice);

      this.cart.items.push(this.item);


    }else{
        this.item.quantity += cartItem.quantity;
    }

    this.cart.items = this.cart.items.filter((cartItem) => cartItem.quantity > 0);
    console.log('retrieved: '+ JSON.stringify(this.cart));


    
    this.calculateCart(this.cart);
    this.save(this.cart);
    console.log("im here")
    if(this.token){
      console.log("token present")
      this.updateCartDB(this.cart);
      this.retrieveCartDB(); 
    }
    this.dispatch(this.cart);
  }

  updateCartDB(cart: ShoppingCart) {
       
    
        var params = JSON.stringify(cart);
        let headers = new Headers();

        
        headers.append ('Authorization', this.token);
        headers.append(
           'Content-type', 'application/json'
        )

        console.log("update cart1")
        let url = CONFIG.updateCartBackendUrl;
        return this._http.post(url, params, { headers: headers })
            .subscribe(res => {
              console.log("update cart")
              res.json()
              


            });   

  }

  public retrieveCartDB(){
        let headers = new Headers();

        headers.append ('Authorization', this.token);
        
        let url = CONFIG.cartBackendUrl + "/retrieveCart";

        console.log("HEY IM HERE");
        return this._http.post(url,{ headers: headers })
            .subscribe(res => {
              console.log("retrieved cart : " + res.json())
            
            });

  }

  public updateCart(cart: ShoppingCart){
    this.cart = cart
    
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
