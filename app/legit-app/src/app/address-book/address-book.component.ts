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
      
          this.addressBook = res.user.address;
          let i = 0
          this.addressBook.forEach(a => {
        
            if (a.isDefault == "Y") {
           
              this.defaultAddress = a;
              this.addressBook.splice(i, 1);
            }
            i++
          });
 
          this.loading = false;
        } else {
         

        }
      }
    )
  }

}
