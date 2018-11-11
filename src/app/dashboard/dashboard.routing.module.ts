import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationGuard } from '../services/authentication.guard';
import { ComicManagerComponent } from './comic-manager/comic-manager.component';
import { PageManagerComponent } from './page-manager/page-manager.component';


const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,  
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: 'comic',
                component: ComicManagerComponent,
                pathMatch: 'full'
            },
            {
                path: 'comic/:id',
                component: ComicManagerComponent,
                children: [
                    {
                        path: 'page',
                        component: PageManagerComponent,
                        pathMatch: 'full'
                    },
                    {
                        path: 'page/:id',
                        component: PageManagerComponent,
                        pathMatch: 'full'
                    },
                ]
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