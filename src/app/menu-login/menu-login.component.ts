import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.scss']
})
export class MenuLoginComponent implements OnInit {

  user: User;

  constructor(private router: Router, private accountService: AccountService) {
  }

  ngOnInit() {
    this.user = this.accountService.getLocalUser()
  }

  logout(): void {

  }

  goToAuthenticate() {
    this.router.navigateByUrl('login')
  }
}
