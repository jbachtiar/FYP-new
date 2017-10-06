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
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
import { OrderManagementSuperuserComponent } from './order-management-superuser/order-management-superuser.component';
import { OrderDetailsSuperuserComponent } from './order-details-superuser/order-details-superuser.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { FabricCatalogueComponent } from './fabric-catalogue/fabric-catalogue.component';
import { ColourCatalogueComponent } from './colour-catalogue/colour-catalogue.component';
import { SizeCatalogueComponent } from './size-catalogue/size-catalogue.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { PatternCatalogueComponent } from './pattern-catalogue/pattern-catalogue.component';
import { CollectionCatalogueComponent } from './collection-catalogue/collection-catalogue.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FabricDetailsComponent } from './fabric-details/fabric-details.component';
import { ColourDetailsComponent } from './colour-details/colour-details.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';
import { ProductDetailsAddComponent } from './product-details-add/product-details-add.component';
import { ProductDetailsEditComponent } from './product-details-edit/product-details-edit.component';
import { CollectionDetailsAddComponent } from './collection-details-add/collection-details-add.component';
import { CollectionDetailsEditComponent } from './collection-details-edit/collection-details-edit.component';
import { ColourDetailsEditComponent } from './colour-details-edit/colour-details-edit.component';
import { ColourDetailsAddComponent } from './colour-details-add/colour-details-add.component';
import { FabricDetailsAddComponent } from './fabric-details-add/fabric-details-add.component';
import { FabricDetailsEditComponent } from './fabric-details-edit/fabric-details-edit.component';
import { DesignCatalogueComponent } from './design-catalogue/design-catalogue.component';
import { DesignDetailsComponent } from './design-details/design-details.component';
import { DesignDetailsAddComponent } from './design-details-add/design-details-add.component';
import { DesignDetailsEditComponent } from './design-details-edit/design-details-edit.component';


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
    OrderDetailsComponent,
    OrderFactoryWorkerComponent,
    AnalyticsDashboardComponent,
    OrderManagementSuperuserComponent,
    OrderDetailsSuperuserComponent,
    CatalogueComponent,
    FabricCatalogueComponent,
    ColourCatalogueComponent,
    SizeCatalogueComponent,
    ProductCatalogueComponent,
    PatternCatalogueComponent,
    CollectionCatalogueComponent,
    ProductDetailsComponent,
    FabricDetailsComponent,
    ColourDetailsComponent,
    CollectionDetailsComponent,
    ProductDetailsAddComponent,
    ProductDetailsEditComponent,
    CollectionDetailsAddComponent,
    CollectionDetailsEditComponent,
    ColourDetailsEditComponent,
    ColourDetailsAddComponent,
    FabricDetailsAddComponent,
    FabricDetailsEditComponent,
    DesignCatalogueComponent,
    DesignDetailsComponent,
    DesignDetailsAddComponent,
    DesignDetailsEditComponent
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
