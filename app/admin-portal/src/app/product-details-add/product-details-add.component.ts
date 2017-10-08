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
  types=["Bedding", "Lamp"]

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
          "imageUrl": "assets/img/upload_image.png"
        }
      ]
    }
    console.log("PRODUCT: " + JSON.stringify(this.product))
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
    this.productId = "TEST"
    console.log("NEW PRODUCT: " + this.product)
    this.catService.saveProduct(this.product).subscribe(res => {
      if (res.status == 200) {
        alert("New Product Added ID: " + res.newProductId)
        let link = ['/catalogue/product/' + res.newProductId];
        this.router.navigate(link);
      } else {
        alert("Changes cannot be saved")
      }

    });
  }

  onAddImage() {
    let images = this.product.images
    console.log(JSON.stringify(images))
    let lastId = images.length
    let newImage = {
      "imageId": lastId + 1,
      "imageUrl": "assets/img/upload_image.png"
    }
    images.push(newImage)
  }

  onUploadImage(fileInput: any, image: any) {
    this.submit();
    let AWSService = (<any>window).AWS
    let imageUrl = ""
    console.log(AWSService)
    let file = fileInput.target.files[0];
    let fileName = this.productId + '_' + image.imageId + '.png'
    AWSService.config.accessKeyId = 'AKIAJR7LKNNCXB6OVEPQ';
    AWSService.config.update({ region: 'us-west-2' });
    AWSService.config.secretAccessKey = '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';
    let bucket = new AWSService.S3({ params: { Bucket: 'elasticbeanstalk-us-west-2-126347216585/Product Images' } })
    let params = { Key: fileName, Body: file, ACL: "public-read" };
    bucket.upload(params, function (error, res) {
      console.log('error', error);
      console.log('response', res);
      imageUrl = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/' + fileName
      image['imageUrl'] = imageUrl
      console.log("FC: " + JSON.stringify(image))
    })
  }

}