import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { RegistrationService } from '../registration.service'
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
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
  private countries: any = {};
  private countryCodes: any = []


  constructor(
    private registrationService: RegistrationService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = '/'
    this.countries = this.profileService.getCountries();
    for (let c of this.countries) {
      this.countryCodes.push(c.dial_code);
      console.log("COUNTRY CODE: " + c.dial_code)
    }
    this.countryCodes.sort();
    console.log("COUNTRY CODES: " + this.countryCodes)
  }

  register() {
    this.loading = true;
    //calling service

    this.registrationService.register(this.user.firstName, this.user.lastName, this.user.email, this.user.contact, this.user.country, this.user.city, this.user.address, this.user.postalCode, this.user.password)
      .subscribe(
      res => {
        if (res.status === '200') {
          console.log("Registration successful");
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: 'Congratulations!',
            message: 'Your account has been created. Please verify your email to continue using your account.'
          })
            .subscribe((isConfirmed) => {
              console.log("DIALOG")
              //We get dialog result
              if (isConfirmed) {
                this.router.navigate([this.returnUrl]);
              }
              else {
                this.router.navigate([this.returnUrl]);
              }
            });
        } else {
          console.log("Registration failed");
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: 'We are sorry!',
            message: 'Your account cannot be created. We think you already have an account with us.'
          })
            .subscribe((isConfirmed) => {
              console.log("DIALOG")
              //We get dialog result
              if (isConfirmed) {
                //this.router.navigate([this.returnUrl]);
              }
              else {
                //this.router.navigate([this.returnUrl]);
              }
            });
        }
        this.loading = false;
      });
  }
}
