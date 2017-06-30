import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private _http: Http) { }
    login(username: string, password: string){
        let params: URLSearchParams = new URLSearchParams();
        let headers= new Headers();
        
        
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
     
        params.set('email', username);
        params.set('password', password);

        return this._http.post('http://localhost:8084/FYP/API/authentication/login',params.toString(), {headers: headers} )
            .map(res => res.json());
    }

}