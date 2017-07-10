import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ProfileService {
     private customer;
   

    getCustomer() {
        return  this.customer;
    }
                   

    constructor(private _http: Http) { }
    
    displayProfile(email: string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email);
        let headers= new Headers();
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
        return this._http.post('http://localhost:8084/FYP-backend/API/profile/retrieve',params.toString(), {headers: headers} )
            .map(res => {
                // login successful if there's a jwt token in the response
                let user = res.json();
            
                if (user) {

                    this.customer={firstName:user.firstName, lastName:user.lastName, contact:user.phoneNumber, address:user.address, postalCode:user.postalCode, password:user.password}
                 
                    console.log(this.customer);
            
                 return user;
                 
                }
            
            });
        }

   

}