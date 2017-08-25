import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CONFIG } from './config/config.component'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartService {
    private cartMethodCallSource = new Subject<any>();

    // Observable string streams
    cartMethodCalled$ = this.cartMethodCallSource.asObservable();

    // Service message commands
    callCartMethod() {
        this.cartMethodCallSource.next();
    }

    constructor(private _http: Http) { }

    getCartItemByCartId(cartId: string) {
        let url = CONFIG.getCartItemBackendUrl;
        let finalUrl = url + "?cartId=" + cartId;

        return this._http.get(finalUrl).map(res => {
            return res.json().carts;
        });
    }

    updateCartItem(cartId: string, productId: string, qty: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('cartId', cartId);
        params.set('productId', productId);
        params.set('qty', qty);


        let headers = new Headers();

        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.updateCartItemBackendUrl;
        return this._http.put(url, params.toString(), { headers })
            .map(res => res.json());


    }

    updateCart(cartId: string, date: string, totalPrice: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('cartId', cartId);
        params.set('date', date);
        params.set('totalPrice', totalPrice);


        let headers = new Headers();

        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.updateCartBackendUrl;
        return this._http.put(url, params.toString(), { headers })
            .map(res => res.json());


    }

    deleteCartItem(cartId: string, productId: string, qty: string) {
        let url = CONFIG.clearCartBackendUrl;
        console.log(productId);
        let finalUrl = url + "?cartId=" + cartId + "&productId=" + productId + "&qty=" + qty;
        return this._http.delete(finalUrl).map(res => res.json());
    }

    getCartTotalPrice(cartId: string) {
        let url = CONFIG.getCartTotalPriceBackendUrl;
        let finalUrl = url + "?cartId=" + cartId;
        return this._http.get(finalUrl).map(res => {
            return res.json().total_price
        });
    }

}