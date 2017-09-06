import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AlertService } from '../alert.service';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from "../model/cart-item.model";
import { CartPopupComponent } from '../cart-popup/cart-popup.component'
import { SharedService } from "../shared.service"

export interface QuickViewPopupModel {
  title: string;
  message: string;
  patternId: string
}

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css'],
  providers: [AlertService, ProductService, ShoppingCartService]
})
export class QuickViewComponent extends DialogComponent<QuickViewPopupModel, boolean> implements QuickViewPopupModel {
  title: string;
  message: string;
  patternId: string;
  pattern: any = {};
  fabrics: any = {};
  quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  selectedFabric: any;
  selectedColour: any;
  selectedQuantity = 1;
  selectedFabricPrice: number;
  selectedColourPrice: number;
  totalPrice: number;
  cartItem: CartItem = new CartItem();
  productId: string;
  eachPrice: number;
  private loading: boolean = true;

  constructor(
    private shoppingCartService: ShoppingCartService,
    dialogService: DialogService,
    private productService: ProductService,
    private alertService: AlertService,
    private sharedService: SharedService) {
    super(dialogService);
  }


  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

  ngOnInit() {
    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.startLoading()
        this.pattern = pattern;
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColour = this.selectedFabric.colours[0]
        this.selectedFabricPrice = +this.selectedFabric.fabric_price
        this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice
        this.stopLoading()
      });

  }

  onFabricChange() {
    this.selectedColour = this.selectedFabric.colours[0];
    this.selectedFabricPrice = +this.selectedFabric.fabric_price;

    this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice
    console.log("Pattern Price: " + this.pattern.pattern_price)
    console.log("Fabric Price: " + this.selectedFabricPrice)
  

    console.log("RECALCULATED PRICE - fabric: " + this.totalPrice);
  }

  closeModal() {
    this.confirm();
  }

  addCart() {
    
    //this.getProductId();
    this.startLoading()
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

            // this.cartItem.productId = this.productId
            // this.cartItem.eachPrice = this.eachPrice
            // this.cartItem.patternName = this.pattern.pattern_name
            // this.cartItem.quantity = this.selectedQuantity
            // this.cartItem.url = this.selectedColour.image_url
            // this.cartItem.fabricName = this.selectedFabric.fabric_name
            // console.log("fabric name : " + this.cartItem.fabricName)
            // this.cartItem.colourName = this.selectedColour.colour_name
            // console.log("colour name : " + this.cartItem.colourName)

            // console.log(this.cartItem.patternName)
            console.log('eachPrice: ' + this.eachPrice)
            this.shoppingCartService.addItem(this.cartItem)
            this.sharedService.updateCart();
            this.stopLoading()
            //window.location.reload();
            this.closeModal()
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
}
