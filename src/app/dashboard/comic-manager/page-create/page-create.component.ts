import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageService } from '../../../services/page.service';
import { ImageSnippet } from '../../../models/image-snippet';
import { Router, ActivatedRoute } from '@angular/router';
import { Comic } from '../../../models/comic';
import { ComicService } from '../../../services/comic.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.scss']
})
export class PageCreateComponent implements OnInit {

  comic: Comic
  pageForm = new FormGroup({
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
    private accountService: AccountService
  ) {
    let current_user = this.accountService.getLocalUser()
    this.route.params.subscribe(params => {
      this.comicService.getMyComic(params.idComic).subscribe(comic => {
        this.comic = comic
        if (comic.user_id != current_user.id)
          this.router.navigateByUrl('dashboard');
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
    });

    reader.readAsDataURL(file);
  }

  submitForm() {
    this.pageService.getPages(this.comic.id).subscribe(pages => {
      this.pageForm.patchValue({
        number: pages.length
      })
      this.pageService.persistPage(this.pageForm.value, this.selectedFile.file, this.comic.id).subscribe(
        (res) => {
          this.onSuccess();
          this.router.navigateByUrl(`dashboard/comics/${this.comic.id}`)
        },
        (err) => {
          this.onError();
        })
    })
  }
}
