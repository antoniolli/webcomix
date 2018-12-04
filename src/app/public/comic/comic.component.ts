import { Component, OnInit, ViewChild } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Comic } from '../../models/comic';
import { Page } from '../../models/page';
import { Comment } from '../../models/comment';
import { FormControl } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { SubscriberService } from '../../services/subscriber.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})

export class ComicComponent implements OnInit {
  user: User;
  comicId: number;
  comic: Comic;
  selectedPage: Page;
  comments: Array<Comment>;
  isFavorite: boolean = false;
  isBlocked: boolean = false;
  pageSample: string = "./assets/page_sample.jpg"

  pageControl = new FormControl();



  constructor(
    private comicService: ComicService,
    private commentService: CommentService,
    private accountService: AccountService,
    private subscriberService: SubscriberService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => this.comicId = params.idComic);
  }

  ngOnInit() {

    this.user = this.accountService.getLocalUser();
    
    this.comicService.getComic(this.comicId).mergeMap(comic => {
      this.comic = comic
      if (comic.pages.length > 0) {
        this.selectedPage = this.comic.pages[this.comic.pages.length - 1];
        this.reloadComments()
        this.pageControl.setValue(this.selectedPage.title)
      }

      return this.comicService.isFavorite(this.comicId)
    }).mergeMap(isFavorite => {
      this.isFavorite = isFavorite
      return this.subscriberService.getSubscribers(this.comicId)
    }).subscribe(subscribers => {
      let sub = subscribers.find(x => x.user_id == this.user.id)
      if(sub)
        this.isBlocked = sub.is_blocked;
    })
      , error => console.log(error)
  }

  onSelectedPageChange(index: number) {
    if (this.comic.pages.length > 0) {
      this.selectedPage = this.comic.pages[index];
      this.pageControl.setValue(this.selectedPage.title);
      this.reloadComments()
    }
  }

  goNext() {
    let nextIndex = this.comic.pages.findIndex(page => page == this.selectedPage) + 1
    this.selectedPage = this.comic.pages[nextIndex]
    this.pageControl.setValue(this.selectedPage.title);
    this.reloadComments()
  }

  goBack() {
    let nextIndex = this.comic.pages.findIndex(page => page == this.selectedPage) - 1
    this.selectedPage = this.comic.pages[nextIndex]
    this.pageControl.setValue(this.selectedPage.title);
    this.reloadComments()
  }

  markAsFavorite(favoriteIcon: any) {
    this.isFavorite = !this.isFavorite
    if (this.isFavorite) {
      this.comicService.persistFavorite(this.comicId).subscribe(response => {
        favoriteIcon.on = this.isFavorite;
      })
    }
    else {
      this.comicService.deleteFavorite(this.comicId).subscribe(response => {
        favoriteIcon.on = this.isFavorite;
      })
    }
  }

  sendComment(comment: any) {
    let message = comment.value
    comment.setValue(null)
    this.commentService.persistComment(message, this.comicId, this.selectedPage.id).subscribe(comment => {
      this.reloadComments()
    })
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId, this.comicId, this.selectedPage.id).subscribe(comment => {
      this.reloadComments()
    })
  }

  reloadComments() {
    this.commentService.getComments(this.comicId, this.selectedPage.id).subscribe(comments => {
      this.comments = comments.sort((a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
  }
}
