import { Component, OnInit} from '@angular/core';
import { PromoCodeService } from '../services/promo-code.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo-code-add',
  templateUrl: './promo-code-add.component.html',
  styleUrls: ['./promo-code-add.component.css'],
  providers: [PromoCodeService]
})
export class PromoCodeAddComponent implements OnInit {

  private promoList: any = [];
  private params;


  constructor(
    private promoCodeService: PromoCodeService, private router: Router) {
     }

  ngOnInit() {
    this.promoCodeService.getAllPromos().subscribe(
      promoCodes => {
        
        this.promoList = promoCodes;        
        
      })

  }

  addPromo(): void {
    let link = ['/addPromo']
    this.router.navigate(link);
  }

}
