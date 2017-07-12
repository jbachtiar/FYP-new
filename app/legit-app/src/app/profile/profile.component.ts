import { Component, OnInit } from '@angular/core';
import { InlineEditComponent } from '../custom/inline-edit.component'
import { ProfileService } from '../profile.service'
import {Customer} from '../interface/customer'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  private user: any = {};
  title = 'app';
  name: string;
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  postalCode: string;
  password: string;
  customer: Customer;
  token: string
  
  
constructor(private profileService: ProfileService  ) { 
     this.token = localStorage.getItem('token');
   
}
  

  ngOnInit() {
    console.log(this.token);
    
     this.profileService.displayProfile(this.token).subscribe(
          res => {
            if(res.status === 'Retrieve successful'){
              console.log("display service is called");
              this.customer=this.profileService.getCustomer();
              this.firstName= this.customer.firstName;
              this.lastName= this.customer.lastName;
              this.contact= this.customer.contact;
              this.address= this.customer.address;
              this.postalCode= this.customer.postalCode;
              this.password= this.customer.password;
            
            }else{
              
            }
          }
    )

     

  }


  update(){

   
    this.profileService.updateProfile(this.token, this.firstName, this.lastName, this.contact, this.address, this.postalCode, this.password)
    .subscribe(
          res => {
          if(res.status === 'Update successful'){
              console.log(res.status);
            }else{
              console.log(res.status);
            }
          }
    )

  }

}
