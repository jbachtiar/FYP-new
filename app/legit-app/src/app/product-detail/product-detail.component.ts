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
import { Pattern } from "../model/pattern";
import { VirtualRealityComponent } from "../virtual-reality/virtual-reality.component";
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { QuickViewComponent } from '../quick-view/quick-view.component';

declare var ga: any;

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
  selectedProduct: Product;
  token: string;
  recommendation:any =[];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private fabricService: FabricService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private sharedService: SharedService,
    private router: Router,    
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
        this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedSizePrice
        this.stopLoading();
      });

    this.token = localStorage.getItem("token")
    if (!this.token) {
      this.token = ""
      let patternId = 0
      let guestPreference = {patternId: 1}
      this.productService.getProductRecommendation(this.token, this.patternId, 1, guestPreference)
    }
    this.productService.getProductRecommendation(this.token, this.patternId, 1, {}).subscribe(
      products => {
        for (let p of products){
          if(p!=null){
            this.recommendation.push(p)
          }
        }
        console.log("RECOMM: " + this.recommendation)
      });
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  selectColour(colour) {
    this.selectedColour = colour;
    this.onColourChange();
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
    ga('ec:setAction', 'checkout', { 'step': 3 });
    // Send click with an event
    ga('send', 'event', 'Session Movement', 'Add Products');
    ga('send', 'pageview');
    //end of GA

    //this.startLoading()
    // console.log("Pattern ID : " + this.patternId);
    // console.log("Fabric ID : " + this.selectedFabric.fabric_id);
    // console.log("Colour ID : " + this.selectedColour.colour_id);
    //this.getProductId();
    
    //add data to mahout
    this.productService.getProductRecommendation(this.token, this.patternId, 5).subscribe(products => this.recommendation)
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
    //Google Analytics start
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
    console.log(this.cartItem.product.pattern.patternName + " hihi");
    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    ga('ec:addProduct', {
      // productFieldObject stores product click and other details
      'id': this.cartItem.product.productId, // Product ID/SKU - Type: string
      'name': this.cartItem.product.pattern.patternName, // Product name - Type: string
      'category': 'Beddings', // Product category - Type: string
      'price': this.cartItem.unitPrice, // Product price - Type: numeric
    });
    // Send Add cart event to enhanced ecommerce
    ga('ec:setAction', 'add');
    // Send click with an event, then send user to product page.
    ga('send', 'event', 'Cart Movement', 'Product Added to Cart', this.cartItem.product.pattern.patternName);
    ga('send', 'pageview');
    //end of GA
  }

  emptyCart() {
    this.shoppingCartService.empty();
    console.log("cart is emptied");
  }

  virtualReality(imageUrl) {
    let disposable = this.dialogService.addDialog(VirtualRealityComponent, {
      title: 'VR View',
      message: '',
      imageUrl: imageUrl
    })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          // window.location.reload();
        }
        else {
          //do nothing
        }
      });
  }

  showQuickView(patternId, pattern_name) {
    //start of GA
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
    ga('ec:addProduct', {
      // productFieldObject stores product click and other details

      'id': patternId, // Product ID/SKU - Type: string

      'name': pattern_name, // Product name - Type: string

      'category': 'Beddings', // Product category - Type: string

    });

    ga('ec:setAction', 'detail');
    // Send checkout event 1 event to enhanced ecommerce
    // Send click with an event, then send user to product page.
    ga('send', 'event', 'enhanced ecommerce', 'Quick View Clicks', pattern_name);
    ga('send', 'pageview');
    // end of GA

    let disposable = this.dialogService.addDialog(QuickViewComponent, {
      title: 'QuickView',
      message: '',
      patternId: patternId
    })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          // window.location.reload();
        }
        else {
          //do nothing
        }
      });
  }

  onProductClick(patternId, pattern_name) {
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
    console.log(pattern_name);
    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    ga('ec:addProduct', {
      // productFieldObject stores product click and other details

      'id': patternId, // Product ID/SKU - Type: string

      'name': pattern_name, // Product name - Type: string

      'category': 'Beddings', // Product category - Type: string

    });

    ga('ec:setAction', 'detail');

    // Send click with an event, then send user to product page.
    ga('send', 'event', 'enhanced ecommerce', 'Product Detail Clicks', pattern_name);

    ga('send', 'pageview');
    this.router.navigate(["/productDetails",patternId])
    window.location.reload();

  }

 
}
