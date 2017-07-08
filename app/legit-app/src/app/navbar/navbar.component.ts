import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginPopupComponent } from '../login/login-popup.component';

import { AuthenticationService } from '../authentication.service';

import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {
    private currentUser;
    private authenticated = false;

  constructor(
      private dialogService:DialogService, 
      private authenticationService: AuthenticationService,
      private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("CURRENT USER: " + this.currentUser)
        if(this.currentUser!=null){
            this.authenticated = true;
        }
        console.log("AUTHENTICATED: " + this.authenticated);
    }

    ngOnInit() {
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
      //We can close dialog calling disposable.unsubscribe();
      //If dialog was not closed manually close it by timeout
      // setTimeout(()=>{
      //     disposable.unsubscribe();
      // },10000);
    }

    logout(){
        this.authenticationService.logout();
        window.location.reload();
    }



}