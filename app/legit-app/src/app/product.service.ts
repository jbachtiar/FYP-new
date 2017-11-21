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
           
                return res.json().patterns;
                // return mockJson.products;
            });
    }



    getPatternById(patternId: string) {
        let url = CONFIG.productCatalogueBackendUrl + '/customize';
        let finalUrl = url + "?patternId=" + patternId
        return this._http.get(finalUrl)
            .map(res => {

                return res.json().pattern;
                // return mockJson.pattern;
            });
    }

    /*  getFilteredList(collectionId: string, fabricId: string, colourId: string, sortPrice: String){
      let url = CONFIG.filteredProductListBackendUrl
      let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice
       return this._http.get(finalUrl)
          .map(res => {

              return res.json().products;
          });
  }
  getSearchedList(query: string){
      let url = CONFIG.searchedProductListBackendUrl
      let finalUrl = url + "?search=" + query;
       return this._http.get(finalUrl)
          .map(res => {
 
              return res.json().products;
          });
  }*/

    getFilteredProductList(collectionId: string, fabricId: string, colourId: string, sortPrice: string, query: string) {
        let url = CONFIG.filteredProductListBackendUrl
        let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice + "&search=" + query;
        return this._http.get(finalUrl)
            .map(res => {
         
                return res.json().patterns;
            });
    }

    public getProductById(patternId: string, fabricId: string, colourId: string) {



        let url = CONFIG.productCatalogueBackendUrl + '/getProductId?patternId=' + patternId + '&fabricId=' + fabricId + '&colourId=' + colourId;
        return this._http.get(url)
            .map(res => {
           

                if (res.status === 200) {

                    return res.json()

                }
            })



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
         
                return res.json().filters;
            });
    }


    public chargeStripe(token) {
        //get token from stripe response
        //send token to backend
    }


    public getProductRecommendation(token: string, productId, prefValue: number, guestPreference: any = {}) {
        let url = CONFIG.mahoutBackendUrl + '/save'
        let finalUrl = url + "?token=" + token + "&productId=" + productId + "&prefValue=" + prefValue + "&guestItems=" + guestPreference;
        return this._http.get(finalUrl)
            .map(res => {
            
                return res.json().products;
            });
    }

    public getProductIdsByPatternId(patternId) {
        let url = CONFIG.productCatalogueBackendUrl + '/getAllProductIds'
        let finalUrl = url + "?patternId=" + patternId;
        return this._http.get(finalUrl)
            .map(res => {
           
                return res.json().product_ids;
            });
    }
}