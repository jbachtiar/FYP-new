import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService]
})
export class HomeComponent implements OnInit {
  products:any=[]
  taxonList = [{
    "id": 4,
    "name": "Mugs",
    "pretty_name": "Categories -> Mugs",
    "permalink": "categories/mugs",
    "parent_id": 1,
    "taxonomy_id": 1,
    "taxons": null},
  {
    "id": 3,
    "name": "Bags",
    "pretty_name": "Categories -> Bags",
    "permalink": "categories/bags",
    "parent_id": 1,
    "taxonomy_id": 1,
    "taxons": null
  }, {
    "id": 8,
    "name": "Ruby",
    "pretty_name": "Brand -> Ruby",
    "permalink": "brand/ruby",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }, {
     "id": 9,
    "name": "Apache",
    "pretty_name": "Brand -> Apache",
    "permalink": "brand/apache",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }, {
    "id": 10,
    "name": "Spree",
    "pretty_name": "Brand -> Spree",
    "permalink": "brand/spree",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }, {
    "id": 11,
    "name": "Rails",
    "pretty_name": "Brand -> Rails",
    "permalink": "brand/rails",
    "parent_id": 2,
    "taxonomy_id": 2,
    "taxons": null
  }];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getWinterCollection();
  }

  
  getWinterCollection(): void {
    this.productService.getFilteredProductList("5", undefined, undefined, undefined, undefined).subscribe(
      products => {
        for (var i=0; i<3; i++){
          let p = products[i]
          this.products.push(p)
        }  
        console.log("winter is coming: " + JSON.stringify(this.products))
      });
  }

}
