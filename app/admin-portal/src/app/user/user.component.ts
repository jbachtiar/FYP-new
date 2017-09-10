import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from "../services/staffcontrol.service";
//import { User } from "app/user/user";
import { Staff } from "../models/staff";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [StaffcontrolService]
})
export class UserComponent implements OnInit {
  private user: Staff
  //user: User;
  token: string;
  private loading: boolean = true;
  private editPass: boolean = false;
  private updateProf :boolean = false;

  constructor(private staffcontrolservice: StaffcontrolService, private dialogService: DialogService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.startLoading()
    console.log(this.token);

    this.staffcontrolservice.displayProfile(this.token).subscribe(
      res => {
        if (res.status == 200) {
          this.user = res.staff
          console.log(res.staff)
          this.stopLoading()
        } else {
          this.stopLoading()
          console.log("Retrieve failed");

        }
      });
  }

  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

  editPassword() {
    this.editPass = true;
  }

  cancelPassword() {
    this.editPass = false;
  }

  update(){
    this.updateProf = true;
  }

  cancelUpdate(){
    this.startLoading()
    console.log(this.token);

    this.staffcontrolservice.displayProfile(this.token).subscribe(
      res => {
        if (res.status == 200) {
          this.user = res.staff
          console.log(res.staff)
          this.stopLoading()
          this.updateProf = false
        } else {
          this.stopLoading()
          console.log("Retrieve failed");
          
          this.updateProf = false
        }
      });
  }

  updateProfile() {
    this.startLoading()
    console.log("Im HERE")
    this.staffcontrolservice.updateProfile(this.token, this.user)
      .subscribe(
      res => {
        if (res.status === '200') {
          console.log(res.status);
          this.stopLoading()
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: "Succesful!",
            message: 'Profile has been updated!'
          })
        } else {
          console.log(res.status);
          this.stopLoading()
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: "Update Failed",
            message: res.description,
          })
        }
      }
      )

  }
}
