import { Injectable } from '@angular/core';



@Injectable()
export class StorageService {

    firstName: string;
    lastName: string;
    contact: string;
    // address: string;
    address_line: string;
    city: string;
    country
    postalCode: string;


    constructor() { }

    getFirstName(): string {
        return this.firstName;
    }
    getLastName(): string {
        return this.lastName;
    }

    getContact(): string {
        return this.contact;
    }

    // getAddress(): string {
    //     return this.address;
    // }

    getAddress():string{
        return this.address_line+", "+this.city+", "+this.country+" "+this.postalCode
    }
    getPostCode(): string {
        return this.postalCode;
    }

    

    // setShippingAddress(firstName: string, lastName: string, contact: string, address: string, postalCode: string): void {
    //     this.firstName = firstName
    //     this.lastName = lastName
    //     this.contact = contact
    //     this.address = address
    //     this.postalCode = postalCode
    // }

    setShippingAddress(firstName: string, lastName: string, contact: string, address_line: string, city: string, country: string, postalCode: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.contact = contact
        this.address_line = address_line
        this.city = city
        this.country = country
        this.postalCode = postalCode
    }









}