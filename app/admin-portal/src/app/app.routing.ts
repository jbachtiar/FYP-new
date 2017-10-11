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
import { SuperGuard } from './guard/superGuard';
import { ManagerGuard } from './guard/managerGuard';

const appRoutes: Routes = [
    // { path: '', component: AnalyticsDashboardComponent, canActivate: [SuperGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'homepage', component: HomepageComponent,  canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent,  canActivate: [AuthGuard] },
    { path: 'staffmanagement', component: StaffmanagementComponent,  canActivate: [SuperGuard] },
    { path: 'promoCode', component: PromoCodeComponent,  canActivate: [SuperGuard] },
    { path: 'patternList', component: PatternListComponent, canActivate: [ManagerGuard]},
    { path: 'patternList/patternDetails/:patternId', component: PatternDetailsComponent, canActivate: [ManagerGuard]},
    { path: 'patternList/addPatternDetails', component: PatternDetailsAddComponent, canActivate: [ManagerGuard]},
    { path: 'patternList/viewPatternDetails/:patternId', component: PatternDetailsViewComponent, canActivate: [ManagerGuard]},
    { path: 'orders', component: OrderFactoryManagerComponent, canActivate: [ManagerGuard]},
    { path: 'viewOrders', component: OrderFactoryWorkerComponent, canActivate: [AuthGuard]},
    { path: 'analyticsdashboard', component: AnalyticsDashboardComponent, canActivate: [SuperGuard]},
    { path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [ManagerGuard]},
    { path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [ManagerGuard]},
    { path: 'superuser', component: OrderManagementSuperuserComponent, canActivate: [SuperGuard]},
    { path: 'superuser/order/:orderId', component: OrderDetailsSuperuserComponent, canActivate: [SuperGuard]},
    { path: 'catalogue', component: CatalogueComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/product/:productId', component: ProductDetailsComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/design/:patternId', component: DesignDetailsComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/fabric/:fabricId', component: FabricDetailsComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/colour/:colourId', component: ColourDetailsComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/collection/:collectionId', component: CollectionDetailsComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/add/product', component: ProductDetailsAddComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/add/design', component: DesignDetailsAddComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/add/fabric', component: FabricDetailsAddComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/add/colour', component: ColourDetailsAddComponent, canActivate: [SuperGuard]},
    { path: 'catalogue/add/collection', component: CollectionDetailsAddComponent, canActivate: [SuperGuard]}
    //{ path: 'register', component: RegisterComponent },
];

export const routing = RouterModule.forRoot(appRoutes);