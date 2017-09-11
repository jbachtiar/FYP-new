import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Staff } from "../models/staff";
import 'rxjs/add/operator/map'

import { CONFIG } from '../config/config.component';

@Injectable()
export class StaffcontrolService {
    private user: Staff;

    constructor(private _http: Http) { }

    getUser() {
        return this.user;
    }


    addNewStaff(token: string, newStaff: Staff) {
        let params: URLSearchParams = new URLSearchParams();
        let headers = new Headers();


        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        );

        params.set('token', token);
        params.set('staff', JSON.stringify(newStaff));

        return this._http.post(CONFIG.staffBackendUrl + '/addStaff', params.toString(), { headers: headers })
            .map(res => res.json());
    }

    getAllStaff(token: string) {
        let params: URLSearchParams = new URLSearchParams();
        let headers = new Headers();


        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        );

        params.set('token', token);

        return this._http.post(CONFIG.staffBackendUrl + "/getAllStaff", params.toString(), { headers: headers })
            .map(res => res.json());
    }

    getAllRoles() {
        return this._http.get(CONFIG.staffBackendUrl + "/getRoles")
            .map(res => res.json());
    }

    displayProfile(token: string) {
        //  let params: URLSearchParams = new URLSearchParams();
        //  params.set('token', token);
        let headers = new Headers();
        let url = CONFIG.staffBackendUrl;
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        //headers.append ('Authorization', token);

        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        );

        return this._http.post(url + '/retrieve', params.toString(), { headers })
            
            // let options = new RequestOptions({ headers: headers, params: params });
            // return this._http.get('http://localhost:8084/FYP-backend/API/profile/retrieve', options )
            .map(res => {
                console.log(url)
                console.log(res.toString())
                return res.json();


            });
    }


    updateProfile(token: string, user : Staff) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        params.set('staff', JSON.stringify(user));

        let headers = new Headers();
        //headers.append ('Authorization', token);
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.staffBackendUrl;
        return this._http.post(url + '/update', params.toString(), { headers })
            .map(res => res.json());


    }
    deleteStaff(token: string, email : string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        params.set('email', email);

        let headers = new Headers();
        //headers.append ('Authorization', token);
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.staffBackendUrl;
        return this._http.post(url + '/delete', params.toString(), { headers })
            .map(res => res.json());


    }

    editStaff(token: string, s : Staff){
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        params.set('staff', JSON.stringify(s));

        let headers = new Headers();
        //headers.append ('Authorization', token);
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.staffBackendUrl;
        return this._http.post(url + '/edit', params.toString(), { headers })
            .map(res => res.json());

    }
}