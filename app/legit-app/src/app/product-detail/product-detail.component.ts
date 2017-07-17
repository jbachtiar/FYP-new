import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {
  productId: string;
  product: any = {};



  constructor( private productService: ProductService, private route: ActivatedRoute ) {}

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.productId = params['productId']; // grab the parameter from url
       
      });
  
 
      this.productService.getProductById(this.productId).subscribe(
        product => {
          console.log("service is invoked"+this.productId);
          this.product = product;
          console.log("service is invoked"+product.collection);
       
    
      });
     

   
  }

   
     

 

}
