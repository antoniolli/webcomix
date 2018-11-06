import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.scss']
})
export class MenuLoginComponent implements OnInit {

  user: User;

  constructor(private router: Router, private authService: AuthService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.user = this.accountService.getLocalUser()
  }

  logout(): void {
    this.authService.logout()
        .subscribe(() => this.router.navigateByUrl('login'));
}

}
