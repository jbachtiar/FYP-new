import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../interface/customer';
import { ProfileService } from '../profile.service';
import { CartService } from '../cart.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCart } from "../model/shopping-cart.model";
import { CartItem } from "../model/cart-item.model";
import { ShoppingCartService } from "app/shopping-cart.service";
declare var ga: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ShoppingCartService]
})
export class CheckoutComponent implements OnInit {
  private user: any = {};
  private addressBook: any = {};
  private selectedAddress: any = {};
  private isNewAddress: boolean = false;
  private newAddress: any = {};
  private isSaveAddress: boolean = false;
  private carts: any = {};
  private numOfItem: 0;
  private itemPrice: number[] = new Array();
  private sameAddre: boolean = false;
  private shoppingCart: ShoppingCart;
  private cartItem: CartItem[]
  private loading: boolean = true;
  private countries: any = {};
  private countryCodes: any = []

  customer: Customer;
  token: string;
  quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];



  constructor(private shoppingCartService: ShoppingCartService, private profileService: ProfileService, private cartService: CartService, private storageService: StorageService, private route: ActivatedRoute,
    private router: Router) {
    this.token = localStorage.getItem('token');
    this.shoppingCart = JSON.parse(localStorage.getItem('cart'))

  }

  ngOnInit() {
    this.startLoading()
    this.cartItem = this.shoppingCart.cartItems

    if(this.shoppingCart.discount == null){

        this.shoppingCart.discount = 0;

    }
    this.sameAddre = true;
    this.profileService.displayProfile(this.token).subscribe(
      res => {
        if (res.status === '200') {

          this.user=res.user;
          this.addressBook=this.user.address
          this.addressBook.forEach(a => {
            if (a.isDefault == "Y") {
     
              this.selectedAddress = a;
            }
          });
          
        } else {
      
        }
      }
    )
    this.countries = this.profileService.getCountries();
    for (let c of this.countries){
         this.countryCodes.push(c.dial_code);
    }
    this.countryCodes.sort();

    this.stopLoading()

  }

  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

  //increase product qty
  increment(productId: number) {
    this.shoppingCart.cartItems.find((p) => p.product.productId === productId).quantity += 1
    this.updateCart()
  }

  //decrease product qty
  decrement(productId: number) {
    if (this.shoppingCart.cartItems.find((p) => p.product.productId === productId).quantity > 1) {
      this.shoppingCart.cartItems.find((p) => p.product.productId === productId).quantity -= 1
      this.updateCart()
    } else {
      this.remove(productId);
    }
  }

  remove(productId: number) {
    let indexCut = this.shoppingCart.cartItems.findIndex((p) => p.product.productId === productId)
    this.shoppingCart.cartItems.splice(indexCut, 1)
    this.updateCart()
    window.location.reload()

  }

  updateCart() {
    this.shoppingCartService.updateCart(this.shoppingCart)
  }

  saveAddress() {
    this.newAddress['email']=this.addressBook[0].email
    this.newAddress['phoneNo']=this.newAddress.country_code+this.newAddress.contact
    this.newAddress['addressId'] = 0
    this.newAddress['isDefault'] = "N"
    
    this.shoppingCartService.saveAddress(this.newAddress).subscribe(res=>{
      if(res.status==200){
        alert("Address Saved");
      }
    })
    // let newAddress = {"recipientName":"Clarissa","country_code":"+1 869","contact":"9898888","addressLine":"taman ratu","city":"jakarta","country":"Indonesia","postalCode":"11520"}
    // let newAddress":[{"email":"customer@gmail.com","recipientName":"hui yan","phoneNo":"91234230","addressId":1,"addressLine":"134 Highlander Ave 3","city":"Singapore","country":"Singapore","postalCode":"536748","isDefault":"Y"}  
  }
  sameAddress() {
    this.startLoading()
    if (this.user.sameAddress) {

      this.sameAddre = true;
      this.profileService.displayProfile(this.token).subscribe(
        res => {
          if (res.status === '200') {

            this.customer = this.profileService.getCustomer();
            this.user.firstName = this.customer.firstName;
            this.user.lastName = this.customer.lastName;
            this.user.contact = this.customer.contact;
            this.user.address = this.customer.address;
            this.addressBook = this.customer.address;
            this.addressBook.forEach(a => {
              if (a.default == "yes") {
     
                this.selectedAddress = a;
              }
            });
            // this.user.postCode = this.customer.postalCode;
          } else {
           

          }
          this.stopLoading()
        }
      )

    } else {
      this.user.sameAddre = false;
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.contact = "";
      this.user.address = "";
      this.user.postCode = "";
      this.stopLoading()
    }
  }

  delete(index, cart) {

    this.carts.splice(index, 1);
    this.itemPrice.splice(index, 1);
    this.cartService.deleteCartItem("C1", cart.SKU, cart.quantity).subscribe(
      res => {
        if (res.status === '200') {
         
        } else {
       
        }
      }
    );
  }
  onQtyChange(c) {

    this.cartService.updateCartItem("C1", c.SKU, c.quantity).subscribe(
      res => {
        if (res.status === '200') {
       
        } else {
      
        }
      }
    );


  }

  submit() {
    let orderAddress: any = {}

    if (this.isNewAddress) {
      // this.saveAddress()
      this.newAddress['email']=this.addressBook[0].email
      this.newAddress['phoneNo']=this.newAddress.country_code+this.newAddress.contact
      this.newAddress['addressId'] = 0
      this.newAddress['isDefault'] = "N"
      orderAddress.addresssId = ""
      orderAddress = this.newAddress
    } else {
      orderAddress.addressId = ""
      orderAddress = this.selectedAddress;
    }
  
    this.router.navigateByUrl('/checkout/payment');

    this.storageService.setShippingAddress(orderAddress, this.isSaveAddress);

 

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
    ga('ec:setAction', 'checkout', {'step': 5});
    // Send click with an event
    ga('send', 'event', 'Session Movement', 'Shipping Page');
    ga('send', 'pageview');
    //end of GA
  }

  addPrice(index, price) {
    this.itemPrice[index] = price;

  }

  showTotalPrice() {
    let totalPrice = 0;
    for (var i = 0; i < this.itemPrice.length; i++) {
      totalPrice += this.itemPrice[i];

    }
    return totalPrice + "";
  }

  checkAddress() {
    if (this.selectedAddress == "New Address") {
      this.isNewAddress = true
    } else {
      this.isNewAddress = false
    }
  }

}

