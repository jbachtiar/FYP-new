import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../authentication.service'
import { AlertService } from '../alert.service'


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
  }
}

