import { Injectable } from '@angular/core';
import {
	HttpClient,
    HttpParams,
    HttpRequest,
    HttpEventType,
    HttpResponse
} from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Rx";

// Import RxJs required methods
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

//Models
import { Comic } from '../models/comic'


@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient) {}

    getComics(page?: number): Observable<Array<Comic>> {
        return this.http
            .get<Array<Comic>>(`${environment.baseUrl}comics/${(page || "")}`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    getComic(comicId: number): Observable<Comic> {
        return this.http
            .get<Comic>(`${environment.baseUrl}comics/${comicId}`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    persistComic(comicForm: any, image: File): Observable<Comic> {

        const formData = new FormData();

        formData.append('name', comicForm.name);
        formData.append('description', comicForm.description);
        formData.append('is_public', comicForm.isPublic);
        formData.append('is_comments_active', comicForm.isCommentActive);
        formData.append('cover', image);
        
        return this.http
        .post<Comic>(`${environment.baseUrl}comics`, formData)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }

    updateComic(comicForm: any, image?: File): Observable<Comic> {

        const formData = new FormData();

        formData.append('name', comicForm.name);
        formData.append('description', comicForm.description);
        formData.append('is_public', comicForm.isPublic);
        formData.append('is_comments_active', comicForm.isCommentActive);
        if(image)
            formData.append('cover', image);
        
        return this.http
        .put<Comic>(`${environment.baseUrl}comics/${comicForm.id}`, formData)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }


    deleteComic(comicId: number): Observable<Comic> {
        return this.http
            .delete<Comic>(`${environment.baseUrl}comics/${comicId}`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    searchComics(keyword: string): Observable<Array<Comic>> {
        return this.http
            .get<Array<Comic>>(`${environment.baseUrl}search/comics?by_word=${keyword}`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    getMyComics(): Observable<Array<Comic>> {
        return this.http
            .get<Array<Comic>>(`${environment.baseUrl}my/comics/`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    getMyComic(comicId: number): Observable<Comic> {
        return this.http
            .get<Comic>(`${environment.baseUrl}my/comics/${comicId}`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    getFavorites(): Observable<Array<Comic>> {
        return this.http
            .get<Array<Comic>>(`${environment.baseUrl}/favorites`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    isFavorite(comicId: number): Observable<boolean> {
        return this.http
            .get<boolean>(`${environment.baseUrl}/favorites/${comicId}`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    persistFavorite(comicId: number): Observable<Comic> {
        const formData = new FormData();
        return this.http
        .post<Comic>(`${environment.baseUrl}/favorites/${comicId}`, formData)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }

    deleteFavorite(comicId: number): Observable<boolean> {
        return this.http
        .delete<boolean>(`${environment.baseUrl}/favorites/${comicId}`)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }
}
