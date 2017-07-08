import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
import { LoginPopupComponent } from '../login/login-popup.component';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialogService:DialogService) { }

  ngOnInit() {
  }

  showLogin() {
      let disposable = this.dialogService.addDialog(LoginPopupComponent, {
          title:'Login', 
          message:''})
          .subscribe((isConfirmed)=>{
              //We get dialog result
              if(isConfirmed) {
                  alert('accepted');
              }
              else {
                  alert('declined');
              }
          });
      //We can close dialog calling disposable.unsubscribe();
      //If dialog was not closed manually close it by timeout
      // setTimeout(()=>{
      //     disposable.unsubscribe();
      // },10000);
  }

}
