import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'
import { PagerService } from '../pager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService, PagerService]
})
export class ProductListComponent implements OnInit {
  //list of products 
  private products = []

  // pager object
  pager: any = {};

  // paged items
  pagedProducts: any[];

  constructor(
    private productService:ProductService, 
    private pagerService: PagerService,
    private router: Router) { }
    
  ngOnInit() {
    this.productService.getProductList().subscribe(
      products => {
        this.products = products;
        //initialise paginator 
        this.setPage(1);
      });
  }

  onSelect(product): void {
		let link = ['/products', product.id];
		this.router.navigate(link);
	}

  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.products.length, page);
 
        // get current page of items
        this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
