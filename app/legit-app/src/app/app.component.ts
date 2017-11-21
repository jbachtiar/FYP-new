import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app';
  
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, 
              private _router: Router) {}

  onSelect(feature): void {
   
    if (feature == "login"){
      let link = ['/login'];
      this._router.navigate(link);
    }
    if (feature == "register"){
      let link = ['/register'];
      this._router.navigate(link);
    }
    
  }
  ngOnInit() {
    this._router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
}
}
