import { Component, OnInit } from '@angular/core';
import { InlineEditComponent } from '../custom/inline-edit.component'
import { ProfileService } from '../profile.service'
import { Customer } from '../interface/customer'
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { StorageService } from '../storage.service';
import { NgForm } from "@angular/forms/src/forms";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  private user: any = {};
  private isDisplay = true;
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
  asideVisible: boolean;
  form: NgForm;;




  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
    private dialogService: DialogService) {
    this.token = localStorage.getItem('token');
    // this.profileService.sidebarVisibilityChange.subscribe(value => {
    //  console.log("saved!");
    //  this.updateProfile();

    //  });


  }


  ngOnInit() {
    console.log(this.token);

    this.profileService.displayProfile(this.token).subscribe(
      res => {
        this.loading = true;
        if (res.status === '200') {
          //   console.log(res.user);
          this.firstName = res.user.firstName
          this.lastName = res.user.lastName
          this.contact = res.user.phoneNo
          this.password = res.user.password

          //   console.log("Retrieve successful");

          this.loading = false;
        } else {
          console.log("Retrieve failed");

        }
      }
    )

  }

  updatePassword() {
    this.isDisplay = false;

  }

  back() {
    this.isDisplay = true;

  }

  update() {

    this.isDisplay = true;
    this.updateProfile()


  }
  updateProfile() {
    this.profileService.updateProfile(this.token, this.firstName, this.lastName, this.contact, this.user.password)
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
