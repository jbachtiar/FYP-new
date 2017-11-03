import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from "../services/staffcontrol.service";
import { Staff } from "../models/staff";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [StaffcontrolService]
})
export class LandingPageComponent implements OnInit {
  private token;
  private user: Staff
  private loading;
  
  constructor(private staffcontrolservice: StaffcontrolService) {
    this.token = localStorage.getItem('token');
  }
  ngOnInit() {
    this.staffcontrolservice.displayProfile(this.token).subscribe(
      res => {
        if (res.status == 200) {
          this.user = res.staff
          console.log(res.staff)
          this.stopLoading()
        } else {
          this.stopLoading()
          console.log("Retrieve failed");

        }
      });
  }
  stopLoading() {
    this.loading = false;
  }
}
