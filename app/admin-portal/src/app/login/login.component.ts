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
  login(){
    this.loading = true;

    
        //calling service
        this.authenticationService.login(this.user.email, this.user.password)
          .subscribe(
              res => {
                if(res.status === 'Login successful'){
                  console.log(res.status);
                  console.log(res.user);
                  this.router.navigate(['./homepage']);
                }else{
                  console.log(res.status);
                }
              }
        )
    this.loading = false; 
  } 
}