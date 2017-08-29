import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';
import { FabricService } from '../fabric.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from "../cart/model/cart-item.model";
import { NavbarComponent } from '../navbar/navbar.component';
import { CartPopupComponent } from '../cart-popup/cart-popup.component'
import { DialogService } from "ng2-bootstrap-modal";
import { SharedService } from "../shared.service"


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, FabricService, ShoppingCartService],

})
export class ProductDetailComponent implements OnInit {
  selectedFabric: any;
  selectedColour: any;
  selectedQuantity = 1;
  cartItem: CartItem = new CartItem();
  productId: string;
  eachPrice: number;
  patternId: string;
  pattern: any = {};
  fabrics: any = {};
  quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  selectedFabricPrice: number;
  selectedColourPrice: number;
  totalPrice: number;
  loading: boolean = true;
  loadingImage: boolean = false;

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
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColour = this.selectedFabric.colours[0]
        this.selectedFabricPrice = +this.selectedFabric.fabric_price
        this.selectedColourPrice = +this.selectedColour.colour_price
        this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedColourPrice
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
    this.selectedColourPrice = +this.selectedColour.colour_price;
    this.selectedFabricPrice = +this.selectedFabric.fabric_price;
    this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedColourPrice;

    console.log("RECALCULATED PRICE" + this.totalPrice);
  }

  onColourChange() {
    this.selectedColourPrice = +this.selectedColour.colour_price;
    this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedColourPrice;

    console.log("RECALCULATED PRICE" + this.totalPrice)
  }

  addCart() {
    this.startLoading()
    //this.getProductId();
    this.productService.getProductId(this.patternId, this.selectedFabric.fabric_id, this.selectedColour.colour_id)
      .subscribe(productId => {
        console.log('inside get product id')
        this.productId = productId;
        console.log("selectedColour: " + this.selectedColour.colour_name)
        console.log("selectedFabric: " + this.selectedFabric.fabric_id)
        console.log("quantity: " + this.selectedQuantity)
        console.log('thispID: ' + this.productId)

        this.productService.getPriceById(this.productId)
          .subscribe(eachPrice => {
            console.log('each price')
            this.eachPrice = eachPrice
            console.log(this.productId)

            this.cartItem.productId = this.productId
            this.cartItem.eachPrice = this.eachPrice
            this.cartItem.patternName = this.pattern.pattern_name
            this.cartItem.quantity = this.selectedQuantity
            this.cartItem.url = this.selectedColour.image_url
            this.cartItem.fabricName = this.selectedFabric.fabric_name
            console.log("fabric name : " + this.cartItem.fabricName)
            this.cartItem.colourName = this.selectedColour.colour_name
            console.log("colour name : " + this.cartItem.colourName)

            console.log(this.cartItem.patternName)
            console.log('eachPrice: ' + this.eachPrice)

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
      });
  }

  getProductId() {

  }

  emptyCart() {
    this.shoppingCartService.empty();
    console.log("cart is emptied");
  }
}
