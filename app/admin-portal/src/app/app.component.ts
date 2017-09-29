import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private token;
  private authenticated = false;

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}

  ngOnInit() {
        this.token = localStorage.getItem('token');
        console.log("TOKEN: " + this.token)
        if(this.token!=null){
            this.authenticated = true;
        }
        console.log("AUTHENTICATED: " + this.authenticated);
    }
}
