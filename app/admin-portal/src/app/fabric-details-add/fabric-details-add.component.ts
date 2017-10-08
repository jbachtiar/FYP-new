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

  submit() {
    this.catService.saveFabric(this.item).subscribe(res => {
      if (res.status == 200) {
        alert("New Fabric Added ID: " + res.newFabricId)
        let link = ['/catalogue/fabric/' + res.newFabricId];
        this.router.navigate(link);
      } else {
        alert("Changes cannot be saved")
      }

    });
  }
}
