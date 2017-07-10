import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router } from "@angular/router";
import { HttpModule } from '@angular/http';

import { routing }        from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPopupComponent } from './login/login-popup.component';
import { AlertComponent } from './alert/alert.component';
           
import { AuthenticationService } from './authentication.service'
import { RegistrationService } from './registration.service'

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    LoginPopupComponent,
    AlertComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BootstrapModalModule
  ],
  providers: [AuthenticationService, RegistrationService],
  bootstrap: [AppComponent],
  entryComponents : [LoginPopupComponent]
})
export class AppModule { }
