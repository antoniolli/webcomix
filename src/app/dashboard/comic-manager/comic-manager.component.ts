import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComicService } from 'src/app/services/comic.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-comic-manager',
  templateUrl: './comic-manager.component.html',
  styleUrls: ['./comic-manager.component.scss'],
})

export class ComicManagerComponent implements OnInit {

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

  constructor(private comicService: ComicService) { }

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
        this.onSuccess();
      },
      (err) => {
        this.onError();
      })
  }

}
