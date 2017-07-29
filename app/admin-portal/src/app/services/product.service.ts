import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from '../config/config.component';


@Injectable()
export class ProductService {
  

    constructor(private _http: Http) { }

    getPatternList() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.patternListBackendUrl;
    
        return this._http.get(url)
            .map(res => {
                //console.log("product is loaded"+res.json().patterns);
                return res.json().products;
               // return mockJson.products;
            });
    }





   
}