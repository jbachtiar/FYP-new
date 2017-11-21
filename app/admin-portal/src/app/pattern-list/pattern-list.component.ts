import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import { Router } from '@angular/router';
import {PagerService} from '../services/pager.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.css']
})
export class PatternListComponent implements OnInit {

  selectedCollectionId;
  selectedFabricId;
  selectedColourId;
  selectedSortPriceId;
  collections;
  colours;
  fabrics;
  queriedSearch;


  onClear(){
    
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
        
         this.patterns = products;
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
    // console.log(this.selectedCollectionId);
    // console.log(this.selectedFabricId);
    // console.log(this.selectedColourId);
    // console.log(this.selectedSortPriceId);
    // console.log(this.queriedSearch);

    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.patterns = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading();
      });
  }

  onSelectFabric(fabric) {
    this.startLoading()
    this.selectedFabricId = fabric.fabricId;
    // console.log(this.selectedCollectionId);
    // console.log(this.selectedFabricId);
    // console.log(this.selectedColourId);
    // console.log(this.selectedSortPriceId);
    // console.log(this.queriedSearch);

    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.patterns = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });
  
  }

  onSelectColour(colour) {
    
    this.startLoading()
    this.selectedColourId = colour.colourId;
    // console.log(this.selectedCollectionId);
    // console.log(this.selectedFabricId);
    // console.log(this.selectedColourId);
    // console.log(this.selectedSortPriceId);
    // console.log(this.queriedSearch);

    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.patterns = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });
  }
    

  onSelectSort(sortid) {
    this.startLoading()
    this.selectedSortPriceId = sortid.id;
    // console.log(this.selectedCollectionId);
    // console.log(this.selectedFabricId);
    // console.log(this.selectedColourId);
    // console.log(this.selectedSortPriceId);
    // console.log(this.queriedSearch);

    this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.patterns = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });
  }

  onSearch(query: string): void {
    this.startLoading()
    this.queriedSearch = query;
    // console.log(this.selectedCollectionId);
    // console.log(this.selectedFabricId);
    // console.log(this.selectedColourId);
    // console.log(this.selectedSortPriceId);
    // console.log(this.queriedSearch);

		this.productService.getFilteredProductList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      products => {
        this.patterns = products;
        //initialise paginator 
        this.setPage(1);
        this.stopLoading()
      });
	}
    
  
  sortPrice:any = null;
  sorts = [
       {id: "asc", name: "Ascending"},
       {id: "desc", name: "Descending"}
     ];
  
  selectedCollection:any = null;
  // collections = [
  //      {id: "CO1", name: "Bestsellers"},
  //      {id: "CO2", name: "2018 Spring"},
  //      {id: "CO3", name: "2018 Summer"},
  //      {id: "CO4", name: "2017 Spring"}
  //    ];

  selectedFabric:any = null;
  // fabrics = [
  //      {id: "F1", name: "Silk"},
  //      {id: "F2", name: "Modal"},
  //      {id: "F3", name: "Long Staple Cotton"},
  //      {id: "F4", name: "Cotton"},
  //      {id: "F5", name: "Lyocell Tencel"},
  //      {id: "F6", name: "Polyester-Cotton"}
  //    ];

  selectedColour:any = null;
  // colours = [
  //      {id: "C1", name: "White"},
  //      {id: "C2", name: "Black"},
  //      {id: "C3", name: "Red"},
  //      {id: "C4", name: "Yellow"},
  //      {id: "C5", name: "Blue"},
  //      {id: "C6", name: "Green"},
  //      {id: "C7", name: "Pink"},
  //      {id: "C8", name: "Purple"},
  //      {id: "C9", name: "Brown"},
  //      {id: "C10", name: "Gold"},
  //      {id: "C11", name: "Silver"}
  //    ];

  private patterns = []
     // pager object
  pager: any = {};
  private loading:boolean = true;

  // paged items
  pagedPatterns: any[];
  
  constructor(
    private productService:ProductService, 
    private router: Router,
    private pagerService: PagerService
    ) { 
  }

  ngOnInit() {
    this.startLoading()
    this.selectedCollection = undefined;
    this.selectedFabric = undefined;
    this.selectedColour = undefined;
    this.sortPrice = undefined;
     this.productService.getPatternList().subscribe(
     patterns => {
        this.patterns = patterns;
        this.setPage(1);
 
       this.stopLoading()
      });

      this.productService.getProductCatalogueFilters().subscribe(
      filters => {
        this.collections = filters.collections;
        this.fabrics = filters.fabrics;
        this.colours = filters.colours;
      });
  }

  startLoading(){
    this.loading = true;
  }

  
  stopLoading(){
    this.loading = false;
  }
  
  onEditPattern(pattern_id: number): void {
		let link = ['patternList/patternDetails', pattern_id];
		this.router.navigate(link);
	}

  onAddPattern(): void {
    let link = ['patternList/addPatternDetails']
    this.router.navigate(link);
  }

  onViewPattern(pattern_id: number): void {
    let link = ['patternList/viewPatternDetails', pattern_id];
    this.router.navigate(link);
  }


    setPage(page: number) {
        if (page < 1) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.patterns.length, page);
 
        // get current page of items
        this.pagedPatterns = this.patterns.slice(this.pager.startIndex, this.pager.endIndex + 1);
        // console.log("PAGED PATTERNS: " + JSON.stringify(this.pagedPatterns))
  }

}
