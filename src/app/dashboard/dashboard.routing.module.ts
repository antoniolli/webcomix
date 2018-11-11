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
                path: 'comics',
                component: ComicManagerComponent,
                pathMatch: 'full'
            },
            {
                path: 'comics/:idComic',
                component: ComicManagerComponent,

            },
            {
                path: 'comics/:idComic/pages',
                component: PageManagerComponent,
                pathMatch: 'full'
            },
            {
                path: 'comics/:idComic/pages/:idPage',
                component: PageManagerComponent,
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