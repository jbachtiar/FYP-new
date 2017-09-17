import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-track-order-detail',
  templateUrl: './track-order-detail.component.html',
  styleUrls: ['./track-order-detail.component.css']
})
export class TrackOrderDetailComponent implements OnInit {
  private orderId: string;
  private order: any = {};
  private orderItems: any = {}
  private statusId: number;
  color = 'warn';
  mode = 'buffer';
  value = 100;
  bufferValue = 100;
  isDisabled: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };
  private map: any = { 1: 'payment', 2: 'production', 3: 'packaging', 4: 'preparation', 5: 'shipped', 6: 'completed' }
  pulse: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params['orderId']; // grab the parameter from url
      this.orderService.getOrderById(this.orderId).subscribe(orders => {
        this.orderItems = orders[0].orderItems;
        let statusLogs = orders[0].statusLogs;
        let theLastLog = statusLogs[statusLogs.length - 1];
        this.statusId = theLastLog.orderStatus.statusId;
        // let statusId = 5
        console.log("STATUS ID: " + this.statusId)
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





      });


    });
  }
}


