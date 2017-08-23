import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "./model/shopping-cart.model";
import { CartItem } from "./model/cart-item.model";
import { Subscription } from "rxjs/Subscription";
import { DialogService } from "ng2-bootstrap-modal";
import { DeleteConfirmationPopupComponent } from '../delete-confirmation-popup/delete-confirmation-popup.component'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ShoppingCartService]
})
export class CartComponent implements OnInit {
  public itemCount: number = 0;
  public cart: Observable<ShoppingCart>;
  private cartSubscription: Subscription;
  private shoppingCart: ShoppingCart;
  private cartItem : CartItem[]
  private empty: boolean = true;

  public constructor(
    private shoppingCartService: ShoppingCartService,
    private dialogService: DialogService) {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart'))

  }

  ngOnInit() {
    this.itemCount = this.shoppingCart.noOfItems
    if(this.itemCount > 0){
      this.empty = false;
    }

    //this.shoppingCartService.retrieveCartDB();

    this.cartItem = this.shoppingCart.items
    // this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    // this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    // });
  }

  //increase product qty
  increment(productId: string){
    this.shoppingCart.items.find((p) => p.productId === productId).quantity +=1
    this.updateCart()
  }

  //decrease product qty
  decrement(productId: string){
    if(this.shoppingCart.items.find((p) => p.productId === productId).quantity > 1){
       this.shoppingCart.items.find((p) => p.productId === productId).quantity -=1
       this.updateCart()
    }else{
      this.remove(productId);
    }
  }

  emptyCart(){
    this.shoppingCartService.empty()
    window.location.reload()
  }

  remove(productId: string){
    let disposable = this.dialogService.addDialog(DeleteConfirmationPopupComponent, {
      title: 'Remove item?',
      message: 'Are you sure to remove this item from the cart?'
    })
      .subscribe((isConfirmed) => {
        console.log("DIALOG")
        //We get dialog result
        if (isConfirmed) {
          let indexCut =  this.shoppingCart.items.findIndex((p) => p.productId === productId)
          this.shoppingCart.items.splice(indexCut,1)
          this.updateCart()
          window.location.reload()
          console.log('index: ' + indexCut)
        }
        else {
          //do nothing
        }
      });
    
  }

  updateCart(){
    this.shoppingCartService.updateCart(this.shoppingCart)
  }
}
