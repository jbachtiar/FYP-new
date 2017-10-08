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

  submit() {
    this.catService.saveCollection(this.item).subscribe(res => {
      if (res.status == 200) {
        alert("New Collection Added ID: " + res.newCollectionId)
        let link = ['/catalogue/collection/' + res.newCollectionId];
        this.router.navigate(link);
      } else {
        alert("Changes cannot be saved")
      }
    });
  }
}
