import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicListComponent } from '../comic-list/comic-list.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { ComicManagerComponent } from './comic-manager/comic-manager.component';
import { PageManagerComponent } from './page-manager/page-manager.component';
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
    MdcSwitchModule
  } from '@angular-mdc/web';
  import { FileUploadModule  } from 'ng2-file-upload';

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
    FileUploadModule
  ],
  declarations: [
    ComicListComponent, 
    DashboardComponent, 
    ComicManagerComponent, 
    PageManagerComponent
  ]
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
