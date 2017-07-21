import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './profile/profile.component'
import { InlineEditComponent } from './custom/inline-edit.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AuthGuard } from './guard/auth.guard'

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile-sidebar', component:  MyaccountComponent, canActivate: [AuthGuard] },
    //{ path: 'profile-sidebar/profile', component:  ProfileComponent, canActivate: [AuthGuard] },
    { path: 'custom', component:  InlineEditComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'productDetails/:productId/:fabricId/:colourId',component: ProductDetailComponent },
];

export const routing = RouterModule.forRoot(appRoutes);