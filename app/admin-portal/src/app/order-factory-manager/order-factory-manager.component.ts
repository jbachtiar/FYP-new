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
  itemCount = 0;
  itemResource = new DataTableResource(this.orders);
  private headers: any = ['Order ID', 'Order Date', 'Current Status', 'Country']
  private color: any = { 'all': 'lightyellow', 'payment': 'white', 'production': 'white', 'packaging': 'white', 'preparing': 'white', 'transit': 'white', 'completed': 'white' }
  private showTab: any = { 'all': true, 'payment': false, 'production': false, 'packaging': false, 'preparing': false, 'transit': false, 'completed': false }
  showTabTest: boolean = true;
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
        if(o.statusLogs.length>0){
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
        }else{
          o['currentStatus'] = 'NO DATA';
        }
      }
    })
  }

  onStatusChange(status) {
    console.log("STATUS: " + status)
    // console.log("BEFORE COLOR: " + this.color[status]);

    this.color[status] = 'lightyellow';
    this.showTab[status] = true;
    for (let colorStatus in this.color) {
      if (colorStatus != status) {
        // console.log("COLOR STATUS: " + colorStatus)
        this.color[colorStatus] = 'white';

        this.showTab[colorStatus] = false;
      }
    }

    // console.log("AFTER COLOR: " + this.color[status]);

    if (status == 'all') {
      this.showAll();
    } else {
      this.filterOrders(status);
    }
  }

  getAllOrders(): any {
    let allOrders: any = []
    this.orderService.getOrders().subscribe(orders => {
      allOrders = orders;

      console.log("ORDERS: " + orders)

      //for data table
      // this.itemResource = new DataTableResource(this.orders);
      // this.itemResource.count().then(count => this.itemCount = count);

      //to get the latest status of the order
      for (let o of allOrders) {
        // this.orderDisplay['order_id'] = o.order_id
        // this.orderDisplay['order_date'] = o.order_date

        if(o.statusLogs.length>0){
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
          o['currentStatus'] = currentStatus.statusName;
        }else{
          o['currentStatus'] = 'NO DATA';
        }
      }
      console.log("ALL ORDERS: " + JSON.stringify(allOrders))


      return allOrders;
    })
  }

  showAll() {
    let allOrders: any = []
    this.orderService.getOrders().subscribe(orders => {
      allOrders = orders;

      console.log("ORDERS: " + orders)

      //for data table
      // this.itemResource = new DataTableResource(this.orders);
      // this.itemResource.count().then(count => this.itemCount = count);

      //to get the latest status of the order
      for (let o of allOrders) {
        // this.orderDisplay['order_id'] = o.order_id
        // this.orderDisplay['order_date'] = o.order_date

        if(o.statusLogs.length>0){
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
        }else{
          o['currentStatus'] = 'NO DATA';
        }
      }
      console.log("ALL ORDERS: " + JSON.stringify(allOrders))
      this.orders = allOrders;
      this.itemResource = new DataTableResource(this.orders);
      this.itemResource.count().then(count => this.itemCount = count);
    })
  }

  filterOrders(status) {
    let allOrders: any = []
    this.orderService.getOrders().subscribe(orders => {
      allOrders = orders;

      console.log("ORDERS: " + orders)

      //for data table
      // this.itemResource = new DataTableResource(this.orders);
      // this.itemResource.count().then(count => this.itemCount = count);

      //to get the latest status of the order
      for (let o of allOrders) {
        // this.orderDisplay['order_id'] = o.order_id
        // this.orderDisplay['order_date'] = o.order_date

        if(o.statusLogs.length>0){
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
        }else{
          o['currentStatus'] = 'NO DATA';
        }
      }
      console.log("ALL ORDERS: " + JSON.stringify(allOrders))

      console.log("ALL ORDERS in filterOrders: " + JSON.stringify(allOrders))
      let filteredOrders: any = [];
      for (let o of allOrders) {
        if (o.currentStatus.toUpperCase() == status.toUpperCase()) {
          filteredOrders.push(o)
        }
      }
      this.orders = filteredOrders;
      this.itemResource = new DataTableResource(this.orders);
      this.itemResource.count().then(count => this.itemCount = count);
      console.log("FILTERED ORDERS: " + JSON.stringify(filteredOrders));

    })

  }
  
  reloadItems(params) {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      //console.log("ORDERS: " + this.orders)
      this.itemResource = new DataTableResource(this.orders);
      this.itemResource.count().then(count => this.itemCount = count);
      //to get the latest status of the order
      for (let o of orders) {
        console.log("TIMESTAMP: " + o.order_TimeStamp)
        if(o.statusLogs.length>0){
          let status = o.statusLogs[0]
          console.log("STATUS: " + status.statusName)
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
        }else{
          o['currentStatus'] = 'NO DATA';
        }
      }
    })
    // this.itemResource = new DataTableResource(this.orders);
    this.itemResource.query(params).then(orders => this.orders = orders);
    console.log("ITEMS: " + JSON.stringify(this.orders))
  }

  rowClick(rowEvent) {
    console.log('Clicked');
    // let link = ['orders', rowEvent.row.item.orderId];
		// this.router.navigate(link);
  }

  rowDoubleClick(rowEvent) {
    // alert('Double clicked: ' + rowEvent.row.item.order_id);
    let link = ['orders', rowEvent.row.item.orderId];
		this.router.navigate(link);
  }

  rowTooltip(item) { 
    return "Order ID: " + item.order_id; 
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
