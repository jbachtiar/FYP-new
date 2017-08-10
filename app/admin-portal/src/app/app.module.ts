import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { routing }        from './app.routing';

import { CONFIG } from './config/config.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
import { AuthGuard } from './guard/guard';
import { PatternListComponent } from './pattern-list/pattern-list.component'
import { PatternDetailsComponent } from './pattern-details/pattern-details.component'

import { ProductService } from './services/product.service';
import { PagerService} from './services/pager.service'

import { QRCodeModule } from 'angular2-qrcode';
import { CardComponent } from 'ng2-bootstrap-card/ng2-bootstrap-card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SidebarComponent,
    UserComponent,
    StaffmanagementComponent,
    PatternListComponent,
    PatternDetailsComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    RouterModule,
    QRCodeModule,
  ],
  providers: [
    AuthGuard,
    ProductService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
