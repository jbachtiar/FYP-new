import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CONFIG } from './config/config.component'

@Injectable()
export class FabricService {
    

    constructor(private _http: Http) { }

    getFabricsByPatternId(patternId: string) {
        let url = CONFIG.fabricBackendUrl;
        let finalUrl= url+"?patternId="+patternId;
        console.log(finalUrl);
        return this._http.get(finalUrl).map(res => {
            console.log("fabric is loaded"+res.json().status);
        
            return res.json().fabrics;
              
        });
    }

}