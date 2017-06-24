import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {

  }
  login(){
    this.loading = true;
    //calling service
    // this.authenticationService.login(this.user.username, this.user.password)
    // .subscribe(
    //     res => {
    //       if(res.status === 200){
    //         console.log("user has logged in");
    //       }else{
    //         console.log("user has failed to log in");
    //       }
    //     }
    // )
    this.loading = false; 
  }
}
