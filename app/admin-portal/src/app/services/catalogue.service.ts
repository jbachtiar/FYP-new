import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from '../config/config.component';


@Injectable()
export class CatalogueService {


    constructor(private _http: Http) { }

    getAllCollections() {
        let url = CONFIG.collectionBackendUrl + '/getCollections'
        return this._http.get(url)
            .map(res => {
                return res.json().collections;
            });

    }

    getAllFabrics() {
        let url = CONFIG.fabricBackendUrl + '/getFabrics'
        return this._http.get(url)
            .map(res => {
                return res.json().fabrics;
            });
    }

    getAllColours() {
        let url = CONFIG.colourBackendUrl + '/getColours'
        return this._http.get(url)
            .map(res => {
                return res.json().colours;
            });
    }

    getAllProducts() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.productCatalogueBackendUrl + '/BeddingPatterns';

        return this._http.get(url)
            .map(res => {
                return res.json().patterns;
            });
    }

    getAllPatterns() {
        let url = CONFIG.patternBackendUrl + '/getPatterns';
        console.log("URL: " + url);
        

        return this._http.get(url)
            .map(res => {
                console.log("PATTERNS3: " + JSON.stringify(res.json().patterns))
                
                return res.json().patterns;
            });
    }


}