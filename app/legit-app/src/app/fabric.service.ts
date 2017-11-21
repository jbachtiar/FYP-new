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
    
        return this._http.get(finalUrl).map(res => {
     
        
            return res.json().fabrics;
              
        });
    }

}