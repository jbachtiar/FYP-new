import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.css']
})
export class PatternListComponent implements OnInit {
  private patterns = []
  constructor(
    private productService:ProductService, 
    private router: Router
    ) { 
  }

  ngOnInit() {
     this.productService.getPatternList().subscribe(
     patterns => {
        this.patterns = patterns;
 
       
      });
  }
  
  onSelect(pattern_id: number): void {
		let link = ['/patternDetails', pattern_id];
		this.router.navigate(link);
	}



}
