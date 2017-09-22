import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginPopupComponent } from '../login/login-popup.component';

import { AuthenticationService } from '../authentication.service';
import { ShoppingCart } from "../model/shopping-cart.model";
import { ShoppingCartService } from '../shopping-cart.service';

import { DialogService } from "ng2-bootstrap-modal";
import { SharedService } from '../shared.service'
import { Subscription } from 'rxjs/Subscription'

//declare var $:any;

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [AuthenticationService, ShoppingCartService]
})
export class NavbarComponent implements OnInit {
    @Input() private itemCount: number;
    subscription: Subscription;
    private token;
    private authenticated = false;
    private shoppingCart: ShoppingCart;
    private isIn: boolean = false;


    constructor(
        private dialogService: DialogService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private shoppingCartService: ShoppingCartService,
        private sharedService: SharedService) {
        this.subscription = this.sharedService.updateCart$.subscribe(
            () => {
                //alert('(Component2) Method called!');
                this.recalculateQty();
            }
        );
    }


    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }
    ngOnInit() {
        console.log("NAVBAR RELOADED")
        this.token = localStorage.getItem('token');
        console.log("TOKEN: " + this.token)
        if (this.token != null) {
            this.authenticated = true;
            this.shoppingCartService.retrieveCartDB()
        }
        this.shoppingCart = JSON.parse(localStorage.getItem('cart'));

        if (!this.shoppingCart) {
            this.shoppingCartService.newCart();
        }


        this.itemCount = this.shoppingCart.cartItems.length;
        this.sharedService.updateCart();
        console.log("AUTHENTICATED: " + this.authenticated);
    }

    recalculateQty() {
        console.log("QTY IS RECALCULATED")
        this.shoppingCart = JSON.parse(localStorage.getItem('cart'));

        if (!this.shoppingCart) {
            this.shoppingCartService.newCart();
        }


        //this.itemCount = this.shoppingCart.noOfItems;

        this.itemCount = this.shoppingCart.cartItems.length;
    }

    showLogin() {
        let disposable = this.dialogService.addDialog(LoginPopupComponent, {
            title: 'Login',
            message: ''
        })
            .subscribe((isConfirmed) => {
                //We get dialog result
                if (isConfirmed) {
                    window.location.reload();
                }
                else {
                    //do nothing
                }
            });

    }

    logout() {
        this.authenticationService.logout();
        this.emptyCart()
        window.location.reload();
    }

    emptyCart() {
        console.log("CART IS EMPTIED")
        this.shoppingCartService.emptyLogout()
        //window.location.reload()
    }

}
