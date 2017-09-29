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
                //console.log("product is loaded"+res.json().patterns);
                return res.json().patterns;
                // return mockJson.products;
            });
    }

    //getProductById(productId: string) {
    // let url = CONFIG.quickViewBackendUrl;
    // let finalUrl = url + "?productId=" + productId;
    // return this._http.get(finalUrl).map(res => {
    //   console.log("product is loaded" + res.json().status);

    //  return res.json().product;

    //  });
    // }

    getPatternById(patternId: string) {
        let url = CONFIG.productCatalogueBackendUrl + '/customize';
        let finalUrl = url + "?patternId=" + patternId
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                console.log("product is loaded" + res.json().pattern);
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

    getFilteredProductList(collectionId: string, fabricId: string, colourId: string, sortPrice: string, query: string) {
        let url = CONFIG.filteredProductListBackendUrl
        let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice + "&search=" + query;
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                console.log("product is loaded" + res.json().patterns);
                return res.json().patterns;
            });
    }

    public getProductById(patternId: string, fabricId: string, colourId: string) {
        console.log('pattern: ' + patternId)
        console.log('fabric: ' + fabricId)
        console.log('colour: ' + colourId)


        let url = CONFIG.productCatalogueBackendUrl + '/getProductId?patternId=' + patternId + '&fabricId=' + fabricId + '&colourId=' + colourId;
        return this._http.get(url)
            .map(res => {
                //console.log(res.json().productId)

                if (res.status === 200) {

                    return res.json()

                }
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


    getProductCatalogueFilters() {
        let url = CONFIG.filterBackendUrl
        return this._http.get(url)
            .map(res => {
                console.log(url)
                console.log("filter is loaded" + res.json().filters);
                return res.json().filters;
            });
    }


    public chargeStripe(token) {
        //get token from stripe response
        //send token to backend
    }
}