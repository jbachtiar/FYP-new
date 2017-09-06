import { Component, OnInit } from '@angular/core';
import { InlineEditComponent } from '../custom/inline-edit.component'
import { ProfileService } from '../profile.service'
import { Customer } from '../interface/customer'
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  private user: any = {};
  title = 'app';
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  postalCode: string;
  password: string;
  customer: Customer;
  token: string;
  loading: boolean = true;


  constructor(
    private profileService: ProfileService,
    private dialogService: DialogService) {
    this.token = localStorage.getItem('token');

  }


  ngOnInit() {
    console.log(this.token);
    
    this.profileService.displayProfile(this.token).subscribe(
      res => {
        this.loading = true;
        if (res.status === '200') {
          this.firstName = res.user.firstName
          this.lastName = res.user.lastName
          this.contact = res.user.phoneNo
          console.log("Retrieve successful");
          
          this.loading = false;
        } else {
          console.log("Retrieve failed");

        }
      }
    )



  }


  update() {


    this.profileService.updateProfile(this.token, this.firstName, this.lastName, this.contact, this.password)
      .subscribe(
      res => {
        if (res.status === '200') {
          console.log("Update successful");
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: 'Profile',
            message: 'Changes saved successfully!'
          })
            .subscribe((isConfirmed) => {
              console.log("DIALOG")
              //We get dialog result
              if (isConfirmed) {
                // this.router.navigate([this.returnUrl]);
              }
              else {
                // this.router.navigate([this.returnUrl]);
              }
            });
          //We can close dialog calling disposable.unsubscribe();
          //If dialog was not closed manually close it by timeout
          setTimeout(() => {
            disposable.unsubscribe();
          }, 5000);

        } else {
          console.log("Update failed");
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: 'Profile',
            message: 'Changes are not saved.'
          })
            .subscribe((isConfirmed) => {
              console.log("DIALOG")
              //We get dialog result
              if (isConfirmed) {
                // this.router.navigate([this.returnUrl]);
              }
              else {
                // this.router.navigate([this.returnUrl]);
              }
            });
          //We can close dialog calling disposable.unsubscribe();
          //If dialog was not closed manually close it by timeout
          setTimeout(() => {
            disposable.unsubscribe();
          }, 5000);
        }
      }
      )

  }

}
