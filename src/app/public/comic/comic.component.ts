import { Component, OnInit, ViewChild } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '../../models/comic';
import { Page } from '../../models/page';
import { Comment } from '../../models/comment';
import { FormControl } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { SubscriberService } from '../../services/subscriber.service';
import { PageService } from '../../services/page.service';

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
  pagesList: Array<Page> = []
  comments: Array<Comment>;
  editableComment: Comment;
  isFavorite: boolean = false;
  isBlocked: boolean = false;
  pageSample: string = "./assets/page_sample.jpg"
  avatarSample: string = "./assets/avatar_black_sample.png"
  avatar: string

  pageControl = new FormControl();



  constructor(
    private comicService: ComicService,
    private pageService: PageService,
    private commentService: CommentService,
    private accountService: AccountService,
    private subscriberService: SubscriberService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => this.comicId = params.idComic);
  }

  ngOnInit() {

    this.user = this.accountService.getLocalUser();

    this.comicService.getComic(this.comicId).mergeMap(comic => {
      if (!comic)
        this.router.navigateByUrl(``)
      this.comic = comic
      if (comic.pages.length > 0) {
        this.pagesList = this.comic.pages.sort((a: any, b: any) => a.number - b.number);
        let localPage = this.pageService.getLastPageViewd(this.comicId)
        let selectableLocalPage = null
        if (localPage)
          selectableLocalPage = this.comic.pages.find(p => p.id == localPage.last_page_view)
        if (selectableLocalPage)
          this.selectedPage = selectableLocalPage
        else
          this.selectedPage = this.comic.pages[this.comic.pages.length - 1];
        this.reloadComments()
        this.pageControl.setValue(this.selectedPage.title)
      }
      this.getFavorite();
      return this.subscriberService.getSubscribers(this.comicId)
    }).subscribe(subscribers => {
      let sub = subscribers.find(x => x.user_id == this.user.id)
      if (sub)
        this.isBlocked = sub.is_blocked;
    }, error => this.router.navigateByUrl(``))
  }

  onSelectedPageChange(index: number) {
    if (this.comic.pages.length > 0) {
      this.selectedPage = this.comic.pages[index];
      this.pageControl.setValue(this.selectedPage.title);
      this.pageService.setLastPageViewd(this.comicId, this.selectedPage.id)
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

  editComment(comment: any) {
    let message = comment.value
    comment.setValue(null)
    this.commentService.updateComment(message, this.editableComment.id, this.comicId, this.selectedPage.id).subscribe(comment => {
      this.editableComment = null;
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

  getFavorite() {
    if (this.user) {
      this.comicService.isFavorite(this.comicId).subscribe(isFavorite => {
        this.isFavorite = isFavorite
      })
    }
  }
}
