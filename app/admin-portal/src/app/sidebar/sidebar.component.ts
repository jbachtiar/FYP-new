import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string[];
}

export const ROUTES: RouteInfo[] = [
    {
        path: 'analyticsdashboard',
        title: 'Analytics Dashboard',
        icon: 'ti-stats-up',
        class: ['1']
    },
    { 
        path: 'orders', 
        title: 'Order Management', 
        icon: 'ti-pulse', 
        class: ['1', '2'] },
    { 
        path: 'viewOrders', 
        title: 'View Orders', 
        icon: 'ti-view-list', 
        class: ['1', '2','3'] 
    },
    { 
        path: 'user', 
        title: 'Admin Profile', 
        icon: 'ti-user', 
        class: ['1', '2', '3'] },
    { 
        path: 'staffmanagement', 
        title: 'Staff Management', 
        icon: 'ti-panel', 
        class: ['1', '2'] 
    },
    // { path: 'patternList', title: 'Patterns Catalog',  icon:'ti-view-list-alt', class: '' },
    { 
        path: 'catalogue', 
        title: 'Catalogue', 
        icon: 'ti-view-list-alt', 
        class: ['1', '2'] 
    },
    { 
        path: 'promoCode', 
        title: 'Promo Code', 
        icon: 'ti-text', 
        class: ['1'] },
    { 
        path: 'superuser', 
        title: 'Superuser Management', 
        icon: 'ti-panel', 
        class: ['1'] }
    //{ path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    //{ path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    //{ path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    //{ path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    providers: [AuthenticationService],
})

export class SidebarComponent implements OnInit {
    roleId = localStorage.getItem("roleId");
    public menuItems: any[] = [];

    constructor(private authenticationService: AuthenticationService, ) {
    }

    ngOnInit() {
        console.log("role id: " + this.roleId)
        for(let r of ROUTES){
            console.log("routessss")
            for(var i = 0; i<r.class.length; i++){
                console.log("access" + r.class[i])
                if (r.class[i]==this.roleId){
                    this.menuItems.push(r)
                }
            }
        }
        // this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
    logout() {
        this.authenticationService.logout();
        window.location.reload();
    }

}
