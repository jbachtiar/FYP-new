import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../services/product.service';
//include aws webpack
require('aws-sdk');

@Component({
  selector: 'app-pattern-details',
  templateUrl: './pattern-details.component.html',
  styleUrls: ['./pattern-details.component.css'],
  providers: [ProductService]
})
export class PatternDetailsComponent implements OnInit {
  patternId: string;
  pattern: any = {};
  patternFabrics: any = {}
  patternColours: any = {}
  fabrics = [];
  colours = []
  collections = []
  selectedColour = [];
  selectedCollection;
  patternUrl = "";
  res: any;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patternId = params['patternId']; // grab the parameter from url
      this.patternUrl = 'http://localhost:4200/productDetails/' + this.patternId
    });
    //get pattern details
    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.pattern = pattern;
        //get all available collections
        this.productService.getAllCollections().subscribe(
          collections => {
            this.collections = collections;
          });
        //get all available fabrics
        this.productService.getAllFabrics().subscribe(
          fabrics => {
            this.fabrics = fabrics;
            for (let f of this.fabrics) {
              // console.log("ALL avail fabrics: " + JSON.stringify(f))
            }
            //get all available colours
            this.productService.getAllColours().subscribe(
              colours => {
                this.colours = colours;
                for (let c of this.colours) {
                  // console.log("ALL avail colours: " + JSON.stringify(c))
                }

                //assign all added fabrics for the pattern to the variable "patternFabrics"
                this.patternFabrics = this.pattern.fabrics;
                for (let f of this.patternFabrics) {
                  // console.log("PATTERN fabrics: " + JSON.stringify(f))
                }

                //get only the colour that are not added to the pattern yet (all colours - pattern_fabric colours) for dropdown list
                //add it as a key value pair in every colour object of pattern json
                //add selected_colour variable to each fabric json
                for (let f of this.patternFabrics) {
                  f['colours_dropdown'] = this.arr_diff_colour(f.colours, this.colours)
                  this.selectedColour['f.fabric_id'] = ""
                }

                //add selected_colour variable to each fabric json
                for (let f of this.patternFabrics) {
                  // console.log("PATTERN fabrics with colour dropdown: " + JSON.stringify(f))
                }

                //to get only the fabrics that are not added to the pattern yet (all fabrics - pattern fabrics) for dropdown list
                this.fabrics = this.arr_diff_fabric(this.patternFabrics, this.fabrics)
                for (let f of this.fabrics) {
                  // console.log("AVAIL FABRICS: " + JSON.stringify(f))
                }
              });
          });
      });
  }

  onSave() {
    console.log(JSON.stringify(this.pattern))
    this.productService.updatePattern(this.pattern).subscribe(
      res => {
        this.res = res;
        console.log(res);
      });
  }

  onAddFabric(f) {
    this.patternFabrics.push(f);
    this.fabrics = this.arr_diff_fabric(this.patternFabrics, this.fabrics)
    f['colours_dropdown'] = this.colours
  }

  onAddColour(f, c) {
    // console.log(JSON.stringify(f))
    if (!f['colours']) {
      f['colours'] = []
    }
    f.colours.push(c);
    f['colours_dropdown'] = this.arr_diff_colour(f.colours, this.colours)
    // console.log(JSON.stringify(f))
  }

  fileEvent(fileInput: any, fabricColour: any) {
    let AWSService = (<any>window).AWS
    let imageUrl = ""
    console.log(AWSService)
    let file = fileInput.target.files[0];
    let fileName = this.patternId + '_' + fabricColour.colour_id + '.png'
    AWSService.config.accessKeyId = 'AKIAJVBHSMHG7RZGXNFA';
    AWSService.config.update({ region: 'us-west-2' });
    AWSService.config.secretAccessKey = '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';
    let bucket = new AWSService.S3({ params: { Bucket: 'elasticbeanstalk-us-west-2-126347216585/Product Images' } })
    let params = { Key: fileName, Body: file, ACL: "public-read" };
    bucket.upload(params, function (error, res) {
      console.log('error', error);
      console.log('response', res);
      imageUrl = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/' + fileName
      fabricColour['image_url'] = imageUrl
      console.log("FC: " + JSON.stringify(fabricColour))
    })

  }

  arr_diff_colour(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
      a[a1[i].colour_id] = true;
    }

    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i].colour_id]) {
        delete a[a2[i]];

      } else {
        a[a2[i]] = true;
        diff.push(a2[i])

      }
    }
    return diff;
  }

  arr_diff_fabric(a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
      a[a1[i].fabric_id] = true;
    }

    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i].fabric_id]) {
        delete a[a2[i]];

      } else {
        a[a2[i]] = true;
        diff.push(a2[i])

      }
    }
    return diff;
  }
}