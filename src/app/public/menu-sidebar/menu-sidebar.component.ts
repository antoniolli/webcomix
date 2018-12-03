import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  @Input("sidebarMenu") sidebarMenu;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  goToHome() {
    this.router.navigateByUrl('')
    this.sidebarMenu.open = false;
  }

  goToDashboard() {
    this.router.navigateByUrl('dashboard')
    this.sidebarMenu.open = false;
  }

  goToFavorites() {
    this.router.navigateByUrl('dashboard/favorites')
    this.sidebarMenu.open = false;
  }

  goToCreateComic() {
    this.router.navigateByUrl('dashboard/comics')
    this.sidebarMenu.open = false;
  }

  goToEditComic() {
    this.router.navigateByUrl('dashboard/comics')
    this.sidebarMenu.open = false;
  }

  goToCreatePage() {
    this.router.navigateByUrl('dashboard/comics/pages')
    this.sidebarMenu.open = false;
  }

  goToEditPage() {
    this.router.navigateByUrl('dashboard/comics/pages')
    this.sidebarMenu.open = false;
  }

}
