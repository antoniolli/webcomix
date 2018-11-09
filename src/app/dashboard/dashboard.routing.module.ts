import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ComicListComponent } from '../comic-list/comic-list.component';
import { AuthenticationGuard } from '../services/authentication.guard';


const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,  
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: 'favorites',
                component: ComicListComponent,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }