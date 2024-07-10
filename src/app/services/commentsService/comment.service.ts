import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../../interface/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private domain = environment.domain;
  private httpClient = inject(HttpClient); 
  
  getComments(): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(`${this.domain}/comments`);
  }
}
