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
  constructor(private staffcontrolservice : StaffcontrolService) { }
  private token : string = localStorage.getItem('token');
  private staffs : Staff[];
  private staffRole: StaffRole[];
  private newStaff : Staff;
  
  ngOnInit() {
    

    this.staffcontrolservice.getAllStaff(this.token)
    .subscribe(
              res => {
                if(res.status === '200'){
                  this.staffs = res.staffs; 
                  console.log(JSON.stringify(this.staffs));
                  
                }else{
                  console.log(res.status);
                }
              }
    )
  }

  addNewStaff() {
    this.staffcontrolservice.addNewStaff(this.token,this.newStaff)
    .subscribe(
              res => {
                if(res.status === 'Staff Added Successfully'){
                  console.log(res.status);
                }else{
                  console.log(res.status);
                }
              }
    )

  }

}
