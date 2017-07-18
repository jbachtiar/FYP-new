import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AlertService } from '../alert.service';
import { ProductService } from '../product.service';


export interface QuickViewPopupModel {
  title:string;
  message:string;
  productId: string
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
    productId: string; 
    product: any = {};
  
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
      this.productService.getProductById(this.productId).subscribe(
      product => {
        this.product = product;
       
    
      });

  }

  closeModal(){
    this.confirm();
  }

}
