import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private _http: Http) { }
    
    login(email: string, password: string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email);
        params.set('password', password);
        let headers= new Headers();
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
        return this._http.post('http://localhost:8084/FYP-backend/API/authentication/login',params.toString(), {headers: headers} )
            .map(res => {
                // login successful if there's a jwt token in the response
                let responseJson = res.json();
                if (responseJson && responseJson.token) {
                    console.log("RES: " + responseJson);
                    console.log("TOKEN:" + responseJson.token);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(responseJson));
                    localStorage.setItem('token', responseJson.token);
                }
                return responseJson;
            });
        }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}