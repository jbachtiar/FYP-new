import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "../model/shopping-cart.model";
import { CartItem } from "../model/cart-item.model";
import { Subscription } from "rxjs/Subscription";
import { DialogService } from "ng2-bootstrap-modal";
import { DeleteConfirmationPopupComponent } from '../delete-confirmation-popup/delete-confirmation-popup.component'
import { SharedService } from '../shared.service'
import { Angulartics2GoogleAnalytics } from 'angulartics2';
declare var ga: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ShoppingCartService]
})


export class CartComponent implements OnInit {
  private CART_KEY = "cart";
  public itemCount: number = 0;
  public cart: Observable<ShoppingCart>;
  private cartSubscription: Subscription;
  private shoppingCart: ShoppingCart;
  private cartItem : CartItem[]
  private empty: boolean = true;
  subscription: Subscription;
  private promo;
  private discount: number = 0;

  public constructor(
    private shoppingCartService: ShoppingCartService,
    private dialogService: DialogService,
    private sharedService: SharedService) {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart'))
    this.subscription = this.sharedService.emptyCart$.subscribe(
        () => {
          // alert('(Component2) Method called!');
          this.emptyCart();
          this.sharedService.updateCart();
    });
  }

  ngOnInit() {
    
    this.sharedService.updateCart()
    console.log(JSON.stringify(this.shoppingCart))
    this.itemCount = this.shoppingCart.cartItems.length;
    if(this.itemCount > 0){
      this.empty = false;
    }
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
    ga('create', 'UA-106185727-2', 'auto');
    ga('require', 'ec');
    // Send checkout event 1 event to enhanced ecommerce
    ga('ec:setAction', 'checkout', {'step': 4});
    // Send click with an event
    ga('send', 'event', 'Session Movement', 'View Cart');
    ga('send', 'pageview');
    //this.shoppingCartService.retrieveCartDB();

    this.cartItem = this.shoppingCart.cartItems
    // this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    // this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    // });
    
  }

  //increase product qty
  increment(productId: number){
    console.log("productID = " + productId)
    console.log(this.shoppingCart.cartItems.find((p) => p.product.productId === productId))
    
    this.shoppingCart.cartItems.find((p) => p.product.productId === productId).quantity +=1
    this.shoppingCartService.updateCart(this.shoppingCart);
  }

  //decrease product qty
  decrement(productId: number){
    if(this.shoppingCart.cartItems.find((p) => p.product.productId === productId).quantity > 1){
       this.shoppingCart.cartItems.find((p) => p.product.productId === productId).quantity -=1
       this.shoppingCartService.updateCart(this.shoppingCart);
    }else{
      this.remove(productId);
    }
  }

  emptyCart(){
    console.log("CART IS EMPTIED")
    this.shoppingCartService.empty()
    //window.location.reload()
  }

  onCheck(code: string){
    console.log("CHECKING PROMO CODE " +code)

    this.shoppingCartService.checkPromo(code, this.shoppingCart.price).subscribe(
       promo => {
        
         this.promo = promo;
         this.discount = promo.discountAmt;
         console.log("PROMO CODE " + this.discount);
         this.shoppingCart.discount = this.discount;
         this.shoppingCartService.updateCart(this.shoppingCart);
        
    });

  }

  remove(productId: number){
    let disposable = this.dialogService.addDialog(DeleteConfirmationPopupComponent, {
      title: 'Remove item?',
      message: 'Are you sure to remove this item from the cart?'
    })
      .subscribe((isConfirmed) => {
        console.log("DIALOG")
        //We get dialog result
        if (isConfirmed) {
          let indexCut =  this.shoppingCart.cartItems.findIndex((p) => p.product.productId === productId)
          this.shoppingCart.cartItems.splice(indexCut,1)
          console.log("PRODUCT ID : " + productId)
          
          this.shoppingCartService.deleteItemDB(productId)
          this.shoppingCartService.updateCart(this.shoppingCart)
          if(this.shoppingCart.cartItems.length === 0){
            this.empty = true;
          }
          //this.updateCart()
          this.sharedService.updateCart();
          //window.location.reload()

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
          console.log();
          ga('create', 'UA-106185727-2', 'auto');
          ga('require', 'ec');
          ga('ec:addProduct',{
          // productFieldObject stores product click and other details
          'id': productId, // Product ID/SKU - Type: string
          });
            // Send Add cart event to enhanced ecommerce
            ga('ec:setAction', 'remove');
            // Send click with an event, then send user to product page.
            ga('send', 'event', 'Cart Movement', 'Product Removed from Cart', productId);
            ga('send', 'pageview');
          
        }
        else {
          //do nothing
        }
      });
      
    
  }

  updateCart(){
    console.log(this.shoppingCart);
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.shoppingCart));
  }

  getCartDB(){
    this.shoppingCartService.retrieveCartDB();
  }
}
