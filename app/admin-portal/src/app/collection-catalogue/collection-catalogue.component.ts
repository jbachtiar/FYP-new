import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service'
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'collection-catalogue',
  templateUrl: './collection-catalogue.component.html',
  styleUrls: ['./collection-catalogue.component.css']
})
export class CollectionCatalogueComponent implements OnInit {
  itemCount = 0;
  // itemResource = new DataTableResource(this.orders);
  constructor() { }

  ngOnInit() {

  }

}
