import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from "@angular/router";
import { AlertService } from '../services/alert.service'


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, AlertService]

})
export class LoginComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;
  
  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {

  }

  startLoading(){
    this.loading = true;
  }

  
  stopLoading(){
    this.loading = false;
  }
  login(){
    this.startLoading()
    console.log("logging in")

    
        //calling service
        this.authenticationService.login(this.user.email, this.user.password)
          .subscribe(
              res => {
                if(res.status === '200'){
                  console.log(res.status);
                  console.log(res.user);
                  
                  this.loading = false; 
                  this.router.navigate(['/']);
                  window.location.reload();
                  //this.stopLoading()
                }else{
                  console.log("RES STATUS :" + res.status);
                  this.alertService.error(res.status);
                  this.stopLoading()
                  console.log(res.status);
                }
              }
        )
  } 
}