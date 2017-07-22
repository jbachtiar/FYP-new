import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';
import { FabricService } from '../fabric.service';




@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, FabricService],

})
export class ProductDetailComponent implements OnInit {
  productId: string;
  product: any = {};
  fabrics: any = {};
  showFabric() {
    this.fabricService.getFabricsByPatternId(this.product.pattern_id).subscribe(
      fabrics => {
        this.fabrics = fabrics;
        console.log("fabric is loaded"+fabrics); 

      });
    }
  



  constructor(private productService: ProductService, private fabricService: FabricService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['productId']; // grab the parameter from url

    });


    this.productService.getProductById(this.productId).subscribe(
      product => {
        console.log("service is invoked" + this.productId);
        this.product = product;
        console.log("service is invoked" + product.pattern_id);
        this.showFabric();


      });
   
    }
  






}
