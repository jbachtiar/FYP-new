import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from '../services/staffcontrol.service';
//import { User } from "app/user/user";
import { Staff } from "../models/staff";
import { StaffRole } from "../models/staff-role";

@Component({
  selector: 'app-staffmanagement',
  templateUrl: './staffmanagement.component.html',
  styleUrls: ['./staffmanagement.component.css'],
  providers: [StaffcontrolService]
})
export class StaffmanagementComponent implements OnInit {
  constructor(private staffcontrolservice: StaffcontrolService) { }
  private token: string = localStorage.getItem('token');
  private staffs: Staff[];
  private staffRoles: StaffRole[];
  private newStaff: Staff = new Staff();
  private selectedRole: StaffRole = new StaffRole();

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

  addNewStaff() {
    //this.newStaff.roleId = 1
    console.log(this.selectedRole)
    console.log("ROLE ID 1 : " + JSON.stringify(this.newStaff))
    console.log("ROLE ID:" + this.selectedRole.roleId)
    console.log(this.newStaff)

    this.staffcontrolservice.addNewStaff(this.token, this.newStaff)
      .subscribe(
      res => {
        if (res.status === '200') {
          //this.staffs = res.staffs;
          console.log(res.status);

        } else {
          console.log(res.status);
        }
      }
      )
  }

}
