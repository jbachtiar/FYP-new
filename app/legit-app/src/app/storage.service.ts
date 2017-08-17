import { Injectable } from '@angular/core';



@Injectable()
export class StorageService {

    firstName: string;
    lastName: string;
    contact: string;
    address: string;
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

    getAddress(): string {
        return this.address;
    }

    getPostCode(): string {
        return this.postalCode;
    }

    setShippingAddress(firstName: string, lastName: string, contact: string, address: string, postalCode: string): void {
        this.firstName = firstName
        this.lastName = lastName
        this.contact = contact
        this.address = address
        this.postalCode = postalCode


    }










}