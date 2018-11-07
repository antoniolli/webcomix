import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  demoForm = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    password: new FormControl(
      { value: '', disabled: false }, [Validators.required])
  });

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  submitLogInForm() {
    this.accountService.login(this.demoForm.value).subscribe(user => {
      let test = user;
    })
  }

}
