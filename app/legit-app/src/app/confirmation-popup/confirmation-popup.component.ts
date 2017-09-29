import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert.service'
import { AuthenticationService } from '../authentication.service'

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ConfirmationPopupModel {
  title: string;
  message: string;
}

@Component({
  selector: 'confirmation-cart-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent extends DialogComponent<ConfirmationPopupModel, boolean> implements ConfirmationPopupModel {
  title: string;
  message: string;
  private user: any = {};
  private loading: boolean = false;
  private returnUrl: string;

  constructor(
    dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router) {
      super(dialogService);
  }

  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }

}
