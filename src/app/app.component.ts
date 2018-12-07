import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';
import { User } from './models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    user: User;
    avatarSample: string = "./assets/avatar_white_sample.png"
    avatar: string;
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        this.user = this.accountService.getLocalUser();
        if(this.user && this.user.url)
            this.avatar = this.user.url
        this.accountService.isLoggedIn().subscribe(it => {
            if (it) {
                this.user = this.accountService.getLocalUser()
                if(this.user.url)
                    this.avatar = this.user.url
            }
            else{
                this.user = null;
                this.avatar = null;
            }
        })
    }

    goToHome() {
        this.router.navigateByUrl('')
    }

    updateUrl() {
        this.avatar = this.avatarSample
    }

}
