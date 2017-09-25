import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../alert.service'
import { AuthenticationService } from '../authentication.service'

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface CartPopupModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent extends DialogComponent<CartPopupModel, boolean> implements CartPopupModel {
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
  onViewCart(): void {
    this.confirm();
    let link = ['/cart'];
    this.router.navigate(link);
  }

}
