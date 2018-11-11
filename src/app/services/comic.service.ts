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
            .get<Array<Comic>>(environment.baseUrl + "comics/" + (page || ""))
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    getComic(comicId: string): Observable<Comic> {
        return this.http
            .get<Comic>(environment.baseUrl + "comics/" + comicId)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    persistComic(comicForm: any, image: File): Observable<Comic> {

        const formData = new FormData();

        formData.append('image', image);

        let payload = {
            name: comicForm.name,
            description: comicForm.description,
            is_public: comicForm.isPublic,
            is_comments_active: comicForm.isCommentActive,
            thumbnail: formData
        }
        return this.http
        .post<Comic>(environment.baseUrl + 'comics', payload)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }
}
