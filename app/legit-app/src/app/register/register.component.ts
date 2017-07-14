import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RegistrationService } from '../registration.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegistrationService]
})
export class RegisterComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;
  private returnUrl: string;

  
  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = '/'
  }

  register(){
    this.loading = true;
    //calling service
    this.registrationService.register(this.user.firstName, this.user.lastName, this.user.email, this.user.contact, this.user.address, this.user.postalCode, this.user.password )
      .subscribe(
          res => {
            if(res.status === '200'){
              console.log("Registration successful");
              this.router.navigate([this.returnUrl]);
            }else{
              console.log("Registration failed");
            }
          }
    )
    this.loading = false; 
  }
}
