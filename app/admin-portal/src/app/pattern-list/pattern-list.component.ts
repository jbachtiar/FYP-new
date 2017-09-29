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
        console.log("PAGED PATTERNS: " + JSON.stringify(this.pagedPatterns))
  }

  selectedCollectionId;
  selectedFabricId;
  selectedColourId;
  selectedSortPriceId;
  queriedSearch;

  onClear(){
    this.startLoading()
    this.selectedCollection = undefined;
    this.selectedFabric = undefined;
    this.selectedColour = undefined;
    this.sortPrice = undefined;
    this.selectedCollectionId = undefined;
    this.selectedFabricId = undefined;
    this.selectedColourId = undefined;
    this.selectedSortPriceId = undefined;
    this.queriedSearch = "";  
    console.log("ONCLEAR")
     
     this.productService.getFilteredPatternList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      patterns => {
        
        if(patterns){
          this.patterns=patterns
          console.log("PATTERNS: " + JSON.stringify(this.patterns))
          this.setPage(1);
          this.stopLoading()
        }else{
          patterns=[]
          this.patterns=patterns
          console.log("PATTERNS: " + JSON.stringify(this.patterns))
          this.setPage(1);
          this.stopLoading()
        }
 
      });

     
    //  this.productService.getPatternList().subscribe(
    //  patterns => {
    //     if(patterns){
    //       this.patterns=patterns
    //       this.setPage(1);
    //     }else{
    //       patterns=[]
    //       this.patterns=patterns
    //       this.setPage(1);
    //     }
 
       
    //   });

  }
  
  onSelectCollection(collectionId) {
    this.startLoading()
    this.selectedCollectionId = collectionId.id;
    console.log(this.selectedCollectionId);
    console.log(this.selectedFabricId);
    console.log(this.selectedColourId);
    console.log(this.selectedSortPriceId);
    console.log(this.queriedSearch);

    this.productService.getFilteredPatternList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      patterns => {
        
        if(patterns){
          this.patterns=patterns
          console.log("PATTERNS: " + JSON.stringify(this.patterns))
          this.setPage(1);
          this.stopLoading()
        }else{
          patterns=[]
          this.patterns=patterns
          console.log("PATTERNS: " + JSON.stringify(this.patterns))
          this.setPage(1);
          this.stopLoading()
        }
 
      });

  }

  onSelectFabric(fabricid) {
    this.startLoading()
    this.selectedFabricId = fabricid.id;
    console.log(this.selectedCollectionId);
    console.log(this.selectedFabricId);
    console.log(this.selectedColourId);
    console.log(this.selectedSortPriceId);
    console.log(this.queriedSearch);
    this.productService.getFilteredPatternList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      patterns => {
        if(patterns){
          this.patterns=patterns
          this.setPage(1);
          this.stopLoading()
        }else{
          patterns=[]
          this.patterns=patterns
          this.setPage(1);
          this.stopLoading()
        }
 
      });
    
  
  }

  onSelectColour(colourid) {
    this.startLoading()
    this.selectedColourId = colourid.id;
    console.log(this.selectedCollectionId);
    console.log(this.selectedFabricId);
    console.log(this.selectedColourId);
    console.log(this.selectedSortPriceId);
    console.log(this.queriedSearch);
    this.productService.getFilteredPatternList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      patterns => {
        this.patterns = patterns;
        if(patterns){
          this.setPage(1);
          this.stopLoading()
        }else{
          patterns=[]
          this.setPage(1);
          this.stopLoading()
        }
 
      });
    
  }
    

  onSelectSort(sortid) {
    this.selectedSortPriceId = sortid.id;
    console.log(this.selectedCollectionId);
    console.log(this.selectedFabricId);
    console.log(this.selectedColourId);
    console.log(this.selectedSortPriceId);
    console.log(this.queriedSearch);
    this.productService.getFilteredPatternList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      patterns => {
        if(patterns){
          this.setPage(1);
        }else{
          patterns=[]
          this.setPage(1);
        }
 
      });
    
  }

  onSearch(query: string): void {

    this.queriedSearch = query;
    console.log(this.selectedCollectionId);
    console.log(this.selectedFabricId);
    console.log(this.selectedColourId);
    console.log(this.selectedSortPriceId);
    console.log(this.queriedSearch);
    this.productService.getFilteredPatternList(this.selectedCollectionId, this.selectedFabricId, this.selectedColourId, this.selectedSortPriceId, this.queriedSearch).subscribe(
      patterns => {
        
        if(patterns){
          this.patterns=patterns
          console.log("PATTERNS: " + JSON.stringify(this.patterns))
          this.setPage(1);
        }else{
          patterns=[]
          this.patterns=patterns
          console.log("PATTERNS: " + JSON.stringify(this.patterns))
          this.setPage(1);
        }
 
      });
	
	}
    
  
  sortPrice:any = null;
  sorts = [
       {id: "asc", name: "Ascending"},
       {id: "desc", name: "Descending"}
     ];
  
  selectedCollection:any = null;
  collections = [
       {id: "CO1", name: "2019 Spring"},
       {id: "CO2", name: "2018 Spring"},
       {id: "CO3", name: "2018 Summer"},
       {id: "CO4", name: "2017 Spring"},
       {id: "CO5", name: "2017 Winter"}
     ];

  selectedFabric:any = null;
  fabrics = [
       {id: "F1", name: "Silk"},
       {id: "F2", name: "Modal"},
       {id: "F3", name: "Long Staple Cotton"},
       {id: "F4", name: "Cotton"},
       {id: "F5", name: "Lyocell Tencel"},
       {id: "F6", name: "Polyester-Cotton"}
     ];

  selectedColour:any = null;
  colours = [
       {id: "C1", name: "White"},
       {id: "C2", name: "Black"},
       {id: "C3", name: "Red"},
       {id: "C4", name: "Yellow"},
       {id: "C5", name: "Blue"},
       {id: "C6", name: "Green"},
       {id: "C7", name: "Pink"},
       {id: "C8", name: "Purple"},
       {id: "C9", name: "Brown"},
       {id: "C10", name: "Gold"},
       {id: "C11", name: "Silver"}
     ];

}
