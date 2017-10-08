import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-colour-details-add',
  templateUrl: './colour-details-add.component.html',
  styleUrls: ['./colour-details-add.component.css'],
  providers: [CatalogueService]
})

export class ColourDetailsAddComponent implements OnInit {
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
      "colourId": 0,
      "colourName": ""
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
    this.catService.saveColour(this.item).subscribe(res => {
      if (res.status == 200) {
        alert("New Colour Added ID: " + res.newColourId)
        let link = ['/catalogue/colour/' + res.newColourId];
        this.router.navigate(link);
      } else {
        alert("Changes cannot be saved")
      }
    });
  }
}
