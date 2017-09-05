import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from '../services/staffcontrol.service';
//import { User } from "app/user/user";
import { Staff } from "../models/staff";
import { StaffRole } from "../models/staff-role";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'

@Component({
  selector: 'app-staffmanagement',
  templateUrl: './staffmanagement.component.html',
  styleUrls: ['./staffmanagement.component.css'],
  providers: [StaffcontrolService, DialogService]
})
export class StaffmanagementComponent implements OnInit {
  constructor(private staffcontrolservice: StaffcontrolService, private dialogService : DialogService) { }
  private token: string = localStorage.getItem('token');
  private staffs: Staff[];
  private staffRoles: StaffRole[];
  private newStaff: Staff = new Staff();
  private selectedRole: StaffRole = new StaffRole();
  private loading : boolean = false;

  ngOnInit() {
    this.staffcontrolservice.getAllRoles()
      .subscribe(
      res => {
        if (res.status === '200') {
          this.staffRoles = res.staffRoles;
          //console.log(JSON.stringify(this.staffRoles));

        } else {
          console.log(res.status);
        }
      }
      )

    this.staffcontrolservice.getAllStaff(this.token)
      .subscribe(
      res => {
        if (res.status === '200') {
          this.staffs = res.staffs;
          //console.log(JSON.stringify(this.staffs));

        } else {
          console.log(res.status);
        }
      }
      )
  }

  startLoading(){
    this.loading = true;
  }

  
  stopLoading(){
    this.loading = false;
  }
  addNewStaff() {
    //this.newStaff.roleId = 1
    console.log(this.selectedRole)
    console.log("ROLE ID 1 : " + JSON.stringify(this.newStaff))
    console.log("ROLE ID:" + this.selectedRole.roleId)
    console.log(this.newStaff)
    this.startLoading()
    this.staffcontrolservice.addNewStaff(this.token, this.newStaff)
      .subscribe(
      res => {
        if (res.status === '200') {
          //this.staffs = res.staffs;
          console.log(res.status);
          this.stopLoading()
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: "Succesful!",
            message : this.newStaff.firstName + " " + this.newStaff.lastName + ' has been added!' 
          })
          this.emptyField()
        } else {
          console.log(res.status);
          this.stopLoading()
        }
      }
      )
  }

  emptyField(){
    this.newStaff = new Staff();
  }

}
