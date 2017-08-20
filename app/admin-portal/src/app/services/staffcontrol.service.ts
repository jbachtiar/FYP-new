import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CONFIG } from '../config/config.component';

@Injectable()
export class StaffcontrolService {
    private user;

    constructor(private _http: Http) { }

    getUser() {
        return  this.user;
    }
         
    
    addNewStaff(email: string, firstName : string, lastName : string, phoneNumber :string, password: string, roleCode : string ){
        let params: URLSearchParams = new URLSearchParams();
        let headers= new Headers();
        
       
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
     
        params.set('email', email);
        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('phoneNumber', phoneNumber);
        params.set('password', password);
        params.set('roleCode', roleCode);
        

        return this._http.post('http://localhost:8084/FYP-backend/API/staff/addNewStaff',params.toString(), {headers: headers} )
            .map(res => res.json());
    }

    displayProfile(token: string){
      //  let params: URLSearchParams = new URLSearchParams();
      //  params.set('token', token);
        let headers= new Headers();
        let url = CONFIG.staffBackendUrl;
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        //headers.append ('Authorization', token);

        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        );

        return this._http.post(url+'/retrieve', params.toString(), {headers} )

       // let options = new RequestOptions({ headers: headers, params: params });
       // return this._http.get('http://localhost:8084/FYP-backend/API/profile/retrieve', options )
            .map(res => {
                // login successful if there's a jwt token in the response
                let user = res.json();
            
                if (user) {

                    this.user={
                        email: user.email, 
                        firstName:user.firstName, 
                        lastName:user.lastName, 
                        phoneNumber:user.phoneNumber, 
                        password:user.password, 
                        roleCode:user.roleCode
                    }
                 
                    console.log(this.user);
            
                 return user;
                 
                }
            
            });
        }

    
    updateProfile(token : string, email: string, firstName : string, lastName : string, phoneNumber :string, password: string, roleCode : string ){
        let params: URLSearchParams = new URLSearchParams();
        params.set('email', email);
        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('phoneNumber', phoneNumber);
        params.set('password', password);
        params.set('roleCode', roleCode);
        
        params.set('token', token);
        let headers= new Headers();
        //headers.append ('Authorization', token);
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        )

        let url = CONFIG.staffBackendUrl;
        return this._http.put(url + '/update',params.toString(), {headers} )
             .map(res => res.json());
                
            
    }
}