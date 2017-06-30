import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class SuperuserService {
    constructor(private _http: Http) { }
    addAdmin(id: string, password: string){
        let params: URLSearchParams = new URLSearchParams();
        let headers= new Headers();
        
        
        headers.append (
           'Content-type','application/x-www-form-urlencoded'
        );
     
        params.set('id', id);
        params.set('password', password);

        return this._http.post('http://localhost:8084/FYP-backend/API/superuser/addAdmin',params.toString(), {headers: headers} )
            .map(res => res.json());
    }    
    
    

}