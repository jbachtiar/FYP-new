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
<<<<<<< HEAD
                console.log("product is loaded"+res.json().products);
                return res.json().products;
=======
                console.log("product is loaded"+res.json().pattern);
                console.log(res);
                console.log(res.json());
                
                return res.json().pattern;
                // return mockJson.pattern;
>>>>>>> add-cart
            });
    }

    getProductId(patternId: string, fabricId: string, colourId: string){
        console.log('pattern: ' + patternId)
        console.log('fabric: ' + fabricId)
        console.log('colour: ' +colourId)


        let url = CONFIG.productCatalogueBackendUrl + '/getProductId?patternId=' + patternId + '&fabricId=' + fabricId + '&colourId=' + colourId;
        return this._http.get(url)
            .map(res => {
                //console.log(res.json().productId)
                return res.json().productId
            })                 
            //console.log('product ID: '+ res.json().productId);



    }

    
    public getPriceById(productId: string) {
        //get price by product Id from DB.
        var totalPrice: number = 0
        let params: URLSearchParams = new URLSearchParams();
        //let headers = new Headers();
        let url = CONFIG.cartBackendUrl + '/productPrice?productId=' + productId;

        //params.set('productId', productId);
        return this._http.get(url)
            .map(res => res.json().totalPrice);

    }

    // addToCart(token:string, patternId : string, fabricId : string, colourId : string, qty : number){
    //     console.log('pattern : ' + patternId);
    //     console.log('fabric : ' + fabricId);
    //     console.log('colour : ' + colourId);
    //     console.log('qty : ' + qty);

    //     let params: URLSearchParams = new URLSearchParams();
    //     params.set('patternId', patternId);
    //     params.set('fabricId', fabricId);
    //     params.set('colourId', colourId);
    //     params.set('qty', String(qty));

    //     let headers= new Headers();
    //     headers.append ('Authorization', token);
    //     headers.append (
    //        'Content-type','application/x-www-form-urlencoded'
    //     )

    //     //let url = CONFIG.addToCartBackendUrl;
    //     return this._http.post(url ,params.toString(), {headers} )
    //          .map(res => res.json());
                
    // }
}