import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginValidators } from '../../validators/login-validators';

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
      { value: '', disabled: false }, [Validators.required]),
  });

  signUpForm = new FormGroup({
    name: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    email: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    password: new FormControl(
      { value: '', disabled: false }, [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [LoginValidators.matchOtherValidator('password')]),
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

  submitForm(action: string) {
    let formValue;
    switch (action) {
      case "login":
        this.accountService.login(this.loginForm.value).subscribe(user => {
          if (this.redirectUrl)
            this.router.navigateByUrl(this.redirectUrl)
          else
            this.router.navigateByUrl("dashboard")
        })
        break;
      case "signUp":
        this.accountService.persistUser(this.signUpForm.value).subscribe(user => {
          if (this.redirectUrl)
            this.router.navigateByUrl(this.redirectUrl)
          else
            this.router.navigateByUrl("dashboard")
        })
        break;
    }


  }

}
