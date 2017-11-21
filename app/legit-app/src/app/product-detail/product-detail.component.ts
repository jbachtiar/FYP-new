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
  recommendation: any = [];
  product_ids = [];
  recom_loading = true;
  show_recom = false;

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
 
    this.loadingImage = false;

  }

  ngOnInit() {
    this.token = localStorage.getItem("token")


    this.route.params.subscribe((params: Params) => {
      this.patternId = params['patternId']; // grab the parameter from url
    });

    this.productService.getProductIdsByPatternId(this.patternId).subscribe(product_ids => {
      this.product_ids = product_ids;

      if (!this.token) {
        let guestPreference = JSON.parse(localStorage.getItem("guestPref"))
        if(guestPreference == null){
          guestPreference = {}
        }
     
        // let guestPreference = {}
        for (let id of this.product_ids) {
          guestPreference[+id] = 5
        }
       
        
        localStorage.setItem("guestPref", JSON.stringify(guestPreference))
        this.productService.getProductRecommendation("", 0, 0, JSON.stringify(guestPreference)).subscribe(products => {
          this.recommendation = products
 
          this.recom_loading = false;
          if (this.recommendation.length!=0){
            this.show_recom = true;
          }
        });
      } else {
       
        let tempRecom = []
<<<<<<< HEAD
        // for (let id of this.product_ids) {
        //   console.log("ID: " + id)
          this.productService.getProductRecommendation(this.token, ""+this.product_ids, 1, "{}").subscribe(
=======
        for (let id of this.product_ids) {
        
          this.productService.getProductRecommendation(this.token, id, 1, "{}").subscribe(
>>>>>>> 48d0ceb355064e003f6f50931f0f6778a15a6915

            products => {
        
              this.recommendation = products
              // for (let p of tempRecom){
              //   if(p!=null){
              //     this.recommendation.push(p)
              //   }
              // }
              this.recom_loading = false;
      
              if (this.recommendation.length!=0){
                this.show_recom = true;
              }
            });
        // }
      }
    });

    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.startLoading()
        this.pattern = pattern;

        //this.selectedProduct = pattern.product.fabrics[0];
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColour = this.selectedFabric.colours[0]
        this.selectedSize = this.selectedColour.sizes[0];
        this.selectedSizePrice = + this.selectedSize.sizePrice
        this.selectedFabricPrice = +this.selectedFabric.fabric_price
        this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedSizePrice
        this.stopLoading();
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


  }

  onSizeChange() {

    this.selectedSizePrice = + this.selectedSize.sizePrice;
    this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedSizePrice



  }

  onColourChange() {
    // this.selectedColourPrice = +this.selectedColour.colour_price;
    //this.totalPrice = this.pattern.pattern_price + this.selectedFabricPrice + this.selectedColourPrice;
    //   this.selectedSize = this.selectedColour.sizes[0];
    this.selectedSize = this.selectedColour.sizes[0];

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



    //add data to mahout
    
    this.productService.getProductById(this.patternId, this.selectedFabric.fabric_id, this.selectedColour.colour_id)
      .subscribe(res => {
    
        this.selectedProduct = res.product;

        if(this.token){
          console.log("productid: " + JSON.stringify(this.selectedProduct))
          this.productService.getProductRecommendation(this.token, this.selectedProduct.productId, 5, "{}").subscribe(products => this.recommendation)
        }

        this.cartItem.product = this.selectedProduct
        this.cartItem.quantity = this.selectedQuantity
        this.cartItem.unitPrice = this.totalPrice

 

        this.shoppingCartService.addItem(this.cartItem)

        this.sharedService.updateCart();
        this.stopLoading()
        // window.location.reload();
        let disposable = this.dialogService.addDialog(CartPopupComponent, {
          title: 'Item is added to cart!',
          message: ''
        })
          .subscribe((isConfirmed) => {

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
    this.router.navigate(["/productDetails", patternId])
    window.location.reload();

  }


}
