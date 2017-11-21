import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

//include aws webpack
require('aws-sdk');

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [CatalogueService]
})
export class ProductDetailsComponent implements OnInit {
  editPage = false;
  buttonText = "Edit";
  buttonColour = "lightcoral"
  buttonTextColour = "white"
  productId: string;
  product: any = {};
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

  constructor(private catService: CatalogueService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['productId']; // grab the parameter from url
    });
    this.catService.getProductById(this.productId).subscribe(
      product => {
        this.startLoading()
        this.product = product;
        this.selectedFabric = this.product.fabric
        this.selectedColour = this.product.colour
        this.selectedPattern = this.product.pattern
        this.patternUrl = CONFIG.eCommerceWebsiteUrl + '/productDetails/' + this.product.pattern.patternId

        //add 0000 padding
        let temp = "" + product.productId
        var pad = "0000"
        var ans = pad.substring(0, pad.length - temp.length) + temp
        product['productId_display'] = ans
        this.catService.getAllFabrics().subscribe(
          fabrics => {
            this.fabrics = fabrics;
            for (let f of this.fabrics) {
              if (f['fabricId'] == this.selectedFabric.fabricId) {
                // console.log("same")
                this.product.fabric = f
              }
            }
          });
        this.catService.getAllColours().subscribe(
          colours => {
            this.colours = colours;
            // this.selectedColour = this.colours[0]
            for (let c of this.colours) {
              if (c['colourId'] == this.selectedColour.colourId) {
                this.product.colour = c
              }
            }
          });
        this.catService.getAllPatterns().subscribe(
          patterns => {
            this.patterns = patterns;
            // this.selectedColour = this.colours[0]
            for (let p of this.patterns) {
              if (p['patternId'] == this.selectedPattern.patternId) {
                this.product.pattern = p
              }
            }
          });
        this.stopLoading()
      });

  }

  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

  onEdit() {
    if (!this.editPage) {
      this.editPage = true;
      this.buttonText = "Back"
      this.buttonColour = "white"
      this.buttonTextColour = "lightcoral"
    } else {
      this.editPage = false;
      this.buttonText = "Edit"
      this.buttonColour = "lightcoral"
      this.buttonTextColour = "white"
    }
  }

  submit() {
    this.catService.updateProduct(this.product).subscribe(res => {
      res = res.json()
      if (res.status == 200) {
        // console.log(this.product)
        this.onEdit()
        alert("Changes Saved")
      } else {
        alert("Changes cannot be saved")
      }
    });
  }

  onAddImage() {
    let images = this.product.images
    let lastId = images.length
    let newImage = {
      "imageId": lastId + 1,
      "imageUrl": "assets/img/upload_image.png"
    }
    images.push(newImage)
  }

  onUploadImage(fileInput: any, image: any) {
    let AWSService = (<any>window).AWS


    let fileName: string;
    // console.log(AWSService)
    let file = fileInput.target.files[0];
    
    let tempUrl = image.imageUrl
    if (tempUrl.includes("https")) {
      var res = tempUrl.split("/");
      var prevFileName = res[res.length-1]
      fileName = prevFileName.substring(0, prevFileName.indexOf('.')) + '_' + this.product.productId + '_' + image.imageId + '.png'
    } else {
      fileName = this.product.productId + '_' + image.imageId + '.png'
    }

    //loading animation
    let imageUrl = "assets/img/loading_image.gif"
    image['imageUrl'] = imageUrl

    AWSService.config.accessKeyId = 'AKIAJHFHLABO2226QJWA';
    AWSService.config.update({ region: 'ap-southeast-1' });
    AWSService.config.secretAccessKey = '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';
    let bucket = new AWSService.S3({ params: { Bucket: 'highlanderbucket/Product Images' } })
    let params = { Key: fileName, Body: file, ACL: "public-read" };
    bucket.upload(params, function (error, res) {
      // console.log('error', error);
      // console.log('response', res);
      imageUrl = 'https://s3-ap-southeast-1.amazonaws.com/highlanderbucket/Product+Images/' + fileName
      image['imageUrl'] = imageUrl
      // console.log("FC: " + JSON.stringify(image))
    })
  }

  onDelete() {
    this.catService.deleteProduct(this.productId).subscribe(
      res => {
        if (res.status == 200) {
          alert("Product Deleted")
          let link = ['/catalogue/'];
          this.router.navigate(link);
        } else {
          alert("Changes cannot be saved")
        }
      });

  }

}
