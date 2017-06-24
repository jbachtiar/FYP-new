import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]

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
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
          res => {
            if(res.status === 'Login successful'){
              console.log(res.status);
            }else{
              console.log(res.status);
            }
          }
    )
    this.loading = false; 
  }
}
