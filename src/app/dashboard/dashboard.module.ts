import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { ComicManagerComponent } from './comic-manager/comic-manager.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MdcFabModule,
  MdcSwitchModule,
  MdcIconButtonModule,
  MdcSelectModule,
  MdcCheckboxModule,
  MdcDialogModule
} from '@angular-mdc/web';
import { DragulaModule } from 'ng2-dragula';
import { ComicCreateComponent } from './comic-manager/comic-create/comic-create.component';
import { ComicEditComponent } from './comic-manager/comic-edit/comic-edit.component';
import { ComicListComponent } from './comic-manager/comic-list/comic-list.component';
import { PageCreateComponent } from './comic-manager/page-create/page-create.component';
import { PageEditComponent } from './comic-manager/page-edit/page-edit.component';
import { PageListComponent } from './comic-manager/page-list/page-list.component';
import { FavoritesManagerComponent } from './favorites-manager/favorites-manager.component';
import { ProfileManagerComponent } from './profile-manager/profile-manager.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
    MdcSwitchModule,
    MdcIconButtonModule,
    MdcSelectModule,
    MdcCheckboxModule,
    MdcDialogModule,
    DragulaModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    ComicManagerComponent,
    ComicCreateComponent,
    ComicEditComponent,
    ComicListComponent,
    PageCreateComponent,
    PageEditComponent,
    PageListComponent,
    FavoritesManagerComponent,
    ProfileManagerComponent
  ],
  entryComponents: [PageCreateComponent],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
