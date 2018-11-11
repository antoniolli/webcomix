import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Page } from '../models/page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }
  
  comicId: string;
  
  getPage(pageId: string): Observable<Page> {
    return this.http
      .get<Page>(environment.baseUrl + "comics/" + this.comicId + "/pages/" + pageId)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  persistPage(pageForm: any, image: File): Observable<Page> {

    const formData = new FormData();

    formData.append('title', pageForm.title);
    formData.append('number', pageForm.number);
    formData.append('is_public', pageForm.isPublic);
    formData.append('image', image);

    return this.http
      .post<Page>(environment.baseUrl + "comics/" + this.comicId + "/pages", formData)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
}
