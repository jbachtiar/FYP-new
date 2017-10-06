import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service'
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'design-catalogue',
  templateUrl: './design-catalogue.component.html',
  styleUrls: ['./design-catalogue.component.css'],
  providers: [CatalogueService]
})
export class DesignCatalogueComponent implements OnInit {
  private patterns: any = {};
  private params;
  itemCount = 0;
  itemResource = new DataTableResource(this.patterns);

  @ViewChild(DataTable) table;
  @ViewChild('tabGroup') tabGroup;

  constructor(
    private catService: CatalogueService,
    private router: Router) {
    this.itemResource.count().then(count => this.itemCount = count);

  }

  ngOnInit() {
    this.catService.getAllPatterns().subscribe(patterns => {
      this.patterns = patterns;
      console.log("PATTERNS1: " + JSON.stringify(this.patterns))



      //data table initialisation
      this.itemResource = new DataTableResource(this.patterns);
      this.itemResource.count().then(count => this.itemCount = count);

    });
  }

  reloadItems(params) {
    this.catService.getAllPatterns().subscribe(patterns => {
      this.patterns = patterns;
      console.log("PATTERNS1: " + JSON.stringify(this.patterns))

      console.log("PATTERNS: " + JSON.stringify(this.patterns))
      this.params = params
      this.itemResource = new DataTableResource(this.patterns);
      this.itemResource.count().then(count => this.itemCount = count);
      this.itemResource.query(params).then(items => this.patterns = items);
      console.log("ITEMS: " + JSON.stringify(this.patterns))
    });
  }
  rowClick(rowEvent) {
    console.log('Clicked');
  }

  rowDoubleClick(rowEvent) {
    let link = ['superuser/order', rowEvent.row.item.orderId];
    this.router.navigate(link);
  }

  rowTooltip(item) {
    return "Pattern ID: " + item.patternId + '\nPattern Name: ' + item.patternName;
  }

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
}
