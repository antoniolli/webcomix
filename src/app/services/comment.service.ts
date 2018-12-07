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
import { Comment } from '../models/comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

    getComments(comicId: number, pageId: number): Observable<Array<Comment>> {
        return this.http
            .get<Array<Comment>>(`${environment.baseUrl}comics/${comicId}/pages/${pageId}/comments`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    getComment(comicId: number, pageId: number, commentId: number): Observable<Comment> {
        return this.http
            .get<Comment>(`${environment.baseUrl}comics/${comicId}/pages/${pageId}/comments/${commentId}`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    persistComment(message: string, comicId: number, pageId: number): Observable<Comment> {

        const formData = new FormData();

        formData.append('message', message);

        return this.http
        .post<Comment>(`${environment.baseUrl}comics/${comicId}/pages/${pageId}/comments`, formData)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }

    deleteComment(commentId: number, comicId: number, pageId: number) {
        return this.http
        .delete<Comment>(`${environment.baseUrl}comics/${comicId}/pages/${pageId}/comments/${commentId}`)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }

    authorDeleteComment(commentId: number, comicId: number, pageId: number) {
        return this.http
        .delete<Comment>(`${environment.baseUrl}my/comics/${comicId}/pages/${pageId}/comments/${commentId}`)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }

    updateComment(message: string, commentId: number, comicId: number, pageId: number) {
        const formData = new FormData();

        formData.append('message', message);

        return this.http
        .put<Comment>(`${environment.baseUrl}comics/${comicId}/pages/${pageId}/comments/${commentId}`, formData)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }
}
