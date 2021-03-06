import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service'
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css'],
  providers: [CatalogueService]

})
export class ProductCatalogueComponent implements OnInit {
  private products: any = {};
  private params;
  itemCount = 0;
  itemResource = new DataTableResource(this.products);

  @ViewChild(DataTable) table;
  @ViewChild('tabGroup') tabGroup;

  constructor(
    private catService: CatalogueService,
    private router: Router) {
    this.itemResource.count().then(count => this.itemCount = count);
  }

  ngOnInit() {
    this.catService.getAllBeddings().subscribe(products => {
      this.products = products;
      //add 0000 padding
      for (let p of products) {
        let temp = "" + p.productId
        var pad = "0000"
        var ans = pad.substring(0, pad.length - temp.length) + temp
        p['productId_display'] = ans
      }
      //data table initialisation
      this.itemResource = new DataTableResource(this.products);
      this.itemResource.count().then(count => this.itemCount = count);

    });

  }

  reloadItems(params) {
    this.catService.getAllBeddings().subscribe(products => {
      this.products = products;
      //add 0000 padding
      for (let p of products) {
        let temp = "" + p.productId
        var pad = "0000"
        var ans = pad.substring(0, pad.length - temp.length) + temp
        p['productId_display'] = ans
      }
      this.params = params
      this.itemResource = new DataTableResource(this.products);
      this.itemResource.count().then(count => this.itemCount = count);
      this.itemResource.query(params).then(items => this.products = items);
      // console.log("ITEMS: " + JSON.stringify(this.products))
    });
  }

  rowClick(rowEvent) {
    let link = ['catalogue/product', rowEvent.row.item.productId];
    this.router.navigate(link);
  }

  rowDoubleClick(rowEvent) {
    //do sth
  }

  rowTooltip(item) {
    return "Product ID: " + item.productId + '\nProduct Name: ' + item.pattern.patternName;
  }

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };

}
