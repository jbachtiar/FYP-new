import { Component, OnInit } from '@angular/core';
import { StaffcontrolService } from '../services/staffcontrol.service';
//import { User } from "app/user/user";
import { Staff } from "../models/staff";
import { StaffRole } from "../models/staff-role";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'

@Component({
  selector: 'app-staffmanagement',
  templateUrl: './staffmanagement.component.html',
  styleUrls: ['./staffmanagement.component.css'],
  providers: [StaffcontrolService, DialogService]
})
export class StaffmanagementComponent implements OnInit {
  constructor(private staffcontrolservice: StaffcontrolService, private dialogService: DialogService) { }
  private token: string = localStorage.getItem('token');
  private staffs: Staff[];
  private staffRoles: StaffRole[];
  private newStaff: Staff = new Staff();
  private selectedRole: StaffRole = new StaffRole();
  private loading: boolean = false;
  private add: boolean = false;
  private edStaff: Staff;
  private edit: boolean = false;
  private staffCodes : any = {1 : 'Admin', 2 : 'Factory Manager', 3: "Factory Worker"} 

  ngOnInit() {
    this.staffcontrolservice.getAllRoles()
      .subscribe(
      res => {
        if (res.status === '200') {
          this.staffRoles = res.staffRoles;
          //console.log(JSON.stringify(this.staffRoles));

        } else {
          // console.log(res.status);
        }
      }
      )

    this.staffcontrolservice.getAllStaff(this.token)
      .subscribe(
      res => {
        if (res.status === '200') {
          this.staffs = res.staffs;
          //console.log(JSON.stringify(this.staffs));

        } else {
          // console.log(res.status);
        }
      }
      )
  }

  startLoading() {
    this.loading = true;
  }


  addStaff() {
    this.add = true;
  }

  cancelAdd() {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'Cancel add?',
      message: 'Adding in the process, you may lose your added inputs.'
    })
      .subscribe((isConfirmed) => {
        // console.log("DIALOG")
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


  cancelEdit() {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'Cancel edit?',
      message: 'Editing in the process, you may lose your edited inputs.'
    })
      .subscribe((isConfirmed) => {
        // console.log("DIALOG")
        //We get dialog result
        if (isConfirmed) {
          this.edit = false;
          this.ngOnInit()

        }
        else {
          //do nothing
        }
      });

  }

  editStaff(s: Staff) {
    this.edStaff = s;
    this.edit = true;
    
  }

  editStaffConfirm(){
    this.staffcontrolservice.editStaff(this.token , this.edStaff)
    .subscribe(
      res => {
        if (res.status === '200') {
          //this.staffs = res.staffs;
          // console.log(res.status);
          this.stopLoading()
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: "Edit Succesful!",
            message: this.edStaff.firstName + " " + this.edStaff.lastName + '\'s details has been Updated!'
          })
            .subscribe((isConfirmed) => {
              // console.log("DIALOG")
              //We get dialog result
              if (isConfirmed) {
                //this.emptyField()
                this.ngOnInit()
                this.edit = false;
              }
              else {
                //do nothing
              }
            });
        } else {
          // console.log(res.status);
          this.stopLoading()
        }
      }
      )

  }

  deleteStaff(s: Staff) {
    let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
      title: 'Remove ' + s.firstName + " " + s.lastName + '?',
      message: 'Are you sure to remove ' + s.firstName + " " + s.lastName + ' from the staff list?'
    })
      .subscribe((isConfirmed) => {
        // console.log("DIALOG")
        //We get dialog result
        if (isConfirmed) {
          this.staffcontrolservice.deleteStaff(this.token, s.email)
            .subscribe(
            res => {
              // console.log(res)
              this.ngOnInit()
            }
            )
        }
        else {
          //do nothing
        }
      });



  }

  stopLoading() {
    this.loading = false;
  }
  addNewStaff() {
    //this.newStaff.roleId = 1
    // console.log(this.selectedRole)
    // console.log("ROLE ID 1 : " + JSON.stringify(this.newStaff))
    // console.log("ROLE ID:" + this.selectedRole.roleId)
    // console.log(this.newStaff)
    this.startLoading()
    this.staffcontrolservice.addNewStaff(this.token, this.newStaff)
      .subscribe(
      res => {
        if (res.status === '200') {
          //this.staffs = res.staffs;
          // console.log(res.status);
          this.stopLoading()
          let disposable = this.dialogService.addDialog(ConfirmationPopupComponent, {
            title: "Succesful!",
            message: this.newStaff.firstName + " " + this.newStaff.lastName + ' has been added!'
          })
            .subscribe((isConfirmed) => {
              // console.log("DIALOG")
              //We get dialog result
              if (isConfirmed) {
                this.emptyField()
                this.ngOnInit()
                this.add = false;
              }
              else {
                //do nothing
              }
            });
        } else {
          // console.log(res.status);
          this.stopLoading()
        }
      }
      )
  }

  emptyField() {
    this.newStaff = new Staff();
  }

}
