import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RegistrationService } from '../registration.service'
import { AuthenticationService } from '../authentication.service'
import { AlertService } from '../alert.service'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { DialogService } from "ng2-bootstrap-modal";


@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css'],
  providers: [ RegistrationService, AlertService ]
})
export class AccountVerificationComponent implements OnInit {
  private email;
  private code;
  private user: any = {};
  private isCorrectCode:boolean = false;
  private loading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.email = params['email']; 
      this.code = params['code'];
      this.verifyCode();
    });
  }

  verifyCode(){
    this.registrationService.verifyCode(this.email, this.code).subscribe(res=>{
      if(res.status == 200){
        this.isCorrectCode = true;
      }
    })
  }

  verifyAccount(){
    this.loading = true;
    //calling service
    this.authenticationService.login(this.user.email, this.user.password)
    .subscribe(
        res => {
            console.log("RES: " + res);
            if(res.status == '200'){
                console.log("RES STATUS :" + "Login successful");
                this.registrationService.verifyAccount(res.token, this.code).subscribe(res2=>{
                  if(res2.status == 200){
                    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
                      title: 'Congratulations!',
                      message: 'Your account is now active and ready to use.'
                    })
                      .subscribe((isConfirmed) => {
                        console.log("DIALOG")
                        //We get dialog result
                        if (isConfirmed) {
                          this.router.navigate(['']);
                          window.location.reload();
                        }
                        else {
                          this.router.navigate(['']);
                        }
                      });
                    //We can close dialog calling disposable.unsubscribe();
                    //If dialog was not closed manually close it by timeout
                    setTimeout(() => {
                      disposable.unsubscribe();
                      this.router.navigate(['']);                      
                    }, 50000);
                  }

                })
            }else{
                console.log("RES STATUS :" + res.status);
                this.alertService.error(res.description);
            }
        }
    )
    this.loading = false; 
  }
  
}
