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
import { Subscriber } from '../models/subscriber'

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) {}

    getSubscribers(comicId: string): Observable<Array<Subscriber>> {
        return this.http
            .get<Array<Subscriber>>(`${environment.baseUrl}/comics/${comicId}/subscribers`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    getSubscriber(comicId: string): Observable<Subscriber> {
        return this.http
            .get<Subscriber>(`${environment.baseUrl}/comics/${comicId}/subscribers`)
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    persistSubscriber(subscriberForm: any, comicId: string): Observable<Subscriber> {

        const formData = new FormData();

        formData.append('name', subscriberForm.name);
        
        return this.http
        .post<Subscriber>(`${environment.baseUrl}/comics/${comicId}/subscribers`, formData)
        .catch((error: any) => Observable.throw(error || "Server error"));
    }
}
