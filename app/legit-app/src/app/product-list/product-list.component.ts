import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  private products = []

  constructor(private productService:ProductService) { }
    
  ngOnInit() {
    this.productService.getProductList().subscribe(
      products => {
        this.products = products;
      });
  }
}
