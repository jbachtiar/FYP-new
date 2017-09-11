import { Component, OnInit } from '@angular/core';
import { PromoCodeService } from '../services/promo-code.service';
import { PromoCode } from '../models/promo-code';
@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css'],
  providers: [PromoCodeService]
})
export class PromoCodeComponent implements OnInit {

  constructor(
    private promoCodeService: PromoCodeService
  ) { }
  private token: string = localStorage.getItem('token');
  private promoList : PromoCode[];

  ngOnInit() {
    this.promoCodeService.getAllPromos(this.token)
      .subscribe(res => {
        this.promoList = res.promos;        
        console.log(JSON.stringify(this.promoList));
        
      })
  }

  

}
