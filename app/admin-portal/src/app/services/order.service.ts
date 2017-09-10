import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CONFIG } from '../config/config.component';


@Injectable()
export class OrderService {


  constructor(private _http: Http) { }

  getOrders() {
    let params: URLSearchParams = new URLSearchParams();
    let url = CONFIG.orderBackendUrl + '/getAllOrders';
    let mockRes = {
      "status": "200",
      "orders": [
        {
          "order_id": 1,
          "order_TimeStamp": "2015-03-01T02:28:26.030Z",
          "address_line": "21 Blbalbal Road",
          "city": "singapore",
          "country": "singapore",
          "postal_code": "203949",
          "stripe_charge_id": "293094094ABC",
          "email": "lalala@yahoo.com",
          "order_items": [
            {
              "product_id": "1",
              "quantity": "2"
            },
            {
              "product_id": "4",
              "quantity": "1"
            }
          ],
          "order_status_log": [
            {
              "status_id": "1",
              "status_name": "Payment Received",
              "start_timestamp": "20202020"
            },
            {
              "status_id": "2",
              "status_name": "Production",
              "start_timestamp": "30300303"
            }
          ]
        },
        {
          "order_id": 2,
          "order_date": "2015-01-31T03:41:54.611Z",
          "address_line": "21 Blbalbal Road",
          "city": "singapore",
          "country": "singapore",
          "postal_code": "203949",
          "stripe_charge_id": "293094094ABC",
          "email": "lalala@yahoo.com",
          "order_items": [
            {
              "product_id": "1",
              "quantity": "2"
            },
            {
              "product_id": "4",
              "quantity": "1"
            }
          ],
          "order_status_log": [
            {
              "status_id": "1",
              "status_name": "Payment Received",
              "start_timestamp": "20202020"
            },
            {
              "status_id": "2",
              "status_name": "Production",
              "start_timestamp": "30300303"
            },
            {
              "status_id": "3",
              "status_name": "Packaging",
              "start_timestamp": "49505059"
            }
          ]
        },
        {
          "order_id": 3,
          "order_date": "2015-06-10T17:42:38.644Z",
          "address_line": "21 Blbalbal Road",
          "city": "singapore",
          "country": "singapore",
          "postal_code": "203949",
          "stripe_charge_id": "293094094ABC",
          "email": "lalala@yahoo.com",
          "order_items": [
            {
              "product_id": "1",
              "quantity": "2"
            },
            {
              "product_id": "4",
              "quantity": "1"
            }
          ],
          "order_status_log": [
            {
              "status_id": "1",
              "status_name": "Payment Received",
              "start_timestamp": "20202020"
            }
          ]
        }
      ]
    }
    return this._http.get(url)
      .map(res => {
        return res.json().orders;
      });

  }

