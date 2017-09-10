import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../services/order.service'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderService]

})
export class OrderDetailsComponent implements OnInit {
  private order: any = {};
  orderId: string;
  private statusLog: any = {};
  color = 'warn';
  mode = 'buffer';
  value = 100;
  bufferValue = 100;
  isDisabled: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'transit': false, 'completed': false };
  private map: any = { 1: 'payment', 2: 'production', 3: 'packaging', 4: 'preparation', 5: 'transit', 6: 'completed' }
  pulse: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'transit': false, 'completed': false };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params['orderId']; // grab the parameter from url
      this.orderService.getOrderById(this.orderId).subscribe(orders => {
        this.order = orders
        this.statusLog = orders.statusLogs

        console.log("ORDER:  " + JSON.stringify(this.order))
        console.log("STATUS LOGSS:  " + JSON.stringify(this.order[0]['statusLogs']))
        
        if (this.order[0]['statusLogs'].length > 0) {
          console.log("IM HEREEEEEE")
          let status = this.order[0].statusLogs[0]
          console.log("STATUS: " + status)
          let currentStatus = status
          let mostCurrentTimestamp = status.startTimeStamp;
          for (status of this.order[0].statusLogs) {
            var timestamp = status.startTimeStamp;
            console.log("TIMESTAMP: " + timestamp)
            if (mostCurrentTimestamp < timestamp) {
              mostCurrentTimestamp = timestamp;
              currentStatus = status;
            }
          }
          this.order[0]['currentStatus'] = currentStatus.orderStatus.statusName;
          //1: payment, 2: production, 3: packaging, 4: preparation, 5: transit, 6: completed
          let statusId: number = currentStatus.orderStatus.statusId;
          console.log("STATUS ID: " + statusId)
          //to colour the icons with the completed statuses only and adjust progress bar buffer and value
          for (var i = 6; i > statusId; i--){
            this.isDisabled[this.map[i]] = true;
            this.bufferValue -= 16.666666666667
            console.log("this.value = " + this.value)
          }
          this.value=this.bufferValue-16.66666666667

          //to make the icon of ongoing status pulse
          this.pulse[this.map[statusId]]=true;
        } else {
          this.order[0]['currentStatus'] = 'NO DATA';
        }
      });
    });
  }










}
