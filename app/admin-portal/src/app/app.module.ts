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
import { CardComponent } from 'ng2-bootstrap-card/ng2-bootstrap-card';
import { PatternDetailsAddComponent } from './pattern-details-add/pattern-details-add.component';
import { PatternDetailsViewComponent } from './pattern-details-view/pattern-details-view.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { DashboardFactoryManagerComponent } from './dashboard-factory-manager/dashboard-factory-manager.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { ProductService } from './services/product.service';
import { PagerService} from './services/pager.service'
import { OrderService } from './services/order.service'

import { QRCodeModule } from 'angular2-qrcode';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DataTableModule } from 'angular-4-data-table';
import { MdTabsModule, MdButtonModule, MdProgressBarModule, MdChipsModule, MdCardModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


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
    CardComponent,
    PatternDetailsAddComponent,
    PatternDetailsViewComponent,
    LoadingComponent,
    ConfirmationPopupComponent,
    DashboardFactoryManagerComponent,
    OrderManagementComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    RouterModule,
    QRCodeModule,
    BootstrapModalModule,
    DataTableModule,
    MdTabsModule,
    MdButtonModule,
    MdProgressBarModule,
    MdChipsModule,
    Ng2SearchPipeModule,
    MdCardModule
    ],
  exports: [
    MdTabsModule
  ],
  providers: [
    AuthGuard,
    ProductService,
    PagerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationPopupComponent
  ]
})
export class AppModule { }
