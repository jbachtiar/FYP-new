import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from './config/config.component'

@Injectable()
export class RegistrationService {
    constructor(private _http: Http) { }


    register(firstName: string, lastName: string, email: string, contact: string, country: string, city: string, address: string, postalCode: string, password: string) {
        let params: URLSearchParams = new URLSearchParams();
        let headers = new Headers();
        let url = CONFIG.registrationBackendUrl + '/insert';

        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        );

        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('phoneNumber', contact);
        params.set('country', country);
        params.set('city', city);
        params.set('address', address);
        params.set('postalCode', postalCode);
        params.set('password', password);
        params.set('email', email);

        return this._http.post(url, params.toString(), { headers: headers })
            .map(res => res.json());
    }

    verifyCode(email: string, code: string) {
        let url = CONFIG.registrationBackendUrl + '/verifyCode';
        let finalUrl = url + "?email=" + email + "&code=" + code;
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                return res.json();
            });
    }

    verifyAccount(token: string, code: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        params.set('code', code);

        let headers = new Headers();
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        );

        return this._http.post(CONFIG.registrationBackendUrl + '/verifyAcc', params.toString(), { headers: headers })
            .map(res => {
                console.log("RES: " + res)
                return res.json();
            });
    }

}



