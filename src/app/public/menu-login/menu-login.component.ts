import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.scss']
})
export class MenuLoginComponent implements OnInit {

  @Input() user: User;
  @Input() loginMenu: any;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.user = this.accountService.getLocalUser();
  }

  logout(): void {
    this.accountService.logout()
    this.router.navigateByUrl('')
    this.user = null;
    this.loginMenu.open = false
  }

  goToAuthenticate(action: string) {
    if (action == "login")
      this.router.navigateByUrl('login')
    else
      this.router.navigateByUrl("signup")
    
    this.loginMenu.open = false
  }

  goToProfile() {
    this.router.navigateByUrl('dashboard/profile')
    this.loginMenu.open = false
  }
}
