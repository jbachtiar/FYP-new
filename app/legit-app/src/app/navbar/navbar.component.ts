import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginPopupComponent } from '../login/login-popup.component';

import { AuthenticationService } from '../authentication.service';
import { ShoppingCart } from "../cart/model/shopping-cart.model";

import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {
    private token;
    private authenticated = false;
    private shoppingCart: ShoppingCart;
    private itemCount: number;

  constructor(
      private dialogService:DialogService, 
      private authenticationService: AuthenticationService,
      private router: Router) {
          
    }

    ngOnInit() {
        this.token = localStorage.getItem('token');
        console.log("TOKEN: " + this.token)
        if(this.token!=null){
            this.authenticated = true;
        }

        this.shoppingCart = JSON.parse(localStorage.getItem('cart'));
        this.itemCount = this.shoppingCart.noOfItems;
        console.log("AUTHENTICATED: " + this.authenticated);
    }

    showLogin() {
        let disposable = this.dialogService.addDialog(LoginPopupComponent, {
            title:'Login', 
            message:''})
          .subscribe((isConfirmed)=>{
              //We get dialog result
              if(isConfirmed) {
                  window.location.reload();
              }
              else {
                  //do nothing
              }
          });
  
    }

    logout(){
        this.authenticationService.logout();
        window.location.reload();
    }



}
