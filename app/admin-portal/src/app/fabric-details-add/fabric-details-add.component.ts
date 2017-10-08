import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-fabric-details-add',
  templateUrl: './fabric-details-add.component.html',
  styleUrls: ['./fabric-details-add.component.css'],
  providers: [CatalogueService]
})
export class FabricDetailsAddComponent implements OnInit {
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
    this.startLoading()
    this.item = {
      "fabricDesc": "",
      "fabricId": 0,
      "fabricName": "",
      "fabricPrice": ""
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
    this.catService.saveFabric(this.item).subscribe(res => {
      res = res.json()
      if (res.status == 200) {
        this.onEdit()
        alert("Changes Saved ID" + this.item.fabricId)
      } else {
        alert("Changes cannot be saved")
      }

    });
  }
}
