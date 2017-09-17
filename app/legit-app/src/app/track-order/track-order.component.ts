import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  token: string;
  private allOrder: any = {}
  private pastOrders: any = {}
  private currentOrders: any = {}
  private counter = 0;
  private isDisplayCurrentOrder=true
  private isDisplayPastOrder=true



  constructor(private orderService: OrderService, private router: Router) {
    this.token = localStorage.getItem('token');

  }

  ngOnInit() {
    this.orderService.getPastOrderByCustomer(this.token).subscribe(
      orders => {
        this.pastOrders = orders;
        console.log("past order" + JSON.stringify(this.pastOrders));
        if (this.pastOrders.length==0){
          this.isDisplayPastOrder=false;
        }
      });
    //console.log("haha" + JSON.stringify(this.pastOrders));
     this.orderService.getCurrentOrderByCustomer(this.token).subscribe(
      orders => {
        this.currentOrders = orders;
        console.log("current order" + JSON.stringify(this.currentOrders));
        if (this.currentOrders.length==0){
          this.isDisplayCurrentOrder=false;
        }
      });

  }

  returnTheLatestOrderStatus(statusLogs){
    let size=statusLogs.length
    let theLastLog= statusLogs[size-1]
    return theLastLog.orderStatus.statusName;

  }

  viewOrder(orderId){
    let link = ['profile-sidebar', orderId];
    this.router.navigate(link);
  }

  


}
