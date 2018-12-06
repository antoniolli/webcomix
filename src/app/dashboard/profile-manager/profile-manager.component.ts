import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from '../../services/comic.service';
import { AccountService } from 'src/app/services/account.service';
import { Comic } from '../../models/comic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageSnippet } from '../../models/image-snippet';
import { SubscriberService } from '../../services/subscriber.service';
import { Subscriber } from '../../models/subscriber';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit {

  current_user: User;

  avatar_sample: string = "./assets/cover_sample.jpg"

  profileForm = new FormGroup({
    id: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    name: new FormControl(
      { value: '', disabled: false }, [Validators.required])
  });

  selectedFile: ImageSnippet;

  constructor(
    private accountService: AccountService,
    private router: Router) {
    this.current_user = this.accountService.getLocalUser()
    this.loadForm(this.current_user)
  }

  ngOnInit() {
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
    });

    reader.readAsDataURL(file);
  }

  loadForm(user: User) {
    this.profileForm.patchValue({
      id: user.id,
      name: user.name
    });
  }

  submitForm() {
    if(this.selectedFile && this.selectedFile.pending) {
      this.accountService.updateProfile(this.profileForm.value, this.selectedFile.file).subscribe(
        (user) => {
          this.onSuccess();
          this.router.navigateByUrl(`dashboard/comics`)
        },
        (err) => {
          this.onError();
        })
    } else {
      this.accountService.updateProfile(this.profileForm.value).subscribe(
        (user) => {
          this.router.navigateByUrl(`dashboard/comics`)
        },
        (err) => {
          this.onError();
        })
    }
  }

}
