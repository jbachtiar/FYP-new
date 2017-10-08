import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css'],
  providers: [CatalogueService]
})
export class CollectionDetailsComponent implements OnInit {
  editPage = false;
  buttonText = "Edit";
  buttonColour = "lightcoral"
  buttonTextColour = "white"
  id: string;
  item: any = {};
  patternUrl = "";
  loading: boolean = true;

  constructor(private catService: CatalogueService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['collectionId']; // grab the parameter from url
    });
    this.catService.getCollectionById(this.id).subscribe(
      item => {
        this.startLoading()
        this.item = item;
        console.log(JSON.stringify(this.item))
        
        //add 0000 padding
        let temp = "" + item.collectionId
        var pad = "0000"
        var ans = pad.substring(0, pad.length - temp.length) + temp
        this.item['collectionId_display'] = ans

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
    this.catService.updateCollection(this.item).subscribe(res => {
      if (res.status == 200) {
        alert("Changes Saved")
        this.onEdit()
        
      } else {
        alert("Changes cannot be saved")
      }
    });
  }
}
