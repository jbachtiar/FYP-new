import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrderService } from '../services/order.service'
import { DataTableResource, DataTable, DataTableTranslations } from 'angular-4-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-factory-manager',
  templateUrl: './order-factory-manager.component.html',
  styleUrls: ['./order-factory-manager.component.css'],
  providers: [OrderService]
})

export class OrderFactoryManagerComponent implements OnInit {
  private orders: any = {};
  private selectedStatus = "All";
  itemCount = 0;
  itemResource = new DataTableResource(this.orders);
  private headers: any = ['Order ID', 'Order Date', 'Current Status', 'Country']
  private color: any = { 'all': 'lightcoral', 'payment': 'white', 'production': 'white', 'packaging': 'white', 'preparing': 'white', 'transit': 'white', 'completed': 'white' }
  private fontColor: any = { 'all': 'white', 'payment': 'black', 'production': 'black', 'packaging': 'black', 'preparing': 'black', 'transit': 'black', 'completed': 'black' }
  private showTab: any = { 'all': true, 'payment': false, 'production': false, 'packaging': false, 'preparing': false, 'transit': false, 'completed': false }
  private map: any = { 0: 'all', 1: 'payment', 2: 'production', 3: 'packaging', 4: 'preparation', 5: 'shipped', 6: 'completed' }
  private mapDB: any = {0: 'all', 1: 'Payment Received', 2: 'In Production', 3: 'Packaging', 4: 'Pending for Shipment', 5: 'Shipped', 6: 'Completed'}
  private params;

  @ViewChild(DataTable) orderTable;
  @ViewChild('tabGroup') tabGroup;

  constructor(
    private orderService: OrderService,
    private router: Router) {
    this.itemResource.count().then(count => this.itemCount = count);
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;

      //data table initialisation
      this.itemResource = new DataTableResource(this.orders);
      this.itemResource.count().then(count => this.itemCount = count);

      //to get the latest status of the order
      for (let o of orders) {
        if (o.statusLogs.length > 0) {
          let status = o.statusLogs[0]
          console.log("STATUS: " + status)
          let currentStatus = status
          let mostCurrentTimestamp = status.startTimeStamp;
          for (status of o.statusLogs) {
            var timestamp = status.startTimeStamp;
            if (mostCurrentTimestamp < timestamp) {
              mostCurrentTimestamp = timestamp;
              currentStatus = status;
            }
          }
          o['currentStatus'] = currentStatus.orderStatus.statusName;
          o['currentStatusId'] = currentStatus.orderStatus.statusId;
        } else {
          o['currentStatus'] = 'NO DATA';
        }
      }
    })
  }

  onStatusChange(statusId) {
    let status = this.map[statusId]
    this.selectedStatus = status;
    this.color[status] = 'lightcoral';
    this.fontColor[status] = 'white'
    for (let colorStatus in this.color) {
      if (colorStatus != status) {
        this.color[colorStatus] = 'white';
        this.fontColor[colorStatus] = 'black'
      }
    }

    this.filterOrders(this.mapDB[statusId]);

  }

  filterOrders(status) {
    let allOrders: any = []
    this.orderService.getOrders().subscribe(orders => {
      allOrders = orders;

      console.log("ORDERS: " + orders)

      for (let o of allOrders) {
        if (o.statusLogs.length > 0) {
          let status = o.statusLogs[0]
          console.log("STATUS: " + status)
          let currentStatus = status
          let mostCurrentTimestamp = status.startTimeStamp;
          for (status of o.statusLogs) {
            var timestamp = status.startTimeStamp;
            if (mostCurrentTimestamp < timestamp) {
              mostCurrentTimestamp = timestamp;
              currentStatus = status;
            }
          }
          o['currentStatus'] = currentStatus.orderStatus.statusName;
          o['currentStatusId'] = currentStatus.orderStatus.statusId;
        } else {
          o['currentStatus'] = 'NO DATA';
        }
      }
      console.log("ALL ORDERS: " + JSON.stringify(allOrders))

      let filteredOrders: any = [];
      console.log("STATUS: " + status.toUpperCase())
      if (status.toUpperCase() != "ALL") {
        for (let o of allOrders) {
          if (o.currentStatus.toUpperCase() == status.toUpperCase()) {
            filteredOrders.push(o)
          }
        }
        this.orders = filteredOrders;
        console.log("FILTERED ORDERS: " + JSON.stringify(filteredOrders));
        
      } else {
        console.log("ALL ORDERSSSSSSSSSSS kzl")
        this.orders = allOrders
      }

      this.itemResource = new DataTableResource(this.orders);
      this.itemResource.count().then(count => this.itemCount = count);
      this.itemResource.query(this.params).then(orders => this.orders = orders);      
      console.log("ITEMS: " + JSON.stringify(this.orders))
      
    })

  }

  reloadItems(params, selectedStatus) {
    this.params = params
    this.filterOrders(selectedStatus);
    this.itemResource = new DataTableResource(this.orders);
    this.itemResource.count().then(count => this.itemCount = count);    
    this.itemResource.query(params).then(orders => this.orders = orders);
    console.log("ITEMS: " + JSON.stringify(this.orders))
  }

  rowClick(rowEvent) {
    let link = ['orders', rowEvent.row.item.orderId];
    this.router.navigate(link);
  }

  rowDoubleClick(rowEvent) {
    //doSth
  }

  rowTooltip(item) {
    return "Order ID: " + item.orderId + '\nStatus: ' + item.currentStatus;
  }

  // special params:

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };



}
