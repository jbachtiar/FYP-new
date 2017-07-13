import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
//import { RegisterComponent } from './register/register.component'

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'user', component: UserComponent },
    { path: 'staffmanagement', component: StaffmanagementComponent},
    //{ path: 'register', component: RegisterComponent },
];

export const routing = RouterModule.forRoot(appRoutes);