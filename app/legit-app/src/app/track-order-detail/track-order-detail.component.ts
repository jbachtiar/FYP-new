import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-track-order-detail',
  templateUrl: './track-order-detail.component.html',
  styleUrls: ['./track-order-detail.component.css']
})
export class TrackOrderDetailComponent implements OnInit {

  @Input('orderId') inputOrderId: string;
  private orderId: any = {};
  private order: any = {};
  private orderItems: any = {}
  private statusLog: any = {}
  private statusId: number;
  private loading: boolean = true;
  private

  color = 'accent';
  mode = 'determinate';
  value = 100;
  bufferValue = 100;
  isDisabled: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };
  private map: any = { 1: 'payment', 2: 'production', 3: 'packaging', 4: 'preparation', 5: 'shipped', 6: 'completed' }
  pulse: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // this.orderId = params['orderId']; // grab the parameter from url
      this.orderId = this.inputOrderId
      this.orderService.getOrderById(this.orderId).subscribe(orders => {
        this.order = orders;
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


    });
  }

  returnTheLatestOrderStatus(statusLogs) {
    let status = statusLogs[0];
    console.log("STATUS: " + status)
    let currentStatus = status
    var mostCurrentTimestamp = new Date(status.startTimeStamp);
    for (status of this.order[0].statusLogs) {
      var timestamp = new Date(status.startTimeStamp);
      console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)
      if (mostCurrentTimestamp < timestamp) {
        console.log("betul")

        mostCurrentTimestamp = timestamp;
        currentStatus = status;
      }
    }
    console.log("MOST CURRENT: " + mostCurrentTimestamp)
    //    this.order[0]['currentStatus'] = currentStatus.orderStatus.statusName;

    let statusId: number = currentStatus.orderStatus.statusId;
    this.statusId = statusId;
    // let statusId = 5
    console.log("STATUS ID: " + this.statusId)
  }



}


