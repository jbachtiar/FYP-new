import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../services/order.service'

@Component({
  selector: 'app-order-details-superuser',
  templateUrl: './order-details-superuser.component.html',
  styleUrls: ['./order-details-superuser.component.css']
})
export class OrderDetailsSuperuserComponent implements OnInit {
  private orderId: any = {};
  private order: any = {};
  private orderItems: any = {};
  private status: any={};
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params['orderId']; // grab the order id
      this.orderService.getOrderById(this.orderId).subscribe(orders => {
      
        this.order= orders[0];
        this.status=this.order.statusLogs[0];
        console.log("status"+this.order.statusLogs[0].orderStatus.statusName);
        this.orderItems = orders[0].orderItems;
      });
    })
  }

  returnTheLatestOrderStatus() {
 
  
    //console.log("STATUS: " + status)
    let currentStatus = this.status
    let mostCurrentTimestamp = this.status.startTimeStamp;
    for (let s of this.order.statusLogs) {
      let timestamp = s.startTimeStamp;
      //console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)
      if (mostCurrentTimestamp < timestamp) {
        //console.log("betul")

        mostCurrentTimestamp = timestamp;
        currentStatus = s;
      }
    }

     return  currentStatus.orderStatus.statusName;

  }

}
