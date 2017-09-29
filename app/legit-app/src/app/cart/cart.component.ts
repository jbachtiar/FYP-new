import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "../model/shopping-cart.model";
import { CartItem } from "../model/cart-item.model";
import { Subscription } from "rxjs/Subscription";
import { DialogService } from "ng2-bootstrap-modal";
import { DeleteConfirmationPopupComponent } from '../delete-confirmation-popup/delete-confirmation-popup.component'
import { SharedService } from '../shared.service'

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
