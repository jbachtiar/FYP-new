import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from '../config/config.component';


@Injectable()
export class ProductService {


    constructor(private _http: Http) { }

    getPatternList() {
        let params: URLSearchParams = new URLSearchParams();
        let url = CONFIG.productCatalogueBackendUrl + '/BeddingPatterns';

        return this._http.get(url)
            .map(res => {
                //console.log("product is loaded"+res.json().patterns);
                return res.json().patterns;
                // return mockJson.products;
            });
    }

    getFilteredPatternList(collectionId: string, fabricId: string, colourId: string, sortPrice: String, query: string) {
        let url = CONFIG.productCatalogueBackendUrl + '/adminPatternFilter';
        let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice + "&search=" + query;
        return this._http.get(finalUrl)
            .map(res => {
                // console.log(finalUrl)
                return res.json().products;
            });
    }

    addPattern(patternID: string, patternName: string, patternDescription: string, patternPrice: string, collectionID: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('patternID', patternID);
        params.set('patternName', patternName);
        params.set('patternDescription', patternDescription);
        params.set('patternPrice', patternPrice);
        params.set('collectionID', collectionID);

        let headers = new Headers();
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.patternCatalogueBackendUrl + '/addPattern';
        return this._http.put(url, params.toString(), { headers })
            .map(res => res.json());

    }

    // updatePattern(patternID: string, patternName: string, patternDescription: string, patternPrice: string, collectionID: string) {
    //     console.log("Pattern Details: " + patternID, patternName, patternDescription, patternPrice, collectionID);
    //     let params: URLSearchParams = new URLSearchParams();
    //     params.set('patternID', patternID);
    //     params.set('patternName', patternName);
    //     params.set('patternDescription', patternDescription);
    //     params.set('patternPrice', patternPrice);
    //     params.set('collectionID', collectionID);

    //     let headers = new Headers();
    //     headers.append(
    //         'Content-type', 'application/x-www-form-urlencoded'
    //     )

    //     let url = CONFIG.patternCatalogueBackendUrl + '/updatePattern';
    //     return this._http.put(url, params.toString(), { headers })
    //         .map(res => res.json());

    // }

    getPatternById(patternId: string) {
        let url = CONFIG.productCatalogueBackendUrl + '/customize';
        let finalUrl = url + "?patternId=" + patternId
        return this._http.get(finalUrl)
            .map(res => {
                // console.log(finalUrl)
                // console.log("product is loaded: " + res.json().pattern);
                return res.json().pattern;
            });
    }

    getPatternByName(patternName: string) {
        let url = CONFIG.productCatalogueBackendUrl + '/patternCombination';
        let finalUrl = url + "?patternName=" + patternName
        return this._http.get(finalUrl)
            .map(res => {
                // console.log(finalUrl)
                // console.log("product is loaded: " + res.json().pattern);
                return res.json().pattern;
            });
    }

    getAllFabrics() {
        let url = CONFIG.productCatalogueBackendUrl + '/fabrics';
        return this._http.get(url)
            .map(res => {
                return res.json().fabrics;
            });
    }

    getAllCollections() {
        let url = CONFIG.productCatalogueBackendUrl + '/collections'
        return this._http.get(url)
            .map(res => {
                return res.json().collections;
            });
    }

    updatePatternFabric(patternID, fabricID) {
        let url = CONFIG.productCatalogueBackendUrl + '/updatePatternFabric';
        let params: URLSearchParams = new URLSearchParams();
        params.set('patternID', patternID);
        params.set('fabridID', fabricID);
        let headers = new Headers();
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )
        return this._http.put(url, params.toString(), { headers })
            .map(res => res.json());
    }

    getFabricsByPatternID(patternID) {
        let url = CONFIG.fabricCatalogueBackendUrl + '/patternFabric?patternID=' + patternID;
        return this._http.get(url)
            .map(res => {
                return res.json().fabrics;
            });
    }

    getAllColours() {
        let url = CONFIG.productCatalogueBackendUrl + '/colours';
        return this._http.get(url)
            .map(res => {
                return res.json().colours;
            });
    }

    updatePattern(patternJson) {
        // console.log("UPDATE PATTERN SERVICE")
        var params = JSON.stringify(patternJson);
        const headers = new Headers();
        let url = CONFIG.productCatalogueBackendUrl + '/update'
        headers.append('Content-Type', 'application/json');
        return this._http.post(url, params, {
            headers: headers
        }).map(res => res
            )
    }

    getProductCatalogueFilters() {
        let url = CONFIG.filterBackendUrl
        return this._http.get(url)
            .map(res => {
                // console.log(url)
                // console.log("filter is loaded" + res.json().filters);
                return res.json().filters;
            });
    }

    getFilteredProductList(collectionId: string, fabricId: string, colourId: string, sortPrice: string, query: string) {
        let url = CONFIG.filteredProductListBackendUrl
        let finalUrl = url + "?collectionId=" + collectionId + "&fabricId=" + fabricId + "&colourId=" + colourId + "&sortPrice=" + sortPrice + "&search=" + query;
        return this._http.get(finalUrl)
            .map(res => {
                // console.log(finalUrl)
                // console.log("product is loaded" + res.json().patterns);
                return res.json().patterns;
            });
    }

}