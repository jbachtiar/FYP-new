import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared.service'
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  selectedItem: string;

  public menuItems: any[];
  private account: boolean = false;
  private addressBook: boolean = false;
  private track: boolean = false;
  location: Location;
  private color: any = { 'profile': 'white', 'address': '#B0A171', 'track': '#B0A171' }
  private fontColor: any = { 'profile': 'black', 'address': 'white', 'track': 'white' }
  subscription: Subscription;

  constructor(private sharedService: SharedService) {
    this.subscription = this.sharedService.trackOrder$.subscribe(
      () => {
        alert('(Component2) Method called!');
        this.selectedItem = "trackOrder"
        console.log("Selected item inside: " + this.selectedItem)
      });
  }

  ngOnInit() {

    console.log("Selected item outside: " + this.selectedItem)
    
    this.track = false;
    this.account = true;
    this.addressBook = false;
    if(this.selectedItem!=""){
      this.trackOrder();
    }
  }

  manageAccount() {
    this.color = { 'profile': 'white', 'address': '#B0A171', 'track': '#B0A171' }
    this.fontColor = { 'profile': 'black', 'address': 'white', 'track': 'white' }

    this.track = false;
    this.account = true;
    this.addressBook = false
  }

  manageAddressBook() {
    this.color = { 'profile': '#B0A171', 'address': 'white', 'track': '#B0A171' }
    this.fontColor = { 'profile': 'white', 'address': 'black', 'track': 'white' }

    this.track = false;
    this.account = false;
    this.addressBook = true;
  }

  trackOrder() {
    this.color = { 'profile': '#B0A171', 'address': '#B0A171', 'track': 'white' }
    this.fontColor = { 'profile': 'white', 'address': 'white', 'track': 'black' }

    this.account = false;
    this.track = true;
    this.addressBook = false;
  }

}
