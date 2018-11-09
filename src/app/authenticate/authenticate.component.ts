import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  redirectUrl: string;
  loginForm = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    password: new FormControl(
      { value: '', disabled: false }, [Validators.required])
  });

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        if (params.has('redirectTo')) {
          this.redirectUrl = params.get('redirectTo');
        }
      });
  }

  submitLogInForm() {
    this.accountService.login(this.loginForm.value).subscribe(user => {
      this.router.navigateByUrl(this.redirectUrl)
    })
  }

}
