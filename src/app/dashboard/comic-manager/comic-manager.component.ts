import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

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
      { value: '', disabled: false }, [Validators.required]),
    isCommentActive: new FormControl(
      { value: '', disabled: false }, [Validators.required])
  });
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasAnotherDropZoneOver:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
