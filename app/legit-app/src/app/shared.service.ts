import { Injectable, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/map'
import { CartItem } from "./model/cart-item.model";
import { ShoppingCart } from "./model/shopping-cart.model";
import { CONFIG } from './config/config.component'
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { CartComponent } from './cart/cart.component'

@Injectable()
export class SharedService {
    // Observable string sources
    private updateCartSource = new Subject<string>();
    private emptyCartSource = new Subject<string>();
    private trackOrderSource = new Subject<string>();

    // Observable string streams
    updateCart$ = this.updateCartSource.asObservable();
    emptyCart$ = this.emptyCartSource.asObservable();
    trackOrder$ = this.trackOrderSource.asObservable();
    
    // Service message commands
    updateCart() {

        this.updateCartSource.next();
    }

    emptyCart(){
      
        this.emptyCartSource.next();
    }

    trackOrder(){
     
        this.trackOrderSource.next();
    }
}
