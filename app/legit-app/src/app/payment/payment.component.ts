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

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ShoppingCartService]
})
export class PaymentComponent implements OnInit {
  private carts: any = {};
  // firstName: string;
  name: string;
  contact: string;
  address: string;
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
    private router: Router) {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart'), );
  }

  ngOnInit() {
    // this.firstName = this.storageService.getFirstName();
    this.name = this.storageService.getName();
    this.contact = this.storageService.getContact();
    // this.postalCode = this.storageService.getPostCode();
    this.address = this.storageService.getAddress();

    this.cartItem = this.shoppingCart.cartItems;

    // this.cartService.getCartItemByCartId("C1").subscribe(
    //   carts => {

    //     console.log("Cart items retrieved");
    //     this.carts = carts;


    //   })

    // this.cartService.getCartTotalPrice("C1").subscribe(
    //   total_price => {
    //     this.totalPrice = total_price;
    //     console.log(this.totalPrice);


    //   })
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
        // console.log("TOKEN: " + token.id)
        // var http = new XMLHttpRequest();
        // var url = "http://localhost:8084/FYP-backend/API/Payment/chargeStripe";
        // var params = "stripeToken="+token.id;
        // http.open("POST", url, true);

        // //Send the proper header information along with the request
        // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // http.onreadystatechange = function() {//Call a function when the state changes.
        //     if(http.readyState == 4 && http.status == 200) {
        //         //alert(http.responseText); 
        //     }
        // }
        // http.send(params);    
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
        //TO BE DONE
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
    this.sharedService.emptyCart();
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
