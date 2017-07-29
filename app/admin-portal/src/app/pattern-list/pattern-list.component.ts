import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.css']
})
export class PatternListComponent implements OnInit {
  private patterns = []
  constructor( private productService:ProductService) { 
    
  }

  ngOnInit() {
     this.productService.getPatternList().subscribe(
     patterns => {
        this.patterns = patterns;
 
       
      });
  }

}
