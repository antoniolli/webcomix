import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationGuard } from '../services/authentication.guard';
import { ComicManagerComponent } from './comic-manager/comic-manager.component';
import { PageCreateComponent } from './comic-manager/page-create/page-create.component';
import { PageEditComponent } from './comic-manager/page-edit/page-edit.component';
import { ComicEditComponent } from './comic-manager/comic-edit/comic-edit.component';
import { FavoritesManagerComponent } from './favorites-manager/favorites-manager.component';
import { ProfileManagerComponent } from './profile-manager/profile-manager.component';


const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: '',
                component: ComicManagerComponent,
                pathMatch: 'full'
            },
            {
                path: 'favorites',
                component: FavoritesManagerComponent,
                pathMatch: 'full'
            },
            {
                path: 'profile',
                component: ProfileManagerComponent,
                pathMatch: 'full'
            },
            {
                path: 'comics',
                component: ComicManagerComponent,
                pathMatch: 'full'
            },
            {
                path: 'comics/:idComic',
                component: ComicEditComponent
            },
            {
                path: 'comics/:idComic/pages',
                component: PageCreateComponent,
                pathMatch: 'full'
            },
            {
                path: 'comics/:idComic/pages/:idPage',
                component: PageEditComponent,
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