import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
  providers: [StorageService]
})
export class MyaccountComponent implements OnInit {
  public menuItems: any[];
  private account: boolean = false;
  private addressBook: boolean = false;
  private track: boolean = false;

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.track = false;
    this.account = true;
    this.addressBook = false;
  }

  manageAccount() {
    this.track = false;
    this.account = true;
    this.addressBook = false
  }

  manageAddressBook() {
    this.track = false;
    this.account = false;
    this.addressBook = true;
  }

  trackOrder() {
    this.account = false;
    this.track = true;
    this.addressBook = false;
    this.storageService.setIsDisplayedDetail();

  }

}
