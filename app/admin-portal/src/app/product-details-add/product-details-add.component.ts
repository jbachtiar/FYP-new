import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'
import { Product } from '../entities/product'
//include aws webpack
require('aws-sdk');

@Component({
  selector: 'app-product-details-add',
  templateUrl: './product-details-add.component.html',
  styleUrls: ['./product-details-add.component.css'],
  providers: [CatalogueService]

})
export class ProductDetailsAddComponent implements OnInit {
  imgCounter = 0
  productId;
  product: any;
  patternFabrics: any = {}
  patternColours: any = {}
  fabrics;
  colours;
  patterns;
  selectedFabric;
  selectedColour;
  selectedPattern;
  patternUrl = "";
  loading: boolean = true;
  types = ["Bedding", "Lamp"]

  constructor(private catService: CatalogueService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    // this.catService.getProductById(this.productId).subscribe(
    //   product => {
    this.startLoading()
    this.product = {
      productId: 0,
      productType: "",
      pattern: {},
      fabric: {},
      colour: {},
      images: [
        {
          "imageId": 1,
          "imageUrl": "assets/img/upload_image.png",
        }
      ]
    }
    // console.log("PRODUCT: " + JSON.stringify(this.product))
    this.productId = this.product.productId
    this.selectedFabric = this.product.fabric
    this.selectedColour = this.product.colour
    this.selectedPattern = this.product.pattern

    this.catService.getAllFabrics().subscribe(
      fabrics => {
        this.fabrics = fabrics;

      });
    this.catService.getAllColours().subscribe(
      colours => {
        this.colours = colours;
        // this.selectedColour = this.colours[0]

      });
    this.catService.getAllPatterns().subscribe(
      patterns => {
        this.patterns = patterns;

      });
    this.stopLoading()
    // });
  }

  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

  submit() {
    this.product.productType = "Bedding"
    if (this.productId == 0) {
      // console.log("NEW PRODUCT: " + this.product)
      this.catService.saveProduct(this.product).subscribe(res => {
        if (res.status == 200) {
          this.productId = res.newProductId
          alert("New Product Added ID: " + this.productId)
          let link = ['/catalogue/product/' + this.productId];
          this.router.navigate(link);
        } else {
          alert("Changes cannot be saved")
        }
      });
    }

  }

  onAddImage() {
    let images = this.product.images
    // console.log(JSON.stringify(images))
    let lastId = images.length
    let newImage = {
      "imageId": lastId + 1,
      "imageUrl": "assets/img/upload_image.png"
    }
    images.push(newImage)
  }
  //http://highlanderbucket.s3-website-ap-southeast-1.amazonaws.com
  onUploadImage(fileInput: any, image: any) {
    let nextProductId ;
    this.catService.getNextProductId().subscribe(res =>{
      nextProductId = res.nextProductId;
      this.imgCounter++;
      let AWSService = (<any>window).AWS
      let imageUrl = "assets/img/loading_image.gif"
      image['imageUrl'] = imageUrl
      // console.log(AWSService)
      let file = fileInput.target.files[0];
      let fileName = nextProductId + '_' + image.imageId + '.png'
      
      AWSService.config.accessKeyId = '';
      AWSService.config.update({ region: '' });
      AWSService.config.secretAccessKey = '';
      let bucket = new AWSService.S3({ params: { Bucket: '' } })
      let params = { Key: fileName, Body: file, ACL: "public-read" };
      bucket.upload(params, function (error, res) {
        // console.log('error', error);
        // console.log('response', res);
        imageUrl = '' + fileName
        image['imageUrl'] = imageUrl
        image['fileInput'] = fileInput
        // console.log("FC: " + JSON.stringify(image))
      })
    });
    
  }

}
