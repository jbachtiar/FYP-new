import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import { CONFIG } from '../config/config.component';


@Injectable()
export class PromoCodeService {
    constructor(private _http: Http) {}


    getFilteredPatternList(collectionId: string, fabricId: string, colourId: string, sortPrice: String, query: string) {
        let url = CONFIG.productCatalogueBackendUrl + '/adminPatternFilter';
        let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice + "&search=" + query;
        return this._http.get(finalUrl)
            .map(res => {
                // console.log(finalUrl)
                return res.json().products;
            });
    }

    
    getAllPromos() {

        let url = CONFIG.promoCodeBackendUrl + '/getAllPromoCodes';

        return this._http.get(url)
            .map(res => {
                // console.log(url)
                return res.json().promoCodes;
        });
    }

    deletePromo(token: string, promoId : string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        params.set('promoId', promoId);

        let headers = new Headers();
        //headers.append ('Authorization', token);
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.promoCodeBackendUrl;
        return this._http.post(url + '/delete', params.toString(), { headers })
            .map(res => res.json());


    }

}