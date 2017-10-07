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
import { OrderFactoryWorkerComponent } from './order-factory-worker/order-factory-worker.component'
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderManagementSuperuserComponent} from './order-management-superuser/order-management-superuser.component';
import { OrderDetailsSuperuserComponent} from './order-details-superuser/order-details-superuser.component';
import { CatalogueComponent } from './catalogue/catalogue.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { DesignDetailsComponent } from './design-details/design-details.component'
import { FabricDetailsComponent } from './fabric-details/fabric-details.component'
import { ColourDetailsComponent } from './colour-details/colour-details.component'
import { CollectionDetailsComponent } from './collection-details/collection-details.component'
import { ProductDetailsAddComponent } from './product-details-add/product-details-add.component'
import { DesignDetailsAddComponent } from './design-details-add/design-details-add.component'
import { FabricDetailsAddComponent } from './fabric-details-add/fabric-details-add.component'
import { ColourDetailsAddComponent } from './colour-details-add/colour-details-add.component'
import { CollectionDetailsAddComponent } from './collection-details-add/collection-details-add.component'

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
    { path: 'viewOrders', component: OrderFactoryWorkerComponent, canActivate: [AuthGuard]},
    { path: 'analyticsdashboard', component: AnalyticsDashboardComponent, canActivate: [AuthGuard]},
    { path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard]},
    { path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard]},
    { path: 'superuser', component: OrderManagementSuperuserComponent, canActivate: [AuthGuard]},
    { path: 'superuser/order/:orderId', component: OrderDetailsSuperuserComponent, canActivate: [AuthGuard]},
    { path: 'catalogue', component: CatalogueComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/product/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/design/:patternId', component: DesignDetailsComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/fabric/:fabricId', component: FabricDetailsComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/colour/:colourId', component: ColourDetailsComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/collection/:collectionId', component: CollectionDetailsComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/add/product', component: ProductDetailsAddComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/add/design', component: DesignDetailsAddComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/add/fabric', component: FabricDetailsAddComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/add/colour', component: ColourDetailsAddComponent, canActivate: [AuthGuard]},
    { path: 'catalogue/add/collection', component: CollectionDetailsAddComponent, canActivate: [AuthGuard]}    
    
    
    
    //{ path: 'register', component: RegisterComponent },
];

export const routing = RouterModule.forRoot(appRoutes);