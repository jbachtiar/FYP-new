import { Component, OnInit } from '@angular/core';
import { PromoCodeService } from '../services/promo-code.service';
import { PromoCode } from '../models/promo-code';
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'


@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css'],
  providers: [PromoCodeService]
})
export class PromoCodeComponent implements OnInit {

  constructor(
    private promoCodeService: PromoCodeService,
    private dialogService: DialogService
  ) { }
  private token: string = localStorage.getItem('token');
  private promoList: PromoCode[];
  private edPromo: PromoCode;
  private newPromo: PromoCode = new PromoCode;
  private edit: boolean = false;
  private add: boolean = false;
  private loading: boolean = false;
  private rangeDate: any;

  ngOnInit() {
    this.promoCodeService.getAllPromos(this.token)
      .subscribe(res => {
        this.promoList = res.promos;
        console.log(JSON.stringify(this.promoList));

      })
  }
  addNewPromo() {
    this.newPromo.startDate = this.rangeDate.beginJsDate.getTime()
    this.newPromo.endDate = this.rangeDate.endJsDate.getTime()
    this.checkDate()
    console.log(JSON.stringify(this.newPromo))

    this.promoCodeService.addPromo(this.token, this.newPromo)
      .subscribe(
        res =>{
          if (res.status === '200') {
            //this.staffs = res.staffs;
            console.log(res.status);
            this.startLoading()
            let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
              title: "Succesful!",
              message: this.newPromo.promoCode + ' has been added!'
            })
              .subscribe((isConfirmed) => {
                console.log("DIALOG")
                //We get dialog result
                if (isConfirmed) {
                  //this.emptyField()
                  this.ngOnInit()
                  this.newPromo = new PromoCode()
                  this.add = false;
                }
                else {
                  //do nothing
                }
              });
          } else {
            console.log(res.status);
            this.stopLoading()
          }
        }
      )
  }

  startLoading() {
    this.loading = true;
  }
  stopLoading() {
    this.loading = false;
  }

  deletePromo(p: PromoCode) {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'Remove Promo Code?',
      message: 'Are you sure to remove ?'
    })
      .subscribe((isConfirmed) => {
        console.log("DIALOG")
        //We get dialog result
        if (isConfirmed) {
          this.promoCodeService.deletePromo(this.token, "" + p.promoCodeId)
            .subscribe(
            res => {
              console.log(res)
              this.ngOnInit()
            }
            )
        }
        else {
          //do nothing
        }
      });



  }
  editPromo(p: PromoCode) {
    this.edPromo = p;
    this.edit = true;

  }
  addPromo() {
    this.add = true;

  }
  cancelAdd() {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'Cancel add?',
      message: 'Adding in the process, you may lose your added inputs.'
    })
      .subscribe((isConfirmed) => {
        console.log("DIALOG")
        //We get dialog result
        if (isConfirmed) {
          this.add = false;
          this.ngOnInit()

        }
        else {
          //do nothing
        }
      });

  }
  checkDate() {
    console.log(JSON.stringify(this.rangeDate))
  }

}
