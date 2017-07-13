import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from "../services/staffcontrol.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [StaffcontrolService]
})
export class UserComponent implements OnInit {
  private email : string;
  private firstName : string;
  private lastName :  string;
  private phoneNumber : string;
  private password : string;
  private roleCode : string;
  
  constructor(private staffcontrolservice : StaffcontrolService){
    this.email = "ming@ming.com";
    this.firstName = "Ming";
    this.lastName = "Highlander";
    this.phoneNumber = "123123123";
    this.password = "Ming123";
    this.roleCode = "Admin"
  }

  ngOnInit() {
    
  }

  updateProfile(){
    this.staffcontrolservice.updateProfile(this.email, this.firstName, this.lastName, this.phoneNumber, this.password, this.roleCode)
    .subscribe(
              res => {
                if(res.status === 'Profile Updated Successfully'){
                  console.log(res.status);
                }else{
                  console.log(res.status);
                }
              }
    )

  }
}
