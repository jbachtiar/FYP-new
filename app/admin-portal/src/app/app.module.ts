import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';

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
import { OrderFactoryManagerComponent } from './order-factory-manager/order-factory-manager.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';

import { ProductService } from './services/product.service';
import { PagerService} from './services/pager.service'
import { PromoCodeService } from './services/promo-code.service'
import { OrderService } from './services/order.service'

import { QRCodeModule } from 'angular2-qrcode';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { DataTableModule } from 'angular-4-data-table';
import { MdTabsModule, MdButtonModule, MdProgressBarModule, MdChipsModule, MdCardModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderFactoryWorkerComponent } from './order-factory-worker/order-factory-worker.component';
<<<<<<< HEAD
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
=======
import { OrderManagementSuperuserComponent } from './order-management-superuser/order-management-superuser.component';
import { OrderDetailsSuperuserComponent } from './order-details-superuser/order-details-superuser.component';
>>>>>>> super-user


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
    PromoCodeComponent,
    OrderFactoryManagerComponent,
    OrderManagementComponent,
    OrderDetailsComponent,
    OrderFactoryWorkerComponent,
<<<<<<< HEAD
    AnalyticsDashboardComponent
=======
    OrderManagementSuperuserComponent,
    OrderDetailsSuperuserComponent
>>>>>>> super-user
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
    MdCardModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
    ],
  exports: [
    MdTabsModule
  ],
  providers: [
    AuthGuard,
    ProductService,
    PagerService,
    PromoCodeService,
    OrderService 
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationPopupComponent
  ]
})
export class AppModule { }
