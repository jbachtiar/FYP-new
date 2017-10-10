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

    getCouriers() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.orderBackendUrl + '/getAllCouriers';
        return this._http.get(url)
            .map(res => {
                return res.json().couriers;
            });

    }

    getOrderStatus() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.orderStatusLogBackendUrl + '/getAllOrderStatus';
        return this._http.get(url)
            .map(res => {
                return res.json().orderStatus;
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
                // for(let oi of orderItems){
                //     oi.product['itemStatus'] = "COMPLETE";
                // }
                // orderItems[0].product['itemStatus'] = "INCOMPLETE"

                // return res.json().orders;
                return orders;
            });
    }

    updateOrderStatus(orderId, previousStatusId, newStatusId) {
        let url = CONFIG.orderStatusLogBackendUrl + '/update?orderId=' + orderId + '&previousStatusId=' + previousStatusId + '&newStatusId=' + newStatusId
        return this._http.get(url)
            .map(res => {
                console.log("STATUS UPDATED")
                return res.json();
            });
    }

    updateItemStatus(orderId, productId, newStatus) {
        // /OrderItemService/updateOrderItemStatus?orderId=2&productId=11&newStatus=COMPLETED
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.orderItemBackendUrl + '/updateOrderItemStatus?orderId=' +
            orderId + '&productId=' + productId + '&newStatus=' + newStatus
        return this._http.get(url, params.toString())
            .map(res => res.json());
    }

    updateOrder(orderJson) {
        let url = CONFIG.orderBackendUrl + "/update";
        console.log("NEW ORDER: " + JSON.stringify(orderJson))

        let params: URLSearchParams = new URLSearchParams();
        console.log("Update order SERVICE")
        params.set('order', JSON.stringify(orderJson));

        console.log(params)
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res)
    }

}