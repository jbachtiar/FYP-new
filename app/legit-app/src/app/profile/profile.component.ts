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
  
constructor(private profileService: ProfileService ) { 
   
}
  

  ngOnInit() {
    
     this.profileService.displayProfile("test@gmail.com").subscribe(
          res => {
            if(res.status === 'Retrieve successful'){
              console.log("service is called");
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
    

  }

}
