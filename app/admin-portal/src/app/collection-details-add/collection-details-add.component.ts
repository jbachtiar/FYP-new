import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-collection-details-add',
  templateUrl: './collection-details-add.component.html',
  styleUrls: ['./collection-details-add.component.css'],
  providers: [CatalogueService]
})
export class CollectionDetailsAddComponent implements OnInit {
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
    this.startLoading();
    this.item = {
      "collectionId": 0,
      "collectionName": ""
    }
    this.stopLoading()

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
    this.catService.saveCollection(this.item).subscribe(res => {
      res = res.json()
      if (res.status == 200) {
        this.onEdit()
        alert("Changes Saved ID" + this.item.collectionId)
      } else {
        alert("Changes cannot be saved")
      }
    });
  }
}
