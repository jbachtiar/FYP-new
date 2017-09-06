import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service'
import { DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-dashboard-factory-manager',
  templateUrl: './dashboard-factory-manager.component.html',
  styleUrls: ['./dashboard-factory-manager.component.css'],
  providers: [OrderService]
})
export class DashboardFactoryManagerComponent implements OnInit {
  private orders: any = {};
  itemCount = 0;
  itemResource = new DataTableResource(this.orders);
  private headers: any = ['Order ID', 'Order Date', 'Current Status', 'Country']
  
  constructor(
    private orderService: OrderService) {
      this.itemResource.count().then(count => this.itemCount = count);
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      //console.log("ORDERS: " + this.orders)
      this.itemResource = new DataTableResource(this.orders);
      this.itemResource.count().then(count => this.itemCount = count);
      //to get the latest status of the order
      for (let o of orders) {
        // this.orderDisplay['order_id'] = o.order_id
        // this.orderDisplay['order_date'] = o.order_date

        let status = o.order_status_log[0]
        let currentStatus = status
        let mostCurrentTimestamp = status.start_timestamp;
        for (status of o.order_status_log) {
          var timestamp = status.start_timestamp;
          if (mostCurrentTimestamp < timestamp) {
            mostCurrentTimestamp = timestamp;
            currentStatus = status;
          }
        }
        o['currentStatus'] = currentStatus.status_name;
      }
    })
  }

  reloadItems(params) {
    // this.itemResource = new DataTableResource(this.orders);
    this.itemResource.query(params).then(orders => this.orders = orders);
    console.log("ITEMS: " + JSON.stringify(this.orders))
  }

  rowClick(rowEvent) {
    console.log('Clicked: ');
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ');
  }

  rowTooltip(item) { return item.order_id; }

}
