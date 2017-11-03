import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

declare var VRView: any;

export interface QuickViewPopupModel {
  title: string;
  message: string;
  imageUrl: string;
}


@Component({
  selector: 'app-virtual-reality',
  templateUrl: './virtual-reality.component.html',
  styleUrls: ['./virtual-reality.component.css']
})
export class VirtualRealityComponent extends DialogComponent<QuickViewPopupModel, boolean> implements QuickViewPopupModel {
  title: string;
  message: string;
  imageUrl: string;

  constructor(
    dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    var vrView = new VRView.Player('#vrview', {
      width: "100%",
      height: "100%",
      image: this.imageUrl,
      //is_stereo: true
    });

  }

  closeModal() {
    this.confirm();
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }


}
