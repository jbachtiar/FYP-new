import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SuperGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //verify if have token
        if (localStorage.getItem('token')) {
            // logged in so return true
            if (localStorage.getItem('roleId') == "1") {
                return true;
            } else {
                this.router.navigate(['analytics']);
                return false;
            }
        } else {
            this.router.navigate(['login']);
            return false;
        }

        // not logged in so redirect to login page with the return url
     
    }
}