  getOrderById(orderId) {
    let params: URLSearchParams = new URLSearchParams();
    let url = CONFIG.orderBackendUrl + '/getOrderById?orderId=' + orderId;
    let mockRes = {
      "orderId": 1,
      "order_TimeStamp": "Sep 10, 2017 11:25:19 PM",
      "netAmt": 1000,
      "promoDiscAmt": 0,
      "address": {
          "email": "customer@gmail.com",
          "recipientName": "YUXUAN",
          "phoneNo": "91223223",
          "addressId": 0,
          "addressLine": "54A Zion Road",
          "city": "Singapore",
          "country": "Singapore",
          "postalCode": "247780",
          "isDefault": "N"
      },
      "paymentRefNo": "RFEWGORGKR3423420DDD",
      "promoCode": {
          "promoCodeId": 1,
          "promoCode": "WELCOME5",
          "promoName": "First Purchase",
          "promoType": "% discount",
          "promoValue": 5,
          "minPurchase": 50,
          "maxDiscount": 100,
          "quota": 10000,
          "counter": 0,
          "startDate": "Aug 27, 2017",
          "endDate": "Sep 10, 2017"
      },
      "orderItems": [
          {
              "product": {
                  "size": {
                      "sizeName": "Single",
                      "dimensions": "92 cm x 187 cm",
                      "sizePrice": 100
                  },
                  "productId": 3,
                  "productType": "Bedding",
                  "pattern": {
                      "patternId": 3,
                      "patternName": "Bloom",
                      "patternDesc": "Hi, here is a description on Bloom",
                      "patternPrice": 110,
                      "collection": {
                          "collectionId": 2,
                          "collectionName": "2018 Spring"
                      },
                      "tags": [
                          {
                              "tagId": 3,
                              "tagName": "Promotion"
                          }
                      ]
                  },
                  "colour": {
                      "colourId": 2,
                      "colourName": "Black"
                  },
                  "fabric": {
                      "fabricId": 3,
                      "fabricName": "Long Staple Cotton",
                      "fabricDesc": "Long staple cotton, also called sea island cotton, is a cultivated cotton species that is known for its long fiber. Long staple cotton is renowned as fine cotton for its high quality and long soft fiber.",
                      "fabricPrice": 120
                  },
                  "images": [
                      {
                          "imageId": 3,
                          "imageUrl": "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P3.png"
                      }
                  ]
              },
              "quantity": 1,
              "unitPrice": 200
          },
          {
              "product": {
                  "size": {
                      "sizeName": "Single",
                      "dimensions": "92 cm x 187 cm",
                      "sizePrice": 100
                  },
                  "productId": 6,
                  "productType": "Bedding",
                  "pattern": {
                      "patternId": 4,
                      "patternName": "Mimosa",
                      "patternDesc": "Hi, here is a description of Mimosa",
                      "patternPrice": 100,
                      "collection": {
                          "collectionId": 3,
                          "collectionName": "2018 Summer"
                      },
                      "tags": [
                          {
                              "tagId": 1,
                              "tagName": "New Arrivals"
                          },
                          {
                              "tagId": 4,
                              "tagName": "Limited Edition"
                          }
                      ]
                  },
                  "colour": {
                      "colourId": 4,
                      "colourName": "Yellow"
                  },
                  "fabric": {
                      "fabricId": 4,
                      "fabricName": "Cotton",
                      "fabricDesc": "Cotton is a widely used home textile fabric. Popular among consumers because of its features such as perspiration absorbent, breezy for wear, softness and no irritation to skin, ease of wash, and no pilling.",
                      "fabricPrice": 80
                  },
                  "images": [
                      {
                          "imageId": 6,
                          "imageUrl": "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P6.png"
                      }
                  ]
              },
              "quantity": 1,
              "unitPrice": 500
          },
          {
              "product": {
                  "size": {
                      "sizeName": "Single",
                      "dimensions": "92 cm x 187 cm",
                      "sizePrice": 100
                  },
                  "productId": 7,
                  "productType": "Bedding",
                  "pattern": {
                      "patternId": 4,
                      "patternName": "Mimosa",
                      "patternDesc": "Hi, here is a description of Mimosa",
                      "patternPrice": 100,
                      "collection": {
                          "collectionId": 3,
                          "collectionName": "2018 Summer"
                      },
                      "tags": [
                          {
                              "tagId": 1,
                              "tagName": "New Arrivals"
                          },
                          {
                              "tagId": 4,
                              "tagName": "Limited Edition"
                          }
                      ]
                  },
                  "colour": {
                      "colourId": 1,
                      "colourName": "White"
                  },
                  "fabric": {
                      "fabricId": 2,
                      "fabricName": "Modal",
                      "fabricDesc": "Modal fabric is a regenerated cellulose fiber developed by the Lenzing company from Austria. Its raw materials are beech trees living in European bushes. Beech trees are made into wood pulp first and then processed into Modal fiber using special spinning technologies. The textile made from this fiber has a silky shine, fine touch, and excellent draping. Modal fiber is an eco-friendly fiber because all its raw materials are natural and can be naturally decomposed.",
                      "fabricPrice": 100
                  },
                  "images": [
                      {
                          "imageId": 7,
                          "imageUrl": "https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-126347216585/Product+Images/P7.png"
                      }
                  ]
              },
              "quantity": 1,
              "unitPrice": 300
          }
      ],
      "statusLogs": [
          {
              "orderStatus": {
                  "statusId": 1,
                  "statusName": "Payment Received"
              },
              "startTimeStamp": "Sep 10, 2017 11:25:19 PM",
              "endTimeStamp": "Sep 10, 2017 11:25:19 PM"
          },
          {
              "orderStatus": {
                  "statusId": 2,
                  "statusName": "In Production"
              },
              "startTimeStamp": "Sep 10, 2017 11:25:19 PM",
              "endTimeStamp": "Sep 10, 2017 11:25:19 PM"
          }
      ]
  }
    return this._http.get(url)
      .map(res => {
        res['statusLogs'] = [
          {
              "orderStatus": {
                  "statusId": 1,
                  "statusName": "Payment Received"
              },
              "startTimeStamp": "Sep 10, 2017 11:25:19 PM",
              "endTimeStamp": "Sep 10, 2017 11:25:19 PM"
          },
          {
              "orderStatus": {
                  "statusId": 2,
                  "statusName": "In Production"
              },
              "startTimeStamp": "Sep 10, 2017 11:25:19 PM",
              "endTimeStamp": "Sep 10, 2017 11:25:19 PM"
          }
      ]
        console.log("ORDER: " + res.json().orders)
        return res.json().orders;
      });
  }
}