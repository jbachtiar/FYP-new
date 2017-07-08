import { Component, OnInit } from '@angular/core';
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
  
  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  register(){
    this.loading = true;
    //calling service
    this.registrationService.register(this.user.firstName, this.user.lastName, this.user.email, this.user.contact, this.user.address, this.user.postalCode, this.user.password )
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
