import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-product-details-edit',
  templateUrl: './product-details-edit.component.html',
  styleUrls: ['./product-details-edit.component.css'],
  providers: [CatalogueService]
})
export class ProductDetailsEditComponent implements OnInit {
  productId: string;
  product: any = {};
  patternFabrics: any = {}
  patternColours: any = {}
  fabrics = [];
  colours = []
  selectedColour = [];
  patternUrl = "";
  loading: boolean = true;
  types= ['Bedding', 'Lamp']

  constructor(private catService: CatalogueService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['productId']; // grab the parameter from url
      this.patternUrl = CONFIG.eCommerceWebsiteUrl + '/productDetails/' + this.productId
    });
    this.catService.getProductById(this.productId).subscribe(
      product => {
        console.log("PRODUCT ID: " + this.productId)
        this.startLoading()
        this.product = product;
        console.log("PRODUCT: " + JSON.stringify(this.product.fabric))
        
        this.stopLoading()
      });
    this.catService.getAllFabrics().subscribe(
      fabrics => {
        this.fabrics = fabrics;
      });
    this.catService.getAllColours().subscribe(
      colours => {
        this.colours = colours;
      });
  }

  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

  submit(){
    this.catService.saveProduct(this.product).subscribe(res => {
      res = res.json()
      if (res.status == 200) {
        
        
        alert("Changes Saved")
      } else {
        alert("Changes cannot be saved")
      }
    });
  }

}
