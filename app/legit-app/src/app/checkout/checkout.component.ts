import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../interface/customer';
import { ProfileService } from '../profile.service';
import { CartService } from '../cart.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCart } from "../model/shopping-cart.model";
import { CartItem } from "../model/cart-item.model";
import { ShoppingCartService } from "app/shopping-cart.service";

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
    console.log(new Date().toLocaleDateString());
    console.log(this.token);
    this.sameAddre = true;
    this.profileService.displayProfile(this.token).subscribe(
      res => {
        if (res.status === '200') {
          console.log("Retrieve successful");
          // this.customer = this.profileService.getCustomer();
          // this.user.firstName = this.customer.firstName;
          // this.user.lastName = this.customer.lastName;
          // this.user.contact = this.customer.contact
          // this.user.address = this.customer.address;
          // this.addressBook = this.user.address;
          this.user=res.user;
          this.addressBook=this.user.address
          console.log("address book: " + JSON.stringify(this.addressBook))
          this.addressBook.forEach(a => {
            if (a.isDefault == "Y") {
              console.log("default address: " + JSON.stringify(a))
              this.selectedAddress = a;
            }
          });
          console.log("EMAIL: " + this.addressBook[0].email)
          
        } else {
          console.log("Retrieve failed");
        }
      }
    )
    this.countries = this.profileService.getCountries();
    for (let c of this.countries){
         this.countryCodes.push(c.dial_code);
         console.log("COUNTRY CODE: " + c.dial_code)
    }
    this.countryCodes.sort();
    console.log("COUNTRY CODES: " + this.countryCodes)

    this.stopLoading()
    // this.cartService.getCartItemByCartId("C1").subscribe(
    //   carts => {

    //     console.log("Cart items retrieved successfully");
    //     this.carts = carts;


    //   })
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
    console.log('index: ' + indexCut)
  }

  updateCart() {
    this.shoppingCartService.updateCart(this.shoppingCart)
  }

  saveAddress() {
    console.log("NEW ADDRESS: " + JSON.stringify(this.newAddress))
    this.newAddress['email']=this.addressBook[0].email
    console.log("EMAIL: " + this.addressBook[0].email)
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
      console.log(this.token);
      this.sameAddre = true;
      this.profileService.displayProfile(this.token).subscribe(
        res => {
          if (res.status === '200') {
            console.log("Retrieve successful");
            this.customer = this.profileService.getCustomer();
            this.user.firstName = this.customer.firstName;
            this.user.lastName = this.customer.lastName;
            this.user.contact = this.customer.contact;
            this.user.address = this.customer.address;
            this.addressBook = this.customer.address;
            this.addressBook.forEach(a => {
              if (a.default == "yes") {
                console.log("default address: " + JSON.stringify(a))
                this.selectedAddress = a;
              }
            });
            // this.user.postCode = this.customer.postalCode;
          } else {
            console.log("Retrieve failed");

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
          console.log("Deleted");
        } else {
          console.log("Unable to delete")
        }
      }
    );
  }
  onQtyChange(c) {

    this.cartService.updateCartItem("C1", c.SKU, c.quantity).subscribe(
      res => {
        if (res.status === '200') {
          console.log("Updated");
        } else {
          console.log("Unable to update");
        }
      }
    );


  }

  submit() {
    let orderAddress: any = {}
    console.log("ADDRESS: " + JSON.stringify(this.newAddress));
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
    console.log("orderAddress in checkout ts: " + JSON.stringify(orderAddress))
    this.storageService.setShippingAddress(orderAddress, this.isSaveAddress);

    // this.cartService.updateCart("C1", new Date().toLocaleDateString(), this.showTotalPrice()).subscribe(
    //   res => {
    //     if (res.status === '200') {

    //       console.log("Updated");
    //     } else {
    //       console.log("Unable to update");
    //     }
    //   }
    // );
    // }
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
    console.log("address is changed to: " + this.selectedAddress)
    if (this.selectedAddress == "New Address") {
      this.isNewAddress = true
    } else {
      this.isNewAddress = false
    }
  }

}

