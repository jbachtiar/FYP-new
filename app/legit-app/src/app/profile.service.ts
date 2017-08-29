import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CONFIG } from './config/config.component'


@Injectable()
export class ProfileService {
    private customer;


    getCustomer() {
        return this.customer;
    }


    constructor(private _http: Http) { }

    displayProfile(token: string) {
        //  let params: URLSearchParams = new URLSearchParams();
        //  params.set('token', token);
        let headers = new Headers();
        let url = CONFIG.profileBackendUrl;
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token)
        //headers.append ('Authorization', token);
        console.log(token);
        return this._http.get(url + '/retrieve?token=' + token)

            // let options = new RequestOptions({ headers: headers, params: params });
            // return this._http.get('http://localhost:8084/FYP-backend/API/profile/retrieve', options )
            .map(res => {
                // login successful if there's a jwt token in the response
                let user = res.json();
                user.address = [
                    {
                        "address_line": "200 Blablabla Road",
                        "city": "Singapore",
                        "country": "Singapore",
                        "postal_code": "20920",
                        "default": "yes"
                    },
                    {
                        "address_line": "505 Erroria Road",
                        "city": "Antananarivo",
                        "country": "Madagascar",
                        "postal_code": "12094",
                        "default": "no"
                    },
                    {
                        "address_line": "400 Connectia Road",
                        "city": "Reykjavík",
                        "country": "Iceland",
                        "postal_code": "12934",
                        "default": "no"
                    }
                ]
                if (user) {

                    //this.customer={firstName:user.firstName, lastName:user.lastName, contact:user.phoneNumber, address:user.address, postalCode:user.postalCode, password:user.password}
                    this.customer = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        contact: user.phoneNumber,
                        address: user.address,
                        postalCode: user.postalCode,
                        password: user.password
                    }
                    console.log(this.customer);

                    return user;

                }

            });
    }

    updateProfile(token: string, firstName: string, lastName: string, contact: string, address: string, postalCode: string, password: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('phoneNumber', contact);
        params.set('address', address);
        params.set('postalCode', postalCode);
        params.set('password', password);
        params.set('token', token);
        let headers = new Headers();
        //headers.append ('Authorization', token);
        headers.append(
            'Content-type', 'application/x-www-form-urlencoded'
        )

        let url = CONFIG.profileBackendUrl;
        return this._http.put(url + '/update', params.toString(), { headers })
            .map(res => res.json());



    }



}