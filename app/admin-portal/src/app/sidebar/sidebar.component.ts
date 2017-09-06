import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon:'ti-pulse', class: ''},
    { path: 'user', title: 'Admin Profile',  icon:'ti-user', class: '' },
    { path: 'staffmanagement', title: 'Staff Management',  icon: 'ti-panel', class: '' },
    { path: 'patternList', title: 'Patterns Catalog',  icon:'ti-view-list-alt', class: '' }
    
    //{ path: 'typography', title: 'Typography',  icon:'ti-text', class: '' },
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
    public menuItems: any[];

    constructor(private authenticationService: AuthenticationService,){
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
    logout(){
        this.authenticationService.logout();
        window.location.reload();
    }

}
