import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-design-details',
  templateUrl: './design-details.component.html',
  styleUrls: ['./design-details.component.css'],
  providers: [CatalogueService]
})
export class DesignDetailsComponent implements OnInit {
  editPage = false;
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
    this.route.params.subscribe((params: Params) => {
      this.id = params['patternId']; // grab the parameter from url
      this.patternUrl = CONFIG.eCommerceWebsiteUrl + '/productDetails/' + this.id
    });
    this.catService.getPatternById(this.id).subscribe(
      item => {
        this.startLoading()
        this.item = item;
        this.selectedCollection = item.collection
        //add 0000 padding
        let temp = "" + item.patternId
        var pad = "0000"
        var ans = pad.substring(0, pad.length - temp.length) + temp
        this.item['patternId_display'] = ans

        this.catService.getAllCollections().subscribe(
          colls => {
            this.collections = colls;
            // this.selectedColour = this.colours[0]
            for (let c of this.collections) {
              if (c['collectionId'] == this.selectedCollection.collectionId) {
                this.item.collection = c
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
    this.catService.updatePattern(this.item).subscribe(res => {
      res = res.json()
      if (res.status == 200) {
        //this.onEdit()
        alert("Changes Saved ID" + this.item.patternId)
        console.log(JSON.stringify(this.item))
        let link = ['/catalogue'];
        this.router.navigate(link);
      } else {
        alert("Changes cannot be saved")
      }
      this.onEdit()

    });
  }

}
