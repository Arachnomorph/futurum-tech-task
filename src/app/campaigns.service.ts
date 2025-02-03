import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  constructor(private http: HttpClient) {}

  localUrl: string = './assets/db.json';

  getData(): Observable<any> {
    return this.http.get<any>(this.localUrl);
  }
}
