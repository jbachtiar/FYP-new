import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../authentication.service'
import { AlertService } from '../alert.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2';
declare var ga: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, AlertService]

})
export class LoginComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //Google Analytics
    (function (i, s, o, g, r, a?, m?) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * <any>new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
      ga('create', 'UA-106185727-2', 'auto');
      ga('require', 'ec');
      // Send checkout event 1 event to enhanced ecommerce
      ga('ec:setAction', 'checkout', {'step': 1});
      // Send click with an event
      ga('send', 'event', 'Session Movement', 'Login');
      ga('send', 'pageview');
      //end of GA
  }
login(){
        this.loading = true;
        //calling service
        this.authenticationService.login(this.user.email, this.user.password)
        .subscribe(
            res => {
                console.log("RES: " + res);
                if(res.status === '200'){
                    console.log("RES STATUS :" + "Login successful");
                    this.router.navigate([this.returnUrl]);
                }else{
                    console.log("RES STATUS :" + res.status);
                    this.alertService.error(res.status);
                }
            }
        )
      this.loading = false; 
      //Google Analytics
    (function (i, s, o, g, r, a?, m?) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * <any>new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
      ga('create', 'UA-106185727-2', 'auto');
      ga('require', 'ec');
      // Send checkout event 1 event to enhanced ecommerce
      ga('ec:setAction', 'checkout', {'step': 1});
      // Send click with an event
      ga('send', 'event', 'Session Movement', 'Login');
      ga('send', 'pageview');
  }
}

