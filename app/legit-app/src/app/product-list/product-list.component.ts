import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'
import { PagerService } from '../pager.service'
import { Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
import { QuickViewComponent } from '../quick-view/quick-view.component';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
declare var ga: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService, PagerService]
})
export class ProductListComponent implements OnInit {

  selectedCollectionId;
  selectedFabricId;
  selectedColourId;
  selectedSortPriceId;
  collections;
  colours;
  fabrics;
  queriedSearch;
  loading: boolean = true;

  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }
  onClear() {

    this.startLoading();
    this.selectedCollection = undefined;
    this.selectedFabric = undefined;
    this.selectedColour = undefined;
    this.sortPrice = undefined;
    this.selectedCollectionId = undefined;
    this.selectedFabricId = undefined;
    this.selectedColourId = undefined;
    this.selectedSortPriceId = undefined;
    this.queriedSearch = "";

    this.productService.getFilteredProductList("undefined", "undefined", "undefined", "undefined", this.queriedSearch).subscribe(
      products => {

        this.products = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });

    // this.productService.getProductList().subscribe(
    //   products => {
    //     this.products = products;
    //     //initialise paginator 
    //     this.setPage(1);
    //   });

  }

  onSelectCollection(collection) {

    this.startLoading()
    this.selectedCollectionId = collection.collectionId;


    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.products = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading();
      });
  }

  onSelectFabric(fabric) {
    this.startLoading()
    this.selectedFabricId = fabric.fabricId;


    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.products = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });

  }

  onSelectColour(colour) {

    this.startLoading()
    this.selectedColourId = colour.colourId;


    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.products = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });
  }


  onSelectSort(sortid) {
    this.startLoading()
    this.selectedSortPriceId = sortid.id;


    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.products = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });
  }

  onSearch(query: string): void {
    this.startLoading()
    this.queriedSearch = query;


    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.products = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });
  }


  sortPrice: any = null;
  sorts = [
    { id: "asc", name: "Ascending" },
    { id: "desc", name: "Descending" }
  ];

  selectedCollection: any = null;


  selectedFabric: any = null;


  selectedColour: any = null;

  //list of products 
  private products = []

  //list of product 
  private filteredProducts = []

  // pager object
  pager: any = {};

  // paged items
  pagedProducts: any[];

  constructor(
    private productService: ProductService,
    private pagerService: PagerService,
    private dialogService: DialogService,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private router: Router) { }

  ngOnInit() {
    this.startLoading()
    this.selectedCollection = undefined;
    this.selectedFabric = undefined;
    this.selectedColour = undefined;
    this.sortPrice = undefined;
    this.productService.getProductList().subscribe(
      products => {
        this.products = products;
 
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });

    this.productService.getProductCatalogueFilters().subscribe(
      filters => {
        this.collections = filters.collections;
        this.fabrics = filters.fabrics;
        this.colours = filters.colours;
      });

    //Google Analytics
    (function (i, s, o, g, r, a?, m?) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * <any>new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    // Send checkout event 1 event to enhanced ecommerce
    ga('ec:setAction', 'checkout', { 'step': 2 });
    // Send click with an event
    ga('send', 'event', 'Session Movement', 'View Products');
    ga('send', 'pageview');
  }



  // onSelect(product): void {
  // 	let link = ['/productDetails', {patternId: product.id, fabricId: product.fabric_id, colourId: product.colour_id}];
  //   this.router.navigate(link);
  // }

  setPage(page: number) {
    if (page < 1) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.products.length, page);

    // get current page of items
    this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  showQuickView(patternId, pattern_name) {
    //start of GA
    (function (i, s, o, g, r, a?, m?) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * <any>new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    ga('ec:addProduct', {
      // productFieldObject stores product click and other details
      'id': patternId, // Product ID/SKU - Type: string
      'name': pattern_name, // Product name - Type: string
      'category': 'Beddings', // Product category - Type: string
    });
    ga('ec:setAction', 'detail');
    ga('send', 'pageview');
    // Send checkout event 1 event to enhanced ecommerce
    // Send click with an event, then send user to product page.
    ga('send', 'event', 'enhanced ecommerce', 'Quick View Clicks', pattern_name);
    ga('send', 'pageview');
    // end of GA

    let disposable = this.dialogService.addDialog(QuickViewComponent, {
      title: 'QuickView',
      message: '',
      patternId: patternId
    })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          // window.location.reload();
        }
        else {
          //do nothing
        }
      });
  }

  onProductClick(patternId, pattern_name) {
    (function (i, s, o, g, r, a?, m?) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * <any>new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    ga('ec:addProduct', {
      // productFieldObject stores product click and other details
      'id': patternId, // Product ID/SKU - Type: string
      'name': pattern_name, // Product name - Type: string
      'category': 'Beddings', // Product category - Type: string
    });
    ga('ec:setAction', 'detail');
    ga('send', 'pageview');
    // Send click with an event, then send user to product page.
    ga('send', 'event', 'enhanced ecommerce', 'Product Detail Clicks', pattern_name);
    ga('send', 'pageview');

    ga('ec:addProduct', {
      // productFieldObject stores product click and other details
      'id': patternId, // Product ID/SKU - Type: string
      'name': pattern_name, // Product name - Type: string
      'category': 'Beddings', // Product category - Type: string
    });
    ga('ec:setAction', 'click', {list: 'Beddings'});
    ga('send', 'pageview');
  }
}