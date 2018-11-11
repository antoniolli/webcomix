import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { HomeComponent } from './public/home/home.component';
import { ComicComponent } from './public/comic/comic.component';
import { AuthenticateComponent } from './public/authenticate/authenticate.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'comics/:idComic',
    component: ComicComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthenticateComponent,
    pathMatch: 'full'
  },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [ AuthenticationGuard ] },
  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
