import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

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



  constructor(private orderService: OrderService) {
    this.token = localStorage.getItem('token');

  }

  ngOnInit() {
    this.orderService.getOrderByCustomer(this.token).subscribe(
      orders => {
        this.allOrder = orders;
        console.log("order" + JSON.stringify(this.allOrder));
        for (let o of this.allOrder) {

          //  this.counter++;


          let mostCurrentStatusLog = o.statusLogs;
          console.log("debug1" + mostCurrentStatusLog[0])
          console.log("debug1" + mostCurrentStatusLog)

          let mostCurrentTimestamp: number = mostCurrentStatusLog.startTimeStamp;
          for (let sl of o.statusLogs) {

            let timestamp = sl.startTimeStamp;


            console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)
            if (mostCurrentTimestamp < timestamp) {
              mostCurrentTimestamp = timestamp;
              //console.log("haha"+timestamp);
              console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)

              mostCurrentStatusLog = sl;
              console.log("statusLog" + sl.orderStatus.statusName);
              console.log(mostCurrentStatusLog.orderStatus.statusName);


            }

          }
          if (mostCurrentStatusLog.orderStatus.statusName == "Completed") {
            this.pastOrders.push(o);
          }





        };

        console.log("counter" + this.counter);

      });
    //console.log("haha" + JSON.stringify(this.pastOrders));

  }
}
