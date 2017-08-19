//Cart Item Model
export class CartItem {
  public productId: string ;
  public patternName: string;
  public fabricName: string;
  public colourName: string;
  public url: string;
  public quantity: number = 0;
  public eachPrice: number = 0;
}
