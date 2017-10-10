import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../services/order.service'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { ShippingDetailsPopupComponent } from '../shipping-details-popup/shipping-details-popup.component'
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderService]

})
export class OrderDetailsComponent implements OnInit {
  private order: any = {};
  private orderId: string;
  private statusId: number;
  private orderItems: any = {}
  color = 'warn';
  mode = 'buffer';
  value = 100;
  bufferValue = 100;
  isDisabled: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };
  private map: any = { 1: 'payment', 2: 'production', 3: 'packaging', 4: 'preparation', 5: 'shipped', 6: 'completed' }
  pulse: any = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'shipped': false, 'completed': false };
  orderIsCompleted = false;
  orderJustStarted = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params['orderId']; // grab the parameter from url
      this.orderService.getOrderById(this.orderId).subscribe(orders => {
        this.order = orders
        this.orderItems = orders[0].orderItems
        for (let item of this.orderItems) {
          if (item.itemStatus == "COMPLETE") {
            item.product['itemStatusBoolean'] = true
          } else {
            item.product['itemStatusBoolean'] = false
          }
        }

        if (this.order[0]['statusLogs'].length > 0) {
          let status = this.order[0].statusLogs[0]
          let currentStatus = status
          let mostCurrentTimestamp = status.startTimeStamp;
          for (status of this.order[0].statusLogs) {
            let timestamp = status.startTimeStamp;
            console.log("current timestamp: " + timestamp + "> most current" + mostCurrentTimestamp)
            if (mostCurrentTimestamp < timestamp) {
              console.log("correct")

              mostCurrentTimestamp = timestamp;
              currentStatus = status;
            }
          }
          console.log("MOST CURRENT: " + mostCurrentTimestamp)
          this.order[0]['currentStatus'] = currentStatus.orderStatus.statusName;

          let statusId: number = currentStatus.orderStatus.statusId;
          this.statusId = statusId;
          // let statusId = 5
          console.log("STATUS ID: " + this.statusId)
          if (statusId != 6) {
            if (statusId == 1) { 
              this.orderJustStarted = true;
            }
            this.isDisabled[this.map[6]] = true
            this.bufferValue -= 4.1555

            //to colour the icons with the completed statuses only and adjust progress bar buffer and value
            for (var i = 5; i > statusId; i--) {
              this.isDisabled[this.map[i]] = true;
              this.bufferValue -= 16.569
              console.log("this.value = " + this.value)
            }
            this.value = this.bufferValue - 16.569
            this.bufferValue -= 16.569

            //to make the icon of ongoing status pulse
            this.pulse[this.map[statusId]] = true;
          } else {
            this.orderIsCompleted = true;
          }
        } else {
          this.order[0]['currentStatus'] = 'NO DATA';
        }
      });
    });
  }

  updateProgressBar() {
    this.bufferValue = 100
    this.value = 100;
    this.isDisabled = { 'payment': false, 'production': false, 'packaging': false, 'preparation': false, 'transit': false, 'completed': false };

    console.log("UPDATE PROGRESS BAR STATUS: " + this.statusId)
    if (this.statusId != 6) {
      if (this.statusId == 1) {
        this.orderJustStarted = true;
      }
      this.isDisabled[this.map[6]] = true
      this.bufferValue -= 4.1555

      //to colour the icons with the completed statuses only and adjust progress bar buffer and value
      for (var i = 5; i > this.statusId; i--) {
        this.isDisabled[this.map[i]] = true;
        this.bufferValue -= 16.569
        console.log("this.value = " + this.value)
      }
      this.value = this.bufferValue - 16.569
      this.bufferValue = 0
      //to make all icons unpulse first
      for (var i = 6; i > 0; i--) {
        this.pulse[this.map[i]] = false;
      }
      //to make the icon of ongoing status pulse
      this.pulse[this.map[this.statusId]] = true;
    } else {
      this.bufferValue = 100
      this.value = 100
      this.isDisabled[this.map[6]] = false
      this.pulse[this.map[this.statusId - 1]] = false;
      this.orderIsCompleted = true;

    }

  }

  onNext() {
    let prevStatus = this.statusId
    let newStatus = this.statusId + 1
    let allComplete = true

    //check if new status is shipping to enable enetering shipping details
    if (newStatus == 5) {
      console.log("STATUS IS SHIPPED NOWWWWWW")
      let disposable = this.dialogService.addDialog(ShippingDetailsPopupComponent, {
        title: '',
        message: '',
        orderId: this.orderId
      })
        .subscribe((isConfirmed) => {
          if (isConfirmed) {
            this.orderService.updateOrderStatus(this.orderId, this.statusId, newStatus).subscribe(res => {
              if (res.status == "200") {
                console.log("BEFORE STATUS: " + this.statusId)
                this.statusId = this.statusId + 1;
                console.log("ONNEXT")
                console.log("AFTER STATUS: " + this.statusId)
                this.updateProgressBar();
              }
            });
          }
        });
    }

    //check if all items' statuses are complete before moving from production status to the preceding status
    else if (prevStatus == 2 && newStatus > prevStatus) {
      for (let item of this.orderItems) {
        if (item.itemStatus != "COMPLETE") {
          allComplete = false
        }
      }
      if (!allComplete) {
        let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
          title: 'Reminder',
          message: 'Please check if all the items are completed before moving to the next status.'
        })
          .subscribe((isConfirmed) => {
            if (isConfirmed) {
              //doNth
            }
          });
      } else {
        let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
          title: '',
          message: 'Move order to the next status?'
        })
          .subscribe((isConfirmed) => {
            if (isConfirmed) {
              this.orderService.updateOrderStatus(this.orderId, this.statusId, newStatus).subscribe(res => {
                if (res.status == "200") {
                  console.log("BEFORE STATUS: " + this.statusId)
                  this.statusId = this.statusId + 1;
                  console.log("ONNEXT")
                  console.log("AFTER STATUS: " + this.statusId)
                  this.updateProgressBar();
                }
              });
            }
          });
      }
    } else {
      let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
        title: '',
        message: 'Move order to the next status?'
      })
        .subscribe((isConfirmed) => {
          if (isConfirmed) {
            this.orderService.updateOrderStatus(this.orderId, this.statusId, newStatus).subscribe(res => {
              if (res.status == "200") {
                console.log("BEFORE STATUS: " + this.statusId)
                this.statusId = this.statusId + 1;
                console.log("ONNEXT")
                console.log("AFTER STATUS: " + this.statusId)
                this.updateProgressBar();
              }
            });
          }
        });
    }
  }
  onPrevious() {
    let newStatus = this.statusId - 1
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: '',
      message: 'Move order to the previous status?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.orderService.updateOrderStatus(this.orderId, this.statusId, newStatus).subscribe(res => {
            if (res.status == "200") {
              console.log("BEFORE STATUS: " + this.statusId)
              this.statusId = this.statusId - 1;
              console.log("ONNEXT")
              console.log("AFTER STATUS: " + this.statusId)
              this.updateProgressBar();
            }
          });
        }
      });
  }

  reloadItems(params) {
    this.orderService.getOrderById(this.orderId).subscribe(orders => {
      this.order = orders
      this.orderItems = orders[0].orderItems
    });
  }

  onItemStatusChange(item) {
    item.itemStatus = "COMPLETE"
    item.product.itemStatusBoolean = true;
    this.orderService.updateItemStatus(this.orderId, item.product.productId, "COMPLETE").subscribe(res => {
      console.log("ON ITEM STATUS CHANGE: " + res);
    })
  }
}
