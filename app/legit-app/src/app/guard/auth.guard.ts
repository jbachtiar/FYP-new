import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginPopupComponent } from '../login/login-popup.component';

import { DialogService } from "ng2-bootstrap-modal";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private dialogService: DialogService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }

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
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}