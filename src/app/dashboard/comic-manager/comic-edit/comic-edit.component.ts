import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from '../../../services/comic.service';
import { AccountService } from 'src/app/services/account.service';
import { Comic } from '../../../models/comic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageSnippet } from '../../../models/image-snippet';
import { SubscriberService } from '../../../services/subscriber.service';
import { Subscriber } from '../../../models/subscriber';

@Component({
  selector: 'app-comic-edit',
  templateUrl: './comic-edit.component.html',
  styleUrls: ['./comic-edit.component.scss']
})
export class ComicEditComponent implements OnInit {
  comic: Comic;
  subscribers: Array<Subscriber>
  comicId: number;
  cover_sample: string = "./assets/cover_sample.jpg"
  comicForm = new FormGroup({
    id: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    name: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    description: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    isPublic: new FormControl(
      { value: 'true', disabled: false }, [Validators.required]),
    isCommentActive: new FormControl(
      { value: 'true', disabled: false }, [Validators.required])
  });

  selectedFile: ImageSnippet;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private accountService: AccountService,
    private subscriberService: SubscriberService,
    private router: Router) {
    this.route.params.subscribe(params => this.comicId = params.idComic);
  }

  ngOnInit() {
    let current_user = this.accountService.getLocalUser()
    this.comicService.getMyComic(this.comicId).subscribe(comic => {

      if (comic.user_id != current_user.id) {
        this.router.navigateByUrl('dashboard');
      }
      else {
        this.comic = comic
        this.loadForm(comic)
        this.reloadSubscribers();
      }

    }, error => {
      this.router.navigateByUrl('dashboard');
    })
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

  loadForm(comic: Comic) {
    this.comicForm.patchValue({
      id: comic.id,
      name: comic.name,
      description: comic.description,
      isPublic: comic.is_public,
      isCommentActive: comic.is_comments_active
    });
  }

  reloadSubscribers() {
    this.subscriberService.getSubscribers(this.comicId).subscribe(subscribers => this.subscribers = subscribers)
  }

  blockSubscriber(subscriberId: number, blockIcon: any) {
    this.subscriberService.blockSubscriber(subscriberId, this.comicId).subscribe(subscriber => {
      blockIcon.on = subscriber.is_blocked
      this.reloadSubscribers()
    })
  }


  submitForm() {
    if(this.selectedFile && this.selectedFile.pending) {
      this.comicService.updateComic(this.comicForm.value, this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
          this.router.navigateByUrl(`dashboard/comics/${this.comic.id}`)
        },
        (err) => {
          this.onError();
        })
    } else {
      this.comicService.updateComic(this.comicForm.value).subscribe(
        (res) => {
          this.router.navigateByUrl(`dashboard/comics/${this.comic.id}`)
        },
        (err) => {
          this.onError();
        })
    }
  }

}
