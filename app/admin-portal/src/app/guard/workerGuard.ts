import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class WorkerGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //verify if have token
        if (localStorage.getItem('token')) {
            // logged in so return true
            if(localStorage.getItem('roleId')=="3"){
                return true;
            }else{
                this.router.navigate(['viewOrders']);
                return false;
            }
        }else {
            this.router.navigate(['login']);
            return false;
        }      
    }
}