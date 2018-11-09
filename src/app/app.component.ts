import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user: User;

  constructor(
    private router: Router,
    private accountService: AccountService) {
    this.user = this.accountService.getLocalUser()
  }

  goToHome() {
    this.router.navigateByUrl('')
  }

}
