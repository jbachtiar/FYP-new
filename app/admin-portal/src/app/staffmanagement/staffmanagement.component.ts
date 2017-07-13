import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from '../services/staffcontrol.service';
import { User } from "app/user/user";

@Component({
  selector: 'app-staffmanagement',
  templateUrl: './staffmanagement.component.html',
  styleUrls: ['./staffmanagement.component.css'],
  providers: [StaffcontrolService]
})
export class StaffmanagementComponent implements OnInit {
  private newUser = new User();
  constructor(private staffcontrolservice : StaffcontrolService) { }

  ngOnInit() {
  }

  addNewStaff() {
    this.staffcontrolservice.addNewStaff(this.newUser.email, this.newUser.firstName, this.newUser.lastName, this.newUser.phoneNumber, this.newUser.password, this.newUser.roleCode)
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
