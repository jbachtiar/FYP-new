import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountCreationComponent } from './accountCreation/accountCreation.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'accountCreation', component: AccountCreationComponent },
];

export const routing = RouterModule.forRoot(appRoutes);