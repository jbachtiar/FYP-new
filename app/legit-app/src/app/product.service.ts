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
        let url = CONFIG.productCatalogueBackendUrl+'/uniquePatterns';
    
        return this._http.get(url)
            .map(res => {
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

    getPatternById(patternId: string){
        let url = CONFIG.productCatalogueBackendUrl+'/customization';
        let finalUrl = url + "?patternId=" + patternId
         return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                console.log("product is loaded"+res.json().pattern);
                return res.json().pattern;
                // return mockJson.pattern;
            });
    }

  /*  getFilteredList(collectionId: string, fabricId: string, colourId: string, sortPrice: String){
        let url = CONFIG.filteredProductListBackendUrl
        let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice
         return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                console.log("product is loaded"+res.json().products);
                return res.json().products;
            });
    }

    getSearchedList(query: string){
        let url = CONFIG.searchedProductListBackendUrl
        let finalUrl = url + "?search=" + query;
         return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                console.log("product is loaded"+res.json().products);
                return res.json().products;
            });
    }*/

    getFilteredProductList(collectionId: string, fabricId: string, colourId: string, sortPrice: String, query: string){
        let url = CONFIG.filteredProductListBackendUrl
        let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice + "&search=" + query;
         return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                console.log("product is loaded"+res.json().products);
                return res.json().products;
            });
    }


}