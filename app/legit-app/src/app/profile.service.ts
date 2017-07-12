import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ProfileService {
     private customer;
   

    getCustomer() {
        return  this.customer;
    }
                   

    constructor(private _http: Http) { }
    
    displayProfile(token: string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        let headers= new Headers();
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
        return this._http.post('http://localhost:8084/FYP-backend/API/profile/retrieve',params.toString(), {headers: headers} )

       // let options = new RequestOptions({ headers: headers, params: params });
       // return this._http.get('http://localhost:8084/FYP-backend/API/profile/retrieve', options )
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

        updateProfile(token: string , firstName: string, lastName:string, contact:string, address: string, postalCode: string, password: string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('phoneNumber',contact);
        params.set('address', address);
        params.set('postalCode', postalCode);
        params.set('password', password);
        let headers= new Headers();
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
        return this._http.post('http://localhost:8084/FYP-backend/API/profile/update',params.toString(), {headers: headers} )
             .map(res => res.json());
                
            

        }

   

}