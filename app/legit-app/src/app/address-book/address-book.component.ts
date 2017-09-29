import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service'

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
  providers: [ProfileService]
})
export class AddressBookComponent implements OnInit {
  private token: string;
  private addressBook: any = {}
  private defaultAddress: any = {}
  private loading: boolean = true;
  private customer;

  constructor(
    private profileService: ProfileService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {




    this.profileService.displayProfile(this.token).subscribe(
      res => {
        this.loading = true;
        if (res.status === '200') {
          console.log("Retrieve successful");
          // this.customer = this.profileService.getCustomer();
          // this.firstName = this.customer.firstName;
          // this.lastName = this.customer.lastName;
          // this.contact = this.customer.contact;
          this.addressBook = res.user.address;
          let i = 0
          this.addressBook.forEach(a => {
            //      console.log("ai: " + i)
            if (a.isDefault == "Y") {
              //        console.log("default address: " + JSON.stringify(a))
              this.defaultAddress = a;
              this.addressBook.splice(i, 1);
            }
            i++
          });
          //     console.log("ALL ADDRESS: " + JSON.stringify(this.addressBook))
          // this.postalCode = this.customer.postalCode;
          // this.password = this.customer.password;
          this.loading = false;
        } else {
          console.log("Retrieve failed");

        }
      }
    )
  }

}
