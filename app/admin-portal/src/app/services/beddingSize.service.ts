import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Staff } from "../models/staff";
import 'rxjs/add/operator/map'

import { CONFIG } from '../config/config.component';


@Injectable()
export class BeddingSizeService {


    constructor(private _http: Http) { }

    getAllBeddingSizes() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.beddingSizeBackendUrl + '/getAllBeddingSizes';
        return this._http.get(url)
            .map(res => {
                return res.json().sizes;
            });

    }




}