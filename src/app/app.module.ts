import { environment } from 'src/environments/environment';

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
import { ComicService } from './services/comic.service';

//Authentication
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AuthenticationGuard } from './services/authentication.guard';
import { JwtHelperService } from './services/jwt-helper.service';
import { TokenInterceptor } from './services/token.interceptor';

//Components
import { AppComponent } from './app.component';
import { MenuSidebarComponent } from './public/menu-sidebar/menu-sidebar.component';
import { MenuLoginComponent } from './public/menu-login/menu-login.component';
import { HomeComponent } from './public/home/home.component';
import { ComicComponent } from './public/comic/comic.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AuthenticateComponent } from './public/authenticate/authenticate.component';

//Material Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
	MdcTopAppBarModule, 
	MdcButtonModule,
	MdcIconModule,
	MdcMenuModule,
	MdcDrawerModule,
	MdcCardModule,
  MdcListModule,
  MdcImageListModule,
  MdcRippleModule,
  MdcFormFieldModule,
  MdcTextFieldModule,
  MdcTypographyModule,
  MdcIconButtonModule,
  MdcFabModule,
  MdcSelectModule,
  MdcCheckboxModule   } from '@angular-mdc/web';


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
    AuthenticateComponent,
  ],
  imports: [
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
    MdcListModule,
    MdcImageListModule,
    MdcRippleModule,
    MdcFormFieldModule,
    MdcTextFieldModule,
    MdcTypographyModule,
    MdcFabModule,
    MdcIconButtonModule,
    MdcSelectModule,
    MdcCheckboxModule
  ],
  exports: [FilterPipe],
  providers: [
  	{ provide: LOCALE_ID, useValue: "pt-BR" },
  	{
  	    provide: environment.authTokenName,
  	    useValue: new BehaviorSubject('auth_token')

  	},
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },
  	AuthenticationGuard,
  	JwtHelperService,
    ComicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
