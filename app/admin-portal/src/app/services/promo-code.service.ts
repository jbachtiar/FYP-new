import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PromoCode } from '../models/promo-code'

import 'rxjs/add/operator/map'
import { CONFIG } from '../config/config.component';


@Injectable()
export class PromoCodeService {
    constructor(private _http: Http) {}


    getAllPromos(token: string) {
        let params: URLSearchParams = new URLSearchParams();
        let headers = new Headers();


        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        );

        params.set('token', token);

        return this._http.post(CONFIG.promoCodeBackendUrl + "/retrieveAll", params.toString(), { headers: headers })
            .map(res => res.json());
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

    addPromo(token : string, promoCode : PromoCode){
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        params.set('promoCode', JSON.stringify(promoCode));

        let headers = new Headers();
        //headers.append ('Authorization', token);
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.promoCodeBackendUrl;
        return this._http.post(url + '/add', params.toString(), { headers })
            .map(res => res.json());

    }

}