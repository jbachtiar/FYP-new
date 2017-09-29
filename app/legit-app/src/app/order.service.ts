import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from './config/config.component';


@Injectable()
export class OrderService {


    constructor(private _http: Http) { }

    saveOrder(orderJson) {
        let url = CONFIG.orderBackendUrl + "/save";
        console.log("NEW ORDER: " + JSON.stringify(orderJson))

        let params: URLSearchParams = new URLSearchParams();
        console.log("SAVE order SERVICE")
        params.set('order', JSON.stringify(orderJson));

        console.log(params)
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res)
    }

    getOrderByCustomer(token: string) {
        let headers = new Headers();
        let url = CONFIG.orderBackendUrl;

        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token)
        //headers.append ('Authorization', token); 
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )
        return this._http.post(url + '/getAllOrdersByCustomer', params.toString(), { headers })
            .map(res => {
                let orders = res.json().orders;

                return orders;
            });
    }

    getOrderById(orderId) {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.orderBackendUrl + '/getOrderById?orderId=' + orderId;
        return this._http.get(url)
            .map(res => {
                console.log("ORDER: " + res.json().orders)
                let orders = res.json().orders;
                //temp
                let orderItems = orders[0].orderItems

                return orders;
            });
    }

    getPastOrderByCustomer(token: string) {
        let headers = new Headers();
        let url = CONFIG.orderBackendUrl;

        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token)
        //headers.append ('Authorization', token); 
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )
        return this._http.post(url + '/getPastOrdersByCustomer', params.toString(), { headers })
            .map(res => {
                let orders = res.json().orders;

                return orders;
            });
    }

    getCurrentOrderByCustomer(token: string) {
        let headers = new Headers();
        let url = CONFIG.orderBackendUrl;

        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token)
        //headers.append ('Authorization', token); 
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )
        return this._http.post(url + '/getCurrentOrdersByCustomer', params.toString(), { headers })
            .map(res => {
                let orders = res.json().orders;

                return orders;
            });
    }

}