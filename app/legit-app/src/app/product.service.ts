import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProductService {
    constructor(private _http: Http) { }

    getProductList(){
        let params: URLSearchParams = new URLSearchParams();
        //change url when backend is ready
        let url = ""
        let tempRes = {
            "status": "200",
            "products": [
                {
                "id": "1",
                "name": "Product 1",
                "price": "100"
                },
                {
                "id": "2",
                "name": "Product 2",
                "price": "100"
                },
                {
                "id": "3",
                "name": "Product 3",
                "price": "100"
                },
                {
                "id": "4",
                "name": "Product 4",
                "price": "100"
                },
                {
                "id": "5",
                "name": "Product 5",
                "price": "100"
                },
                {
                "id": "6",
                "name": "Product 6",
                "price": "100"
                },
                {
                "id": "7",
                "name": "Product 7",
                "price": "100"
                },
                {
                "id": "8",
                "name": "Product 8",
                "price": "100"
                },
                {
                "id": "9",
                "name": "Product 9",
                "price": "100"
                },
                {
                "id": "10",
                "name": "Product 10",
                "price": "100"
                },
                {
                "id": "11",
                "name": "Product 11",
                "price": "100"
                },
                {
                "id": "12",
                "name": "Product 12",
                "price": "100"
                }
            ]
            }
        //change tempRes when backend is ready
        return this._http.get(url, {search: params} )
                .map(res => tempRes.products)
    }
}