import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from "@angular/router";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]

})
export class LoginComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;
  
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

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
                  //this.router.navigate(['./homepage']);
                  window.location.reload();
                  //this.stopLoading()
                }else{
                  this.stopLoading()
                  console.log(res.status);
                }
              }
        )
  } 
}