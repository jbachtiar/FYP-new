import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { routing }        from './app.routing';
import { FormsModule }   from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service'
import { RegistrationService } from './registration.service'
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  providers: [AuthenticationService, RegistrationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
