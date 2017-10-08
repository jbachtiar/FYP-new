import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIG } from '../config/config.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-fabric-details',
  templateUrl: './fabric-details.component.html',
  styleUrls: ['./fabric-details.component.css'],
  providers: [CatalogueService]
  
})
export class FabricDetailsComponent implements OnInit {
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
      this.id = params['fabricId']; // grab the parameter from url
    });
    this.catService.getFabricById(this.id).subscribe(
      item => {
        this.startLoading()
        this.item = item;
        console.log(JSON.stringify(this.item))
        
        //add 0000 padding
        let temp = "" + item.fabricId
        var pad = "0000"
        var ans = pad.substring(0, pad.length - temp.length) + temp
        this.item['fabricId_display'] = ans

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
    this.catService.updateFabric(this.item).subscribe(res => {
      res = res.json()
      if (res.status == 200) {
        this.onEdit()
        alert("Changes Saved ID" + this.item.fabricId)
      } else {
        alert("Changes cannot be saved")
      }

    });
  }

  onDelete(){
    this.catService.deleteFabric(this.id).subscribe(
      res => {
        if (res.status == 200) {
          alert("Fabric Deleted")
          let link = ['/catalogue/'];
          this.router.navigate(link);
        } else {
          alert("Changes cannot be saved")
        }
      });

  }
}
