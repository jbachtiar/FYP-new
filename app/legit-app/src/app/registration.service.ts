import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from './config/config.component'

@Injectable()
export class RegistrationService {
    constructor(private _http: Http) { }


       register(firstName: string, lastName: string, email:string, contact:string, address: string, postalCode: string, password: string){
        let params: URLSearchParams = new URLSearchParams();
        let headers= new Headers();
        let url = CONFIG.registrationBackendUrl;
        
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
     
        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('phoneNumber', contact);
        params.set('address', address);
        params.set('postalCode', postalCode);
        params.set('password', password);
        params.set('email', email);

        return this._http.post(url,params.toString(), {headers: headers} )
            .map(res => res.json());
    }

    

}