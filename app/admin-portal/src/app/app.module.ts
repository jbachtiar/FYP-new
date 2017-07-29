import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing }        from './app.routing';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { CONFIG } from './config/config.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
import { AuthGuard } from './guard/guard';
import { PatternListComponent } from './pattern-list/pattern-list.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SidebarComponent,
    UserComponent,
    StaffmanagementComponent,
    PatternListComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    RouterModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
