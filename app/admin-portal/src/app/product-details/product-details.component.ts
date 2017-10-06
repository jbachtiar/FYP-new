import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [CatalogueService]
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  product: any = {};
  patternFabrics: any = {}
  patternColours: any = {}
  fabrics = [];
  colours = []
  selectedColour = [];
  patternUrl = "";
  loading:boolean  = true;

  constructor(private catService: CatalogueService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['productId']; // grab the parameter from url
      this.patternUrl = CONFIG.eCommerceWebsiteUrl + '/productDetails/' + this.productId
    });
    this.catService.getProductById(this.productId).subscribe(
      product => {
        this.startLoading()
        this.product = product;
        this.stopLoading()
    });
  }

  startLoading(){
    this.loading = true;
  }

  
  stopLoading(){
    this.loading = false;
  }

  onEdit(){
    let link = ['catalogue/product/edit', this.productId];
    this.router.navigate(link);
  }

}
