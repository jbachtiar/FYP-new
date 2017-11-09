import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { CartService } from '../cart.service';
import { ShoppingCart } from "../model/shopping-cart.model";
import { PromoCode } from "../model/promo-code.model";
import { CartItem } from "../model/cart-item.model";
import { ShoppingCartService } from '../shopping-cart.service'
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CartComponent } from '../cart/cart.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { SharedService } from '../shared.service'
import { OrderService } from '../order.service'
declare var ga: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ShoppingCartService, OrderService]
})
export class PaymentComponent implements OnInit {
  private carts: any = {};
  // firstName: string;
  name: string;
  contact: string;
  address;
  save;
  ordernum;
  promoCode : PromoCode = new PromoCode() ;
  
  // postalCode: string;
  totalPrice: string;
  private shoppingCart: ShoppingCart;
  private cartItem: CartItem[];
  private stripeToken;
  private paymentRefNo: string;
  private loading: boolean = false;

  constructor(private storageService: StorageService,
    private cartService: CartService,
    private shoppingCartService: ShoppingCartService,
    private sharedService: SharedService,
    private _ngZone: NgZone,
    private dialogService: DialogService,
    private orderService: OrderService,
    private router: Router) {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart'), );
  }

  ngOnInit() {
    // this.firstName = this.storageService.getFirstName();
    this.name = this.storageService.getName();
    this.contact = this.storageService.getContact();
    // this.postalCode = this.storageService.getPostCode();
    this.address = this.storageService.getAddress();
    this.save = this.storageService.getSaveAddress();
    this.orderService.getNextOrderID().subscribe(orderNum => {
      this.ordernum = orderNum;
    });
    console.log("ADDRESS oioioi: " + this.address);

    this.cartItem = this.shoppingCart.cartItems;
  }

  openCheckout() {
    
    this.loading = true;
    console.log("CHECKOUT")
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_PcfRcpvH8lJ8P7GtXdwbTl9D',
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to our server-side code for use.
        this.chargeStripe(token.id, (this.shoppingCart.price-this.shoppingCart.discount) * 100);
      }
    });
    console.log("TOTAL PRICE :" + (this.shoppingCart.price-this.shoppingCart.discount))
    handler.open({
      name: 'Highlander',
      description: 'Secured Payment',
      amount: (this.shoppingCart.price-this.shoppingCart.discount) * 100
    });
  }

  chargeStripe(token, amount) {

    this.shoppingCartService.chargeStripe(token, amount).subscribe(res => {
      console.log(res)
      res = res
      if (res.status == 200) {
        //reference id
        this.paymentRefNo = res.paymentRefNo
        //add order to database
        console.log(this.ordernum + " HEREEEEEEEEEE");
        this.promoCode.promoCodeId = this.shoppingCart.promoId;
        let newOrder = {
          "orderId": 0,
          "Timestamp": null,
          "netAmt": this.shoppingCart.price-this.shoppingCart.discount,
          "promoDiscAmt": this.shoppingCart.discount,
          "address": this.address,
          "paymentRefNo": this.paymentRefNo,
          "promoCode": this.promoCode,
          "orderItems": this.shoppingCart.cartItems,
          "statusLogs": [],
          "courierName": "",
          "trackingNo": ""
        }
        console.log(JSON.stringify(this.shoppingCart))

        this.orderService.saveOrder(newOrder).subscribe(res => {
          res = res.json()

          
          if (res.status == 200) {
            //Google Analytics Start
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

            for (let order of newOrder.orderItems) {
              ga('ec:addProduct',{
                // productFieldObject stores product click and other details
                'id': order.product.productId, // Product ID/SKU - Type: string
                'name': order.product.pattern.patternName, // Pattern name - Type: string
                'category': 'Beddings', // Product category - Type: string
                'price': order.unitPrice, // Product price - Type: numeric
                'quantity': order.quantity, //Product Quantity
                });
            }

            ga('ec:setAction', 'purchase',{
             // actionFieldObject stores action data
              'id':this.ordernum, // Transaction id - Type: string
              'netAmt': newOrder.netAmt, // Net amount - Type: numeric
              'discountAmt': newOrder.promoDiscAmt, // Discount amount - Type: numeric
              'coupon': newOrder.promoCode // Order/Transaction coupon - Type: string
             });
            ga('send', 'pageview');
            //end of Google Analytics
            
            //empty cart
            this.updateCart()
            //save address if requested
            if (this.save) {
              this.saveAddress()
            }
            //create modal 
            this.showSuccessfulDialog()
          } else {
            this.showErrorDialog()
          }
        });
      } else {
        this.showErrorDialog()
      }
    });
  }

  updateCart() {
    console.log("UPDATE CART FUNCTION")
    this.sharedService.emptyCart();
  }

  showSuccessfulDialog() {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'Congratulations!',
      message: 'Your payment is successful. A confirmation email has been sent to your inbox.'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {

          this.loading = false;
          this.router.navigate(['/']);
        }
        else {
          
          this.loading = false;
          this.router.navigate(['/']);
        }
      });

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
    ga('ec:setAction', 'checkout', {'step': 6});
    // Send click with an event
    ga('send', 'event', 'Session Movement', 'Payment Page');
    ga('send', 'pageview');
    //end of GA
  }

  showErrorDialog() {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'We are sorry!',
      message: 'Your payment is unsuccessful.'
    })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          
          this.loading = false;
          // this.router.navigate(['/']);
        }
        else {
          
          this.loading = false;
          // this.router.navigate(['/']);
        }
      });

  }

  saveAddress() {
    this.shoppingCartService.saveAddress(this.address).subscribe(res => {
      if (res.status == 200) {
        console.log("Address has been saved");
      }
    });
  }
}
