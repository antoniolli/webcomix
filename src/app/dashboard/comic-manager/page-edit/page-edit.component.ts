import { Component, OnInit } from '@angular/core';
import { Comic } from '../../../models/comic';
import { Comment } from '../../../models/comment'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageSnippet } from '../../../models/image-snippet';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../../services/page.service';
import { ComicService } from '../../../services/comic.service';
import { AccountService } from '../../../services/account.service';
import { Page } from '../../../models/page';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {

  comic: Comic
  pageId: number;
  page: Page
  comments: Array<Comment>

  pageForm = new FormGroup({
    id: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    title: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    number: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    isPublic: new FormControl(
      { value: 'true', disabled: false }, [Validators.required])
  });

  selectedFile: ImageSnippet;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private comicService: ComicService,
    private commentService: CommentService,
    private accountService: AccountService
  ) {
    let current_user = this.accountService.getLocalUser()
    this.route.params.subscribe(params => {
      this.pageId = params.idPage
      this.comicService.getMyComic(params.idComic).subscribe(comic => {
        if (comic.user_id != current_user.id)
          this.router.navigateByUrl('dashboard');
        this.comic = comic
        this.pageService.getMyPage(this.comic.id, this.pageId).subscribe(page => this.loadForm(page))
        this.reloadComments()
      }, error => {
        this.router.navigateByUrl('dashboard');
      })
    });
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

  sendComment(comment: any) {
    let message = comment.value
    comment.setValue(null)
    this.commentService.persistComment(message, this.comic.id, this.pageId).subscribe(comments => {
      this.reloadComments()
    })
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId, this.comic.id, this.pageId).subscribe(comments => {
      this.reloadComments()
    })
  }

  reloadComments() {
    this.commentService.getComments(this.comic.id, this.pageId).subscribe(comments => {
      this.comments = comments.sort((a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
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

  loadForm(page: Page) {
    this.page = page
    this.pageForm.patchValue({
      id: page.id,
      title: page.title,
      number: page.number,
      isPublic: page.is_public
    });
  }

  submitForm() {
    if (this.selectedFile && this.selectedFile.pending) {
      this.pageService.updatePage(this.pageForm.value, this.comic.id, this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
          this.router.navigateByUrl(`dashboard/comics/${this.comic.id}`)
        },
        (err) => {
          this.onError();
        })
    } else {
      this.pageService.updatePage(this.pageForm.value, this.comic.id).subscribe(
        (res) => {
          this.router.navigateByUrl(`dashboard/comics/${this.comic.id}`)
        },
        (err) => {
        })
    }
  }
}
