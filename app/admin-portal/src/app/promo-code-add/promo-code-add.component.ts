import { Component, OnInit} from '@angular/core';
import { PromoCodeService } from '../services/promo-code.service';
import { Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service'

@Component({
  selector: 'app-promo-code-add',
  templateUrl: './promo-code-add.component.html',
  styleUrls: ['./promo-code-add.component.css'],
  providers: [PromoCodeService, CatalogueService]
})
export class PromoCodeAddComponent implements OnInit {

  private promoList: any = [];
  private params;
  promo: any;

  constructor(
    private promoCodeService: PromoCodeService, private catService: CatalogueService, private router: Router) {
     }

  ngOnInit() {

    this.promo = {
      promoCodeId: 0,
      promoCode: "",
      promoName: "",
      promoType: "",
      promoValue: 0,
      minPurchase: 0,
      maxDiscount: 0,
      quota: 10000,
      counter: 0,
      startDate: "",
      endDate: "",
      
    }

    this.promoCodeService.getAllPromos().subscribe(
      promoCodes => {
        
        this.promoList = promoCodes;        
        
      })

  }

    submit() {

      // console.log("NEW Promo: " + this.promo)
      this.catService.savePromo(this.promo).subscribe(res => {
        if (res.status == 200) {
          alert("New Promo Added");
          let link = ['/promoCode'];
          this.router.navigate(link);
        } else {
          alert("Changes cannot be saved")
        }

      });
    }

  }

