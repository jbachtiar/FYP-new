import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../interface/customer';
import { ProfileService } from '../profile.service';
import { CartService } from '../cart.service';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCart } from "../cart/model/shopping-cart.model";
import { CartItem } from "../cart/model/cart-item.model";
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
  private saveAddress:boolean = false;
  private carts: any = {};
  private numOfItem: 0;
  private itemPrice: number[] = new Array();
  private sameAddre: boolean = false;
  private shoppingCart: ShoppingCart;
  private cartItem: CartItem[]
  private loading: boolean = true;
  private countries: any= {};

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
    this.cartItem = this.shoppingCart.items
    console.log(new Date().toLocaleDateString());
    console.log(this.token);
    this.sameAddre = true;
    this.profileService.displayProfile(this.token).subscribe(
      res => {
        if (res.status === '200') {
          console.log("Retrieve successful");
          this.customer = this.profileService.getCustomer();
          this.user.firstName = this.customer.firstName;
          this.user.lastName = this.customer.lastName;
          this.user.contact = this.customer.contact
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
      }
    )
    this.countries=this.profileService.getCountries();


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
  increment(productId: string) {
    this.shoppingCart.items.find((p) => p.productId === productId).quantity += 1
    this.updateCart()
  }

  //decrease product qty
  decrement(productId: string) {
    if (this.shoppingCart.items.find((p) => p.productId === productId).quantity > 1) {
      this.shoppingCart.items.find((p) => p.productId === productId).quantity -= 1
      this.updateCart()
    } else {
      this.remove(productId);
    }
  }

  remove(productId: string) {
    let indexCut = this.shoppingCart.items.findIndex((p) => p.productId === productId)
    this.shoppingCart.items.splice(indexCut, 1)
    this.updateCart()
    window.location.reload()
    console.log('index: ' + indexCut)
  }

  updateCart() {
    this.shoppingCartService.updateCart(this.shoppingCart)
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
    // if (this.canRedirectToPayment()) {
      if(this.isNewAddress && this.saveAddress){
        this.user.address.push(this.newAddress)
      }
      this.router.navigateByUrl('/checkout/payment');
      this.storageService.setShippingAddress(this.user.firstName, this.user.lastName, this.user.contact, this.selectedAddress.address_line, this.selectedAddress.city, this.selectedAddress.country, this.selectedAddress.postal_code);

      this.cartService.updateCart("C1", new Date().toLocaleDateString(), this.showTotalPrice()).subscribe(
        res => {
          if (res.status === '200') {

            console.log("Updated");
          } else {
            console.log("Unable to update");
          }
        }
      );
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

  // canRedirectToPayment(): boolean {

  //   if (this.user.firstName.length > 0 && this.user.lastName.length > 0 && this.user.address.length > 0 && this.user.contact.length > 0 && this.user.postCode.length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  checkAddress(){
    console.log("address is changed to: " + this.selectedAddress)
    if (this.selectedAddress=="New Address"){
      this.isNewAddress=true
    } else{
      this.isNewAddress=false
    }
  }

}

