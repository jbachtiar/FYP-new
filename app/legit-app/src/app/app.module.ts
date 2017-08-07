import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router } from "@angular/router";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';


import { routing }        from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPopupComponent } from './login/login-popup.component';
import { AlertComponent } from './alert/alert.component';
import { ProfileComponent } from './profile/profile.component'
import { ProductListComponent } from './product-list/product-list.component';
import { InlineEditComponent } from './custom/inline-edit.component';
           
import { CONFIG } from './config/config.component';

import { AuthenticationService } from './authentication.service'
import { RegistrationService } from './registration.service'
import { ProfileService } from './profile.service'
import { ProductService } from './product.service'
import { FabricService} from './fabric.service'
import { CartService} from './cart.service'
import { AuthGuard } from './guard/auth.guard'

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { EqualValidator } from './register/equal-validator.directive';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { StoreLocatorComponent } from './store-locator/store-locator.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    LoginPopupComponent,
    AlertComponent,
    ProfileComponent,
    EqualValidator,
    InlineEditComponent,
    ProductListComponent,
    QuickViewComponent,
    FooterComponent,
    ProductDetailComponent,
    MyaccountComponent,
    TrackOrderComponent,
    AboutUsComponent,
    StoreLocatorComponent,
    CheckoutComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BootstrapModalModule,
    CommonModule,
  ],
  providers: [
    AuthenticationService, 
    RegistrationService, 
    ProfileService,
    ProductService,
    FabricService,
    CartService,
    AuthGuard
    ],
  bootstrap: [AppComponent],
  entryComponents : [LoginPopupComponent, QuickViewComponent]
})
export class AppModule { }
