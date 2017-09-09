import { Fabric } from "../model/fabric"
import { Colour } from "../model/colour"
import { Pattern } from "../model/pattern"
import { Image } from "../model/image"

export class Product {
  public productId: number;
  public productType: string;
  public pattern: Pattern;
  public colour: Colour;
  public fabric: Fabric;
  public images: Image[];
}
