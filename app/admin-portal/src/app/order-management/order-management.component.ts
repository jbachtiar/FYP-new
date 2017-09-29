import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orderId: string;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params['orderId']; // grab the parameter from url
    });
  }

}
