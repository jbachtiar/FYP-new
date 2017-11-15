import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';
import { StorageService } from '../storage.service';




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
  private loading :boolean  = true;
  private details : boolean = false;
  private outputOrderId : number = 0;
  private isDisplayTrackingOrderDetail;
  private orderId: any = {};
  private order: any = {};
  private orderItems: any = {}
  private statusLog: any = {}
  private statusId: number;
  private courier: any={}
  private courierName: any={}

  color = 'accent';
  mode = 'determinate';
  value = 100;
  bufferValue = 100;
  isDisabled: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };
  private map: any = { 1: 'payment', 2: 'production', 3: 'packaging', 4: 'preparation', 5: 'shipped', 6: 'completed' }
  pulse: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };


  constructor(private orderService: OrderService, private storageService: StorageService, private router: Router, private shardService: SharedService) {
    this.token = localStorage.getItem('token');

  }

  ngOnInit() {
    this.orderService.getPastOrderByCustomer(this.token).subscribe(
      orders => {
        this.loading = true
        this.pastOrders = orders;
        for( let o of this.pastOrders){
        }
        console.log("past order" + JSON.stringify(this.pastOrders));
        if (this.pastOrders.length == 0) {
          this.isDisplayPastOrder = false;
        }
      });
    this.isDisplayTrackingOrderDetail=this.storageService.getIsDisplayedDetail();
    //console.log("haha" + JSON.stringify(this.pastOrders));
    this.orderService.getCurrentOrderByCustomer(this.token).subscribe(
      orders => {
        this.currentOrders = orders;
        for( let o of this.currentOrders){

          o.order_TimeStamp = new Date(o.order_TimeStamp);
          console.log("before : " + JSON.stringify(o.order_TimeStamp));
          o.order_TimeStamp.setHours(o.order_TimeStamp.getHours()+8)
         //o.order_TimeStamp = o.order_TimeStamp.toString("yyyy-MM-dd") 
          console.log(JSON.stringify(o.order_TimeStamp));
        }
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
    // console.log("STATUS: " + status)
    let currentStatus = status
    var mostCurrentTimestamp = new Date(status.startTimeStamp);
    for (status of statusLogs) {
      var timestamp = new Date(status.startTimeStamp);
      // console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)
      if (mostCurrentTimestamp < timestamp) {
        // console.log("betul")

        mostCurrentTimestamp = timestamp;
        currentStatus = status;
      }
    }
    // console.log("MOST CURRENT: " + mostCurrentTimestamp)
    //    this.order[0]['currentStatus'] = currentStatus.orderStatus.statusName;

    return  currentStatus.orderStatus.statusName;

  }

  viewOrder(orderId) {
    // let link = ['profile-sidebar', orderId];
    // this.router.navigate(link);
  //  this.outputOrderId = orderId
    this.details = true
    this.isDisplayTrackingOrderDetail=true;
  
      // this.orderId = params['orderId']; // grab the parameter from url
     
      this.orderService.getOrderById(orderId).subscribe(orders => {
        this.order = orders;
        console.log(orders[0].courierName);
        
        this.orderService.getCourierByName(orders[0].courierName).subscribe(courier => {
          this.courier=courier;
          console.log("courier"+this.courier);
    
        });
        this.order[0].order_TimeStamp = new Date(this.order[0].order_TimeStamp);
        console.log("before : " + JSON.stringify(this.order[0].order_TimeStamp));
        this.order[0].order_TimeStamp.setHours(this.order[0].order_TimeStamp.getHours()+8)

        this.orderItems = orders[0].orderItems;
        this.statusLog = orders[0].statusLogs;
        console.log(this.order)
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
            this.loading = false;
          }
          this.loading = false;
        }

      });
      

     // console.log("courierName"+this.order[0].courierName);
   

 
    }




}
