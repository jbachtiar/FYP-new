import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service'
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'fabric-catalogue',
  templateUrl: './fabric-catalogue.component.html',
  styleUrls: ['./fabric-catalogue.component.css'],
  providers: [CatalogueService]
})
export class FabricCatalogueComponent implements OnInit {
  private fabrics: any = {};
  private params;
  itemCount = 0;
  itemResource = new DataTableResource(this.fabrics);

  @ViewChild(DataTable) table;
  @ViewChild('tabGroup') tabGroup;

  constructor( private catService: CatalogueService,
    private router: Router) {
    this.itemResource.count().then(count => this.itemCount = count);

  }

  ngOnInit() {
    this.catService.getAllFabrics().subscribe(fabrics => {
      this.fabrics = fabrics;
      // console.log("PATTERNS1: " + JSON.stringify(this.fabrics))



      //data table initialisation
      this.itemResource = new DataTableResource(this.fabrics);
      this.itemResource.count().then(count => this.itemCount = count);

    });
  }

  reloadItems(params) {
    this.catService.getAllFabrics().subscribe(fabrics => {
      this.fabrics = fabrics;
      // console.log("PATTERNS1: " + JSON.stringify(this.fabrics))

      // console.log("PATTERNS: " + JSON.stringify(this.fabrics))
      this.params = params
      this.itemResource = new DataTableResource(this.fabrics);
      this.itemResource.count().then(count => this.itemCount = count);
      this.itemResource.query(params).then(items => this.fabrics = items);
      // console.log("ITEMS: " + JSON.stringify(this.fabrics))
    });
    
  }

  rowClick(rowEvent) {
    let link = ['catalogue/fabric', rowEvent.row.item.fabricId];
    this.router.navigate(link);
  }

  rowDoubleClick(rowEvent) {
   //doSth
  }

  rowTooltip(item) {
    return "Fabric ID: " + item.fabricId + '\nFabric Name: ' + item.fabricName;
  }

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

}
