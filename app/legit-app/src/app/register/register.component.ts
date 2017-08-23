import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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


  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = '/'
  }

  register() {
    this.loading = true;
    //calling service
    this.registrationService.register(this.user.firstName, this.user.lastName, this.user.email, this.user.contact, this.user.address, this.user.postalCode, this.user.password)
      .subscribe(
      res => {
        if (res.status === '200') {
          console.log("Registration successful");
        } else {
          console.log("Registration failed");
        }
        this.loading = false;
      }
      )

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
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);

  }
}
