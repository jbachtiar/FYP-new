import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: any = {};
  private loading: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  register(){
    this.loading = true
    //to do: calling service
    this.loading = false
  }
}
