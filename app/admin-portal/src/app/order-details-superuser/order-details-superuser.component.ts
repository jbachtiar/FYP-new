import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../services/order.service'
import { ProductService } from '../services/product.service'
import { CatalogueService } from '../services/catalogue.service'
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
  private editProd: boolean = false;
  private status: any = {};
  private index: number = 0;
  orderStatusSize: any;
  statusMap: any = { 'Payment Received': 1, 'In Production': 2, 'Packaging': 3, 'Pending for Shipment': 4, 'Shipped': 5, 'Completed': 6, 'Cancelled': 7 }
  statusMenu = ["Payment Received", "In Production", "Packaging", "Pending for Shipment", "Shipped", "Completed", "Cancelled"];
  courierMenu = ["Shun Feng", "DHL"];
  sizeMenu = ["Single", "Double", "Queen", "King"];
  patternMenu: any
  fabricMenu: any
  colourMenu: any
  selectedStatus: any;
  selectedItem: any;
  initialStatus: any;
  selectedCourier: any;
  selectedFabric: any;
  selectedColour: any;
  pattern: any;
  newStatusId: any;
  //statusMenu: any = [];
  constructor(private route: ActivatedRoute, private orderService: OrderService, private productService: ProductService, private catalogueService: CatalogueService) { }

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
    this.initialStatus = currentStatus.orderStatus.statusName;
    //  return currentStatus.orderStatus.statusName;

  }
  editOrder() {
    this.edit = true;
    this.productService.getPatternList().subscribe(
      patterns => {
        this.patternMenu = patterns;

      });



  }

  editProduct(item) {
    //console.log("product is clicked");
    this.editProd = true;
    this.selectedItem = item;



  }

  onPatternChange(patternName) {

    this.productService.getPatternByName(patternName).subscribe(
      pattern => {
        console.log("pattern" + patternName);
        this.fabricMenu = pattern.fabrics;
        // this.selectedFabric = this.fabricMenu[0];
        console.log("fabric" + this.fabricMenu);

      });

  }

  onFabricChange(fabricName, patternName) {
   //this.selectedColour = this.selectedFabric.colours[0];
   console.log("fabricName"+fabricName);
    this.catalogueService.getColoursByPatternFabric(patternName, fabricName).subscribe(
      colour => {
        //console.log("pattern" + patternName);
        this.colourMenu = colour;
        // this.selectedFabric = this.fabricMenu[0];
        console.log("color" + this.colourMenu);

      });




  }




  updateOrder() {

    if (this.initialStatus == this.selectedStatus) {
      this.newStatusId = 0;

    } else {
      this.newStatusId = this.statusMap[this.selectedStatus];
    }


    let newOrder = {
      "orderId": this.orderId,
      "newStatusId": this.newStatusId,
      "order_TimeStamp": this.order.order_TimeStamp,
      "netAmt": this.order.netAmt,
      "promoDiscAmt": this.order.promoDiscAmt,
      "address": this.order.address,
      "paymentRefNo": this.order.paymentRefNo,
      "promoCode": this.order.promoCode,
      "orderItems": this.order.orderItems,
      "statusLogs": this.order.statusLogs,
      "courierName": this.order.courierName,
      "trackingNo": this.order.trackingNo

    }
    console.log(newOrder);
    this.orderService.updateOrder(newOrder).subscribe(res => {
      res = res.json()
      if (res.status == 200) {

      }
    });

    this.edit = false;

  }
}
