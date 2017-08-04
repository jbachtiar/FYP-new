import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from './config/config.component';


@Injectable()
export class ProductService {
  

    constructor(private _http: Http) { }

    getProductList() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.productListBackendUrl;
    
        return this._http.get(url)
            .map(res => {
                console.log(res);
                //console.log("product is loaded"+res.json().patterns);
                return res.json().products;
               // return mockJson.products;
            });
    }

    getProductById(productId: string) {
        let url = CONFIG.quickViewBackendUrl;
        let finalUrl= url+"?sku="+productId;
        return this._http.get(finalUrl).map(res => {
                 console.log("product is loaded"+res.json().status);
                
                 return res.json().product;
              
        });
    }


    getFilteredList() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.productListBackendUrl;
        let mockJson = {
  "status": "200",
  "products": [
    {
      "id": "1",
      "name": "Product 1",
      "pattern_id": "2",
      "fabric_id": "1",
      "colour_id": "1",
      "pattern_name": "hello kitty",
      "fabric_name": "wool",
      "colour_name": "red",
      "pattern_price": "100",
      "fabric_price": "30",
      "colour_price": "20"
    },
    {
      "id": "3",
      "name": "Product 3",
      "pattern_id": "2",
      "fabric_id": "1",
      "colour_id": "1",
      "pattern_name": "hello kitty",
      "fabric_name": "wool",
      "colour_name": "red",
      "pattern_price": "100",
      "fabric_price": "30",
      "colour_price": "20"
    },
    {
      "id": "5",
      "name": "Product 5",
      "pattern_id": "2",
      "fabric_id": "1",
      "colour_id": "1",
      "pattern_name": "hello kitty",
      "fabric_name": "wool",
      "colour_name": "red",
      "pattern_price": "100",
      "fabric_price": "30",
      "colour_price": "20"
    }
  ]
}

        return this._http.get(url)
            .map(res => {
                //console.log("product is loaded"+res.json().patterns);
                // return res.json().patterns;
                return mockJson.products;
            });
    }

    getPatternById(patternId: string){
        let url = CONFIG.productDetailsBackendUrl
        let finalUrl = url + "?patternId=" + patternId
         return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                console.log("product is loaded"+res.json().pattern);
                console.log(res);
                console.log(res.json());
                
                return res.json().pattern;
                // return mockJson.pattern;
            });
    }
    
    addToCart(patternId : string, fabricId : string, colourId : string, qty : number){
      console.log('pattern : '+ patternId);
      console.log('fabric : '+ fabricId);
      console.log('colour : '+ colourId);
      console.log('qty : '+ qty);
    }
}