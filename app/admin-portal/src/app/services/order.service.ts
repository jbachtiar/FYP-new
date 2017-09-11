import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from '../config/config.component';


@Injectable()
export class OrderService {


    constructor(private _http: Http) { }

    getOrders() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.orderBackendUrl + '/getAllOrders';
        return this._http.get(url)
            .map(res => {
                return res.json().orders;
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
                for(let oi of orderItems){
                    oi.product['itemStatus'] = "COMPLETE";
                }
                orderItems[0].product['itemStatus'] = "INCOMPLETE"
                
                // return res.json().orders;
                return orders;
            });
    }

    updateOrderStatus(orderId, previousStatusId, newStatusId) {
        let url = CONFIG.orderStatusLogBackendUrl + '/update?orderId=' + orderId + '&previousStatusId=' + previousStatusId + '&newStatusId=' + newStatusId
        return this._http.get(url)
            .map(res=>{
                console.log("STATUS UPDATED")
                return res.json();
            });
    }

}