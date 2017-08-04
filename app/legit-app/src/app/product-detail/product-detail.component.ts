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
  selectedFabric: any;
  selectedColour: any;
  selectedQuantity=1;
  patternId: string;
  pattern: any = {};
  fabrics: any = {};
  quantity = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  selectedFabricPrice:number;
  selectedColourPrice:number;
  totalPrice:number;

  constructor(private productService: ProductService, private fabricService: FabricService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patternId = params['patternId']; // grab the parameter from url

    });

    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.pattern = pattern;
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColour = this.selectedFabric.colours[0]
        this.selectedFabricPrice = +this.selectedFabric.fabric_price
        this.selectedColourPrice = +this.selectedColour.colour_price
        this.totalPrice = this.selectedFabricPrice + this.selectedColourPrice
      });
    }

    onFabricChange(){
      this.selectedColour = this.selectedFabric.colours[0];
      this.selectedFabricPrice = +this.selectedFabric.fabric_price;
      this.totalPrice = this.selectedFabricPrice + this.selectedColourPrice;
      console.log("RECALCULATED PRICE" + this.totalPrice);
    } 

    onColourChange(){
      this.selectedColourPrice = +this.selectedColour.colour_price;
      this.totalPrice = this.selectedFabricPrice + this.selectedColourPrice;
      console.log("RECALCULATED PRICE" + this.totalPrice) 
    }
}
