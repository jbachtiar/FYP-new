import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
//import { RegisterComponent } from './register/register.component'
import { PatternListComponent} from './pattern-list/pattern-list.component'
import { PatternDetailsComponent } from './pattern-details/pattern-details.component'
import { PatternDetailsAddComponent } from './pattern-details-add/pattern-details-add.component'
import { PatternDetailsViewComponent } from './pattern-details-view/pattern-details-view.component'
import { PromoCodeComponent } from './promo-code/promo-code.component'
import { OrderFactoryManagerComponent } from './order-factory-manager/order-factory-manager.component'
import { OrderDetailsComponent } from './order-details/order-details.component';

import { AuthGuard } from './guard/guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'homepage', component: HomepageComponent,  canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent,  canActivate: [AuthGuard] },
    { path: 'staffmanagement', component: StaffmanagementComponent,  canActivate: [AuthGuard] },
    { path: 'promoCode', component: PromoCodeComponent,  canActivate: [AuthGuard] },
    { path: 'patternList', component: PatternListComponent, canActivate: [AuthGuard]},
    { path: 'patternList/patternDetails/:patternId', component: PatternDetailsComponent, canActivate: [AuthGuard]},
    { path: 'patternList/addPatternDetails', component: PatternDetailsAddComponent, canActivate: [AuthGuard]},
    { path: 'patternList/viewPatternDetails/:patternId', component: PatternDetailsViewComponent, canActivate: [AuthGuard]},
    { path: 'orders', component: OrderFactoryManagerComponent, canActivate: [AuthGuard]},
    { path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard]}
    //{ path: 'register', component: RegisterComponent },
];

export const routing = RouterModule.forRoot(appRoutes);