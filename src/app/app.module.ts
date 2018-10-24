import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app.routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { BehaviorSubject } from 'rxjs';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AuthConfig, JWT_TOKEN_NAME } from './auth.config';
import { AuthenticationGuard } from './services/authentication.guard';
import { JwtHelperService } from './services/jwt-helper.service';
import { TokenInterceptor } from './services/token.interceptor';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ComicComponent } from './comic/comic.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ComicComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    HttpClientModule,
    FormsModule,
  	AppRoutingModule,
	ReactiveFormsModule,
	Ng2UiAuthModule.forRoot(AuthConfig),
    BsDropdownModule.forRoot()
  ],
  providers: [
	{ provide: LOCALE_ID, useValue: "pt-BR" },
	{
	    provide: JWT_TOKEN_NAME,
	    useValue: new BehaviorSubject('auth_token')

	},
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },
	AuthenticationGuard,
	JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
