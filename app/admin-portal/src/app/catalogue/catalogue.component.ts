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
  private selectedType = 'product'
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onTypeChange(type) {
    // let status = this.map[statusId]
    this.selectedType = type;
    this.color[type] = 'lightcoral';
    this.fontColor[type] = 'white'
    this.showTab[type] = true
    for (let t in this.color) {
      if (t != type) {
        this.color[t] = 'white';
        this.fontColor[t] = 'black'
        this.showTab[t] = false;
      }
    }
    // this.filterOrders(this.mapDB[statusId]);
  }

  onNewItem(){
    let link = ['/catalogue/add/'+this.selectedType];
    this.router.navigate(link);
  }

}
