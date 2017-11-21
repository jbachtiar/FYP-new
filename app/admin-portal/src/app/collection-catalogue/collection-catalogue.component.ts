import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service'
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'collection-catalogue',
  templateUrl: './collection-catalogue.component.html',
  styleUrls: ['./collection-catalogue.component.css'],
  providers: [CatalogueService]
  
})
export class CollectionCatalogueComponent implements OnInit {
  private collections: any = {};
  private params;
  itemCount = 0;
  itemResource = new DataTableResource(this.collections);

  @ViewChild(DataTable) table;
  @ViewChild('tabGroup') tabGroup;

  constructor(
    private catService: CatalogueService,
    private router: Router) {
    this.itemResource.count().then(count => this.itemCount = count);

  }

  ngOnInit() {
    this.catService.getAllCollections().subscribe(collections => {
      this.collections = collections;
      // console.log("PATTERNS1: " + JSON.stringify(this.collections))



      //data table initialisation
      this.itemResource = new DataTableResource(this.collections);
      this.itemResource.count().then(count => this.itemCount = count);

    });
  }

  reloadItems(params) {
    this.catService.getAllCollections().subscribe(collections => {
      this.collections = collections;
      // console.log("PATTERNS1: " + JSON.stringify(this.collections))

      // console.log("PATTERNS: " + JSON.stringify(this.collections))
      this.params = params
      this.itemResource = new DataTableResource(this.collections);
      this.itemResource.count().then(count => this.itemCount = count);
      this.itemResource.query(params).then(items => this.collections = items);
      // console.log("ITEMS: " + JSON.stringify(this.collections))
    });
  }
  rowClick(rowEvent) {
    let link = ['catalogue/collection', rowEvent.row.item.collectionId];
    this.router.navigate(link);
  }

  rowDoubleClick(rowEvent) {
   //doSth
  }

  rowTooltip(item) {
    return "Collection ID: " + item.collectionId + '\nPattern Name: ' + item.collectionName;
  }

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

}
