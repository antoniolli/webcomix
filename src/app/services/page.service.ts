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

  getPages(comicId: number): Observable<Array<Page>> {
    return this.http
      .get<Array<Page>>(`${environment.baseUrl}comics/${comicId}/pages`)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  getPage(comicId: number, pageId: number): Observable<Page> {
    return this.http
      .get<Page>(`${environment.baseUrl}comics/${comicId}/pages/${pageId}`)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  persistPage(pageForm: any, image: File, comicId: number): Observable<Page> {

    const formData = new FormData();

    formData.append('title', pageForm.title);
    formData.append('number', pageForm.number);
    formData.append('is_public', pageForm.isPublic);
    formData.append('image', image);

    return this.http
      .post<Page>(`${environment.baseUrl}comics/${comicId}/pages`, formData)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  updatePage(pageForm: any, comicId: number, image?: File): Observable<Page> {

    const formData = new FormData();

    formData.append('title', pageForm.title);
    formData.append('number', pageForm.number);
    formData.append('is_public', pageForm.isPublic);

    if (image)
      formData.append('image', image);

    return this.http
      .put<Page>(`${environment.baseUrl}comics/${comicId}/pages/${pageForm.id}`, formData)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  updateNumberPage(pageForm: any, comicId: number): Observable<Page> {

    const formData = new FormData();
    formData.append('number', pageForm.number);

    return this.http
      .put<Page>(`${environment.baseUrl}comics/${comicId}/pages/${pageForm.id}/number`, formData)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  deletePage(comicId: number, pageId: number): Observable<Page> {
    return this.http
      .delete<Page>(`${environment.baseUrl}comics/${comicId}/pages/${pageId}`)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  getMyPages(comicId: number): Observable<Array<Page>> {
    return this.http
      .get<Array<Page>>(`${environment.baseUrl}my/comics/${comicId}/pages`)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  getMyPage(comicId: number, pageId: number): Observable<Page> {
    return this.http
      .get<Page>(`${environment.baseUrl}my/comics/${comicId}/pages/${pageId}`)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  getLastPageViewd(comicId: number) {
    return JSON.parse(localStorage.getItem(`comic_${comicId}`));
  }

  setLastPageViewd(comicId: number, pageId: number) {
    localStorage.setItem(`comic_${comicId}`, JSON.stringify({last_page_view: pageId}));
  }

}
