import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountCreationComponent } from './accountCreation/accountCreation.component';
import { routing }        from './app.routing';
import { FormsModule }   from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service'
import { SuperuserService } from './superuser.service'
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountCreationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  providers: [
    AuthenticationService,
    SuperuserService
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
