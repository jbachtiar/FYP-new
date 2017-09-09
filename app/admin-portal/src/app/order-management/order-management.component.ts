import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  private color: any = {'all':'lightyellow','payment': 'white', 'production': 'white', 'packaging': 'white', 'preparing': 'white', 'transit': 'white', 'completed': 'white' }
 
  private showAll: boolean;
  private showPayment: boolean;
  private showProduction: boolean;
  private showPackaging: boolean;
  private showPreparation: boolean;
  private showTransit: boolean;
  private showCompleted: boolean;
  
  constructor() { }

  ngOnInit() {
    this.showAll = true;
    
  }

}
