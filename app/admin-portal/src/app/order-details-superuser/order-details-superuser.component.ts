import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../services/order.service'
import { ProductService } from '../services/product.service'
@Component({
  selector: 'app-order-details-superuser',
  templateUrl: './order-details-superuser.component.html',
  styleUrls: ['./order-details-superuser.component.css']
})
export class OrderDetailsSuperuserComponent implements OnInit {

  private orderId: any = {};
  private order: any = {};
  private user: any = {};
  private orderItems: any = {};
  private edit: boolean = false;
  private status: any = {};
  private index: number = 0;
  orderStatusSize: any;
  statusMap: any = { 'Payment Received': 1, 'In Production': 2, 'Packaging': 3, 'Pending for Shipment': 4, 'Shipped': 5, 'Completed': 6, 'Cancelled': 7 }
  statusMenu = ["Payment Received", "In Production", "Packaging", "Pending for Shipment", "Shipped", "Completed", "Cancelled"];
  courierMenu = ["Shun Feng", "DHL"]
  patternMenu: any
  fabricMenu: any
  selectedStatus: any;
  selectedCourier: any;
  selectedFabric: any;
  selectedColour: any;
  pattern:any;
  //statusMenu: any = [];
  constructor(private route: ActivatedRoute, private orderService: OrderService, private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params['orderId']; // grab the order id
      this.orderService.getOrderById(this.orderId).subscribe(orders => {

        this.order = orders[0];
        this.status = this.order.statusLogs[0];
        //  console.log("status" + this.order.statusLogs[0].orderStatus.statusName);
        this.orderItems = orders[0].orderItems;
        this.selectedCourier = orders[0].courierName;


        this.returnTheLatestOrderStatus();
     


      });

    })



    // console.log(this.statusMenu);


  }

  returnTheLatestOrderStatus() {


    //console.log("STATUS: " + status)
    let currentStatus = this.status
    let mostCurrentTimestamp = this.status.startTimeStamp;
    for (let s of this.order.statusLogs) {
      let timestamp = s.startTimeStamp;
      //console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)
      if (mostCurrentTimestamp < timestamp) {
        //console.log("betul")

        mostCurrentTimestamp = timestamp;
        currentStatus = s;
      }
    }
    this.selectedStatus = currentStatus.orderStatus.statusName;
    //  return currentStatus.orderStatus.statusName;

  }
  editOrder() {
    this.edit = true;
    this.productService.getPatternList().subscribe(
      patterns => {
        this.patternMenu = patterns;

      });



  }

  onPatternChange(patternName) {
   
    this.productService.getPatternByName(patternName).subscribe(
      pattern => {
        console.log("pattern"+patternName);
        this.fabricMenu=pattern.fabrics;
        // this.selectedFabric = this.fabricMenu[0];
        console.log("fabric"+this.fabricMenu);
        
      });

  }

  onFabricChange(){
    this.selectedColour=this.selectedFabric.colours[0];
  


  }

  


  updateOrder() {


    let newOrder = {
      "orderId": this.orderId,
      "newStatusId": this.statusMap[this.selectedStatus],
      "Timestamp": this.order.order_TimeStamp,
      "netAmt": this.order.netAmt,
      "promoDiscAmt": this.order.promoDiscAmt,
      "address": this.order.address,
      "paymentRefNo": this.order.paymentRefNo,
      "promoCode": this.order.promoCode,
      "orderItems": this.order.orderItems,
      "statusLogs": this.order.statusLogs,
      "courierName": this.selectedCourier,
      "trackingNo": this.order.trackingNo

    }
    this.orderService.updateOrder(newOrder).subscribe(res => {
      res = res.json()
      if (res.status == 200) {

      }
    });

    this.edit = false;

  }
}
