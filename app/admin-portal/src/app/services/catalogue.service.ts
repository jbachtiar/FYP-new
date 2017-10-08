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

    getProductById(productId: string) {
        let url = CONFIG.productCatalogueBackendUrl + '/getProductById';
        let finalUrl = url + "?productId=" + productId
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                return res.json();
            });
    }

    getPatternById(patternId: string){
        let url = CONFIG.patternBackendUrl + '/getPatternById';
        let finalUrl = url + "?patternId=" + patternId
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                return res.json();
            });
    }

    getFabricById(fabricId: string){
        let url = CONFIG.fabricBackendUrl + '/getFabricById';
        let finalUrl = url + "?fabricId=" + fabricId
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                return res.json();
            });
    }

    getColourById(colourId: string){
        let url = CONFIG.colourBackendUrl + '/getColourById';
        let finalUrl = url + "?colourId=" + colourId
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                return res.json();
            });
    }

    getCollectionById(collId: string){
        let url = CONFIG.collectionBackendUrl + '/getCollectionById';
        let finalUrl = url + "?collectionId=" + collId
        return this._http.get(finalUrl)
            .map(res => {
                console.log(finalUrl)
                return res.json();
            });
    }

    
    updateProduct(product) {
        let url = CONFIG.productCatalogueBackendUrl + "/update";
        let params: URLSearchParams = new URLSearchParams();
        params.set('product', JSON.stringify(product));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res)
    }

    updatePattern(pattern){
        let url = CONFIG.patternBackendUrl + "/update";
        let params: URLSearchParams = new URLSearchParams();
        params.set('pattern', JSON.stringify(pattern));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res)
    }

    updateFabric(fabric){
        let url = CONFIG.fabricBackendUrl + "/update";
        let params: URLSearchParams = new URLSearchParams();
        params.set('fabric', JSON.stringify(fabric));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res)
    }

    updateColour(colour){
        let url = CONFIG.colourBackendUrl + "/update";
        let params: URLSearchParams = new URLSearchParams();
        params.set('colour', JSON.stringify(colour));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res)
    }

    updateCollection(coll){
        let url = CONFIG.collectionBackendUrl + "/update";
        let params: URLSearchParams = new URLSearchParams();
        params.set('collection', JSON.stringify(coll));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res.json())
    }

    saveProduct(product) {
        let url = CONFIG.productCatalogueBackendUrl + "/save";
        let params: URLSearchParams = new URLSearchParams();
        params.set('product', JSON.stringify(product));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res.json())
    }

    savePattern(pattern){
        let url = CONFIG.patternBackendUrl + "/save";
        let params: URLSearchParams = new URLSearchParams();
        params.set('pattern', JSON.stringify(pattern));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res.json())
    }

    saveFabric(fabric){
        let url = CONFIG.fabricBackendUrl + "/save";
        let params: URLSearchParams = new URLSearchParams();
        params.set('fabric', JSON.stringify(fabric));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res.json())
    }

    saveColour(colour){
        let url = CONFIG.colourBackendUrl + "/save";
        let params: URLSearchParams = new URLSearchParams();
        params.set('colour', JSON.stringify(colour));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res.json())
    }

    saveCollection(coll){
        let url = CONFIG.collectionBackendUrl + "/save";
        let params: URLSearchParams = new URLSearchParams();
        params.set('collection', JSON.stringify(coll));
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(url, params.toString(), {
            headers: headers
        }).map(res => res.json())
    }
}