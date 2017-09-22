import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';
import { CartService } from '../cart.service';
import { ShoppingCart } from "../model/shopping-cart.model";
import { CartItem } from "../model/cart-item.model";
import { ShoppingCartService } from '../shopping-cart.service'
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CartComponent } from '../cart/cart.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { SharedService } from '../shared.service'
import { OrderService } from '../order.service'

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
  // postalCode: string;
  totalPrice: string;
  private shoppingCart: ShoppingCart;
  private cartItem: CartItem[];
  private stripeToken;
  private loading : boolean = false;


  constructor(
    private storageService: StorageService,
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
    console.log("ADDRESS oioioi: " + this.address);

    this.cartItem = this.shoppingCart.cartItems;
  }

  openCheckout() {
    
    console.log("CHECKOUT")
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_PcfRcpvH8lJ8P7GtXdwbTl9D',
      locale: 'auto',
      token: (token: any) => {
        
        // You can access the token ID with `token.id`.
        // Get the token ID to our server-side code for use.
        this.chargeStripe(token.id, this.shoppingCart.price * 100);

      }
    });
    console.log("TOTAL PRICE :" + this.shoppingCart.price)
    this.loading = true;
    
    handler.open({
      name: 'Highlander',
      description: 'Secured Payment',
      amount: this.shoppingCart.price * 100
    });
  }

  chargeStripe(token, amount) {
    this.shoppingCartService.chargeStripe(token, amount).subscribe(res => {
      console.log(res)
      
      if (res.status == 200) {
        //remove items in cart
        this.updateCart()
        //add order to database
        console.log(JSON.stringify(this.shoppingCart))
        // this.orderService.saveOrder()
        //create modal 
        this.showSuccessfulDialog()
        this.loading = false;
        //go home
      } else {
        this.showErrorDialog()
        this.loading = false;
      }
    });
  }

  updateCart(){
    console.log("UPDATE CART FUNCTION")
    this.shoppingCartService.empty();
    this.sharedService.updateCart();
  }

  showSuccessfulDialog() {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'Congratulations!',
      message: 'Your payment is successful. A confirmation email has been sent to your inbox.'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.router.navigate(['/']);
        }
        else {
          this.router.navigate(['/']);
        }
      });
  }

  showErrorDialog() {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'We are sorry!',
      message: 'Your payment is unsuccessful.'
    })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          // this.router.navigate(['/']);
        }
        else {
          // this.router.navigate(['/']);
        }
      });

  }
}
