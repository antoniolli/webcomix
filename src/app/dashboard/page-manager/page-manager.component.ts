import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageService } from 'src/app/services/page.service';
import { ImageSnippet } from 'src/app/models/image-snippet';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-page-manager',
  templateUrl: './page-manager.component.html',
  styleUrls: ['./page-manager.component.scss']
})
export class PageManagerComponent implements OnInit {
  pagesCount: number;
  pageForm = new FormGroup({
    title: new FormControl(
      { value: '', disabled: false }),
    number: new FormControl(
      { value: '', disabled: false }, [Validators.required]),
    isPublic: new FormControl(
      { value: 'true', disabled: false }, [Validators.required])
  });

  selectedFile: ImageSnippet;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private comicService: ComicService,
    ) {
      this.route.params.subscribe( params => this.pageService.comicId = params.idComic );
      this.comicService.getComic(this.pageService.comicId).subscribe(comics => {
        this.pagesCount = comics.pages.length
      })
    }

  ngOnInit() { }

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
    this.pageForm.value.number = this.pagesCount + 1
    this.pageService.persistPage(this.pageForm.value, this.selectedFile.file).subscribe(
      (res) => {
        this.onSuccess();
      },
      (err) => {
        this.onError();
      })
  }

}
