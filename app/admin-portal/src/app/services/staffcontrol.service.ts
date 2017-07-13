import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class StaffcontrolService {
    constructor(private _http: Http) { }
    
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

    updateProfile(email: string, firstName : string, lastName : string, phoneNumber :string, password: string, roleCode : string ){
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

        return this._http.post('http://localhost:8084/FYP-backend/API/staff/updateProfile',params.toString(), {headers: headers} )
            .map(res => res.json());
        
    }
}