import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ManagerGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //verify if have token
        if (localStorage.getItem('token')) {
            // logged in so return true
            let roleId = localStorage.getItem('roleId')
            if(roleId=="1"||roleId=="2"){
                return true;
            }else{
                this.router.navigate(['orders']);
                return false;
            }
           
        }else {
            this.router.navigate(['login']);
            return false;
        }        
    }
}