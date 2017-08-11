import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';
import { FabricService } from '../fabric.service';
import { ShoppingCartService } from '../shopping-cart.service';




@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, FabricService, ShoppingCartService],

})
export class ProductDetailComponent implements OnInit {
  
  selectedFabric: any;
  selectedColor: any;
  selectedQuantity=1;
  patternId: string;
  pattern: any = {};
  fabrics: any = {};
  quantity = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  token: string = '';

  constructor(
    private router: Router, 
    private productService: ProductService, 
    private fabricService: FabricService, 
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) { 
    this.token = localStorage.getItem('token');
  }

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

    onFabricChange(){
      this.selectedColor = this.selectedFabric.colours[0]
    } 
  // showFabric() {
  //   this.fabricService.getFabricsByPatternId(this.product.pattern_id).subscribe(
  //     fabrics => {
  //       this.fabrics = fabrics;
  //       console.log("fabric is loaded"+fabrics); 

  //     });
  //   }
  
    addCart(){
      //this.productService.addToCart(this.token, this.patternId, this.selectedFabric.fabric_id, this.selectedColor.color_id, this.selectedQuantity )
      var productID: string = "abs";

      this.productService.getProductId(this.patternId, this.selectedFabric.fabric_id, this.selectedColor.color_id)
        .subscribe(productId =>{
          productID = productId;
          console.log('before productID : ' + productId)
          
          console.log('after productID : ' + productID)
          this.shoppingCartService.addItem(productId, this.selectedQuantity)
        });
        //console.log('after productID : ' + productID)
          
      //this.router.navigate(['/cart']);
    }

    emptyCart(){
      this.shoppingCartService.empty();
      console.log("cart is emptied");
    }





}
