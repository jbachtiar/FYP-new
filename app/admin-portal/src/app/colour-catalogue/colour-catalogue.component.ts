import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service'
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'colour-catalogue',
  templateUrl: './colour-catalogue.component.html',
  styleUrls: ['./colour-catalogue.component.css'],
  providers: [CatalogueService]

})
export class ColourCatalogueComponent implements OnInit {
  private colours: any = {};
  private params;
  itemCount = 0;
  itemResource = new DataTableResource(this.colours);

  @ViewChild(DataTable) table;
  @ViewChild('tabGroup') tabGroup;

  constructor(
    private catService: CatalogueService,
    private router: Router) {
    this.itemResource.count().then(count => this.itemCount = count);

  }

  ngOnInit() {
    this.catService.getAllColours().subscribe(colours => {
      this.colours = colours;
      console.log("PATTERNS1: " + JSON.stringify(this.colours))



      //data table initialisation
      this.itemResource = new DataTableResource(this.colours);
      this.itemResource.count().then(count => this.itemCount = count);

    });
  }

  reloadItems(params) {
    this.catService.getAllColours().subscribe(colours => {
      this.colours = colours;
      // console.log("PATTERNS1: " + JSON.stringify(this.colours))

      // console.log("PATTERNS: " + JSON.stringify(this.colours))
      this.params = params
      this.itemResource = new DataTableResource(this.colours);
      this.itemResource.count().then(count => this.itemCount = count);
      this.itemResource.query(params).then(items => this.colours = items);
      console.log("ITEMS: " + JSON.stringify(this.colours))
    });
  }
  rowClick(rowEvent) {
    let link = ['catalogue/colour', rowEvent.row.item.colourId];
    this.router.navigate(link);
  }

  rowDoubleClick(rowEvent) {
   //doSth
  }

  rowTooltip(item) {
    return "Colour ID: " + item.colourId + '\nPattern Name: ' + item.colourName;
  }

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
}
