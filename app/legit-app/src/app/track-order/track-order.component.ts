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
    this.orderService.getPastOrderByCustomer(this.token).subscribe(
      orders => {
        this.pastOrders = orders;
        console.log("past order" + JSON.stringify(this.pastOrders));
      });
    //console.log("haha" + JSON.stringify(this.pastOrders));
     this.orderService.getCurrentOrderByCustomer(this.token).subscribe(
      orders => {
        this.currentOrders = orders;
        console.log("current order" + JSON.stringify(this.currentOrders));
      });

  }
}
