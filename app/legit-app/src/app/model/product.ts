import { Fabric } from "../model/fabric"
import { Colour } from "../model/colour"
import { Pattern } from "../model/pattern"
import { Image } from "../model/image"

export class Product {
    private productId : number;
    private productType : string;
    private pattern : Pattern;
    private colour : Colour;
    private fabric : Fabric;
    private images :  Image[];
  }
  