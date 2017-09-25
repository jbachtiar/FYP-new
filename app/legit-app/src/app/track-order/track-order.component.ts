import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';


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
  private isDisplayCurrentOrder = true
  private isDisplayPastOrder = true
  private loading: boolean = true;
  private isDisplayOrderList = true

  private orderId: any = {};
  private order: any = {};
  private orderItems: any = {}
  private statusLog: any = {}
  private statusId: number;

  color = 'warn';
  mode = 'buffer';
  value = 100;
  bufferValue = 100;
  isDisabled: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };
  private map: any = { 1: 'payment', 2: 'production', 3: 'packaging', 4: 'preparation', 5: 'shipped', 6: 'completed' }
  pulse: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };



  constructor(private orderService: OrderService, private router: Router, private shardService: SharedService) {
    this.token = localStorage.getItem('token');

  }

  ngOnInit() {
    this.orderService.getPastOrderByCustomer(this.token).subscribe(
      orders => {
        this.loading = true
        this.pastOrders = orders;
        console.log("past order" + JSON.stringify(this.pastOrders));
        if (this.pastOrders.length == 0) {
          this.isDisplayPastOrder = false;
        }
      });
    //console.log("haha" + JSON.stringify(this.pastOrders));
    this.orderService.getCurrentOrderByCustomer(this.token).subscribe(
      orders => {
        this.currentOrders = orders;
        console.log("current order" + JSON.stringify(this.currentOrders));
        if (this.currentOrders.length == 0) {
          this.isDisplayCurrentOrder = false;
          this.loading = false
        }

        this.loading = false
      });

  }

  /* returnTheLatestOrderStatus(statusLogs) {
     let size = statusLogs.length
     let theLastLog = statusLogs[size - 1]
     return theLastLog.orderStatus.statusName;
 
   }
   */
  returnTheLatestOrderStatus(statusLogs) {
    let status = statusLogs[0];
    console.log("STATUS: " + status)
    let currentStatus = status
    let mostCurrentTimestamp = status.startTimeStamp;
    for (status of statusLogs) {
      let timestamp = status.startTimeStamp;
      console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)
      if (mostCurrentTimestamp < timestamp) {
        console.log("betul")

        mostCurrentTimestamp = timestamp;
        currentStatus = status;
      }
    }
    console.log("MOST CURRENT: " + mostCurrentTimestamp)
    //    this.order[0]['currentStatus'] = currentStatus.orderStatus.statusName;

    return currentStatus.orderStatus.statusName;

  }

  viewOrder(orderId) {
    // let link = ['profile-sidebar', orderId];
    // this.router.navigate(link);
    this.isDisplayOrderList = false;

    this.orderService.getOrderById(orderId).subscribe(orders => {
      this.order = orders;
      this.orderItems = orders[0].orderItems;
      this.statusLog = orders[0].statusLogs;
      if (this.statusLog.length > 0) {
        this.returnTheLatestOrderStatus(this.statusLog);
        if (this.statusId != 6) {
          this.isDisabled[this.map[6]] = true
          this.bufferValue -= 4.1555

          //to colour the icons with the completed statuses only and adjust progress bar buffer and value
          for (var i = 5; i > this.statusId; i--) {
            this.isDisabled[this.map[i]] = true;
            this.bufferValue -= 16.569
            console.log("this.value = " + this.value)
          }
          this.value = this.bufferValue - 16.569
          this.bufferValue -= 16.569

          //to make the icon of ongoing status pulse
          this.pulse[this.map[this.statusId]] = true;
        }

      }

    });

  }






}
