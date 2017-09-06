//Cart Item Model
import { Product } from "../model/product"

export class CartItem {
  public product : Product;
  public quantity: number = 0;
  public unitPrice: number = 0;
}
