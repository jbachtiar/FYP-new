import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  public menuItems: any[];
  private account: boolean = false;
  private track: boolean = false;

  constructor() { }

  ngOnInit() {
    this.track = false;
    this.account = true;
    
  }

  manageAccount(){
    this.track = false;
    this.account = true;
  }

  trackOrder(){
    this.account = false;
    this.track = true;
    
  }

}
