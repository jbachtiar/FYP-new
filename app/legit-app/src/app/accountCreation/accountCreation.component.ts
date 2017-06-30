import { Component, OnInit } from '@angular/core';
import { SuperuserService } from '../superuser.service'


@Component({
  selector: 'accountCreation',
  templateUrl: './accountCreation.component.html',
  styleUrls: ['./accountCreation.component.css']
})
export class AccountCreationComponent implements OnInit {
  private staff: any = {};
  private loading: boolean = false;

  constructor(private superuserService: SuperuserService) { }

  ngOnInit() {
  }

  createAccount(){
    this.loading = true
    //to do: calling service
    this.superuserService.addAdmin(this.staff.id, this.staff.password)
    .subscribe(
          res => {
            if(res.status === 'Added successfully'){
              console.log(res.status);
            }else{
              console.log(res.status);
            }
          }
    )
    this.loading = false;
  }
}
