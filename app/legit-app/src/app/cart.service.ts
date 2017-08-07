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

}