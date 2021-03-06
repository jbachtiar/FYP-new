import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert.service'
import { AuthenticationService } from '../authentication.service'
import { ShoppingCart } from "../model/shopping-cart.model";
import { ShoppingCartService } from '../shopping-cart.service';

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Angulartics2GoogleAnalytics } from 'angulartics2';
declare var ga: any;

export interface LoginPopupModel {
  title:string;
  message:string;
}

@Component({  
    selector: 'login-popup',
    templateUrl: './login-popup.component.html',
    styleUrls: ['./login-popup.component.css'],
    providers: [AuthenticationService, AlertService]
})
export class LoginPopupComponent extends DialogComponent<LoginPopupModel, boolean> implements LoginPopupModel {
    title: string;
    message: string;
    private user: any = {};
    private loading: boolean = false;
    private returnUrl: string;    
    private currentUrl;

    constructor(
        dialogService: DialogService,
        private route: ActivatedRoute,
        private router: Router,
        private shoppingCartService: ShoppingCartService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        super(dialogService);        
    }
    ngOnInit(){
        this.currentUrl = this.router.url;
 
        
    }
    confirm() {
        // we set dialog result as true on click on confirm button, 
        // then we can get dialog result from caller code 
        this.result = true;
        this.close();
    }
    login(){
        //Google Analytics
        (function (i, s, o, g, r, a?, m?) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * <any>new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-106185727-2', 'auto');
        ga('require', 'ec');
        // Send checkout event 1 event to enhanced ecommerce
        ga('ec:setAction', 'checkout', {'step': 1});
        // Send click with an event
        ga('send', 'event', 'Session Movement', 'Login');
        ga('send', 'pageview');
        //end of GA
        this.loading = true;
        //calling service
        this.authenticationService.login(this.user.email, this.user.password)
        .subscribe(
            res => {
             
                if(res.status === '200'){
    
                    // let cart : ShoppingCart = JSON.parse(localStorage.getItem("cart"));
                    // this.shoppingCartService.updateCartDB(cart)
                    if(this.currentUrl=="/register"){
                        this.router.navigate(['']);
                        window.location.reload();
                    }
                    this.confirm()
                    this.loading = false; 
                    // this.router.navigate([this.returnUrl]);
                }else{
              
                    this.alertService.error(res.description);
                    this.loading = false; 
                }
            }
        )
        
    }
}