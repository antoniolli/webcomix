import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { HomeComponent } from './home/home.component';
import { ComicComponent } from './comic/comic.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'comic/:id',
    component: ComicComponent,
    pathMatch: 'full'
  },
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
