import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AboutUsComponent } from './about-us/about-us.component'
import { StoreLocatorComponent } from './store-locator/store-locator.component'
import { ProfileComponent } from './profile/profile.component'
import { InlineEditComponent } from './custom/inline-edit.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { MyaccountComponent } from './myaccount/myaccount.component'
import { CheckoutComponent } from './checkout/checkout.component'
import { PaymentComponent } from './payment/payment.component'
import { HomeAccessoriesComponent } from './home-accessories/home-accessories.component'
import { AuthGuard } from './guard/auth.guard'
import { CartComponent } from './cart/cart.component'
import { VirtualRealityComponent } from './virtual-reality/virtual-reality.component'
import { TrackOrderDetailComponent} from './track-order-detail/track-order-detail.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component'
//import { CanDeactivateGuard} from './guard/submitForm.guard'

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutUsComponent},
    { path: 'store-locator', component: StoreLocatorComponent}, 
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile-sidebar', component:  MyaccountComponent, canActivate: [AuthGuard] },
    //{ path: 'profile-sidebar/profile', component:  ProfileComponent, canActivate: [AuthGuard] },
    { path: 'custom', component:  InlineEditComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'productDetails/:patternId', component: ProductDetailComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] /*, canDeactivate:[CanDeactivateGuard] */ },
    { path: 'checkout/payment', component: PaymentComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent },
    { path: 'accessories', component: HomeAccessoriesComponent },
    { path: 'profile-sidebar/:orderId', component: TrackOrderDetailComponent },
    { path: 'activate-account/:email/:code', component: AccountVerificationComponent},
    { path: 'vr', component: VirtualRealityComponent},
];

export const routing = RouterModule.forRoot(appRoutes);