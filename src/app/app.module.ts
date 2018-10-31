//Modules
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

//Services
import { BehaviorSubject } from 'rxjs';
import { FilterPipe } from './services/pipes/filter.pipe';

//Authentication
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AuthConfig, JWT_TOKEN_NAME } from './auth.config';
import { AuthenticationGuard } from './services/authentication.guard';
import { JwtHelperService } from './services/jwt-helper.service';
import { TokenInterceptor } from './services/token.interceptor';

//Components
import { AppComponent } from './app.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { HomeComponent } from './home/home.component';
import { ComicComponent } from './comic/comic.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//Material Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
	MdcTopAppBarModule, 
	MdcButtonModule,
	MdcIconModule,
	MdcMenuModule,
	MdcDrawerModule,
	MdcCardModule,
	MdcListModule   } from '@angular-mdc/web';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComicComponent,
    PageNotFoundComponent,
    MenuSidebarComponent,
    MenuLoginComponent,
    FilterPipe,
  ],
  imports: [
    Ng2UiAuthModule.forRoot(AuthConfig),
    BrowserModule,
    DashboardModule,
    HttpClientModule,
    FormsModule,
  	AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdcTopAppBarModule,
    MdcButtonModule,
    MdcIconModule,
    MdcMenuModule,
    MdcDrawerModule,
    MdcCardModule,
    MdcListModule
  ],
  exports: [FilterPipe],
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
