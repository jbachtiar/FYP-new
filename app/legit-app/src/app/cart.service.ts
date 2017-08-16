import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CONFIG } from './config/config.component'

@Injectable()
export class CartService {


    constructor(private _http: Http) { }

    getCartItemByCartId(cartId: string) {
        let url = CONFIG.getCartItemBackendUrl;
        let finalUrl = url + "?cartId=" + cartId;

        return this._http.get(finalUrl).map(res => {


            return res.json().carts;

        });
    }

    updateCarts(cartId: string, productId: string, qty: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('cartId', cartId);
        params.set('productId', productId);
        params.set('qty', qty);


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

}