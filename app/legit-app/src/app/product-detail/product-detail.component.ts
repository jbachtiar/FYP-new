import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';
import { FabricService } from '../fabric.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from "../model/cart-item.model";
import { NavbarComponent } from '../navbar/navbar.component';
import { CartPopupComponent } from '../cart-popup/cart-popup.component'
import { DialogService } from "ng2-bootstrap-modal";
import { SharedService } from "../shared.service"
import { Product } from "../model/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, FabricService, ShoppingCartService],

})
export class ProductDetailComponent implements OnInit {
  selectedFabric: any;
  selectedColour: any;
  selectedSize: any;
  selectedQuantity = 1;
  cartItem: CartItem = new CartItem();
  productId: string;
  eachPrice: number;
  patternId: string;
  pattern: any = {};
  fabrics: any = {};
  quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  selectedFabricPrice: number;
  selectedSizePrice: number;
  totalPrice: number;
  loading: boolean = true;
  loadingImage: boolean = false;
  selectedProduct : Product;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private fabricService: FabricService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private sharedService: SharedService
  ) { }

  onLoad() {
    this.loadingImage = true;
    console.log("LOADING : " + this.loadingImage)
    this.loadingImage = false;
    console.log("LOADING : " + this.loadingImage)
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patternId = params['patternId']; // grab the parameter from url

    });

    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.startLoading()
        this.pattern = pattern;
        console.log(JSON.stringify(this.pattern))
        //this.selectedProduct = pattern.product.fabrics[0];
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColour = this.selectedFabric.colours[0]
        this.selectedSize = this.selectedColour.sizes[0];
        this.selectedSizePrice = + this.selectedSize.sizePrice
        this.selectedFabricPrice = +this.selectedFabric.fabric_price
        this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice +  this.selectedSizePrice
        this.stopLoading()
      });
  }

  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

  onFabricChange() {
    this.selectedColour = this.selectedFabric.colours[0]; 
    this.selectedSize = this.selectedColour.sizes[0];
    this.selectedSizePrice=+ this.selectedSize.sizePrice;
    this.selectedFabricPrice = +this.selectedFabric.fabric_price;
    this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice+this.selectedSizePrice;

    console.log("RECALCULATED PRICE" + this.totalPrice);
  }

  onSizeChange() {
 
    this.selectedSizePrice=+ this.selectedSize.sizePrice;
    this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedSizePrice
    console.log("Pattern Price: " + this.pattern.pattern_price)
    console.log("Fabric Price: " + this.selectedFabricPrice)
    console.log("Size Price: " + this.selectedSizePrice)
  
  

    console.log("RECALCULATED PRICE - fabric: " + this.totalPrice);
  }

  onColourChange() {
   // this.selectedColourPrice = +this.selectedColour.colour_price;
    //this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedColourPrice;
   //   this.selectedSize = this.selectedColour.sizes[0];
       this.selectedSize = this.selectedColour.sizes[0];
   // console.log("RECALCULATED PRICE" + this.totalPrice)
  }

  addCart() {
    //this.startLoading()
    // console.log("Pattern ID : " + this.patternId);
    // console.log("Fabric ID : " + this.selectedFabric.fabric_id);
    // console.log("Colour ID : " + this.selectedColour.colour_id);
    //this.getProductId();
    this.productService.getProductById(this.patternId, this.selectedFabric.fabric_id, this.selectedColour.colour_id)
      .subscribe(res => {
        console.log(res.product)
        this.selectedProduct = res.product;
        console.log("selectedColour: " + this.selectedColour.colour_name)
        console.log("selectedFabric: " + this.selectedFabric.fabric_id)
        console.log("quantity: " + this.selectedQuantity)
        console.log('thispID: ' + this.selectedProduct.productId)
        

        this.cartItem.product = this.selectedProduct
        this.cartItem.quantity = this.selectedQuantity
        this.cartItem.unitPrice = this.totalPrice

        console.log(this.cartItem)

        this.shoppingCartService.addItem(this.cartItem)

        this.sharedService.updateCart();
        this.stopLoading()
        // window.location.reload();
        let disposable = this.dialogService.addDialog(CartPopupComponent, {
          title: 'Item is added to cart!',
          message: ''
        })
          .subscribe((isConfirmed) => {
            console.log("DIALOG")
            //We get dialog result
            if (isConfirmed) {
              //do nothing
            }
            else {
              //do nothing
            }
          });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(() => {
          disposable.unsubscribe();
        }, 10000);

      });
  }

  emptyCart() {
    this.shoppingCartService.empty();
    console.log("cart is emptied");
  }
}
