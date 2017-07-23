import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'
import { PagerService } from '../pager.service'
import { Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
import { QuickViewComponent } from '../quick-view/quick-view.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService, PagerService]
})
export class ProductListComponent implements OnInit {
  
  selectedCollection:any = 0;
  collections = [
       {id: "CO1", name: "2019 Spring"},
       {id: "CO2", name: "2018 Spring"},
       {id: "CO3", name: "2018 Summer"},
       {id: "CO4", name: "2017 Spring"},
       {id: "CO5", name: "2017 Winter"}
     ];

  selectedFabric:any = 0;
  fabrics = [
       {id: "F1", name: "Silk"},
       {id: "F2", name: "Modal"},
       {id: "F3", name: "Long Staple Cotton"},
       {id: "F4", name: "Cotton"},
       {id: "F5", name: "Lyocell Tencel"},
       {id: "F6", name: "Polyester-Cotton"}
     ];

  selectedColour:any = 0;
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
  
  //list of products 
  private products = []

  // pager object
  pager: any = {};

  // paged items
  pagedProducts: any[];

  constructor(
    private productService:ProductService, 
    private pagerService: PagerService,
    private dialogService:DialogService, 
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
		let link = ['/productDetails', {productId: product.id, fabricId: product.fabric_id, colourId: product.colour_id}];
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

  showQuickView(productId){
     let disposable = this.dialogService.addDialog( QuickViewComponent, {
            title:'QuickView', 
            message:'',
            productId: productId})
          .subscribe((isConfirmed)=>{
              //We get dialog result
              if(isConfirmed) {
                  window.location.reload();
              }
              else {
                  //do nothing
              }
          });
    
    

  }
}
