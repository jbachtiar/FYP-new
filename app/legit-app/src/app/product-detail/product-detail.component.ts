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
  selectedColor: any;
  patternId: string;
  pattern: any = {};
  fabrics: any = {};

  constructor(private productService: ProductService, private fabricService: FabricService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patternId = params['patternId']; // grab the parameter from url

    });

    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.pattern = pattern;
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColor = this.selectedFabric.colours[0]
        console.log("selectedColour: " + this.selectedColor.color_name)
        console.log("selectedFabric: " + this.selectedFabric)
        console.log("service is invoked" + pattern);
      });
    }

      
  // showFabric() {
  //   this.fabricService.getFabricsByPatternId(this.product.pattern_id).subscribe(
  //     fabrics => {
  //       this.fabrics = fabrics;
  //       console.log("fabric is loaded"+fabrics); 

  //     });
  //   }
  






}
