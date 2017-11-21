import { Component, OnInit} from '@angular/core';
import { PromoCodeService } from '../services/promo-code.service';
import { Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css'],
  providers: [PromoCodeService, CatalogueService]
})
export class PromoCodeComponent implements OnInit {

  private promoList: any = [];
  private params;

  constructor(
    private promoCodeService: PromoCodeService, private catService: CatalogueService, private router: Router) {
     }

  ngOnInit() {
    this.promoCodeService.getAllPromos().subscribe(
      promoCodes => {
        
        this.promoList = promoCodes;        
        
      })

  }

  addPromo(): void {
    let link = ['promoCode/addPromo']
    this.router.navigate(link);
  }

  deletePromo(p) {
    this.catService.deletePromo(p.promoCodeId).subscribe(
      res => {
          // console.log(res)
          this.ngOnInit()
      });

  }
  
}
