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
        let url = CONFIG.productCatalogueBackendUrl + '/uniquePatterns';
        let mockRes = {
            "status": "200",
            "orders": [
              {
                "order_id": 1,
                "order_date": "20/02/2017",
                "address_line": "21 Blbalbal Road",
                "city": "singapore",
                "country": "singapore",
                "postal_code": "203949",
                "stripe_charge_id": "293094094ABC",
                "email": "lalala@yahoo.com",
                "order_items": [
                  {
                    "product_id": "1",
                    "quantity": "2"
                  },
                  {
                    "product_id": "4",
                    "quantity": "1"
                  }
                ],
                "order_status_log": [
                  {
                    "status_id": "1",
                    "status_name": "Payment Received",
                    "start_timestamp": "20202020"
                  },
                  {
                    "status_id": "2",
                    "status_name": "Production",
                    "start_timestamp": "30300303"
                  }
                ]
              },
              {
                "order_id": 2,
                "order_date": "20/02/2017",
                "address_line": "21 Blbalbal Road",
                "city": "singapore",
                "country": "singapore",
                "postal_code": "203949",
                "stripe_charge_id": "293094094ABC",
                "email": "lalala@yahoo.com",
                "order_items": [
                  {
                    "product_id": "1",
                    "quantity": "2"
                  },
                  {
                    "product_id": "4",
                    "quantity": "1"
                  }
                ],
                "order_status_log": [
                  {
                    "status_id": "1",
                    "status_name": "Payment Received",
                    "start_timestamp": "20202020"
                  },
                  {
                    "status_id": "2",
                    "status_name": "Production",
                    "start_timestamp": "30300303"
                  },
                  {
                    "status_id": "3",
                    "status_name" : "Packaging",
                    "start_timestamp": "49505059"
                  }
                ]
              },
              {
                "order_id": 3,
                "order_date": "20/02/2017",
                "address_line": "21 Blbalbal Road",
                "city": "singapore",
                "country": "singapore",
                "postal_code": "203949",
                "stripe_charge_id": "293094094ABC",
                "email": "lalala@yahoo.com",
                "order_items": [
                  {
                    "product_id": "1",
                    "quantity": "2"
                  },
                  {
                    "product_id": "4",
                    "quantity": "1"
                  }
                ],
                "order_status_log": [
                  {
                    "status_id": "1",
                    "status_name": "Payment Received",
                    "start_timestamp": "20202020"
                  }
                ]
              }
            ]
          }
        return this._http.get(url)
            .map(res => {
                //console.log("product is loaded"+res.json().patterns);
                // return res.json().products;
                return mockRes.orders;
            });

    }
}