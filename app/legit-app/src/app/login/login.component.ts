import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;

  constructor(
    // private route: ActivatedRoute,
  ) { }

  ngOnInit() {

  }
  login(){
    this.loading = true;
    //to do: calling service
    this.loading = false; 
  }
}
