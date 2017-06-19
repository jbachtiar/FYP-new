import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from './components/user.components';
import {AboutComponent} from './components/about.components';

const appRoutes: Routes=[
    {
        path:'',
        component: UserComponent
    },
     {
        path:'about',
        component: AboutComponent
    }
]

export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);