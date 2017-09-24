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
    console.log(cartItem)
    console.log("token : " + this.token)
    this.cart = this.retrieve();

    // console.log("Cart Item")
    // console.log('product Id : ' + cartItem.productId)
    // console.log('quantity : ' + cartItem.quantity)
    // console.log('each price : ' + cartItem.eachPrice)


    //to check if the product exists in the cart
    console.log(this.cart)

    this.item = this.cart.cartItems.find((p) => p.product.productId === cartItem.product.productId);

    if (this.item === undefined) {
      //if does not exist create new cart item
      this.item = cartItem;
      console.log("item does not exist")

      console.log('productId : ' + this.item.product.productId)
      console.log('UnitPrice : ' + this.item.unitPrice)
      console.log('quantity: ' + this.item.quantity)
      //console.log(this.item)

      this.cart.cartItems.push(this.item);
    } else {
      //if exist add the quantity
      console.log("item exist")
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


    console.log("update cart DB")
    let url = CONFIG.updateCartBackendUrl;
    console.log("url : " + url)

    return this._http.post(url, params.toString(), { headers: headers })
      .subscribe(res => {
        console.log(cart)
        console.log("IM HEERREE")
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

    console.log("HEY IM HERE");
    return this._http.post(url, params.toString(), { headers: headers })
      .subscribe(res => {
        this.cart = res.json().cart
        localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
        
        return this.cart;
      });

  }

  public updateCart(cart: ShoppingCart) {
    this.cart = cart
    console.log(this.cart)

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
    console.log("SAVE CART")
    console.log(cart)
    if (this.token) {
      console.log("token exist")
      this.updateCartDB(cart);
    } else {
      console.log("token does not exist")
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


    console.log("DELETE cart DB")
    let url = CONFIG.cartBackendUrl + "/deleteItem";
    console.log("url : " + url)

    return this._http.post(url, params.toString(), { headers: headers })
      .subscribe(res => {
        //console.log(cart)
        console.log("DELETE CART")
        this.retrieveCartDB()
      });
      
  }

  saveAddress(addressJson) {
    console.log("NEW ADDRESS: " + JSON.stringify(addressJson))

    let params: URLSearchParams = new URLSearchParams();
    console.log("SAVE ADDRESS SERVICE")
    params.set('address', JSON.stringify(addressJson));

    console.log(params)
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
