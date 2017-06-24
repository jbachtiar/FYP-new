import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private _http: Http) { }

    login(username: string, password: string){
        // let params: URLSearchParams = new URLSearchParams();
        // params.set('username', username);
        // params.set('password', password);
        // return this.http.get('http://localhost:8084/FYP/API/authentication/', { search: params } )
    }

}