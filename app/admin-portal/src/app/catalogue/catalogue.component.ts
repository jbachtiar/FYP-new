import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  // itemResource = new DataTableResource(this.orders);  
  private color: any = { 'product': 'lightcoral', 'design': 'white', 'fabric': 'colour', 'collection': 'white' }
  private fontColor: any = { 'product': 'white', 'design': 'black', 'fabric': 'black', 'collection': 'black' }
  private showTab: any = { 'product': true, 'design': false, 'fabric': false, 'collection': false }
  private selectedStatus
  constructor() { }

  ngOnInit() {
  }

  onTypeChange(status) {
    // let status = this.map[statusId]
    this.selectedStatus = status;
    this.color[status] = 'lightcoral';
    this.fontColor[status] = 'white'
    this.showTab[status] = true
    for (let colorStatus in this.color) {
      if (colorStatus != status) {
        this.color[colorStatus] = 'white';
        this.fontColor[colorStatus] = 'black'
        this.showTab[colorStatus] = false;
      }
    }
    // this.filterOrders(this.mapDB[statusId]);
  }

}
