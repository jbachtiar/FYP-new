import { Injectable } from '@angular/core';



@Injectable()
export class StorageService {

    name: string;
    contact: string;
    address_line: string;
    city: string;
    country
    postalCode: string;
    addressObject: object;
    save:boolean


    constructor() { }

    // getFirstName(): string {
    //     return this.firstName;
    // }
    getName(): string {
        return this.name;
    }

    getContact(): string {
        return this.contact;
    }

    // getAddress(): string {
    //     return this.address;
    // }

    getAddress(){
        return this.addressObject;
    }

    getSaveAddress(){
        return this.save;
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

    setShippingAddress(addressObject, save) {
        this.addressObject = addressObject
        this.save = save
    }









}