import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-pattern-details',
  templateUrl: './pattern-details.component.html',
  styleUrls: ['./pattern-details.component.css'],
  providers: [ProductService]
})
export class PatternDetailsComponent implements OnInit {
  patternId: string;
  pattern: any = {};
  patternFabrics:any = {}
  fabrics=['a','b','c'];
  fabricsMap = {
        OptionA: false,
        OptionB: false,
        OptionC: false,
  };  
  fabricsChecked = [];


  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patternId = params['patternId']; // grab the parameter from url

    });

    this.productService.getPatternById(this.patternId).subscribe(
      pattern => {
        this.pattern = pattern;
    });

    this.productService.getAllFabrics().subscribe(
      fabrics => {
        this.fabrics = fabrics;
      this.initOptionsMap();
    });

    this.productService.getFabricsByPatternID(this.patternId).subscribe(
      fabrics => {
        this.patternFabrics = fabrics;
    });
  }

  onSave(){
    this.productService.updatePattern(
      this.pattern.pattern_id, this.pattern.pattern_name, this.pattern.pattern_description, 
      this.pattern.pattern_price, this.pattern.collection_id).subscribe(
        res=>{
          console.log(res);
      });
  }
  

  initOptionsMap() {
    for (var x = 0; x<this.fabrics.length; x++) {
        
        this.fabricsMap[this.fabrics[x]] = true;
    }
  }

  updateCheckedFabrics(fabric, event) {
   this.fabricsMap[fabric] = event.target.checked;
  }

  updateOptions() {
    for(var x in this.fabricsMap) {
        if(this.fabricsMap[x]) {
            this.fabricsChecked.push(x);
        }
    }
    this.fabrics = this.fabricsChecked;
    this.fabricsChecked = [];
  }
}


