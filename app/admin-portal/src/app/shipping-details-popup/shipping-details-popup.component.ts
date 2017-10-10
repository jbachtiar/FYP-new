import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service'
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ShippingDetailsPopupModel {
  title: string;
  message: string;
  orderId: string
}

@Component({
  selector: 'app-shipping-details-popup',
  templateUrl: './shipping-details-popup.component.html',
  styleUrls: ['./shipping-details-popup.component.css'],
  providers: [OrderService]
})
export class ShippingDetailsPopupComponent extends DialogComponent<ShippingDetailsPopupModel, boolean> implements ShippingDetailsPopupModel, OnInit  {
  
  title: string;
  message: string;
  orderId: string;
  private order: any = {};
  private user: any = {};
  private loading: boolean = false;
  private returnUrl: string;
  selectedCourier = ""
  trackingNo = ""
  private couriers;

  constructor(
    private orderService: OrderService,
    dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router) {
      super(dialogService);
  }

  ngOnInit(){
    this.orderService.getOrderById(this.orderId).subscribe(order=>{
      this.order = order;
      console.log(JSON.stringify(order))
    });
    this.orderService.getAllCouriers().subscribe(couriers =>{
      this.couriers = couriers;
    });
  }

  confirm() {
   
    let newOrder = this.order
    newOrder["newStatusId"] = 5
    newOrder.courierName = this.selectedCourier
    newOrder.trackingNo = this.trackingNo
    this.loading = true;
    this.orderService.updateShipment(this.orderId, this.selectedCourier, this.trackingNo).subscribe(res=>{
      if(res.status == 200){
        this.result = true;    
        this.close();
        this.loading = false        
      }
    })
  }

}