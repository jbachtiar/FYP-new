import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from "../services/staffcontrol.service";
import { User } from "app/user/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [StaffcontrolService]
})
export class UserComponent implements OnInit {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  roleCode: string;
  user: User;
  token: string;
  private loading:boolean = true;  
  
  constructor(private staffcontrolservice : StaffcontrolService){
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.startLoading()
    console.log(this.token);
    
     this.staffcontrolservice.displayProfile(this.token).subscribe(
          res => {
            if(res.status === '200'){
              console.log("Retrieve successful");
              this.user=this.staffcontrolservice.getUser();
              this.email= this.user.email;
              this.firstName= this.user.firstName;
              this.lastName= this.user.lastName;
              this.phoneNumber= this.user.phoneNumber;
              this.password= this.user.password;
              this.roleCode= this.user.roleCode;
              this.stopLoading()
            }else{
                this.stopLoading()
                console.log("Retrieve failed");
              
            }
          });
  }

  startLoading(){
    this.loading = true;
  }

  
  stopLoading(){
    this.loading = false;
  }

  updateProfile(){
    this.staffcontrolservice.updateProfile(this.token, this.email, this.firstName, this.lastName, this.phoneNumber, this.password, this.roleCode)
    .subscribe(
              res => {
                if(res.status === '200'){
                  console.log(res.status);                                          
                }else{
                  console.log(res.status);
                }
              }
    )

  }
}
