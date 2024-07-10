import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../../interface/posts';
import { environment } from '../../../environments/environment';

@Injectable()
export class PostsService {

  private domain = environment.domain
  private httpClient = inject(HttpClient);

  getFullPosts(): Observable<Posts[]> {
    return this.httpClient.get<Posts[]>(`${this.domain}/posts`);
  }

  deletePost(id: number): Observable<Posts> {
    return this.httpClient.delete<Posts>(`${this.domain}/posts/${id}`)
  }

  getCertainUserPosts(id: number): Observable<Posts[]> {
    return this.httpClient.get<Posts[]>(`${this.domain}/users/${id}/posts`)
  }
}
