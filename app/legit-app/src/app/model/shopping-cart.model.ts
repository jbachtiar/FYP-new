import { CartItem } from "./cart-item.model";

//Shopping Cart Model
export class ShoppingCart {
  public cartItems: CartItem[] = new Array<CartItem>();
  public cartId: number;
  public price: number = 0;
  public discount: number = 0;
  public promoMsg: string = "";
  public promoId: number;

  public updateFrom(src: ShoppingCart) {
    this.cartItems = src.cartItems;
    this.cartId = src.cartId;
    this.price = src.price;
    this.discount = src.discount;
    this.promoMsg = src.promoMsg;
    this.promoId = src.promoId;
  }
}
