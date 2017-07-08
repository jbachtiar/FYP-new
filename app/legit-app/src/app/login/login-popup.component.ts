import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert.service'
import { AuthenticationService } from '../authentication.service'

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface LoginPopupModel {
  title:string;
  message:string;
}

@Component({  
    selector: 'login-popup',
    templateUrl: './login-popup.component.html',
    providers: [AuthenticationService, AlertService]
})
export class LoginPopupComponent extends DialogComponent<LoginPopupModel, boolean> implements LoginPopupModel {
    title: string;
    message: string;
    private user: any = {};
    private loading: boolean = false;
    private returnUrl: string;

    constructor(
        dialogService: DialogService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        super(dialogService);
    }
    confirm() {
        // we set dialog result as true on click on confirm button, 
        // then we can get dialog result from caller code 
        this.result = true;
        this.close();
    }
    login(){
        this.loading = true;
        //calling service
        this.authenticationService.login(this.user.email, this.user.password)
        .subscribe(
        //     data => {
        //     console.log(data);
        //     this.router.navigate([this.returnUrl]);
        //   },
        //   error => {
        //     console.log(error);
        //     this.alertService.error(error);
        //     this.loading = false;
        //   });
            res => {
                console.log("RES: " + res);
                if(res.status === 'Login successful'){
                    console.log("RES STATUS :" + res.status);
                    this.confirm()
                    // this.router.navigate([this.returnUrl]);
                }else{
                    console.log("RES STATUS :" + res.status);
                    this.alertService.error(res.status);
                }
            }
        )
        this.loading = false; 

    }
}