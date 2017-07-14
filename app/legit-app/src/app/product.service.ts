import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from './config/config.component';


@Injectable()
export class ProductService {
    constructor(private _http: Http) { }

    getProductList(){
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.productListBackendUrl;
        return this._http.get(url)
                .map(res => {
                    return res.json().patterns;
                });
    }
}