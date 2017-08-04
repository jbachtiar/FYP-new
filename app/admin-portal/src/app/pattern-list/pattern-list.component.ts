import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import {PagerService} from '../services/pager.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.css']
})
export class PatternListComponent implements OnInit {
  private patterns = [];
   // pager object
  pager: any = {};

  // paged items
  pagedPatterns: any[];

  constructor( private productService:ProductService,  private pagerService: PagerService) { 
    
  }

  ngOnInit() {
     this.productService.getPatternList().subscribe(
     patterns => {
        this.patterns = patterns;
        this.setPage(1);
 
       
      });
  }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.patterns.length, page);
 
        // get current page of items
        this.pagedPatterns = this.patterns.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
