import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-design-details-add',
  templateUrl: './design-details-add.component.html',
  styleUrls: ['./design-details-add.component.css'],
  providers: [CatalogueService]
})
export class DesignDetailsAddComponent implements OnInit {
  buttonText = "Edit";
  buttonColour = "lightcoral"
  buttonTextColour = "white"
  id: string;
  item: any = {};
  collections;
  selectedCollection;
  patternUrl = "";
  loading: boolean = true;

  constructor(private catService: CatalogueService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.startLoading()
    
    this.item = {
      "collection": {
        "collectionId": 0,
        "collectionName": ""
      },
      "patternDesc": "",
      "patternId": 0,
      "patternName": "",
      "patternPrice": "",
      "tags": [
        {
          "tagId": 0,
          "tagName": "Limited Edition"
        },
        {
          "tagId": 6,
          "tagName": "Editors Choice"
        }
      ]
    }
    this.catService.getAllCollections().subscribe(
      colls => {
        this.collections = colls;
        // this.selectedColour = this.colours[0]
        for (let c of this.collections) {
          if (c['collectionId'] == this.selectedCollection.collectionId) {
            this.selectedCollection = c
          }
        }
      });
    this.stopLoading()
  

    this.selectedCollection = this.item.collection
    
  }
  startLoading() {
    this.loading = true;
  }


  stopLoading() {
    this.loading = false;
  }

 
  submit() {
    this.catService.savePattern(this.item).subscribe(res => {
      res = res.json()
      if (res.status == 200) {
        //this.onEdit()
        alert("Changes Saved ID" + this.item.patternId)
      } else {
        alert("Changes cannot be saved")
      }

    });
  }

}
