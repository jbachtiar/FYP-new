import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AlertService } from '../alert.service';
import { ProductService } from '../product.service';


export interface QuickViewPopupModel {
  title:string;
  message:string;
  patternId: string
}

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css'],
  providers: [ AlertService, ProductService]
})
export class QuickViewComponent extends DialogComponent<QuickViewPopupModel, boolean> implements QuickViewPopupModel { 
    title: string;
    message: string;
    patternId: string; 
    pattern: any = {};
    fabrics: any = {};
    quantity = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    selectedFabric: any;
    selectedColor: any;
    selectedQuantity=1;
    selectedFabricPrice:number;
    selectedColourPrice:number;
    totalPrice:number;

    constructor(
        dialogService: DialogService,
        private productService:ProductService,
        private alertService: AlertService) {
             super(dialogService);
        }
        

    confirm() {
        // we set dialog result as true on click on confirm button, 
        // then we can get dialog result from caller code 
        this.result = true;
        this.close();
    }
    

  ngOnInit() {
      this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.pattern = pattern;
        this.selectedFabric = pattern.fabrics[0]
        this.selectedColor = this.selectedFabric.colours[0]
        this.selectedFabricPrice = +this.selectedFabric.fabric_price
        this.selectedColourPrice = +this.selectedColor.color_price
        this.totalPrice = this.selectedFabricPrice + this.selectedColourPrice
      });

  }

   onFabricChange(){
      this.selectedColor = this.selectedFabric.colours[0];
      this.selectedFabricPrice = +this.selectedFabric.fabric_price;
      this.totalPrice = this.selectedFabricPrice + this.selectedColourPrice;
      console.log("RECALCULATED PRICE" + this.totalPrice);
    } 

    onColourChange(){
      this.selectedColourPrice = +this.selectedColor.color_price;
      this.totalPrice = this.selectedFabricPrice + this.selectedColourPrice;
      console.log("RECALCULATED PRICE" + this.totalPrice) 
    }

  closeModal(){
    this.confirm();
  }

}
