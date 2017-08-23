import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface DeleteConfirmationPopupModel {
  title: string;
  message: string;
}
@Component({
  selector: 'delete-confirmation-popup',
  templateUrl: './delete-confirmation-popup.component.html',
  styleUrls: ['./delete-confirmation-popup.component.css']
})
export class DeleteConfirmationPopupComponent extends DialogComponent<DeleteConfirmationPopupModel, boolean> implements DeleteConfirmationPopupModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}