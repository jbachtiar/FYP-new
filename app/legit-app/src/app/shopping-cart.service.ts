import { Injectable, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/map'
import { CartItem } from "./model/cart-item.model";
import { ShoppingCart } from "./model/shopping-cart.model";
import { CONFIG } from './config/config.component'
import { Http, Headers, Response } from '@angular/http';

const CART_KEY = "cart";

@Injectable()
export class ShoppingCartService {
  //private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private item: CartItem = new CartItem();
  private cart: ShoppingCart = new ShoppingCart();
  private token: string;


  public constructor(private _http: Http, ) {
    this.token = localStorage.getItem('token');
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public chargeStripe(stripeToken, amount) {
    let params: URLSearchParams = new URLSearchParams();
    let headers = new Headers();
    headers.append(
      'Content-type', 'application/x-www-form-urlencoded'
    );
    params.set('stripeToken', stripeToken);
    params.set('amount', amount);
    return this._http.post(CONFIG.paymentBackendUrl + "/chargeStripe", params.toString(), { headers: headers })
      .map(res => res.json());
  }

  // public updateCart()

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public newCart(): void {
    this.cart = new ShoppingCart();
    localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
  }

  //Add Item to Cart
  public addItem(cartItem: CartItem): void {

    this.cart = this.retrieve();

    // console.log("Cart Item")
    // console.log('product Id : ' + cartItem.productId)
    // console.log('quantity : ' + cartItem.quantity)
    // console.log('each price : ' + cartItem.eachPrice)


 

    this.item = this.cart.cartItems.find((p) => p.product.productId === cartItem.product.productId);

    if (this.item === undefined) {
      //if does not exist create new cart item
      this.item = cartItem;
  
      //console.log(this.item)

      this.cart.cartItems.push(this.item);
    } else {
      //if exist add the quantity
     
      this.item.quantity += cartItem.quantity;
    }

    this.cart.cartItems = this.cart.cartItems.filter((cartItem) => cartItem.quantity > 0);


    this.calculateCart(this.cart);
    //console.log(JSON.stringify(this.cart));
    this.save(this.cart);
    // this.dispatch(this.cart);
  }

  updateCartDB(cart: ShoppingCart) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('token', this.token);
    params.set('cart', JSON.stringify(cart));

    let headers = new Headers();
    //headers.append ('Authorization', token);
    headers.append(
      'Content-type', 'application/x-www-form-urlencoded'
    )


 
    let url = CONFIG.updateCartBackendUrl;


    return this._http.post(url, params.toString(), { headers: headers })
      .subscribe(res => {
  
      });


    //   });

  }

  public retrieveCartDB() {
    let headers = new Headers();

    headers.append(
      'Content-type', 'application/x-www-form-urlencoded'
    )
    let params: URLSearchParams = new URLSearchParams();
    params.set('token', this.token);

    let url = CONFIG.cartBackendUrl + "/retrieveCart";


    return this._http.post(url, params.toString(), { headers: headers })
      .subscribe(res => {
        this.cart = res.json().cart
        localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
        
        return this.cart;
      });

  }

  public updateCart(cart: ShoppingCart) {
    this.cart = cart
  
    this.calculateCart(this.cart);
    this.save(this.cart);  
    this.dispatch(this.cart);
    
  }

  public checkPromo(code: string, amount: number) {
        let url = CONFIG.promoBackendUrl;
        let finalUrl = url + "/check?PromoCode=" + code + "&Amount=" + amount;

        return this._http.get(finalUrl)
            .map(res => {
              
                return res.json().promo;
            });
        
    }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  private calculateCart(cart: ShoppingCart): void {
    let totalPrice: number = 0;

    for (let item of cart.cartItems) {
      let price = item.quantity * item.unitPrice;
      totalPrice += price;
    }
    cart.price = totalPrice;
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

  
    if (this.token) {
    
      this.updateCartDB(cart);
    } else {
  
    }
    //this.updateCartDB(cart)
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

  deleteItemDB(productId: number) {
    let params: URLSearchParams = new URLSearchParams();
    let cart = this.retrieve()
    params.set('token', this.token);
    params.set('productId', '' + productId);

    let headers = new Headers();
    //headers.append ('Authorization', token);
    headers.append(
      'Content-type', 'application/x-www-form-urlencoded'
    )


 
    let url = CONFIG.cartBackendUrl + "/deleteItem";
 

    return this._http.post(url, params.toString(), { headers: headers })
      .subscribe(res => {

        this.retrieveCartDB()
      });
      
  }

  saveAddress(addressJson) {


    let params: URLSearchParams = new URLSearchParams();

    params.set('address', JSON.stringify(addressJson));


    const headers = new Headers();
    let url = CONFIG.addressBackendUrl + '/save'
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(url, params.toString(), {
      headers: headers
    }).map(res => res
      )
  };

  public emptyLogout(): void {
    const newCart = new ShoppingCart();
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  }
  
}
