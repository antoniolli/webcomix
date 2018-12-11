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
  signUpFormIsOppened: boolean
  loginForm = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false }, [Validators.required, Validators.email]),
    password: new FormControl(
      { value: '', disabled: false }, [Validators.required, Validators.minLength(6)]),
  });

  signUpForm = new FormGroup({
    name: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    email: new FormControl(
      { value: '', disabled: false }, [Validators.required, Validators.email]),
    password: new FormControl(
      { value: '', disabled: false }, [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [LoginValidators.matchOtherValidator('password')]),
  });
  responseError: boolean = false;

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
    if (this.route.snapshot.url[0].path == "login")
      this.signUpFormIsOppened = false
    else
      this.signUpFormIsOppened = true;
  }

  submitForm(action: string) {
    let formValue;
    switch (action) {
      case "login":
        this.accountService.login(this.loginForm.value).subscribe(user => {
          this.responseError = false
          if (this.redirectUrl)
            this.router.navigateByUrl(this.redirectUrl)
          else
            this.router.navigateByUrl("dashboard")
        }, error => this.responseError = true)
        break;
      case "signUp":
        this.accountService.persistUser(this.signUpForm.value).subscribe(user => {
          this.responseError = false
          if (this.redirectUrl)
            this.router.navigateByUrl(this.redirectUrl)
          else
            this.router.navigateByUrl("dashboard")
        }, error => this.responseError = true)
        break;
    }


  }

}
