import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing }        from './app.routing';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SidebarComponent,
    UserComponent,
    StaffmanagementComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }