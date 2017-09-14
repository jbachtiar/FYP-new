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
                //console.log("ORDER: " + res.json().orders)
                let orders = res.json().orders;
               // console.log(orders);
                //temp
            /*    let orderItems = orders[0].orderItems
                for (let oi of orderItems) {
                    oi.product['itemStatus'] = "COMPLETE";
                }
                orderItems[0].product['itemStatus'] = "INCOMPLETE"
                */
                // return res.json().orders;
                return orders;
            });
    }

}