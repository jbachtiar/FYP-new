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

  ngOnInit() {
        this.token = localStorage.getItem('token');
        let user: string = localStorage.getItem('currentUset');
        console.log("TOKEN: " + this.token)
        console.log("User: " + user)
        if(this.token!=null){
            this.authenticated = true;
        }
        console.log("AUTHENTICATED: " + this.authenticated);
    }
}
