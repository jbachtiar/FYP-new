import { CartItem } from "./cart-item.model";

//Shopping Cart Model
export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public cartId: string = "";
  public totalPrice: number = 0;
  public noOfItems: number = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.cartId = src.cartId;
    this.totalPrice = src.totalPrice;
    this.noOfItems = src.noOfItems;
  }
}
