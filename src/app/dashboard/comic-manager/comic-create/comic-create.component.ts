import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComicService } from '../../../services/comic.service';
import { ImageSnippet } from '../../../models/image-snippet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-create',
  templateUrl: './comic-create.component.html',
  styleUrls: ['./comic-create.component.scss']
})
export class ComicCreateComponent implements OnInit {

  comicForm = new FormGroup({
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
  responseError: boolean = false;
  constructor(private router: Router, private comicService: ComicService) { }

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
    this.comicService.persistComic(this.comicForm.value, this.selectedFile.file).subscribe(
      (res) => {
        this.responseError = false
        this.router.navigateByUrl(`dashboard/comics/${res.id}`)
      },
      (err) => {
        this.responseError = true
      })
  }

}
