import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from './config/config.component';


@Injectable()
export class OrderService {


    constructor(private _http: Http) { }



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