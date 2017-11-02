import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AlertService } from '../alert.service';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from "../model/cart-item.model";
import { CartPopupComponent } from '../cart-popup/cart-popup.component'
import { SharedService } from "../shared.service"
import { Product } from "../model/product";
import { Angulartics2GoogleAnalytics } from 'angulartics2';
declare var ga: any;

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
  selectedSize: any;
  selectedQuantity = 1;
  selectedFabricPrice: number;
  selectedColourPrice: number;
  selectedSizePrice: number;
  totalPrice: number;
  cartItem: CartItem = new CartItem();
  productId: string;
  eachPrice: number;
  private loading: boolean = true;
  selectedProduct: Product;


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
        console.log(this.pattern);
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColour = this.selectedFabric.colours[0]
        this.selectedSize = this.selectedColour.sizes[0];
        this.selectedSizePrice = + this.selectedSize.sizePrice
        this.selectedFabricPrice = +this.selectedFabric.fabric_price
        this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedSizePrice;

        this.stopLoading()
      });

  }

  onFabricChange() {
    this.selectedColour = this.selectedFabric.colours[0];
    this.selectedSize = this.selectedColour.sizes[0];
    this.selectedSizePrice = + this.selectedSize.sizePrice;
    this.selectedFabricPrice = +this.selectedFabric.fabric_price;
    this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedSizePrice;

    console.log("RECALCULATED PRICE" + this.totalPrice);
  }

  onSizeChange() {

    this.selectedSizePrice = + this.selectedSize.sizePrice;
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

  closeModal() {
    this.confirm();
  }

  addCart() {
    //Start of GA
    (function (i, s, o, g, r, a?, m?) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
              (i[r].q = i[r].q || []).push(arguments)
          }, i[r].l = 1 * <any>new Date();
      a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    // Send checkout event 3 event to enhanced ecommerce
    ga('ec:setAction', 'checkout', {'step': 3});
    // Send click with an event
    ga('send', 'event', 'Session Movement', 'Add Products');
    ga('send', 'pageview');
    //end of GA
    
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

        this.closeModal()
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        setTimeout(() => {
          disposable.unsubscribe();
        }, 10000);

      });

    //Google Analytics
    (function (i, s, o, g, r, a?, m?) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * <any>new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    console.log(this.selectedProduct.pattern.patternName);
    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    ga('ec:addProduct', {
      // productFieldObject stores product click and other details
      'id': this.selectedProduct.pattern.patternId, // Product ID/SKU - Type: string
      'name': this.selectedProduct.pattern.patternName, // Product name - Type: string
      'category': 'Beddings', // Product category - Type: string
      'price': this.cartItem.unitPrice, // Product price - Type: numeric
    });
    // Send Add cart event to enhanced ecommerce
    ga('ec:setAction', 'add');
    // Send click with an event, then send user to product page.
    ga('send', 'event', 'Cart Movement', 'Product Added to Cart', this.selectedProduct.pattern.patternName);
    ga('send', 'pageview');
  }
}
