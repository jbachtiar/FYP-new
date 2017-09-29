import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CONFIG } from '../config/config.component'
//include aws webpack
require('aws-sdk');

@Component({
  selector: 'app-pattern-details-view',
  templateUrl: './pattern-details-view.component.html',
  styleUrls: ['./pattern-details-view.component.css'],
  providers: [ProductService]
})
export class PatternDetailsViewComponent implements OnInit {
  patternId: string;
  pattern: any = {};
  patternFabrics: any = {}
  patternColours: any = {}
  fabrics = [];
  colours = []
  selectedColour = [];
  patternUrl = "";
  loading:boolean  = true;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patternId = params['patternId']; // grab the parameter from url
      this.patternUrl = CONFIG.eCommerceWebsiteUrl + '/productDetails/' + this.patternId
    });
    //get pattern details
    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.startLoading()
        this.pattern = pattern;
        this.stopLoading()
    });
  }
  startLoading(){
    this.loading = true;
  }

  
  stopLoading(){
    this.loading = false;
  }
  
}